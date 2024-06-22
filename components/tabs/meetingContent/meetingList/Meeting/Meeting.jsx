import React from 'react';
import { Card, CardContent, Typography, Chip, Avatar, Stack } from '@mui/material';

const Meeting = ({ title, description, startTime, duration, location, attendants }) => {
    // Function to extract initials from a name
    const getInitials = (name) => {
        return name.split(' ').map((n) => n[0]).join('');
    };

    return (
        <Card sx={{ marginBottom: 2 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {title}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {startTime} | {duration}
                </Typography>
                <Typography variant="body2">
                    {description}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Location: {location}
                </Typography>
                <Stack direction="row" spacing={1}>
                    {attendants.map((attendant, index) => (
                        <Chip
                            key={index}
                            avatar={<Avatar>{getInitials(attendant)}</Avatar>}
                            label={attendant}
                        />
                    ))}
                </Stack>
            </CardContent>
        </Card>
    );
};

export default Meeting;