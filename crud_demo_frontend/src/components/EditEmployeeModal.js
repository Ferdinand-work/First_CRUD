import React, { useState, useEffect } from 'react';
import { updateEmployee } from '../services/employeeService';
import './Modal.css';

const EditEmployeeModal = ({ isOpen, onClose, employee, onUpdate }) => {
  const [empName, setEmpName] = useState('');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');

  useEffect(() => {
    if (employee) {
      setEmpName(employee.empName);
      setLocation(employee.location);
      setSalary(employee.salary);
    }
  }, [employee]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedEmployee = { ...employee, empName, location, salary };
      await updateEmployee(updatedEmployee);
      onUpdate(); // Notify parent to refresh employee list
      onClose(); // Close the modal
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  if (!isOpen || !employee) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Employee</h2>
        <form onSubmit={handleSubmit} className="modal-form">
          <label>
            Name:
            <input
              type="text"
              value={empName}
              onChange={(e) => setEmpName(e.target.value)}
              required
            />
          </label>
          <label>
            Location:
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </label>
          <label>
            Salary:
            <input
              type="number"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              required
            />
          </label>
          <div className="modal-buttons">
            <button type="submit" className="btn btn-submit">Update Employee</button>
            <button type="button" className="btn btn-cancel" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEmployeeModal;
