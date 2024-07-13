import React, { useState, useEffect, useCallback } from 'react';
import { getEmployees, deleteEmployee } from '../services/employeeService';
import { Link } from 'react-router-dom';
import './EmployeeList.css'; // Importing CSS for styling
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome CSS

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [locations, setLocations] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [minSalary, setMinSalary] = useState('');
  const [maxSalary, setMaxSalary] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage] = useState(5); // Set number of employees per page to 5
  const [sortOption, setSortOption] = useState(''); // New state for sorting option

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await getEmployees();
        setEmployees(data);
        setFilteredEmployees(data);

        // Extract unique locations
        const uniqueLocations = [...new Set(data.map(emp => emp.location))];
        setLocations(uniqueLocations);
      } catch (error) {
        setError('Error fetching employees.');
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  useEffect(() => {
    const applyFiltersAndSort = () => {
      let filtered = employees.filter(employee => {
        const matchesName = employee.empName.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesLocation = selectedLocation ? employee.location === selectedLocation : true;
        const matchesSalary = (minSalary === '' || employee.salary >= minSalary) &&
                               (maxSalary === '' || employee.salary <= maxSalary);
        return matchesName && matchesLocation && matchesSalary;
      });

      // Sort employees based on the selected sort option
      if (sortOption === 'name-asc') {
        filtered.sort((a, b) => a.empName.localeCompare(b.empName));
      } else if (sortOption === 'name-desc') {
        filtered.sort((a, b) => b.empName.localeCompare(a.empName));
      } else if (sortOption === 'salary-asc') {
        filtered.sort((a, b) => a.salary - b.salary);
      } else if (sortOption === 'salary-desc') {
        filtered.sort((a, b) => b.salary - a.salary);
      }

      setFilteredEmployees(filtered);
    };

    applyFiltersAndSort();
  }, [searchQuery, selectedLocation, minSalary, maxSalary, employees, sortOption]);

  // Pagination logic
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevPage = useCallback(() => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  }, [currentPage]);

  const handleNextPage = useCallback(() => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  }, [currentPage, totalPages]);

  const handleDelete = async (id) => {
    try {
      await deleteEmployee(id);
      setEmployees(employees.filter(employee => employee.id !== id));
      setFilteredEmployees(filteredEmployees.filter(employee => employee.id !== id));
    } catch (error) {
      setError('Error deleting employee.');
      console.error('Error deleting employee:', error);
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedLocation('');
    setMinSalary('');
    setMaxSalary('');
    setSortOption(''); // Clear sorting option
  };

  useEffect(() => {
    const handleKeydown = (event) => {
      if (event.key === 'ArrowLeft') {
        handlePrevPage();
      } else if (event.key === 'ArrowRight') {
        handleNextPage();
      }
    };

    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [handlePrevPage, handleNextPage]);

  return (
    <div className="employee-list">
      <h1>Employee Database</h1>
      <div className="search-filter-container">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <i className="fas fa-search search-icon"></i>
        </div>
        <div className="sort-dropdown">
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="sort-select"
          >
            <option value="">Sort By</option>
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="salary-asc">Salary (Low to High)</option>
            <option value="salary-desc">Salary (High to Low)</option>
          </select>
        </div>
        <div className="filter-clear-container">
          <div className="filter-dropdown">
            <button className="filter-button">
              <i className="fas fa-filter"></i> Filter
            </button>
            <div className="dropdown-content">
              <div className="filter-section">
                <label>
                  Location:
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="dropdown-select"
                  >
                    <option value="">All Locations</option>
                    {locations.map(location => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="filter-section">
                <label>
                  Min Salary:
                  <input
                    type="number"
                    value={minSalary}
                    onChange={(e) => setMinSalary(e.target.value)}
                    className="filter-input"
                  />
                </label>
                <label>
                  Max Salary:
                  <input
                    type="number"
                    value={maxSalary}
                    onChange={(e) => setMaxSalary(e.target.value)}
                    className="filter-input"
                  />
                </label>
              </div>
            </div>
          </div>
          <button className="clear-filters-button" onClick={clearFilters}>
            <i className="fas fa-times"></i> Clear Filters
          </button>
          <Link to="/add" className="add-button">
            <i className="fas fa-user-plus"></i> Add Employee
          </Link>
        </div>
      </div>
      {error && <p className="error-message">{error}</p>}
      <ul className="employee-container">
        {currentEmployees.length > 0 ? (
          currentEmployees.map(employee => (
            <li key={employee.id} className="employee-item">
              <div className="employee-details">
                <p><strong>Name:</strong> {employee.empName}</p>
                <p><strong>Location:</strong> {employee.location}</p>
                <p><strong>Salary:</strong> {employee.salary} Rs.</p>
              </div>
              <div className="employee-actions">
                <Link to={`/edit/${employee.id}`} className="edit-button">
                  <i className="fas fa-edit"></i> Edit
                </Link>
                <button onClick={() => handleDelete(employee.id)} className="delete-button">
                  <i className="fas fa-trash"></i> Delete
                </button>
              </div>
            </li>
          ))
        ) : (
          <p>No employees found.</p>
        )}
      </ul>
      <div className="pagination">
        <button
          className="page-button"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          <i className="fas fa-chevron-left"></i>
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className="page-button"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
           <i className="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
};

export default EmployeeList;
