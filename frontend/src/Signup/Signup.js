import React, { useState } from 'react';
import axios from 'axios';

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
              <option value="medicalStaff">Medical Staff</option>
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
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
