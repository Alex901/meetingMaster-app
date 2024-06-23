import React, { useState } from 'react';
import ReactModal from 'react-modal';
import { TextField, Button, MenuItem, FormControl, Select, InputLabel } from '@mui/material';
import { useEmployeeContext } from '/contexts/EmployeeContext';
import { useMeetingContext } from '/contexts/MeetingContext';

const MeetingModal = ({ open, handleClose }) => {
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [duration, setDuration] = useState('');
    const [description, setDescription] = useState('');
    const [earliestDate, setEarliestDate] = useState('');
    const [latestDate, setLatestDate] = useState('');
    const [selectedEmployees, setSelectedEmployees] = useState([]);
    const { employeeList } = useEmployeeContext();

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
        const value = event.target.value;
        setSelectedEmployees((current) => (current === value ? null : value));

        console.log(selectedEmployees);
    }

    const handlesSubmit = (event) => {

        const newMeetingData = {
            title: title,
            location: location,
            duration: duration,
            description: description,
            earliestDate: new Date(earliestDate),
            latestDate: new Date(latestDate),
            selectedEmployees: selectedEmployees
        }

        console.log(newMeetingData);
        event.preventDefault();
        console.log('Submitting Meeting');
    }


    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            border: '3px solid #ccc',
            borderRadius: '10px',
            maxWidth: '500px',
        },
        overlay: {
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(7px)',
        },
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
                    onChange={e => setTitle(e.target.value)}
                />
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center', margin: 'normal' }}>
                    <TextField
                        size="small"
                        fullWidth
                        id="location"
                        label="Location"
                        name="location"
                        style={{ flex: 1 }} // Adjusts the width to take up available space
                        onChange={e => setLocation(e.target.value)}
                    />

                    <TextField
                        size="small"
                        required
                        id="duration"
                        label="Duration (minutes)"
                        name="duration"
                        type="number"
                        onChange={e => setDuration(e.target.value)}
                        InputProps={{
                            inputProps: {
                                min: 0,
                                step: 15
                            }
                        }}
                        style={{ width: '200px' }}
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
                    onChange={e => setDescription(e.target.value)}
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



                <h3 style={{ marginTop: '20px' }}>Timefinder</h3>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
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
                            min: earliestDate, // Prevent selecting a date earlier than the first field
                        }}
                    />
                </div>

                <div style={{ textAlign: 'center' }}>
                    <Button type="submit" variant="contained" color="primary" size="large" style={{ marginTop: '20px' }}
                    disabled={!earliestDate.length || !latestDate.length || !selectedEmployees.length || !duration}>
                        Submit
                    </Button>
                </div>
            </form>
        </ReactModal>
    );
};

export default MeetingModal;