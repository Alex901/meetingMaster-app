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
        if (hours === 0 && minutes === 0) {
            return `0 minute(s)`;
        } else if (hours === 0) {
            return `${minutes} minute(s)`;
        } else if (minutes === 0) {
            return `${hours} hour(s)`;
        } else {
            return `${hours} hour(s) and ${minutes} minute(s)`;
        }
    }

    const handleDeleteConfirm = () => {
        console.log('DEBUG: Deleting meeting with id:', selectedMeetingId);
        deleteMeeting(selectedMeetingId);
    };

    const handleOpenConfirmDialog = (meetingId) => {
        setSelectedMeetingId(meetingId);
        setShowConfirmDialog(true);
    };

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hour = date.getHours();
        const minute = date.getMinutes();

        const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} - ${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        return formattedDate;
    };

    return (
        //Testing some MUI components instead of HTML elements, seems to work :shrug:
        <Card sx={{ marginBottom: 1, width: '500px' }}>
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
                    {formatDate(new Date(meeting.startTime))} | {formatDuration(meeting.duration)}
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