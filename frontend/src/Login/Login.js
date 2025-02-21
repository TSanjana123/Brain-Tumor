import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto'; // Required for Chart.js to work properly
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Sample data for the bar graph
  const barData = {
    labels: ['2018', '2019', '2020', '2021', '2022', '2023', '2024'], // Years
    datasets: [
      {
        label: 'Accuracy (%)',
        data: [85, 87, 84, 88, 86, 89, 87], // Accuracy values 
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
    try {
      const response = await axios.post('http://localhost:5001/api/login', formData);
      const { name, email, role, token, patientId, organizationName } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      localStorage.setItem('name', name);
      localStorage.setItem('email', email);

      if (role === 'patient') {
        localStorage.setItem('patientId', patientId);
        navigate('/Patient');
      } else if (role === 'medicalStaff') {
        localStorage.setItem('organizationName', organizationName);
        navigate('/Organization');
      }
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="d-flex vh-100">
      <div className="w-50 d-flex flex-column justify-content-center align-items-center bg-light">
      {/* <div className="container w-50 d-flex flex-column justify-content-center align-items-center bg-success text-white p-4 shadow rounded"> */}

      {/* <div className="w-50 d-flex flex-column justify-content-center align-items-center"> */}
        <h2>Performance Metrics</h2>
        <div className="graph-placeholder" style={{ width: '80%', height: '400px' }}>
          <Bar data={barData} options={barOptions} />
        </div>
      </div>

      {/* Right Half: Login Form */}
      {/* <div className="w-50 d-flex justify-content-center align-items-center bg-white"> */}
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
            {/* <button type="submit" className="btn btn-success w-100"> */}
            <button type="submit" className="btn-login_click">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;