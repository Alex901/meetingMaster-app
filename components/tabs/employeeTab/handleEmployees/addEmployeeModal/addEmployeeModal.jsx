import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import ReactModal from 'react-modal';

const AddEmployeeModal = ({ open, handleClose }) => {
    const [employeeName, setEmployeeName] = useState('');
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

    const handleChange = (event) => {
        const newName = event.target.value;
        setEmployeeName(newName);
        setIsSubmitDisabled(newName === '')
        console.log(typeof handleClose);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Submitting Name:', employeeName);
        handleClose();
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
        <ReactModal isOpen={open} onRequestClose={handleClose} ariaHideApp={false} style={customStyles}>
            <h2>Lets hire someone</h2>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Name"
                    size="small"
                    variant="outlined"
                    value={employeeName}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin="normal"
                />
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={isSubmitDisabled}
                    >
                        Submit
                    </Button>
                </div>
            </form>
        </ReactModal>
    );
};

export default AddEmployeeModal;