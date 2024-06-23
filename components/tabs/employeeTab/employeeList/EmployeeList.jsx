import { useEmployeeContext } from '../../../../contexts/EmployeeContext';
import Employee from './Employee/Employee';

const EmployeeList = () => {
    const { employeeList } = useEmployeeContext();

    return (
        <div style={{ textAlign: 'left' }}>
            <h2 style={{ marginLeft: '10px' }}>Employees</h2>
            <div>
                {employeeList && employeeList.length > 0 ? (
                    employeeList.map((employee, index) => (
                        <Employee key={index} {...employee} />
                    ))
                ) : (
                    <p>No employees found.</p>
                )}
            </div>
        </div>
    );
};

export default EmployeeList;