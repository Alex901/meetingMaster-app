import React from 'react';
import Meeting from './Meeting/Meeting';

const MeetingList = () => {
    //dummy data, remember to remove
    const meetingData = [
        {
            "title": "Project Kickoff",
            "description": "Initial meeting to discuss project goals and timelines.",
            "startTime": "2023-04-10T09:00:00",
            "duration": "1 hour",
            "location": "Conference Room A",
            "attendants": ["Alex Johnson", "Maria Garcia"]
        },
        {
            "title": "Design Review",
            "description": "Review of the latest design drafts with the design team.",
            "startTime": "2023-04-11T11:00:00",
            "duration": "2 hours",
            "location": "Conference Room B",
            "attendants": ["James Smith", "Emily Davis", "Christopher Brown"]
        },
        {
            "title": "Sprint Planning",
            "description": "Planning the next sprint tasks with the development team.",
            "startTime": "2023-04-12T10:00:00",
            "duration": "1.5 hours",
            "location": "Online",
            "attendants": ["Sophia Miller", "Liam Wilson"]
        },
        {
            "title": "Stakeholder Meeting",
            "description": "Monthly meeting with stakeholders to discuss project progress.",
            "startTime": "2023-04-15T14:00:00",
            "duration": "1 hour",
            "location": "Conference Room C",
            "attendants": ["Olivia Martinez", "Noah Hernandez", "Isabella Robinson"]
        }
    ];


    return (
        <div style={{ textAlign: 'left' }}>
            <h2 style={{ marginLeft: '10px' }}>TODAY</h2>
            <div>
            {meetingData.map((meeting, index) => (
        <Meeting key={index} {...meeting} />
      ))}
            </div>
        </div>
    );
};

export default MeetingList;