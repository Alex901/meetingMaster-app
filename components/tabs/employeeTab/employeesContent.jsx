import React from 'react';
import AddEmployee from './handleEmployees/addEmployee';
import EmployeeList from './EmployeeList/EmployeeList';

const EmployeesContent = () => {
  return (
    <div>
      <AddEmployee/>
      <EmployeeList/>
    </div>
  );
};

export default EmployeesContent;