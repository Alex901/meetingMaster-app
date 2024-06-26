import React from 'react';
import { Card, CardContent, Typography, Chip, Avatar, Stack } from '@mui/material';

const Meeting = ({ meeting }) => {

    console.log("DEBUG: meeting in meeting: ", meeting);
    // Function to extract initials from a name
    const getInitials = (name) => {
        return name.split(' ').map((n) => n[0]).join('');
    };

    return (
        <Card sx={{ marginBottom: 2 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {meeting.title}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {meeting.startTime.toString()} | {meeting.duration}
                </Typography>
                <Typography variant="body2">
                    {meeting.description}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Location: {meeting.location}
                </Typography>
                <Stack direction="row" spacing={1}>
                    {meeting.attendants.map((attendant, index) => (
                        console.log("DEBUG: Meeting -> attendant ", attendant),
                        <Chip
                            key={index}
                            avatar={<Avatar>{getInitials(attendant.name)}</Avatar>}
                            label={attendant.name}
                        />
                    ))}
                </Stack>
            </CardContent>
        </Card>
    );
};

export default Meeting;