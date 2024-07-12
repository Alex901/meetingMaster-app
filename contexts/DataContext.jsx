import React, { createContext, useContext } from 'react';
import axios from 'axios';
import { useEmployeeContext } from '/contexts/EmployeeContext';
import { toast } from 'react-toastify';

const DataContext = createContext();

const DataProvider = ({ children }) => {
    const BASE_URL = import.meta.env.VITE_REACT_APP_PRODUCTION === 'true'
        ? 'https://todo-backend-gkdo.onrender.com'
        : 'http://localhost:5000';
    const { fetchEmployees } = useEmployeeContext();

    const uploadFile = async (file) => {
        const formData = new FormData();
        formData.append('file', file); 

        try {
            toast.info("Uploading data...");
            const response = await axios.post(`${BASE_URL}/employees/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            fetchEmployees();
            toast.success("Data upload succeeded");
            console.log('File uploaded successfully:', response.data);
        } catch (error) {
            toast.error("Data upload failed");
            console.error('Error uploading file:', error);
        }
    };

    return (
        <DataContext.Provider value={{ uploadFile }}>
            {children}
        </DataContext.Provider>
    );
};

const useDataContext = () => useContext(DataContext);

export { DataProvider, useDataContext };