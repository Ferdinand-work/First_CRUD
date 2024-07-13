import React, { useState } from 'react';
import { createEmployee } from '../services/employeeService';
import './Modal.css';

const AddEmployeeModal = ({ isOpen, onClose, onAdd }) => {
  const [empName, setEmpName] = useState('');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newEmployee = { empName, location, salary };
      await createEmployee(newEmployee);
      onAdd(); // Notify parent to refresh employee list
      onClose(); // Close the modal
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add Employee</h2>
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
            <button type="submit" className="btn btn-submit">Add Employee</button>
            <button type="button" className="btn btn-cancel" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployeeModal;
