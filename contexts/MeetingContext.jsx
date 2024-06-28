import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { useEmployeeContext } from '/contexts/EmployeeContext';

const MeetingContext = createContext();



const MeetingProvider = ({ children }) => {
  const BASE_URL = 'http://localhost:5000';
  const { fetchEmployees } = useEmployeeContext();
  const [meetingList, setMeetingList] = useState([]);

  useEffect(() => {
    fetchMeetings();
  }, []);

  const fetchMeetings = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/meetings/getMeetings`);
      setMeetingList(response.data.meetings);
    } catch (error) {
      console.error('Failed to fetch meetings:', error);
    }
  }

  const addMeeting = async (meetingData) => {
    console.log("DEBUG: Adding meeting: ", meetingData)
    try {
      const response = await axios.post(`${BASE_URL}/meetings/addMeeting`, meetingData);
      if (response.status === 200)
        fetchMeetings(); 
      fetchEmployees(); //Some employees have update time schedules now
    } catch (error) {
      console.error('Error adding meeting:', error.response ? error.response.data.message : error.message);
    }
  };

  const deleteMeeting = async (meeting_id) => {
    console.log("DEBUG: Deleting meeting: ", meeting_id);
    try {
      const response = await axios.delete(`${BASE_URL}/meetings/delete/${meeting_id}`);
      if (response.status === 200) {
      fetchMeetings(); 
      fetchEmployees(); //Some employees have update time schedules now
      }
    } catch (error) {
      console.error('Error deleting meeting:', error.response ? error.response.data.message : error.message);
    }
  };

  return (
    <MeetingContext.Provider value={{ meetingList, addMeeting, deleteMeeting }}>
      {children}
    </MeetingContext.Provider>
  );
};

const useMeetingContext = () => useContext(MeetingContext);

export { MeetingProvider, useMeetingContext };
