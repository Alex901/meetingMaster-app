import React, { createContext, useState, useEffect, useContext } from 'react';



const MeetingContext = createContext();

const dummyMeetings = [
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

const MeetingProvider = ({ children }) => {
    const [meetingList, setMeetingList] = useState(dummyMeetings);

    const addMeeting = (meeting) => {
        setMeetingList([...meetingList, meeting]);
    };

    const deleteMeeting = (meeting) => {
        const updatedList = meetingList.filter((item) => item.title !== meeting.title);
        setMeetingList(updatedList);
    };


    return (
        <MeetingContext.Provider value={{ meetingList, addMeeting, deleteMeeting }}>
            {children}
        </MeetingContext.Provider>
    );
}

const useMeetingContext = () => useContext(MeetingContext);

export { MeetingProvider, useMeetingContext };