import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Employee.css';

const EmployeeTable = () => {
    const [employee, setEmployee] = useState([]);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(()=>{
        fetchEmployee();
    }, []);
    const fetchEmployee = async ()=>{
        try{
            const response = await axios.get('http://localhost:8080/employees');
            if(response.status === 200 || response.status === 201){
                setEmployee(response.data.data);
            }
        }catch(error){
            console.error('Error fetching employees:', error);
            setMessage('Failed to fetch employees. Please try again.');
        }
    };
    const handleDelete = async (employeeId) =>{
        try{
            const response = await axios.delete(`http://localhost:8080/employees?{employeeId}`);
            if(response.status === 200 || response.status === 202){
                setMessage(`Employee deleted successfully.`);
                setEmployee(employee.filter(emp => emp.employeeId !== employeeId));
            }
        }catch(error){
            console.error('Error deleting employee:',error);
            setMessage('Failed to delete employee. Please try again.');
        }
    };
    const handleEdit = (employee)=> {
        navigate('/', { state: { employee }});
    };
  return (
    <div className='table-container'>
      <h1>Employee List</h1>
      {message && <p className='message'>{message}</p>}
      {employee.length > 0 ? (
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone No</th>
                    <th>Department</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {employee.map((emp)=>(
                    <tr key={emp.employeeId}>
                        <td>{emp.employeeId}</td>
                        <td>{emp.employeeName}</td>
                        <td>{emp.employeeEmail}</td>
                        <td>{emp.employeePhoneNo}</td>
                        <td>{emp.employeeDepartment}</td>
                        <td>
                            <button onClick={() => handleEdit(emp.employeeId)}>Edit</button>{}
                            <button onClick={() => handleDelete(emp.employeeId)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      ) : (<p>No employee found.</p>)}
    </div>
  );
};

export default EmployeeTable;
