import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const MeetingContext = createContext();



const MeetingProvider = ({ children }) => {
  const BASE_URL = 'http://localhost:5000';
  const [meetingList, setMeetingList] = useState([]);

  const addMeeting = (meetingData) => {
    console.log("DEBUG: Adding meeting: ", meetingData)
    setMeetingList([...meetingList, meetingData]);
    console.log("Did it work?")
  };

  const deleteMeeting = (meeting) => {
    const updatedList = meetingList.filter(
      (item) => item.title !== meeting.title
    );
    setMeetingList(updatedList);
  };

  return (
    <MeetingContext.Provider value={{ meetingList, addMeeting, deleteMeeting }}>
      {children}
    </MeetingContext.Provider>
  );
};

const useMeetingContext = () => useContext(MeetingContext);

export { MeetingProvider, useMeetingContext };
