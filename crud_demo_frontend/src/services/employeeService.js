import axios from 'axios';

const API_URL = 'http://localhost:8080/api/emp'; // Replace with your API URL
const API_URL_USR = 'http://localhost:8080/api/usr'; // Replace with your API URL

export const getEmployees = async () => {
  try {
    const response = await axios.get(`${API_URL}/get/employee`);
    return response.data;
  } catch (error) {
    console.error('Error fetching employees:', error);
    throw error;
  }
};

export const getEmployee = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/get/one_employee?id=${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching employee:', error);
    throw error;
  }
};

export const createEmployee = async (employee) => {
  try {
    const response = await axios.post(`${API_URL}/create`, employee);
    return response.data;
  } catch (error) {
    console.error('Error creating employee:', error);
    throw error;
  }
};

export const updateEmployee = async (employee) => {
  try {
    const response = await axios.put(`${API_URL}/update`, employee);
    return response.data;
  } catch (error) {
    console.error('Error updating employee:', error);
    throw error;
  }
};

export const deleteEmployee = async (id) => {
  try {
    await axios.delete(`${API_URL}/delete/employee?id=${id}`);
  } catch (error) {
    console.error('Error deleting employee:', error);
    throw error;
  }
};

export const addUser = async (user) => {
  try {
    await axios.post(`${API_URL_USR}/adduser`,user);
  } catch (error) {
    console.error('User signed up successfully');
    throw error;
  }
};

export const authenticateUser = async (user) => {
  try {
    const response = await axios.post(`${API_URL_USR}/auth/login`, user);
    console.log("API : " + response.data)
    if (response.status === 200) {
      // Handle success case
      console.log('User logged in successfully');
      return response.data; // assuming response contains a boolean indicating success
    } else {
      // Handle unexpected status codes
      console.error('Unexpected response status:', response.status);
      throw new Error('Unexpected response status');
    }
  } catch (error) {
    console.error('Error during authentication:', error);
    throw error;
  }
};




