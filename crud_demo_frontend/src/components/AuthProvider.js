import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authenticateUser } from '../services/employeeService'; // Adjust the path as per your project structure

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (user) => {
    const res = false;
    console.log("In login")
    try {
      const response = await authenticateUser(user);
      // Assuming authenticateUser returns a boolean indicating success
      if (response) {
        setIsAuthenticated(true);
        console.log(response);
        localStorage.setItem('token', response);
        console.log(localStorage.getItem('token'));
        navigate('/'); // Redirect to homepage or desired route after successful login
        return true;
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Error during authentication:', error);
      setIsAuthenticated(false);
    }
    return res;
  };

  const logout = () => {
    setIsAuthenticated(false);
    // Add any additional cleanup logic (e.g., clearing tokens from local storage)
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext};
