import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const EmployeeContext = createContext();

const EmployeeProvider = ({ children }) => {
    const BASE_URL = 'http://localhost:5000';
    const [employeeList, setEmployeeList] = useState([]);

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/employees/getEmployees`);
            setEmployeeList(response.data.employees);
        } catch (error) {
            console.error('Failed to fetch employees:', error);
        }
    };

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

    const deleteEmployee = async (id_) => {
        console.log('Deleting employee:', id_);
        try {
            const response = await axios.delete(`${BASE_URL}/employees/delete/${id_}`);
            if (response.status === 200) {
                // Filter out the deleted employee from the local state
                const updatedList = employeeList.filter((emp) => emp._id !== id_);
                setEmployeeList(updatedList);
                fetchEmployees();
            }
        } catch (error) {
            console.error('Error deleting employee:', error.response ? error.response.data.message : error.message);
        }
    };

    //HEHE, could not resist :))
    const letsGetBusy = async (_id, busyTimes) => {
        try {
            const response = await axios.post(`${BASE_URL}/employees/${_id}/set-busy`, {
                busyTimes,
            });
            if (response.status === 200){
                fetchEmployees();
            }

            console.log('Successfully added busy times:', response.data);
        } catch (error) {
            console.error('Error adding busy times:', error.response ? error.response.data : error.message);
        }
    };

    const renameEmployee = async (_id, newName) => {
        console.log('Changing name:', _id, newName);
        try {
            const response = await axios.put(`${BASE_URL}/employees/${_id}/rename`, {
                newName,
            });
            if (response.status === 200) {
                fetchEmployees();
            }
        } catch (error) {
            console.error('Error renaming employee:', error.response ? error.response.data : error.message);
        }
    }


    return (
        <EmployeeContext.Provider value={{ employeeList, addEmployee, deleteEmployee, letsGetBusy, renameEmployee, fetchEmployees }}>
            {children}
        </EmployeeContext.Provider>
    );
};

const useEmployeeContext = () => useContext(EmployeeContext);

export { EmployeeProvider, useEmployeeContext }; 