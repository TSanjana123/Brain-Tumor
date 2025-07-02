








import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);

  // Sample data for the bar graph (no changes needed here)
  const barData = {
    labels: ['2018', '2019', '2020', '2021', '2022', '2023', '2024'],
    datasets: [
      {
        label: 'Accuracy (%)',
        data: [85, 87, 84, 88, 86, 89, 87],
        backgroundColor: [
          '#4CAF50',
          '#2196F3',
          '#FFC107',
          '#FF5722',
          '#9C27B0',
          '#03A9F4',
          '#8BC34A',
        ],
        borderColor: '#000',
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Year vs Accuracy',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors
    try {
      console.log("Attempting login with:", formData);
      const backendUrl = process.env.REACT_APP_LOGIN_RESPONSE_URL;
      if (!backendUrl) {
        console.error("REACT_APP_LOGIN_RESPONSE_URL environment variable is not set in the frontend.");
        setError("Configuration error. Please contact support.");
        return;
      }
      const response = await axios.post(`${backendUrl}/api/login`, formData);
      const { token, user } = response.data; // 'user' object contains all user details including _id

      // Ensure user object and its _id exist before trying to access them
      if (!user || !user._id) {
        console.error("User data or user._id missing in login response:", user);
        setError("Login failed: Incomplete user data received. Please try again.");
        return;
      }

      // Destructure other properties from user for convenience if needed
      const { name, email, role, patientId, organizationName } = user;

      // Store essential items in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      localStorage.setItem('name', name);
      localStorage.setItem('email', email);

      // *** THIS IS THE FIX: Store the MongoDB _id as 'userId' ***
      localStorage.setItem('userId', user._id);

      // Conditional storage based on role
      if (role === 'patient' && patientId) {
        localStorage.setItem('patientId', patientId);
      } else {
        localStorage.removeItem('patientId'); // Ensure it's removed if not applicable
      }

      if ((role === 'medicalStaff' || role === 'admin') && organizationName) { // Assuming admin might also have org
        localStorage.setItem('organizationName', organizationName);
      } else {
        localStorage.removeItem('organizationName'); // Ensure it's removed if not applicable
      }

      setShowToast(true);
      setTimeout(() => {
        if (role === 'patient') {
          navigate('/Patient');
        } else if (role === 'medicalStaff') {
          navigate('/Organization');
        } else if (role === 'admin') {
          navigate('/admin-dashboard'); // Or your admin route
        } else {
          navigate('/'); // Fallback route
        }
      }, 500);

    } catch (err) {
      console.error("Login Error:", err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message); // Display server-provided error message
      } else {
        setError('Invalid email or password. Please try again.');
      }
    }
  };

  return (
    <>
      <div className="d-flex vh-100">
        <div className="w-50 d-flex flex-column justify-content-center align-items-center bg-light">
          <h2>Performance Metrics</h2>
          <div className="graph-placeholder" style={{ width: '80%', height: '400px' }}>
            <Bar data={barData} options={barOptions} />
          </div>
        </div>

        {/* Right Half: Login Form */}
        <div className="w-50 d-flex justify-content-center align-items-center">
          <div className="card shadow-lg p-4 rounded" style={{ maxWidth: '400px', width: '100%' }}>
            <h2 className="text-center mb-4">Login</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button type="submit" className="btn-login_click">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
      {showToast && (
        <div className="toast show position-fixed bottom-0 end-0 p-3" role="alert" aria-live="assertive" aria-atomic="true">
          <div className="toast-header">
            <strong className="me-auto">Welcome {localStorage.getItem('name')}!</strong>
            {/* <small></small> // Removed empty small tag */}
            <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close" onClick={() => setShowToast(false)}></button>
          </div>
          <div className="toast-body">
            Login Successful..........
          </div>
        </div>
      )}
    </>
  );
};

export default Login;