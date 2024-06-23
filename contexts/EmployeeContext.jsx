import React, { createContext, useState, useEffect, useContext } from 'react';

const EmployeeContext = createContext();

EmployeeProvider = ({ children }) => {
    const [employeeList, setEmployeeList] = useState([]);

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

    return { EmployeeProvider, useEmployeeContext };    