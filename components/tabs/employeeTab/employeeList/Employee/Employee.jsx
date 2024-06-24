import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useEmployeeContext } from '/contexts/EmployeeContext';

const Employee = ({ _id, name, color, busy }) => {
    const [isHovering, setIsHovering] = useState(false);
    const { deleteEmployee, letsGetBusy } = useEmployeeContext();

    const getInitials = (name) => {
        return name.split(' ').map((n) => n[0]).join('');
    };

    const deleteEmp = (_id) => {
        console.log('Deleting employee:', _id);
        deleteEmployee(_id);
    };

    {/* This is a block comment in JSX */ }
    const addBusyTime = (_id) => {
        const busyTimes = [];
        // Define the start and end hours of the business day
        const businessStartHour = 9;
        const businessEndHour = 17;
        // Maximum duration of a busy block is 2 hours
        const maxDurationHours = 2;
        let attemptCounter = 0;
        const maxAttempts = 100;

        // Define a helper function to generate a random time block within business hours
        const generateTimeBlock = (date) => {
            // Calculate a random start hour within the constraints that allow for a max 2-hour duration
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
        for (let dayOffset = 0; dayOffset < 3; dayOffset++) {
            // Create a new date object for the current day in the loop
            const date = new Date();
            // Adjust the date to the correct day based on the loop's offset
            date.setDate(date.getDate() + dayOffset);
            // Randomly determine the number of busy blocks for the day (between 1 and 6)
            const numBlocksToday = Math.floor(Math.random() * 6) + 1;

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
                        break; // Exit the loop if max attempts are reached
                    }
                } while (overlap); // Continue until a non-overlapping block is generated
                // Add the non-overlapping block to the day's blocks
                dayBlocks.push(timeBlock);
            }
            // Add the day's blocks to the overall busy times array
            busyTimes.push(...dayBlocks);
        }

        // Log the generated busy times for the employee
        // In a real application, you would likely update the employee's record in a database or state
        console.log(`Generated busy times for employee ${_id}:`, busyTimes);
        if(busyTimes.length > 0) {
            letsGetBusy(_id, busyTimes);
        }
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '5px', margin: '5px', border: '1px, solid, black', borderRadius: '10px' }}>
            <Avatar style={{ backgroundColor: color }}>{getInitials(name)}</Avatar>
            <div style={{ flexGrow: 1 }}>
                <TextField
                    variant="outlined"
                    defaultValue={name}
                    size="small"
                    style={{}}
                />
            </div>
            <div>
                <IconButton
                    aria-label="delete"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    onClick={() => deleteEmp(_id)}
                >
                    {isHovering ? <DeleteForeverIcon /> : <DeleteIcon />}
                </IconButton>
                <IconButton aria-label="add"
                    onClick={() => addBusyTime(_id)}
                >
                    <AddIcon />
                </IconButton>
            </div>
        </div>
    );
};

export default Employee;