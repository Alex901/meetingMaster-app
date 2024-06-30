import React, { useState } from 'react';
import { useMeetingContext } from "/contexts/MeetingContext";
import { Card, CardContent, Typography, Chip, Avatar, IconButton } from '@mui/material';
import { Icon } from '@mdi/react';
import { mdiDelete, mdiDeleteEmpty } from '@mdi/js';
import ConfirmDeleteDialog from '../../../../Dialogs/ConfirmDeleteDialog';

const Meeting = ({ meeting }) => {
    const [isHovering, setIsHovering] = useState(false);
    const { deleteMeeting } = useMeetingContext();
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [selectedMeetingId, setSelectedMeetingId] = useState(null);


    // Function to extract initials from a name
    const getInitials = (name) => {
        return name.split(' ').map((n) => n[0]).join('');
    };

    function formatDuration(duration) {
        const hours = Math.floor(duration / 60);
        const minutes = duration % 60;
        return `${hours} hour(s) and ${minutes} minute(s)`;
    }

    const handleDeleteConfirm = () => {
        console.log('DEBUG: Deleting meeting with id:', selectedMeetingId);
        deleteMeeting(selectedMeetingId);
    };

    const handleOpenConfirmDialog = (meetingId) => {
        setSelectedMeetingId(meetingId);
        setShowConfirmDialog(true);
    };

    return (
        //Testing some MUI components instead of HTML elements, seems to work :shrug:
        <Card sx={{ marginBottom: 1, width:'500px' }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {meeting.title}
                    <IconButton
                        aria-label="delete"
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                        onClick={() => handleOpenConfirmDialog(meeting._id)} 
                    >
                        <Icon path={isHovering ? mdiDeleteEmpty : mdiDelete} size={1} />
                    </IconButton>
                    <ConfirmDeleteDialog
                            isOpen={showConfirmDialog}
                            onCancel={() => setShowConfirmDialog(false)}
                            content={`Are you sure you want to remove this meeting: ${selectedMeetingId}?`}
                            onConfirm={handleDeleteConfirm}
                        />
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {meeting.startTime.toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                    })} | {formatDuration(meeting.duration)}
                </Typography>
                <Typography variant="body2">
                    {meeting.description}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Location: {meeting.location}
                </Typography>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {meeting.attendants.map((attendant, index) => (
                        <Chip
                            key={index}
                            avatar={<Avatar style={{ backgroundColor: attendant.color }}>
                                {getInitials(attendant.name)}</Avatar>}
                            label={attendant.name}
                        />
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default Meeting;