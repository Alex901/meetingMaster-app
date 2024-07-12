import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { useEmployeeContext } from '/contexts/EmployeeContext';
import { toast } from 'react-toastify';

const MeetingContext = createContext();



const MeetingProvider = ({ children }) => {
  const BASE_URL = import.meta.env.VITE_REACT_APP_PRODUCTION === 'true'
    ? 'https://todo-backend-gkdo.onrender.com'
    : 'http://localhost:5000';
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
      if (response.status === 200) {
        fetchMeetings();
        toast.success('Meeting successfully added!');
        fetchEmployees(); //Some employees have update time schedules now, that is why I fetch employees too
      } else {
        toast.error('Failed to add meeting!');
      }
    } catch (error) {
      console.error('Error adding meeting:', error.response ? error.response.data.message : error.message);
    }
  };

  const deleteMeeting = async (meeting_id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/meetings/delete/${meeting_id}`);
      if (response.status === 200) {
        fetchMeetings();
        fetchEmployees(); //Some employees have update time schedules now, that is why I fetch employees too
        toast.success('Meeting successfully deleted!');
      } else {
        toast.error('Failed to delete meeting!');
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
