import React from 'react';
import Button from '@mui/material/Button'; // Import Button from MUI

const AddMeeting = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
            {/* Use MUI Button with the outlined variant */}
            <Button variant="outlined" style={{ marginTop: '20px' }}>Add Meeting</Button>
        </div>
    );
};

export default AddMeeting;