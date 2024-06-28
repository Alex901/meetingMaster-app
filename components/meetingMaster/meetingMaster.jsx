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
            position="fixed"
            top="50px"
            height="auto"
            maxHeight={window.innerHeight - 100}
            width="100vw"

        >
            <Card
                sx={{
                    backgroundColor: '#f5f5f5', // Slightly off-white for contrast
                    padding: '7px',
                    height: 'auto',
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', // Soft shadow for depth
                    '&:hover': {
                        boxShadow: '0px 6px 24px rgba(0, 0, 0, 0.15)' // Slightly more pronounced shadow on hover
                    }
                }}
            >
                <CardContent>
                    <Tabs
                        value={selectedTab}
                        onChange={handleChange}
                        sx={{
                            width: 'auto',
                            '.MuiTab-root': { // Targeting the root of the Tab component
                                '&.Mui-selected': { // Specifically targeting selected state of the tab
                                    border: 'none',
                                    color: 'purple',
                                    backgroundColor: 'rgba(255, 165, 0, 0.5)',
                                    borderRadius: '10px',
                                    '&:active': { // Removing any styles for the active state
                                        outline: 'none',
                                        border: 'none',
                                    },
                                    '&:focus-visible': { // Specifically removing focus-visible outline or border
                                        outline: 'none',
                                        border: 'none',
                                    },
                                },
                            },
                            '.MuiTabs-indicator': { // Optionally, if you want to remove the indicator line as well

                            },
                        }}

                    >
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