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
  const [timeRecommendations, setTimeRecommendations] = useState({
    recommendations: [],
    message: "Enter the meeting details for recommended start times",
  });

  useEffect(() => {
    console.log("Selected time:", selectedTime);
    console.log("timeRecommendations", timeRecommendations);
  }, [selectedTime]);

  const formatTime = (date) => date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  useEffect(() => {
    if (
      earliestDate.length &&
      latestDate.length &&
      selectedEmployees.length &&
      duration
    ) {
      const calculateTimeRecommendations = () => {
        const startTime = new Date(earliestDate); // Ensure this is local time
        const endTime = new Date(latestDate); // Ensure this is local time
        const durationMinutes = parseInt(duration, 10);
        let recommendations = [];

        // Generate all possible start times within the range, at 0, 15, 30, 45 of each hour
        for (let time = new Date(startTime); time <= endTime; time.setMinutes(time.getMinutes() + 15)) {
          console.log("time: ", time);
          const endOfMeeting = new Date(time);
          endOfMeeting.setMinutes(endOfMeeting.getMinutes() + durationMinutes);
          console.log("end of meeting", endOfMeeting);

          const withinWorkingHours = time.getHours() >= 9 && endOfMeeting.getHours() < 17 || (endOfMeeting.getHours() === 17 && endOfMeeting.getMinutes() === 0);

          // Check if the time slot is within the date range and working hours
          if (withinWorkingHours && endOfMeeting <= endTime && selectedEmployees.every(employee => {
            return employee.busy.every(busyTime => {
              const employeeStart = new Date(busyTime.start); // Ensure this is local time
              const employeeEnd = new Date(busyTime.end); // Ensure this is local time
              console.log("employeeStart", employeeStart);
              // It is a valid time if no employee is busy during that time, else
              return !(time < employeeEnd && endOfMeeting > employeeStart);
            });
          })) {
            recommendations.push(new Date(time)); // Clone the date to avoid mutation
            console.log("recommendations", recommendations);
          }
        }

        // Convert Date objects to time strings for display, but keep Date objects for internal use
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
    const newMeetingData = {
      title: title,
      location: location,
      duration: duration,
      description: description,
      earliestDate: new Date(earliestDate),
      latestDate: new Date(latestDate),
      selectedEmployees: selectedEmployees,
    };

    console.log(newMeetingData);
    event.preventDefault();
    console.log("Submitting Meeting");
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
            value={earliestDate}
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
              min: earliestDate, // Prevent selecting a date earlier than the first
            }}
          />
        </div>
        <div style={{ marginTop: '12px', overflow: 'auto' }}>
          {timeRecommendations.message && <p>{timeRecommendations.message}</p>}
          {(timeRecommendations.recommendations?.length ?? 0) > 0 && (
            <Stack direction="row" spacing={1} >
              {timeRecommendations.recommendations.map((time, index) => (
                <Chip
                  key={index}
                  label={formatTime(time)}
                  onClick={() => handleTimeSelect(time)}
                  color={selectedTime === time ? "primary" : "default"}
                  clickable
                />
              ))}
            </Stack>
          )}
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
