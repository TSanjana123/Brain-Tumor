
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './Organization.css';

// const Organization = () => {
//   const organizationName = localStorage.getItem('organizationName');
//   const navigate = useNavigate();

//   const [patients, setPatients] = useState([]);
//   const [selectedPatientId, setSelectedPatientId] = useState('');
//   const [file, setFile] = useState(null);
//   const [isFormVisible, setIsFormVisible] = useState(false);

//   useEffect(() => {
//     const fetchPatients = async () => {
//       try {
//         // const response = await axios.get('http://localhost:5001/api/patients'); // Use full URL if needed
//         const response = await axios.get(`${process.env.REACT_APP_ORGANIZATION_RESPONSE_URL}/api/patients`); // Use full URL if needed
//         console.log('Fetched Patients:', response.data); // Debugging log
//         setPatients(response.data);
//       } catch (error) {
//         console.error('Error fetching patients:', error);
//       }
//     };
  
//     fetchPatients();
//   }, []);
  

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate('/Login');
//   };
  
//   const handleUpload = async (e) => {
//     e.preventDefault();
  
//     if (!selectedPatientId || !file) {
//       alert('Please select a patient ID and an image.');
//       return;
//     }
  
//     const formData = new FormData();
//     formData.append('patientId', selectedPatientId);
//     formData.append('organizationName', organizationName); // Include organization name
//     formData.append('image', file);
  
//     try {
//       const response = await axios.post(`${process.env.REACT_APP_ORGANIZATION_RESPONSE_UPLOAD_URL}/api/upload`, formData, {
//       // const response = await axios.post('http://localhost:5001/api/upload', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });
//       alert(response.data.message);
//       setFile(null);
//       setSelectedPatientId('');
//     } catch (error) {
//       console.error('Error uploading file:', error);
//       alert('Failed to upload image.');
//     }
//   };
  

//   return (
//     <div className="main-content">
//       <div className="side-navbar">
//         <div className="navbar-top">
//           <h4>Organization: {organizationName}</h4>
//           <button onClick={() => setIsFormVisible(!isFormVisible)} className="upload-btn">
//             Upload Patient Details
//           </button>
//           <button onClick={handleLogout} className="logout-btn">Logout</button>
//         </div>
//       </div>
//       <div className="content">
//         {isFormVisible && (
//           <form onSubmit={handleUpload} className="upload-form">
//             <div>
//               <label htmlFor="patientId">Patient ID</label>
//               <select
//                 id="patientId"
//                 value={selectedPatientId}
//                 onChange={(e) => setSelectedPatientId(e.target.value)}
//               >
//                 <option value="">Select a patient</option>
//                 {patients.map((patient, index) => (
//                   <option key={index} value={patient.patientId}>
//                     {patient.patientId}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <label htmlFor="file">Upload Image</label>
//               <input
//                 type="file"
//                 id="file"
//                 accept="image/*"
//                 onChange={(e) => setFile(e.target.files[0])}
//               />
//             </div>
//             <button type="submit">Upload</button>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Organization;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Organization.css";

const Organization = () => {
  const organizationName = localStorage.getItem("organizationName");
  const navigate = useNavigate();

  const [patients, setPatients] = useState([]);
  const [patientIds, setPatientIds] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_ORGANIZATION_RESPONSE_URL}/api/patients`);
        setPatients(response.data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    // const fetchPatientIds = async () => {
    //   // try {
    //   //   const response = await axios.get(`${process.env.REACT_APP_fetchPatientIds_RESPONSE_URL}/api/patient-ids`);
    //   //   setPatientIds(response.data);
    //   // } catch (err) {
    //   //   console.error(err);
    //   //   setError("Failed to fetch patient IDs");
    //   // }
    // };

    fetchPatients();
    // fetchPatientIds();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/Login");
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedPatientId || !file) {
      setError("Please select a patient ID and upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("patientId", selectedPatientId);
    formData.append("organizationName", organizationName);
    formData.append("image", file);

    try {
      const response = await axios.post(`${process.env.REACT_APP_ORGANIZATION_RESPONSE_UPLOAD_URL}/api/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setSuccessMessage(response.data.message);
      setError("");
      setFile(null);
      setSelectedPatientId("");
    } catch (error) {
      console.error("Error uploading file:", error);
      setError("Failed to upload image.");
    }
  };

  return (
    <div className="organization-page">
      {/* Sidebar */}
      <div className="sidebar">
        <h4>Organization: {organizationName}</h4>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="upload-section">
          <h2>Upload Patient Details</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          {successMessage && <div className="alert alert-success">{successMessage}</div>}
          <form onSubmit={handleUpload} className="upload-form">
            <div>
              <label htmlFor="patientId">Select Patient ID</label>
              <select
                id="patientId"
                value={selectedPatientId}
                onChange={(e) => setSelectedPatientId(e.target.value)}
              >
                <option value="">Select a patient</option>
                {patients.map((patient) => (
                  <option key={patient.patientId} value={patient.patientId}>
                    {patient.patientId}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="file">Upload Image</label>
              <input
                type="file"
                id="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <button type="submit">Upload</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Organization;
