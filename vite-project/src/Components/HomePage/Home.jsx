import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css';

const Home = ({ onSuccess, editEmployee }) => {
  const [employee, setEmployee] = useState({
    employeeName: '',
    employeeEmail: '',
    employeePhoneNo: '',
    employeeDepartment: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (editEmployee) {
      setEmployee(editEmployee);
    }
  }, [editEmployee]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setEmployee((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!employee.employeeName || !employee.employeeEmail || !employee.employeePhoneNo || !employee.employeeDepartment) {
      setMessage('All fields are required.');
      return;
    }

    try {
      if (employee.employeeId) {
        const response = await axios.patch(`http://localhost:8080/employees/${employee.employeeId}`, employee);
        if (response.status === 200 || response.status === 201) {
          setMessage('Employee updated successfully.');
          onSuccess();
        }
      } else {
        const response = await axios.post('http://localhost:8080/add', employee);
        if (response.status === 200 || response.status === 201) {
          setMessage(`Employee ${employee.employeeName} added successfully.`);
          setEmployee({
            employeeName: '',
            employeeEmail: '',
            employeePhoneNo: '',
            employeeDepartment: ''
          });
          onSuccess();
        }
      }
    } catch (error) {
      console.error('Error submitting employee:', error);
      setMessage('Failed to submit employee. Please check if the server is running.');
    }
  };

  const handleCancel = () => {
    setEmployee({
      employeeName: '',
      employeeEmail: '',
      employeePhoneNo: '',
      employeeDepartment: ''
    });
    setMessage('Form cleared.');
  };

  return (
    <div className="home-container">
      <h2>Employee Management System</h2>
      <form onSubmit={handleSubmit} className="employee-form">
        <label htmlFor="employeeName">Employee Name:</label>
        <input type="text" id="employeeName" value={employee.employeeName} onChange={handleChange} /><br /><br />

        <label htmlFor="employeeEmail">Employee Email:</label>
        <input type="text" id="employeeEmail" value={employee.employeeEmail} onChange={handleChange} /><br /><br />

        <label htmlFor="employeePhoneNo">Employee Phone No:</label>
        <input type="number" id="employeePhoneNo" value={employee.employeePhoneNo} onChange={handleChange} /><br /><br />

        <label htmlFor="employeeDepartment">Department:</label>
        <input type="text" id="employeeDepartment" value={employee.employeeDepartment} onChange={handleChange} /><br /><br />

        <button type="submit">{employee.employeeId ? 'Update Employee' : 'Add Employee'}</button>
        <button type="button" onClick={handleCancel}>Cancel</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Home;
