import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UploadDetails = () => {
  const [patientIds, setPatientIds] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch patient IDs on component mount
  useEffect(() => {
    const fetchPatientIds = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/patient-ids');
        setPatientIds(response.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch patient IDs');
      }
    };

    fetchPatientIds();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPatientId || !image) {
      setError('Please select a patient ID and upload an image');
      return;
    }

    const formData = new FormData();
    formData.append('patientId', selectedPatientId);
    formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:5001/api/upload-details', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setSuccessMessage(response.data.message);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Failed to upload details');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Upload Patient Details</h2>

      {error && <div className="alert alert-danger">{error}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="patientId" className="form-label">Select Patient ID</label>
          <select
            id="patientId"
            className="form-select"
            value={selectedPatientId}
            onChange={(e) => setSelectedPatientId(e.target.value)}
          >
            <option value="">Select a patient</option>
            {patientIds.map((patient) => (
              <option key={patient.patientId} value={patient.patientId}>
                {patient.patientId}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="image" className="form-label">Upload Image</label>
          <input
            type="file"
            id="image"
            className="form-control"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <button type="submit" className="btn btn-primary">Upload</button>
      </form>
    </div>
  );
};

export default UploadDetails;
