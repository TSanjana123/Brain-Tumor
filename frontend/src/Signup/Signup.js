import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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

      // Check if the response has data
      if (response && response.data) {
        setSuccessMessage(response.data.message); // Display success message from response
        navigate('/Login');
      } else {
        setError('Unknown error occurred');
      }
    } catch (err) {
      console.error(err); // Log the error to the console
      // Check if there's a response from the server
      if (err.response) {
        setError(err.response.data.message || 'An error occurred');
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
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

          <button type="submit" className="btn btn-primary w-100 mt-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z" />
              <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
