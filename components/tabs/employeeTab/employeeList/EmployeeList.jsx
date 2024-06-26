import { useEmployeeContext } from '../../../../contexts/EmployeeContext';
import Employee from './Employee/Employee';

const EmployeeList = () => {
    const { employeeList } = useEmployeeContext();

    return (
        <div style={{ textAlign: 'center'  }}>
            <h2 style={{ marginLeft: '10px' }}>Employees</h2>
            <div style={{ overflow: 'auto', maxHeight: '600px', width: '100%', padding: '5px', backgroundColor:'#F0F0F0', borderRadius:'10px' }}>
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