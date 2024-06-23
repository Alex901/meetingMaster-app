import React, { createContext, useContext, useState, useEffect } from 'react';

const EmployeeContext = createContext();

const EmployeeProvider = ({ children }) => {
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

    export { EmployeeProvider, useEmployeeContext };    