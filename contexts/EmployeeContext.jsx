import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const EmployeeContext = createContext();



const EmployeeProvider = ({ children }) => {
    const BASE_URL = import.meta.env.VITE_REACT_APP_PRODUCTION === 'true'
        ? 'https://todo-backend-gkdo.onrender.com'
        : 'http://localhost:5000';
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
            console.log('Response:', response);
            if (response.status === 200) {
                setEmployeeList([...employeeList, response.data.newEmployee]);
                toast.success('Employee added successfully!');
            } else {
                toast.error('Failed to add employee!');
            }
        } catch (error) {
            console.error('Error adding employee:', error.response ? error.response.data.message : error.message);
        }
    }

    const deleteEmployee = async (_id) => {
        console.log('Deleting employee:', _id);
        try {
            const response = await axios.delete(`${BASE_URL}/employees/delete/${_id}`);
            if (response.status === 200) {
                // Filter out the deleted employee from the local state
                const updatedList = employeeList.filter((emp) => emp._id !== _id);
                setEmployeeList(updatedList);
                fetchEmployees();
                toast.success('Employee deleted successfully!');
            } else {
                toast.error('Failed to delete employee!');
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
            if (response.status === 200) {
                fetchEmployees();
                const employeeName = employeeList.find(emp => emp._id === _id)?.name;
                toast.success(`${employeeName} is now busier than before`);
            } else {
                toast.error('Failed to add busy times!');
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
                toast.success('Employee renamed successfully!');
            } else {
                toast.error('Failed to rename employee!');
            }
        } catch (error) {
            console.error('Error renaming employee:', error.response ? error.response.data : error.message);
        }
    }


    return (
        <EmployeeContext.Provider value={{
            employeeList, addEmployee, deleteEmployee, letsGetBusy, renameEmployee,
            fetchEmployees, setEmployeeList
        }}>
            {children}
        </EmployeeContext.Provider>
    );
};

const useEmployeeContext = () => useContext(EmployeeContext);

export { EmployeeProvider, useEmployeeContext }; 