import React from 'react'
import './SignUp.css';
import { useState } from 'react';
import { addUser } from '../services/employeeService';
import CryptoJS from 'crypto-js';
import { Link, useNavigate } from 'react-router-dom';



const SignUp = () => {

    // State variables for form fields
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {

            const hashedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);

            const newEmployee = {
                name,
                email,
                password : hashedPassword,
            };

            await addUser(newEmployee);

            setSuccess('Signup successful!'); // Handle success
            setName('');
            setEmail('');
            setPassword('');
            setError('');

            navigate('/login');
        } catch (error) {
            setError('Signup failed. Please try again.'); // Handle error
        }
    };

    return (
        <div>
            <div className="signup-container">
                <h2>Signup</h2>
                {error && <p className="error">{error}</p>}
                {success && <p className="success">{success}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Sign Up</button>
                </form>

            <Link to="/login">Already have an account</Link>
            </div>
        </div>
    )
}

export default SignUp
