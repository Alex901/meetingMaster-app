import React, { useState } from 'react';
import { Card, CardContent, Tabs, Tab, Box } from '@mui/material';
import GroupsIcon from '@mui/icons-material/Groups';
import BadgeIcon from '@mui/icons-material/Badge';
import BackupIcon from '@mui/icons-material/Backup';
import MeetingContent from '../tabs/meetingContent/meetingContent';
import EmployeesContent from '../tabs/employeeTab/employeesContent';
import DataContent from '../tabs/dataContent/dataContent';

function MeetingMaster() {
    const [selectedTab, setSelectedTab] = useState(0);

    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="top"
            height="auto"
            width="100vw"
        >
            <Card sx={{ backgroundColor: '#ffffff', padding: '7px', height:'auto' }}>
                <CardContent>
                    <Tabs value={selectedTab} onChange={handleChange} sx={{ width: 'auto' }} >
                        <Tab icon={<GroupsIcon />} label="Meetings" iconPosition='start' />
                        <Tab icon={<BadgeIcon />} label="Employees" iconPosition='start' />
                        <Tab icon={<BackupIcon />} label="Data" iconPosition='start' />
                    </Tabs>

                    {selectedTab === 0 && <MeetingContent />}
                    {selectedTab === 1 && <EmployeesContent />}
                    {selectedTab === 2 && <DataContent />}
                </CardContent>
            </Card>
        </Box>
    );
}

export default MeetingMaster;