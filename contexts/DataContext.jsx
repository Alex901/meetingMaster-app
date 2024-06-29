import React, { createContext, useContext } from 'react';
import axios from 'axios';
import { useEmployeeContext } from '/contexts/EmployeeContext';

const BASE_URL = 'http://localhost:5000';

const DataContext = createContext();

const DataProvider = ({ children }) => {
    const { fetchEmployees } = useEmployeeContext();

    const uploadFile = async (file) => {
        const formData = new FormData();
        formData.append('file', file); // 'file' is the key, and the second parameter is the file itself

        try {
            const response = await axios.post(`${BASE_URL}/employees/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            fetchEmployees();
            console.log('File uploaded successfully:', response.data);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

       // const text = await file.text(); // Read the file content
       // const lines = text.split('\n'); // Split the content into lines
       // console.log('Lines:', lines);
    
       // for (const line of lines) {
          //  const parts = line.split(';'); // Split the line by ";"
        //    await processLines(parts); // Process each line
      //  }
   
    
 /*    async function processLines(parts) {
        if (parts.length === 4) {
            const response = await axios.get(`${BASE_URL}/employees/checkEmployee/${parts[0]}`);
            const employeeExists = response.data.exists; 
            console.log('response:', response.data.exists);
            if (!employeeExists) {
                await axios.post(`${BASE_URL}/employees/addEmployee`, {
                    _id: parts[0],
                });
            }
            await axios.post(`${BASE_URL}/employees/${parts[0]}/set-busy`, {
                start: new Date(parts[1]),
                end: new Date(parts[2]),
            });
        } else if (parts.length === 2) {
            const response = await axios.get(`${BASE_URL}/employees/checkEmployee/${parts[0]}`);
            const employeeExists = response.data.exists;
            if (!employeeExists) {
                await axios.post(`${BASE_URL}/employees/addEmployee`, {
                    _id: parts[0],
                    name: parts[1],
                });
            } else {
                await axios.put(`${BASE_URL}/employees/${parts[0]}/rename`, {
                    name: parts[1],
                });
            }
        } else {
            console.error('Invalid line!');
        }
    } */


    return (
        <DataContext.Provider value={{ uploadFile }}>
            {children}
        </DataContext.Provider>
    );
};

const useDataContext = () => useContext(DataContext);

export { DataProvider, useDataContext };