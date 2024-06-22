import React, { useState } from 'react';
import Button from '@mui/material/Button'; // Import Button from MUI
import MeetingModal from './MeetingModal/MeetingModal';

const AddMeeting = () => {
    const [openModal, setOpenModal] = useState(false);
    
    const handleOpen = () => {
        setOpenModal(true);
    }

    const handleClose = () => {
        setOpenModal(false);
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
            <Button variant="outlined" style={{ marginTop: '20px' }} onClick={handleOpen}>New Meeting</Button>
            <MeetingModal open={openModal} handleClose={handleClose} />
        </div>
    );
};

export default AddMeeting;