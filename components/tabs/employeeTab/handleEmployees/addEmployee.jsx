import React from 'react';
import { Button } from '@mui/material';

const AddEmployee = () => {
    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%'}}>
            <Button variant="outlined" color="primary" style={{ marginTop: '20px' }}>
                Add Employee
            </Button>
        </div>
    );
};

export default AddEmployee;