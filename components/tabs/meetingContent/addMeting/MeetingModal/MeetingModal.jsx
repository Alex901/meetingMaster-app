import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import {
  TextField,
  Button,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  Chip,
  Stack,
} from "@mui/material";
import { useEmployeeContext } from "/contexts/EmployeeContext";
import { useMeetingContext } from "/contexts/MeetingContext";

const MeetingModal = ({ open, handleClose }) => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");
  const [earliestDate, setEarliestDate] = useState("");
  const [latestDate, setLatestDate] = useState("");
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const { employeeList } = useEmployeeContext();
  const [selectedTime, setSelectedTime] = useState("");
  const { addMeeting } = useMeetingContext();
  const [timeRecommendations, setTimeRecommendations] = useState({
    recommendations: [],
    message: "Enter the meeting details for recommended start times",
  });

  useEffect(() => {
    if (
      earliestDate.length &&
      latestDate.length &&
      selectedEmployees.length &&
      duration
    ) {
      const calculateTimeRecommendations = () => {
        const startTime = new Date(earliestDate);
        const endTime = new Date(latestDate);
        const durationMinutes = parseInt(duration, 10);
        let recommendations = [];

        // Generate all possible start times within the range, at 0, 15, 30, 45 of each hour
        for (let time = new Date(startTime); time <= endTime; time.setMinutes(time.getMinutes() + 15)) {
          const endOfMeeting = new Date(time);
          endOfMeeting.setMinutes(endOfMeeting.getMinutes() + durationMinutes);

          const withinWorkingHours = time.getHours() >= 9 && endOfMeeting.getHours() < 17 || (endOfMeeting.getHours() === 17 && endOfMeeting.getMinutes() === 0);

          // Check if the time slot is within the date range and working hours
          if (withinWorkingHours && endOfMeeting <= endTime && selectedEmployees.every(employee => {
            return employee.busy.every(busyTime => {
              const employeeStart = new Date(busyTime.start); 
              const employeeEnd = new Date(busyTime.end); 
              // It is a valid time if no employee is busy during that time, else
              return !(time < employeeEnd && endOfMeeting > employeeStart);
            });
          })) {
            recommendations.push(new Date(time)); // Clone the date to avoid mutation
          }
        }
        return recommendations;
      };

      const recommendations = calculateTimeRecommendations();
      if (recommendations.length > 0) {
        setTimeRecommendations({ message: "", recommendations });
      } else {
        setTimeRecommendations({
          message: (
            <p style={{ color: "red" }}>
              No available times, try adjusting the dates or the duration.
            </p>
          ),
          recommendations: [],
        });
      }
    }
  }, [earliestDate, latestDate, selectedEmployees, duration]);

  const handleEarliestDateChange = (event) => {
    const date = new Date(event.target.value);
    date.setHours(10, 0); // Set time to 08:00
    setEarliestDate(date.toISOString().slice(0, 16));
  };

  const handleLatestDateChange = (event) => {
    const date = new Date(event.target.value);
    date.setHours(19, 0); // No times after 17.00
    setLatestDate(date.toISOString().slice(0, 16));
  };

  const handleEmployeeSelection = (event) => {
    console.log(event.target.value);
    const value = event.target.value;
    setSelectedEmployees((current) => (current === value ? null : value));

    console.log(selectedEmployees);
  };

  const handlesSubmit = (event) => {
    event.preventDefault();

    const newMeetingData = {
      title: title,
      description: description,
      startTime: selectedTime,
      duration: duration,
      location: location,
      attendants: selectedEmployees,
    };

    console.log(newMeetingData);

    addMeeting(newMeetingData);
    resetMeetingData();
    handleClose();
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      border: "3px solid #ccc",
      borderRadius: "10px",
      maxWidth: "500px",
    },
    overlay: {
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      backdropFilter: "blur(7px)",
    },
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    console.log('Selected date:', time);
  };

  const formatTime = (date) => date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

  const formatDayLabel = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize today to start of the day
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);


    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
    }
  };

  const groupByDay = (recommendations) => {
    return recommendations.reduce((groups, time) => {
      const dateStr = time.toDateString();
      if (!groups[dateStr]) {
        groups[dateStr] = [];
      }
      groups[dateStr].push(time);
      return groups;
    }, {});
  };

  const resetMeetingData = () => {
    setTitle('');
    setDescription('');
    setSelectedTime(null);
    setDuration('');
    setLocation('');
    setSelectedEmployees([]);
  };

  const groupedRecommendations = groupByDay(timeRecommendations.recommendations || []);

  const validEarliestDate = new Date(earliestDate).getTime() ? new Date(earliestDate) : new Date();

  const maxDate = new Date(validEarliestDate.getTime() + (5 * 24 * 60 * 60 * 1000)).toISOString().slice(0, 16);



  return (
    <ReactModal isOpen={open} onRequestClose={handleClose} style={customStyles}>
      <h2 id="meeting-modal-title">Set New Meeting</h2>
      <form onSubmit={handlesSubmit}>
        <TextField
          size="small"
          margin="normal"
          fullWidth
          id="title"
          label="Title"
          name="title"
          autoFocus
          onChange={(e) => setTitle(e.target.value)}
        />
        <div
          style={{
            display: "flex",
            gap: "16px",
            alignItems: "center",
            margin: "normal",
          }}
        >
          <TextField
            size="small"
            fullWidth
            id="location"
            label="Location"
            name="location"
            style={{ flex: 1 }} // Adjusts the width to take up available space
            onChange={(e) => setLocation(e.target.value)}
          />

          <TextField
            size="small"
            required
            id="duration"
            label="Duration (minutes)"
            name="duration"
            type="number"
            onChange={(e) => setDuration(e.target.value)}
            InputProps={{
              inputProps: {
                min: 0,
                step: 15,
              },
            }}
            style={{ width: "200px" }}
          />
        </div>

        <TextField
          size="small"
          margin="normal"
          fullWidth
          id="description"
          label="Description"
          name="description"
          multiline
          rows={2}
          onChange={(e) => setDescription(e.target.value)}
          inputProps={{ maxLength: 150 }}
        />

        <FormControl fullWidth margin="dense" size="small">
          <InputLabel id="employee-select-label">Select Employees</InputLabel>
          <Select
            labelId="employee-select-label"
            id="employee-select"
            label="Select Employees"
            size="small"
            multiple
            value={selectedEmployees}
            onChange={handleEmployeeSelection}
          >
            {employeeList.map((employee) => (
              <MenuItem key={employee.id} value={employee}>
                {employee.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <h3 style={{ marginTop: "20px" }}>Timefinder</h3>
        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          <TextField
            size="small"
            margin="normal"
            required
            fullWidth
            id="at-earliest"
            label="At Earliest"
            name="at-earliest"
            type="datetime-local"
            value={earliestDate ? earliestDate : new Date().toISOString().slice(0, 10)}
            onChange={handleEarliestDateChange}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              min: new Date().toISOString().slice(0, 16) // Inactivates all dates before the current date
            }}
          />
          <TextField
            size="small"
            margin="normal"
            required
            fullWidth
            id="at-latest"
            label="At Latest"
            name="at-latest"
            type="datetime-local"
            value={latestDate}
            onChange={handleLatestDateChange}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              min: earliestDate, // Prevent selecting a date earlier than the first date
              max: maxDate,
            }}
          />
        </div>
        <div style={{ marginTop: '12px', padding: '7px', overflow: 'auto' }}>
          {timeRecommendations.message && <p>{timeRecommendations.message}</p>}
          {Object.entries(groupedRecommendations).map(([day, times], index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
              <div style={{ flexBasis: '90px', flexGrow: 0, flexShrink: 0 }}>
                <span style={{ fontWeight: 'bold', marginRight: '8px', whiteSpace: 'nowrap' }}>
                  {formatDayLabel(new Date(day))}
                </span>
              </div>
              <div style={{ flexGrow: 1 }}> 
                <Stack direction="row" spacing={1}>
                  {times.map((time, timeIndex) => (
                    <Chip
                      key={timeIndex}
                      label={formatTime(time)}
                      onClick={() => handleTimeSelect(time)}
                      color={selectedTime === time ? "primary" : "default"}
                      clickable
                    />
                  ))}
                </Stack>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center" }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            style={{ marginTop: "20px" }}
            disabled={
              !earliestDate.length ||
              !latestDate.length ||
              !selectedEmployees.length ||
              !duration
            }
          >
            Submit
          </Button>
        </div>
      </form>
    </ReactModal>
  );
};

export default MeetingModal;
