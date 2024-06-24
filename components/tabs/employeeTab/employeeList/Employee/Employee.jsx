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
    const { deleteEmployee } = useEmployeeContext();

    const deleteEmp = (employeeName) => {
        console.log('Deleting employee:', employeeName);
        deleteEmployee(employeeName);
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '5px', margin: '5px', border: '1px, solid, black', borderRadius: '10px' }}>
            <Avatar style={{ backgroundColor: color }}>{name[0]}</Avatar>
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
                    onClick={() => deleteEmp(name)} 
                >
                    {isHovering ? <DeleteForeverIcon /> : <DeleteIcon />}
                </IconButton>
                <IconButton aria-label="add">
                    <AddIcon />
                </IconButton>
            </div>
        </div>
    );
};

export default Employee;