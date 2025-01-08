import React, { useState } from 'react';
import './admin.css';
import { ToastContainer, toast } from 'react-toastify';

const AdminLogin = () => {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://location-backend-five.vercel.app/admin-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store the token and redirect to the admin dashboard
        localStorage.setItem('adminToken', data.token);
        toast.success("Login Success....");
        window.location.href = '/admin-dashboard';
      } else {
        // Show error message
        setErrorMessage(data.error || 'Invalid username or password');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('Something went wrong. Please try again later.');
    }
  };

  return (
    
    
      <div>
      
      <h1 className='h1-admin'>Nihon Executive Location Tracking System</h1>
      <div className="login-box">
      
        <h2>Admin Login</h2>
        {errorMessage && <p className="error">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="user-box">
            <input
              type="text"
              required
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
            <label>Username</label>
          </div>
          <div className="user-box">
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Password</label>
          </div>
          <button type="submit" className="btn-submit" disabled={loading}>
  {loading ? 'Logging in...' : 'Login'}
</button>

        </form>
        {loading && <div className="loading-indicator">Loading...</div>}
      </div>
      </div>
    
  );
};

export default AdminLogin;
