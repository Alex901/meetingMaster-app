import React, { createContext, useContext, useState, useEffect } from 'react';

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
    const [employeeList, setEmployeeList] = useState(dummyData);

    const addEmployee = (employee) => {
        setEmployeeList([...employeeList, employee]);
    }

    const deleteEmployee = (employee) => {
        const updatedList = employeeList.filter((item) => item.id !== employee.id);
        setEmployeeList(updatedList);
    }

    return (
        <EmployeeContext.Provider value={{ employeeList, addEmployee, deleteEmployee }}>
            {children}
        </EmployeeContext.Provider>
    );
};

    const useEmployeeContext = () => useContext(EmployeeContext);

    export { EmployeeProvider, useEmployeeContext }; 