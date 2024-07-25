import React, { useState,useContext } from 'react';
import './Login.css';
import { useNavigate,Link } from 'react-router-dom'
import CryptoJS from 'crypto-js';
import { AuthContext } from './AuthProvider';

const Login = () => {
    // State variables for form fields
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // Hash the password for verification
            const hashedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);

            // Create the credentials object
            const credentials = {
                email,
                password: hashedPassword,
            };
            console.log("Before");
            // Attempt to log in
            const result = await login(credentials);
            console.log("After");

            if (result) {
                setSuccess('Login successful!');
                setEmail('');
                setPassword('');
                setError('');
                navigate('/');
            } else {
                throw new Error('Invalid credentials');
            }
        } catch (error) {
            setError('Login failed. Please check your credentials and try again.');
        }
    };

    return (
        <div>
            <div className="login-container">
                <h2>Login</h2>
                {error && <p className="error">{error}</p>}
                {success && <p className="success">{success}</p>}
                <form onSubmit={handleSubmit}>
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
                    <button type="submit">Login</button>
                </form>
            <Link to="/signup">Create a new account</Link>
            </div>
        </div>
    );
};

export default Login;
