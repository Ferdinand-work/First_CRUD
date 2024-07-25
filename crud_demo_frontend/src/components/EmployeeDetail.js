// src/components/EmployeeDetail.js
import React, { useState, useEffect } from 'react';
import { getEmployee } from '../services/employeeService';
import { useParams } from 'react-router-dom';
import './EmployeeDetail.css'; // Importing CSS for styling

const EmployeeDetail = () => {
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const data = await getEmployee(id);
        setEmployee(data);
      } catch (error) {
        setError('Error fetching employee.');
        console.error('Error fetching employee:', error);
      }
    };

    fetchEmployee();
  }, [id]);

  if (error) return <div className="error-message">{error}</div>;
  if (!employee) return <div className="loading">Loading...</div>;

  return (
    <div className="employee-detail">
      <h1>Employee Detail</h1>
      <div className="detail-card">
        <p><strong>Employee Name:</strong> {employee.empName}</p>
        <p><strong>Location:</strong> {employee.location}</p>
        <p><strong>Salary:</strong> {employee.salary} Rs.</p>
      </div>
    </div>
  );
};

export default EmployeeDetail;
