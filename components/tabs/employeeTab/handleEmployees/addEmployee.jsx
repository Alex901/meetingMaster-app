import React, { useState } from 'react';
import { Button } from '@mui/material';
import AddEmployeeModal from './addEmployeeModal/addEmployeeModal';

const AddEmployee = () => {
    const [openModal, setOpen] = useState(false); 

    const handleOpen = () => setOpen(true); 
    const handleClose = () => setOpen(false);  

    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%'}}>
            <Button variant="outlined" color="primary" style={{ marginTop: '20px' }} onClick={handleOpen}>
                Add Employee
            </Button>
            <AddEmployeeModal open={openModal} handleClose={handleClose} /> 
        </div>
    );
};

export default AddEmployee;