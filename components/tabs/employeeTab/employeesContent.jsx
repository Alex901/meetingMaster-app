import React from 'react';
import AddEmployee from './handleEmployees/addEmployee';
import EmployeeList from './employeeList/EmployeeList';

const EmployeesContent = () => {
  return (
    <div>
      <AddEmployee/>
      <EmployeeList/>
    </div>
  );
};

export default EmployeesContent;