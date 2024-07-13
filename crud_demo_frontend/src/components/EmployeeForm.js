// src/components/EmployeeForm.js
import React, { useState, useEffect } from 'react';
import { createEmployee, updateEmployee, getEmployee } from '../services/employeeService';
import { useNavigate, useParams } from 'react-router-dom';
import './EmployeeForm.css'; // Importing CSS for styling

const EmployeeForm = () => {
  const [empName, setEmpName] = useState('');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchEmployee = async () => {
        try {
          const employee = await getEmployee(id);
          setEmpName(employee.empName);
          setLocation(employee.location);
          setSalary(employee.salary);
        } catch (error) {
          setError('Error fetching employee.');
          console.error('Error fetching employee:', error);
        }
      };

      fetchEmployee();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const employee = { id, empName, location, salary };

    try {
      if (id) {
        await updateEmployee(employee);
      } else {
        await createEmployee(employee);
      }
      navigate('/');
    } catch (error) {
      setError('Error saving employee.');
      console.error('Error saving employee:', error);
    }
  };

  return (
    <div className="employee-form">
      <h1>{id ? 'Edit Employee' : 'Add Employee'}</h1>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="empName">Employee Name:</label>
          <input
            id="empName"
            type="text"
            value={empName}
            onChange={(e) => setEmpName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location:</label>
          <input
            id="location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="salary">Salary:</label>
          <input
            id="salary"
            type="number"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">Save</button>
      </form>
    </div>
  );
};

export default EmployeeForm;
