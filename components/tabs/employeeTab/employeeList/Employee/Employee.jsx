import React, { useState, useEffect } from 'react';
import { Avatar, TextField, IconButton, Chip, Stack, Button } from '@mui/material';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import { useEmployeeContext } from '/contexts/EmployeeContext';
import { Icon } from '@mdi/react';
import { mdiDelete, mdiDeleteEmpty } from '@mdi/js';
import ConfirmDeleteDialog from '/components/Dialogs/ConfirmDeleteDialog';
import { toast } from 'react-toastify';


const Employee = ({ _id, name, color, busy }) => { //TODO: Change the props to EmployeeData, this is not nice to read
    const [isHovering, setIsHovering] = useState(false);
    const { deleteEmployee, letsGetBusy, renameEmployee } = useEmployeeContext();
    const [currentName, setCurrentName] = useState(name);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
    const [selectedEmployeeName, setSelectedEmployeeName] = useState(null);

    useEffect(() => { //This is not optimal, but it works for now
        setCurrentName(name);
    }, [name]);

    const getInitials = (name) => {
        return name.split(' ').map((n) => n[0]).join('');
    };

    const handleDeleteConfirm = () => {
        deleteEmployee(selectedEmployeeId);
    };

//Handle the opening of the confirm dialog, the name is a little redundant but... :)
    const handleOpenConfirmDialog = (_id, name) => {
        setSelectedEmployeeId(_id);
        setSelectedEmployeeName(name);
        setShowConfirmDialog(true);
    };

    //Method to check if employee is busy today, to avoid spammage
    const isEmployeeBusyToday = (busy) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Normalize today's date to start of the day for comparison
    
        // Check each busy entry to see if it starts today
        for (let entry of busy) {
            const entryStartDate = new Date(entry.start);
            entryStartDate.setHours(0, 0, 0, 0); // Normalize entry's start date to start of the day for comparison
    
            if (entryStartDate.getTime() === today.getTime()) {
                console.log("Employee is busy today:", entry);
                return true; // Found an entry that starts today
            }
        }
        return false;
    };

    {/* Method to generate some random times where said employee is 
         busy */ }
    const addBusyTime = (_id, busy) => {
        const busyTimes = [];
        const businessStartHour = 9;
        const businessEndHour = 17;
        const maxDurationHours = 2;
        let attemptCounter = 0;
        const maxAttempts = 100;
        const days = 5; //Change this to change the number of days employee is busy

        if ( isEmployeeBusyToday(busy) ) {
            toast.warning('Employee is already busy today');
            return;
        }

        // A helper function to generate a random time block within business hours
        const generateTimeBlock = (date) => {
            // Calculate a random start hour within the constraints of business hours and max duration
            const startHour = Math.floor(Math.random() * (businessEndHour - maxDurationHours - businessStartHour + 1)) + businessStartHour;
            // Determine the end hour, ensuring the block lasts between 1 to 2 hours
            const endHour = startHour + Math.floor(Math.random() * maxDurationHours) + 1;
            // Return the time block as an object with start and end Date objects
            return {
                start: new Date(new Date(date).setHours(startHour, 0, 0, 0)),
                end: new Date(new Date(date).setHours(endHour, 0, 0, 0))
            };
        };

        // Loop over the next 3 days to generate busy blocks for each day
        for (let dayOffset = 0; dayOffset < days; dayOffset++) {
            // Create a new date object for the current day in the loop
            const date = new Date();
            // Adjust the date to the correct day based on the loop's offset
            date.setDate(date.getDate() + dayOffset);
            // Randomly determine the number of busy blocks for the day (between 1 and 6)
            const numBlocksToday = Math.floor(Math.random() * 4) + 1; //Change this to change the number of blocks per day, you can set it to constant too

            // Initialize an array to hold the day's busy blocks
            let dayBlocks = [];
            // Generate each block for the day
            for (let i = 0; i < numBlocksToday; i++) {
                let timeBlock;
                let overlap;
                // Attempt to generate a block until it doesn't overlap with existing blocks
                do {
                    overlap = false;
                    timeBlock = generateTimeBlock(date);
                    for (let block of dayBlocks) {
                        if ((timeBlock.start < block.end && timeBlock.start >= block.start) ||
                            (timeBlock.end > block.start && timeBlock.end <= block.end)) {
                            overlap = true;
                            break;
                        }
                    }
                    attemptCounter++;
                    if (attemptCounter > maxAttempts) {
                        console.log("Max attempts reached, skipping to next block to avoid infinite loop.");
                        break;
                    }
                } while (overlap); // Continue until a non-overlapping block is generated
                // Add the non-overlapping block to the day's blocks
                dayBlocks.push(timeBlock);
            }
            // Add the day's blocks to the overall busy times array
            busyTimes.push(...dayBlocks);
        }

        console.log(`Generated busy times for employee ${_id}:`, busyTimes);
        if (busyTimes.length > 0) {
            letsGetBusy(_id, busyTimes);
        }
    };

    const getTodaysBusyTimes = () => {
        const today = new Date();
        const todayDate = today.toLocaleDateString();

        // First loop: Filter out dates that match today's date
        const todaysEvents = busy.filter(({ start }) => {
            const localStartDate = new Date(start).toLocaleDateString();
            return localStartDate === todayDate;
        }).sort((a, b) => {
            // Sort the events by start time
            return new Date(a.start) - new Date(b.start);
        });

        // Second loop: Format the start and end times of today's events
        const formattedBusyTimes = todaysEvents.map(({ start, end }) => {
            const startTime = new Date(start).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
            const endTime = new Date(end).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
            return `${startTime} - ${endTime}`;
        });

        return formattedBusyTimes;
    };

    const handleNameChange = (event) => {
        setCurrentName(event.target.value);
    };

    const onNameChange = (_id, newName) => {
        renameEmployee(_id, newName); //TODO: Confirmation dialog
    }



    const todaysBusyTimes = getTodaysBusyTimes();

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '5px', margin: '5px', border: '1px solid black', borderRadius: '10px', backgroundColor: 'white', width: '500px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '30px' }}>
                <div style={{ display: 'flex', gap: '16px' }}>
                    <Avatar style={{ backgroundColor: color, marginLeft: '20px' }}>{getInitials(name)}</Avatar>
                    <div style={{ flexGrow: 1 }}>
                        <TextField
                            variant="outlined"
                            defaultValue={currentName}
                            size="small"
                            onChange={handleNameChange}
                        />
                        <Button
                            variant="contained"
                            size="small"
                            onClick={() => onNameChange(_id, currentName)}
                            disabled={currentName === name || currentName === ''}
                            sx={{
                                minWidth: '40px',
                                height: '40px',
                                ml: .2,
                                borderRadius: '5px',
                                backgroundColor: 'green',
                                '&:hover': {
                                    backgroundColor: 'darkgreen',
                                }
                            }}
                        >
                            Rename
                        </Button>
                    </div>
                </div>
                <div>
                    <IconButton
                        aria-label="delete"
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                        onClick={() => handleOpenConfirmDialog(_id, name)}

                    >
                        <Icon path={isHovering ? mdiDeleteEmpty : mdiDelete} size={1} />
                    </IconButton>
                    {showConfirmDialog && (
                        <ConfirmDeleteDialog
                            isOpen={showConfirmDialog}
                            onCancel={() => setShowConfirmDialog(false)}
                            content={`Are you sure you want to remove ${selectedEmployeeName}?`}
                            onConfirm={handleDeleteConfirm}
                        />
                    )}


                    <IconButton aria-label="add"
                        onClick={() => addBusyTime(_id, busy)}
                    >
                        <EventBusyIcon />
                    </IconButton>
                </div>
            </div>
            <div style={{ display: 'flex', width: '100%', padding: '5px' }}>
                <Stack direction="row" justifyContent="flex-start" sx={{ flexWrap: 'wrap', gap: '5px 0px' }}>
                    <Chip label="TODAY" color="primary" sx={{ minWidth: '110px' }} />
                    {todaysBusyTimes.map((time, index) => (
                        <div key={index} style={{ width: '110px' }}>
                            <Chip label={time}
                                sx={{
                                    color: 'white',
                                    background: 'linear-gradient(145deg, #ff5555, #cc0000)',
                                    boxShadow: '0px 4px 6px rgba(0,0,0,0.2), inset 0px -4px 6px rgba(0,0,0,0.1)',
                                    border: '1px solid rgba(255, 255, 255, 0.2)',
                                    '&:hover': {
                                        background: 'linear-gradient(145deg, #ee4444, #bb0000)',
                                    }
                                }}
                            />
                        </div>
                    ))}
                </Stack>
            </div>
        </div>

    );

};

export default Employee;