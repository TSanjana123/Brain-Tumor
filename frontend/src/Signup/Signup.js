import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto'; // Required for Chart.js to work properly
import './Signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    patientId: '',
    organizationName: '',
  });
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Sample data for the pie chart
  const pieData = {
    labels: ['Astrocitoma T1', 'Astrocitoma T1C+', 'Astrocitoma T2', 'Carcinoma T1', 'Carcinoma T1C+', 'Carcinoma T2', 'Ependimoma T1', 'Ependimoma T1C+', 'Ependimoma T2', 'Ganglioglioma T1', 'Ganglioglioma T1C+', 'Ganglioglioma T2', 'Germinoma T1', 'Germinoma T1C+', 'Germinoma T2', 'Glioblastoma T1', 'Glioblastoma T1C+', 'Glioblastoma T2', 'Granuloma T1', 'Granuloma T1C+', 'Granuloma T2', 'Meduloblastoma T1', 'Meduloblastoma T1C+', 'Meduloblastoma T2', 'Meningioma T1', 'Meningioma T1C+', 'Meningioma T2', 'Neurocitoma T1', 'Neurocitoma T1C+', 'Neurocitoma T2', 'Oligodendroglioma T1', 'Oligodendroglioma T1C+', 'Oligodendroglioma T2', 'Papiloma T1', 'Papiloma T1C+', 'Papiloma T2', 'Schwannoma T1', 'Schwannoma T1C+', 'Schwannoma T2', 'Tuberculoma T1', 'Tuberculoma T1C+', 'Tuberculoma T2', '_NORMAL T1', '_NORMAL T2'],
    datasets: [
      {
        data: [30, 20, 25, 25, 30, 20, 25, 25, 30, 20, 25, 25, 30, 20, 25, 25, 30, 20, 25, 25, 30, 20, 25, 25, 30, 20, 25, 25, 30, 20, 25, 25, 30, 20, 25, 25], // Values for the pie chart
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      },
    ],
  };

  const pieOptions = {
    plugins: {
      legend: {
        labels: {
          color: '#FFF', 
        },
        align:'center',
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

  const handleRoleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      role: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setError('');
    try {
      const response = await axios.post('http://localhost:5001/api/signup', formData);

      if (response && response.data) {
        setSuccessMessage(response.data.message);
        navigate('/Login');
      } else {
        setError('Unknown error occurred');
      }
    } catch (err) {
      console.error(err);
      if (err.response) {
        setError(err.response.data.message || 'An error occurred');
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  return (
    <div className="d-flex vh-100">
      {/* Left Half: Content Section with Pie Chart */}
      <div className="container w-50 d-flex flex-column justify-content-center align-items-center bg-dark text-white p-4 shadow rounded">
        <h2>Data Distribution</h2>
        <div className="graph-placeholder" style={{ width: '80%', height: '400px' }}>
          <Pie data={pieData} options={pieOptions} />
        </div>
      </div>

      {/* Right Half: Signup Form */}
      <div className="w-50 d-flex justify-content-center align-items-center bg-white">
        <div className="card shadow-lg p-4 rounded" style={{ maxWidth: '500px', width: '100%' }}>
          <h2 className="text-center mb-4">Sign Up</h2>

          {error && <div className="alert alert-danger">{error}</div>}
          {successMessage && <div className="alert alert-success">{successMessage}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

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

            <div className="mb-3">
              <input
                type="password"
                name="confirmPassword"
                className="form-control"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="mb-3">
              <select
                name="role"
                className="form-select"
                onChange={handleRoleChange}
                value={formData.role}
                required
              >
                <option value="">Select Role</option>
                <option value="patient">Patient</option>
                <option value="medicalStaff">Organization</option>
              </select>
            </div>

            {formData.role === 'patient' && (
              <div className="mb-3">
                <input
                  type="text"
                  name="patientId"
                  className="form-control"
                  placeholder="Patient ID"
                  value={formData.patientId}
                  onChange={handleInputChange}
                  required
                />
              </div>
            )}

            {formData.role === 'medicalStaff' && (
              <div className="mb-3">
                <input
                  type="text"
                  name="organizationName"
                  className="form-control"
                  placeholder="Organization Name"
                  value={formData.organizationName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            )}

            {/* <button type="submit" className="btn btn-danger w-100"> */}
            <button type="submit" className="btn-sign_click">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;