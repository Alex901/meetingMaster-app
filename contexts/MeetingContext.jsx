import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const MeetingContext = createContext();



const MeetingProvider = ({ children }) => {
  const BASE_URL = 'http://localhost:5000';
  const [meetingList, setMeetingList] = useState([]);

  useEffect(() => {
    fetchMeetings();
  }, []);

  const fetchMeetings = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/meetings/getMeetings`);
      console.log("DEBUG: Fetching meetings: ", response.data.meetings);
      setMeetingList(response.data.meetings);
    } catch (error) {
      console.error('Failed to fetch meetings:', error);
    }
  }

  const addMeeting = async (meetingData) => {
    console.log("DEBUG: Adding meeting: ", meetingData)
    try {
      const response = await axios.post(`${BASE_URL}/meetings/addMeeting`, meetingData);
      console.log("DEBUG: Response from addMeeting: ", response.data.message);
      console.log("DEBUG: Response from addMeeting: ", response.data.newMeeting);
      if (response.status === 200)
        fetchMeetings();
    } catch (error) {
      console.error('Error adding meeting:', error.response ? error.response.data.message : error.message);
    }
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
