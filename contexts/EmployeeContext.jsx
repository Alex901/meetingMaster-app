import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const EmployeeContext = createContext();

const dummyData = [
    {
        _id: '1',
        name: 'John Doe',
        color: '#FF0000', // Example HEX code
        busy: [{ start: new Date(2023, 3, 14, 9, 0), end: new Date(2023, 3, 14, 17, 0) }],
    },
    {
        _id: '2',
        name: 'Jane Smith',
        color: '#00FF00', // Example HEX code
        busy: [{ start: new Date(2023, 3, 15, 10, 0), end: new Date(2023, 3, 15, 12, 0) }],
    },
    {
        _id: '3',
        name: 'Alex Johnson',
        color: '#0000FF', // Example HEX code
        busy: [{ start: new Date(2023, 3, 16, 13, 0), end: new Date(2023, 3, 16, 15, 0) }],
    },
    {
        _id: '4',
        name: 'Emily Davis',
        color: '#FFFF00', // Example HEX code
        busy: [{ start: new Date(2023, 3, 17, 11, 0), end: new Date(2023, 3, 17, 14, 0) }],
    },
];

const EmployeeProvider = ({ children }) => {
    const BASE_URL = 'http://localhost:5000';
    const [employeeList, setEmployeeList] = useState(dummyData);

    const addEmployee = async (employeeData) => {
        //console.log('Adding employee:', employeeData);
        try {
            const response = await axios.post(`${BASE_URL}/employees/addEmployee`, employeeData);

            console.log(response.data.message);

            setEmployeeList([...employeeList, response.data.newEmployee]);
        } catch (error) {
            console.error('Error adding employee:', error.response ? error.response.data.message : error.message);
        }
    }

    const deleteEmployee = async (employeeName) => {
        try {
            // Find the employee by name to get their ID
            const employee = employeeList.find((emp) => emp.name === employeeName);
            if (!employee) {
                console.error('Employee not found');
                return;
            }
    
            const response = await axios.delete(`${BASE_URL}/employees/delete/${employee._id}`);
            if (response.status === 200) {
                // Filter out the deleted employee from the local state
                const updatedList = employeeList.filter((emp) => emp._id !== employee._id);
                setEmployeeList(updatedList); 
            }
        } catch (error) {
            console.error('Error deleting employee:', error.response ? error.response.data.message : error.message);
        }
    };



    return (
        <EmployeeContext.Provider value={{ employeeList, addEmployee, deleteEmployee }}>
            {children}
        </EmployeeContext.Provider>
    );
};

const useEmployeeContext = () => useContext(EmployeeContext);

export { EmployeeProvider, useEmployeeContext }; 