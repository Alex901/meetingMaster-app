import React, { useState } from 'react';
import ReactModal from 'react-modal';
import { TextField, Button, MenuItem, FormControl, Select, InputLabel } from '@mui/material';
const MeetingModal = ({ open, handleClose }) => {
    const [earliestDate, setEarliestDate] = useState('');
    const [latestDate, setLatestDate] = useState('');

    const handleEarliestDateChange = (event) => {
        setEarliestDate(event.target.value);
    };

    const handleLatestDateChange = (event) => {
        setLatestDate(event.target.value);
    };


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
            <form>
                <TextField
                    size="small"
                    margin="normal"
                    fullWidth
                    id="title"
                    label="Title"
                    name="title"
                    autoFocus
                />
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center', margin: 'normal' }}>
                    <TextField
                        size="small"
                        fullWidth
                        id="location"
                        label="Location"
                        name="location"
                        style={{ flex: 1 }} // Adjusts the width to take up available space
                    />

                    <TextField
                        size="small"
                        required
                        id="duration"
                        label="Duration (minutes)"
                        name="duration"
                        type="number"
                        InputProps={{
                            inputProps: {
                                min: 0, // Minimum value
                                step: 15 // Step increment
                            }
                        }}
                        style={{ width: '200px' }} // Adjusts the width specifically for the duration input
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
                    inputProps={{ maxLength: 150 }}
                />



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
                <FormControl fullWidth margin="dense" size="small">
                    <InputLabel id="employee-select-label">Select Employees</InputLabel>
                    <Select
                        labelId="employee-select-label"
                        id="employee-select"
                        label="Select Employees"
                        size="small"
                    >
                        {/* Map employees here */}
                        <MenuItem value={1}>Employee 1</MenuItem>
                        <MenuItem value={2}>Employee 2</MenuItem>

                    </Select>
                </FormControl>
                <div style={{ textAlign: 'center' }}>
                    <Button type="submit" variant="contained" color="primary" size="large" style={{ marginTop: '20px' }} disabled>
                        Submit
                    </Button>
                </div>
            </form>
        </ReactModal>
    );
};

export default MeetingModal;