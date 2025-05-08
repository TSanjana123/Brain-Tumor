
// // // // // // // // // // // // // // // // // import React, { useState, useEffect } from 'react';
// // // // // // // // // // // // // // // // // import axios from 'axios';
// // // // // // // // // // // // // // // // // import { useNavigate } from 'react-router-dom';
// // // // // // // // // // // // // // // // // import './Organization.css';

// // // // // // // // // // // // // // // // // const Organization = () => {
// // // // // // // // // // // // // // // // //   const organizationName = localStorage.getItem('organizationName');
// // // // // // // // // // // // // // // // //   const navigate = useNavigate();

// // // // // // // // // // // // // // // // //   const [patients, setPatients] = useState([]);
// // // // // // // // // // // // // // // // //   const [selectedPatientId, setSelectedPatientId] = useState('');
// // // // // // // // // // // // // // // // //   const [file, setFile] = useState(null);
// // // // // // // // // // // // // // // // //   const [isFormVisible, setIsFormVisible] = useState(false);

// // // // // // // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // // // // // // //     const fetchPatients = async () => {
// // // // // // // // // // // // // // // // //       try {
// // // // // // // // // // // // // // // // //         // const response = await axios.get('http://localhost:5001/api/patients'); // Use full URL if needed
// // // // // // // // // // // // // // // // //         const response = await axios.get(`${process.env.REACT_APP_ORGANIZATION_RESPONSE_URL}/api/patients`); // Use full URL if needed
// // // // // // // // // // // // // // // // //         console.log('Fetched Patients:', response.data); // Debugging log
// // // // // // // // // // // // // // // // //         setPatients(response.data);
// // // // // // // // // // // // // // // // //       } catch (error) {
// // // // // // // // // // // // // // // // //         console.error('Error fetching patients:', error);
// // // // // // // // // // // // // // // // //       }
// // // // // // // // // // // // // // // // //     };

// // // // // // // // // // // // // // // // //     fetchPatients();
// // // // // // // // // // // // // // // // //   }, []);


// // // // // // // // // // // // // // // // //   const handleLogout = () => {
// // // // // // // // // // // // // // // // //     localStorage.clear();
// // // // // // // // // // // // // // // // //     navigate('/Login');
// // // // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // // // //   const handleUpload = async (e) => {
// // // // // // // // // // // // // // // // //     e.preventDefault();

// // // // // // // // // // // // // // // // //     if (!selectedPatientId || !file) {
// // // // // // // // // // // // // // // // //       alert('Please select a patient ID and an image.');
// // // // // // // // // // // // // // // // //       return;
// // // // // // // // // // // // // // // // //     }

// // // // // // // // // // // // // // // // //     const formData = new FormData();
// // // // // // // // // // // // // // // // //     formData.append('patientId', selectedPatientId);
// // // // // // // // // // // // // // // // //     formData.append('organizationName', organizationName); // Include organization name
// // // // // // // // // // // // // // // // //     formData.append('image', file);

// // // // // // // // // // // // // // // // //     try {
// // // // // // // // // // // // // // // // //       const response = await axios.post(`${process.env.REACT_APP_ORGANIZATION_RESPONSE_UPLOAD_URL}/api/upload`, formData, {
// // // // // // // // // // // // // // // // //       // const response = await axios.post('http://localhost:5001/api/upload', formData, {
// // // // // // // // // // // // // // // // //         headers: { 'Content-Type': 'multipart/form-data' },
// // // // // // // // // // // // // // // // //       });
// // // // // // // // // // // // // // // // //       alert(response.data.message);
// // // // // // // // // // // // // // // // //       setFile(null);
// // // // // // // // // // // // // // // // //       setSelectedPatientId('');
// // // // // // // // // // // // // // // // //     } catch (error) {
// // // // // // // // // // // // // // // // //       console.error('Error uploading file:', error);
// // // // // // // // // // // // // // // // //       alert('Failed to upload image.');
// // // // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // // // //   };


// // // // // // // // // // // // // // // // //   return (
// // // // // // // // // // // // // // // // //     <div className="main-content">
// // // // // // // // // // // // // // // // //       <div className="side-navbar">
// // // // // // // // // // // // // // // // //         <div className="navbar-top">
// // // // // // // // // // // // // // // // //           <h4>Organization: {organizationName}</h4>
// // // // // // // // // // // // // // // // //           <button onClick={() => setIsFormVisible(!isFormVisible)} className="upload-btn">
// // // // // // // // // // // // // // // // //             Upload Patient Details
// // // // // // // // // // // // // // // // //           </button>
// // // // // // // // // // // // // // // // //           <button onClick={handleLogout} className="logout-btn">Logout</button>
// // // // // // // // // // // // // // // // //         </div>
// // // // // // // // // // // // // // // // //       </div>
// // // // // // // // // // // // // // // // //       <div className="content">
// // // // // // // // // // // // // // // // //         {isFormVisible && (
// // // // // // // // // // // // // // // // //           <form onSubmit={handleUpload} className="upload-form">
// // // // // // // // // // // // // // // // //             <div>
// // // // // // // // // // // // // // // // //               <label htmlFor="patientId">Patient ID</label>
// // // // // // // // // // // // // // // // //               <select
// // // // // // // // // // // // // // // // //                 id="patientId"
// // // // // // // // // // // // // // // // //                 value={selectedPatientId}
// // // // // // // // // // // // // // // // //                 onChange={(e) => setSelectedPatientId(e.target.value)}
// // // // // // // // // // // // // // // // //               >
// // // // // // // // // // // // // // // // //                 <option value="">Select a patient</option>
// // // // // // // // // // // // // // // // //                 {patients.map((patient, index) => (
// // // // // // // // // // // // // // // // //                   <option key={index} value={patient.patientId}>
// // // // // // // // // // // // // // // // //                     {patient.patientId}
// // // // // // // // // // // // // // // // //                   </option>
// // // // // // // // // // // // // // // // //                 ))}
// // // // // // // // // // // // // // // // //               </select>
// // // // // // // // // // // // // // // // //             </div>
// // // // // // // // // // // // // // // // //             <div>
// // // // // // // // // // // // // // // // //               <label htmlFor="file">Upload Image</label>
// // // // // // // // // // // // // // // // //               <input
// // // // // // // // // // // // // // // // //                 type="file"
// // // // // // // // // // // // // // // // //                 id="file"
// // // // // // // // // // // // // // // // //                 accept="image/*"
// // // // // // // // // // // // // // // // //                 onChange={(e) => setFile(e.target.files[0])}
// // // // // // // // // // // // // // // // //               />
// // // // // // // // // // // // // // // // //             </div>
// // // // // // // // // // // // // // // // //             <button type="submit">Upload</button>
// // // // // // // // // // // // // // // // //           </form>
// // // // // // // // // // // // // // // // //         )}
// // // // // // // // // // // // // // // // //       </div>
// // // // // // // // // // // // // // // // //     </div>
// // // // // // // // // // // // // // // // //   );
// // // // // // // // // // // // // // // // // };

// // // // // // // // // // // // // // // // // export default Organization;


// // // // // // // // // // // // // // // // import React, { useState, useEffect } from "react";
// // // // // // // // // // // // // // // // import axios from "axios";
// // // // // // // // // // // // // // // // import { useNavigate } from "react-router-dom";
// // // // // // // // // // // // // // // // import "./Organization.css";

// // // // // // // // // // // // // // // // const Organization = () => {
// // // // // // // // // // // // // // // //   const organizationName = localStorage.getItem("organizationName");
// // // // // // // // // // // // // // // //   const navigate = useNavigate();

// // // // // // // // // // // // // // // //   const [patients, setPatients] = useState([]);
// // // // // // // // // // // // // // // //   const [patientIds, setPatientIds] = useState([]);
// // // // // // // // // // // // // // // //   const [selectedPatientId, setSelectedPatientId] = useState("");
// // // // // // // // // // // // // // // //   const [file, setFile] = useState(null);
// // // // // // // // // // // // // // // //   const [error, setError] = useState("");
// // // // // // // // // // // // // // // //   const [successMessage, setSuccessMessage] = useState("");

// // // // // // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // // // // // //     const fetchPatients = async () => {
// // // // // // // // // // // // // // // //       try {
// // // // // // // // // // // // // // // //         const response = await axios.get(`${process.env.REACT_APP_ORGANIZATION_RESPONSE_URL}/api/patients`);
// // // // // // // // // // // // // // // //         setPatients(response.data);
// // // // // // // // // // // // // // // //       } catch (error) {
// // // // // // // // // // // // // // // //         console.error("Error fetching patients:", error);
// // // // // // // // // // // // // // // //       }
// // // // // // // // // // // // // // // //     };

// // // // // // // // // // // // // // // //     // const fetchPatientIds = async () => {
// // // // // // // // // // // // // // // //     //   // try {
// // // // // // // // // // // // // // // //     //   //   const response = await axios.get(`${process.env.REACT_APP_fetchPatientIds_RESPONSE_URL}/api/patient-ids`);
// // // // // // // // // // // // // // // //     //   //   setPatientIds(response.data);
// // // // // // // // // // // // // // // //     //   // } catch (err) {
// // // // // // // // // // // // // // // //     //   //   console.error(err);
// // // // // // // // // // // // // // // //     //   //   setError("Failed to fetch patient IDs");
// // // // // // // // // // // // // // // //     //   // }
// // // // // // // // // // // // // // // //     // };

// // // // // // // // // // // // // // // //     fetchPatients();
// // // // // // // // // // // // // // // //     // fetchPatientIds();
// // // // // // // // // // // // // // // //   }, []);

// // // // // // // // // // // // // // // //   const handleLogout = () => {
// // // // // // // // // // // // // // // //     localStorage.clear();
// // // // // // // // // // // // // // // //     navigate("/Login");
// // // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // // //   const handleUpload = async (e) => {
// // // // // // // // // // // // // // // //     e.preventDefault();
// // // // // // // // // // // // // // // //     if (!selectedPatientId || !file) {
// // // // // // // // // // // // // // // //       setError("Please select a patient ID and upload an image.");
// // // // // // // // // // // // // // // //       return;
// // // // // // // // // // // // // // // //     }

// // // // // // // // // // // // // // // //     const formData = new FormData();
// // // // // // // // // // // // // // // //     formData.append("patientId", selectedPatientId);
// // // // // // // // // // // // // // // //     formData.append("organizationName", organizationName);
// // // // // // // // // // // // // // // //     formData.append("image", file);

// // // // // // // // // // // // // // // //     try {
// // // // // // // // // // // // // // // //       const response = await axios.post(`${process.env.REACT_APP_ORGANIZATION_RESPONSE_UPLOAD_URL}/api/upload`, formData, {
// // // // // // // // // // // // // // // //         headers: {
// // // // // // // // // // // // // // // //           "Content-Type": "multipart/form-data",
// // // // // // // // // // // // // // // //         },
// // // // // // // // // // // // // // // //       });
// // // // // // // // // // // // // // // //       setSuccessMessage(response.data.message);
// // // // // // // // // // // // // // // //       setError("");
// // // // // // // // // // // // // // // //       setFile(null);
// // // // // // // // // // // // // // // //       setSelectedPatientId("");
// // // // // // // // // // // // // // // //     } catch (error) {
// // // // // // // // // // // // // // // //       console.error("Error uploading file:", error);
// // // // // // // // // // // // // // // //       setError("Failed to upload image.");
// // // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // // //   return (
// // // // // // // // // // // // // // // //     <div className="organization-page">
// // // // // // // // // // // // // // // //       {/* Sidebar */}
// // // // // // // // // // // // // // // //       <div className="sidebar">
// // // // // // // // // // // // // // // //         <h4>Organization: {organizationName}</h4>
// // // // // // // // // // // // // // // //         <button onClick={handleLogout} className="logout-btn">
// // // // // // // // // // // // // // // //           Logout
// // // // // // // // // // // // // // // //         </button>
// // // // // // // // // // // // // // // //       </div>

// // // // // // // // // // // // // // // //       {/* Main Content */}
// // // // // // // // // // // // // // // //       <div className="main-content">
// // // // // // // // // // // // // // // //         <div className="upload-section">
// // // // // // // // // // // // // // // //           <h2>Upload Patient Details</h2>
// // // // // // // // // // // // // // // //           {error && <div className="alert alert-danger">{error}</div>}
// // // // // // // // // // // // // // // //           {successMessage && <div className="alert alert-success">{successMessage}</div>}
// // // // // // // // // // // // // // // //           <form onSubmit={handleUpload} className="upload-form">
// // // // // // // // // // // // // // // //             <div>
// // // // // // // // // // // // // // // //               <label htmlFor="patientId">Select Patient ID</label>
// // // // // // // // // // // // // // // //               <select
// // // // // // // // // // // // // // // //                 id="patientId"
// // // // // // // // // // // // // // // //                 value={selectedPatientId}
// // // // // // // // // // // // // // // //                 onChange={(e) => setSelectedPatientId(e.target.value)}
// // // // // // // // // // // // // // // //               >
// // // // // // // // // // // // // // // //                 <option value="">Select a patient</option>
// // // // // // // // // // // // // // // //                 {patients.map((patient) => (
// // // // // // // // // // // // // // // //                   <option key={patient.patientId} value={patient.patientId}>
// // // // // // // // // // // // // // // //                     {patient.patientId}
// // // // // // // // // // // // // // // //                   </option>
// // // // // // // // // // // // // // // //                 ))}
// // // // // // // // // // // // // // // //               </select>
// // // // // // // // // // // // // // // //             </div>
// // // // // // // // // // // // // // // //             <div>
// // // // // // // // // // // // // // // //               <label htmlFor="file">Upload Image</label>
// // // // // // // // // // // // // // // //               <input
// // // // // // // // // // // // // // // //                 type="file"
// // // // // // // // // // // // // // // //                 id="file"
// // // // // // // // // // // // // // // //                 accept="image/*"
// // // // // // // // // // // // // // // //                 onChange={(e) => setFile(e.target.files[0])}
// // // // // // // // // // // // // // // //               />
// // // // // // // // // // // // // // // //             </div>
// // // // // // // // // // // // // // // //             <button type="submit">Upload</button>
// // // // // // // // // // // // // // // //           </form>
// // // // // // // // // // // // // // // //         </div>
// // // // // // // // // // // // // // // //       </div>
// // // // // // // // // // // // // // // //     </div>
// // // // // // // // // // // // // // // //   );
// // // // // // // // // // // // // // // // };

// // // // // // // // // // // // // // // // export default Organization;



// // // // // // // // // // // // // // // import React, { useState, useEffect } from "react";
// // // // // // // // // // // // // // // import axios from "axios";
// // // // // // // // // // // // // // // import { useNavigate } from "react-router-dom";
// // // // // // // // // // // // // // // import "./Organization.css";

// // // // // // // // // // // // // // // const Organization = () => {
// // // // // // // // // // // // // // //   const organizationName = localStorage.getItem("organizationName");
// // // // // // // // // // // // // // //   const navigate = useNavigate();

// // // // // // // // // // // // // // //   const [patients, setPatients] = useState([]);
// // // // // // // // // // // // // // //   const [patientIds, setPatientIds] = useState([]);
// // // // // // // // // // // // // // //   const [selectedPatientId, setSelectedPatientId] = useState("");
// // // // // // // // // // // // // // //   const [file, setFile] = useState(null);
// // // // // // // // // // // // // // //   const [error, setError] = useState("");
// // // // // // // // // // // // // // //   const [successMessage, setSuccessMessage] = useState("");
// // // // // // // // // // // // // // //   const [newPatient, setNewPatient] = useState({
// // // // // // // // // // // // // // //     name: "",
// // // // // // // // // // // // // // //     email: "",
// // // // // // // // // // // // // // //     password: "",
// // // // // // // // // // // // // // //     confirmPassword: "",
// // // // // // // // // // // // // // //     role: "patient",
// // // // // // // // // // // // // // //     patientId: "",
// // // // // // // // // // // // // // //     age: "",
// // // // // // // // // // // // // // //     gender: "",
// // // // // // // // // // // // // // //     dateOfBirth: "",
// // // // // // // // // // // // // // //     referredDoctor: "",
// // // // // // // // // // // // // // //   });
// // // // // // // // // // // // // // //   const [view, setView] = useState("existing"); // 'existing' or 'new'

// // // // // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // // // // //     const fetchPatients = async () => {
// // // // // // // // // // // // // // //       try {
// // // // // // // // // // // // // // //         const response = await axios.get(`${process.env.REACT_APP_ORGANIZATION_RESPONSE_URL}/api/patients`);
// // // // // // // // // // // // // // //         setPatients(response.data);
// // // // // // // // // // // // // // //       } catch (error) {
// // // // // // // // // // // // // // //         console.error("Error fetching patients:", error);
// // // // // // // // // // // // // // //       }
// // // // // // // // // // // // // // //     };

// // // // // // // // // // // // // // //     fetchPatients();
// // // // // // // // // // // // // // //   }, []);

// // // // // // // // // // // // // // //   const handleLogout = () => {
// // // // // // // // // // // // // // //     localStorage.clear();
// // // // // // // // // // // // // // //     navigate("/Login");
// // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // //   const handleUpload = async (e) => {
// // // // // // // // // // // // // // //     e.preventDefault();
// // // // // // // // // // // // // // //     if (!selectedPatientId || !file) {
// // // // // // // // // // // // // // //       setError("Please select a patient ID and upload an image.");
// // // // // // // // // // // // // // //       return;
// // // // // // // // // // // // // // //     }

// // // // // // // // // // // // // // //     const formData = new FormData();
// // // // // // // // // // // // // // //     formData.append("patientId", selectedPatientId);
// // // // // // // // // // // // // // //     formData.append("organizationName", organizationName);
// // // // // // // // // // // // // // //     formData.append("image", file);

// // // // // // // // // // // // // // //     try {
// // // // // // // // // // // // // // //       const response = await axios.post(`${process.env.REACT_APP_ORGANIZATION_RESPONSE_UPLOAD_URL}/api/uploadExistingPatientImage`, formData, {
// // // // // // // // // // // // // // //         headers: {
// // // // // // // // // // // // // // //           "Content-Type": "multipart/form-data",
// // // // // // // // // // // // // // //         },
// // // // // // // // // // // // // // //       });
// // // // // // // // // // // // // // //       setSuccessMessage(response.data.message);
// // // // // // // // // // // // // // //       setError("");
// // // // // // // // // // // // // // //       setFile(null);
// // // // // // // // // // // // // // //       setSelectedPatientId("");
// // // // // // // // // // // // // // //     } catch (error) {
// // // // // // // // // // // // // // //       console.error("Error uploading file:", error);
// // // // // // // // // // // // // // //       setError("Failed to upload image.");
// // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // //   const handleAddPatient = async (e) => {
// // // // // // // // // // // // // // //     e.preventDefault();
// // // // // // // // // // // // // // //     const { name, email, password, confirmPassword, role, patientId, age, gender, dateOfBirth, referredDoctor } = newPatient;

// // // // // // // // // // // // // // //     if (password !== confirmPassword) {
// // // // // // // // // // // // // // //       setError("Passwords do not match.");
// // // // // // // // // // // // // // //       return;
// // // // // // // // // // // // // // //     }

// // // // // // // // // // // // // // //     try {
// // // // // // // // // // // // // // //       const response = await axios.post(`${process.env.REACT_APP_ORGANIZATION_RESPONSE_URL}/api/addPatient`, {
// // // // // // // // // // // // // // //         name, email, password, confirmPassword, role, patientId, age, gender, dateOfBirth, referredDoctor
// // // // // // // // // // // // // // //       });
// // // // // // // // // // // // // // //       setSuccessMessage(response.data.message);
// // // // // // // // // // // // // // //       setError("");
// // // // // // // // // // // // // // //       setNewPatient({
// // // // // // // // // // // // // // //         name: "",
// // // // // // // // // // // // // // //         email: "",
// // // // // // // // // // // // // // //         password: "",
// // // // // // // // // // // // // // //         confirmPassword: "",
// // // // // // // // // // // // // // //         role: "patient",
// // // // // // // // // // // // // // //         patientId: "",
// // // // // // // // // // // // // // //         age: "",
// // // // // // // // // // // // // // //         gender: "",
// // // // // // // // // // // // // // //         dateOfBirth: "",
// // // // // // // // // // // // // // //         referredDoctor: "",
// // // // // // // // // // // // // // //       });
// // // // // // // // // // // // // // //     } catch (error) {
// // // // // // // // // // // // // // //       console.error("Error adding patient:", error);
// // // // // // // // // // // // // // //       setError("Failed to add patient.");
// // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // //   return (
// // // // // // // // // // // // // // //     <div className="organization-page">
// // // // // // // // // // // // // // //       <div className="sidebar">
// // // // // // // // // // // // // // //         <h4>Organization: {organizationName}</h4>
// // // // // // // // // // // // // // //         <button onClick={handleLogout} className="logout-btn">
// // // // // // // // // // // // // // //           Logout
// // // // // // // // // // // // // // //         </button>
// // // // // // // // // // // // // // //       </div>

// // // // // // // // // // // // // // //       <div className="main-content">
// // // // // // // // // // // // // // //         <div className="buttons-section">
// // // // // // // // // // // // // // //           <button onClick={() => setView("existing")}>Existing Patients</button>
// // // // // // // // // // // // // // //           <button onClick={() => setView("new")}>Add New Patient</button>
// // // // // // // // // // // // // // //         </div>

// // // // // // // // // // // // // // //         {view === "existing" && (
// // // // // // // // // // // // // // //           <div className="upload-section">
// // // // // // // // // // // // // // //             <h2>Upload Image for Existing Patient</h2>
// // // // // // // // // // // // // // //             {error && <div className="alert alert-danger">{error}</div>}
// // // // // // // // // // // // // // //             {successMessage && <div className="alert alert-success">{successMessage}</div>}
// // // // // // // // // // // // // // //             <form onSubmit={handleUpload}>
// // // // // // // // // // // // // // //               <div>
// // // // // // // // // // // // // // //                 <label htmlFor="patientId">Select Patient ID</label>
// // // // // // // // // // // // // // //                 <select
// // // // // // // // // // // // // // //                   id="patientId"
// // // // // // // // // // // // // // //                   value={selectedPatientId}
// // // // // // // // // // // // // // //                   onChange={(e) => setSelectedPatientId(e.target.value)}
// // // // // // // // // // // // // // //                 >
// // // // // // // // // // // // // // //                   <option value="">Select a patient</option>
// // // // // // // // // // // // // // //                   {patients.map((patient) => (
// // // // // // // // // // // // // // //                     <option key={patient.patientId} value={patient.patientId}>
// // // // // // // // // // // // // // //                       {patient.patientId}
// // // // // // // // // // // // // // //                     </option>
// // // // // // // // // // // // // // //                   ))}
// // // // // // // // // // // // // // //                 </select>
// // // // // // // // // // // // // // //               </div>
// // // // // // // // // // // // // // //               <div>
// // // // // // // // // // // // // // //                 <label htmlFor="file">Upload Image</label>
// // // // // // // // // // // // // // //                 <input
// // // // // // // // // // // // // // //                   type="file"
// // // // // // // // // // // // // // //                   id="file"
// // // // // // // // // // // // // // //                   accept="image/*"
// // // // // // // // // // // // // // //                   onChange={(e) => setFile(e.target.files[0])}
// // // // // // // // // // // // // // //                 />
// // // // // // // // // // // // // // //               </div>
// // // // // // // // // // // // // // //               <button type="submit">Upload</button>
// // // // // // // // // // // // // // //             </form>
// // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // //         )}

// // // // // // // // // // // // // // //         {view === "new" && (
// // // // // // // // // // // // // // //           <div className="new-patient-section">
// // // // // // // // // // // // // // //             <h2>Add New Patient</h2>
// // // // // // // // // // // // // // //             {error && <div className="alert alert-danger">{error}</div>}
// // // // // // // // // // // // // // //             {successMessage && <div className="alert alert-success">{successMessage}</div>}
// // // // // // // // // // // // // // //             <form onSubmit={handleAddPatient}>
// // // // // // // // // // // // // // //               <div>
// // // // // // // // // // // // // // //                 <label>Name</label>
// // // // // // // // // // // // // // //                 <input
// // // // // // // // // // // // // // //                   type="text"
// // // // // // // // // // // // // // //                   value={newPatient.name}
// // // // // // // // // // // // // // //                   onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
// // // // // // // // // // // // // // //                 />
// // // // // // // // // // // // // // //               </div>
// // // // // // // // // // // // // // //               <div>
// // // // // // // // // // // // // // //                 <label>Email</label>
// // // // // // // // // // // // // // //                 <input
// // // // // // // // // // // // // // //                   type="email"
// // // // // // // // // // // // // // //                   value={newPatient.email}
// // // // // // // // // // // // // // //                   onChange={(e) => setNewPatient({ ...newPatient, email: e.target.value })}
// // // // // // // // // // // // // // //                 />
// // // // // // // // // // // // // // //               </div>
// // // // // // // // // // // // // // //               <div>
// // // // // // // // // // // // // // //                 <label>Password</label>
// // // // // // // // // // // // // // //                 <input
// // // // // // // // // // // // // // //                   type="password"
// // // // // // // // // // // // // // //                   value={newPatient.password}
// // // // // // // // // // // // // // //                   onChange={(e) => setNewPatient({ ...newPatient, password: e.target.value })}
// // // // // // // // // // // // // // //                 />
// // // // // // // // // // // // // // //               </div>
// // // // // // // // // // // // // // //               <div>
// // // // // // // // // // // // // // //                 <label>Confirm Password</label>
// // // // // // // // // // // // // // //                 <input
// // // // // // // // // // // // // // //                   type="password"
// // // // // // // // // // // // // // //                   value={newPatient.confirmPassword}
// // // // // // // // // // // // // // //                   onChange={(e) => setNewPatient({ ...newPatient, confirmPassword: e.target.value })}
// // // // // // // // // // // // // // //                 />
// // // // // // // // // // // // // // //               </div>
// // // // // // // // // // // // // // //               <div>
// // // // // // // // // // // // // // //                 <label>Age</label>
// // // // // // // // // // // // // // //                 <input
// // // // // // // // // // // // // // //                   type="number"
// // // // // // // // // // // // // // //                   value={newPatient.age}
// // // // // // // // // // // // // // //                   onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })}
// // // // // // // // // // // // // // //                 />
// // // // // // // // // // // // // // //               </div>
// // // // // // // // // // // // // // //               <div>
// // // // // // // // // // // // // // //                 <label>Gender</label>
// // // // // // // // // // // // // // //                 <input
// // // // // // // // // // // // // // //                   type="text"
// // // // // // // // // // // // // // //                   value={newPatient.gender}
// // // // // // // // // // // // // // //                   onChange={(e) => setNewPatient({ ...newPatient, gender: e.target.value })}
// // // // // // // // // // // // // // //                 />
// // // // // // // // // // // // // // //               </div>
// // // // // // // // // // // // // // //               <div>
// // // // // // // // // // // // // // //                 <label>Date of Birth</label>
// // // // // // // // // // // // // // //                 <input
// // // // // // // // // // // // // // //                   type="date"
// // // // // // // // // // // // // // //                   value={newPatient.dateOfBirth}
// // // // // // // // // // // // // // //                   onChange={(e) => setNewPatient({ ...newPatient, dateOfBirth: e.target.value })}
// // // // // // // // // // // // // // //                 />
// // // // // // // // // // // // // // //               </div>
// // // // // // // // // // // // // // //               <div>
// // // // // // // // // // // // // // //                 <label>Referred Doctor</label>
// // // // // // // // // // // // // // //                 <input
// // // // // // // // // // // // // // //                   type="text"
// // // // // // // // // // // // // // //                   value={newPatient.referredDoctor}
// // // // // // // // // // // // // // //                   onChange={(e) => setNewPatient({ ...newPatient, referredDoctor: e.target.value })}
// // // // // // // // // // // // // // //                 />
// // // // // // // // // // // // // // //               </div>
// // // // // // // // // // // // // // //               <button type="submit">Add Patient</button>
// // // // // // // // // // // // // // //             </form>
// // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // //         )}
// // // // // // // // // // // // // // //       </div>
// // // // // // // // // // // // // // //     </div>
// // // // // // // // // // // // // // //   );
// // // // // // // // // // // // // // // };

// // // // // // // // // // // // // // // export default Organization;




// // // // // // // // // // // // // // import React, { useState, useEffect } from "react";
// // // // // // // // // // // // // // import axios from "axios";
// // // // // // // // // // // // // // import { useNavigate } from "react-router-dom";
// // // // // // // // // // // // // // import "./Organization.css";

// // // // // // // // // // // // // // const Organization = () => {
// // // // // // // // // // // // // //   const organizationName = localStorage.getItem("organizationName");
// // // // // // // // // // // // // //   const navigate = useNavigate();

// // // // // // // // // // // // // //   const [patients, setPatients] = useState([]);
// // // // // // // // // // // // // //   const [patientIds, setPatientIds] = useState([]);
// // // // // // // // // // // // // //   const [selectedPatientId, setSelectedPatientId] = useState("");
// // // // // // // // // // // // // //   const [file, setFile] = useState(null);
// // // // // // // // // // // // // //   const [newPatient, setNewPatient] = useState({
// // // // // // // // // // // // // //     name: "",
// // // // // // // // // // // // // //     email: "",
// // // // // // // // // // // // // //     patientId: "",
// // // // // // // // // // // // // //     gender: "",
// // // // // // // // // // // // // //     dateOfBirth: "",
// // // // // // // // // // // // // //     referredDoctor: "",
// // // // // // // // // // // // // //   });
// // // // // // // // // // // // // //   const [error, setError] = useState("");
// // // // // // // // // // // // // //   const [successMessage, setSuccessMessage] = useState("");
// // // // // // // // // // // // // //   const [isAddNewPatient, setIsAddNewPatient] = useState(false);

// // // // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // // // //     const fetchPatients = async () => {
// // // // // // // // // // // // // //       try {
// // // // // // // // // // // // // //         const response = await axios.get(`${process.env.REACT_APP_ORGANIZATION_RESPONSE_URL}/api/patients`);
// // // // // // // // // // // // // //         setPatients(response.data);
// // // // // // // // // // // // // //       } catch (error) {
// // // // // // // // // // // // // //         console.error("Error fetching patients:", error);
// // // // // // // // // // // // // //       }
// // // // // // // // // // // // // //     };

// // // // // // // // // // // // // //     fetchPatients();
// // // // // // // // // // // // // //   }, []);

// // // // // // // // // // // // // //   const handleLogout = () => {
// // // // // // // // // // // // // //     localStorage.clear();
// // // // // // // // // // // // // //     navigate("/Login");
// // // // // // // // // // // // // //   };

// // // // // // // // // // // // // //   const handleUpload = async (e) => {
// // // // // // // // // // // // // //     e.preventDefault();
// // // // // // // // // // // // // //     if (!selectedPatientId || !file) {
// // // // // // // // // // // // // //       setError("Please select a patient ID and upload an image.");
// // // // // // // // // // // // // //       return;
// // // // // // // // // // // // // //     }

// // // // // // // // // // // // // //     const formData = new FormData();
// // // // // // // // // // // // // //     formData.append("patientId", selectedPatientId);
// // // // // // // // // // // // // //     formData.append("organizationName", organizationName);
// // // // // // // // // // // // // //     formData.append("image", file);

// // // // // // // // // // // // // //     try {
// // // // // // // // // // // // // //       const response = await axios.post(`${process.env.REACT_APP_ORGANIZATION_RESPONSE_UPLOAD_URL}/api/upload`, formData, {
// // // // // // // // // // // // // //         headers: {
// // // // // // // // // // // // // //           "Content-Type": "multipart/form-data",
// // // // // // // // // // // // // //         },
// // // // // // // // // // // // // //       });
// // // // // // // // // // // // // //       setSuccessMessage(response.data.message);
// // // // // // // // // // // // // //       setError("");
// // // // // // // // // // // // // //       setFile(null);
// // // // // // // // // // // // // //       setSelectedPatientId("");
// // // // // // // // // // // // // //     } catch (error) {
// // // // // // // // // // // // // //       console.error("Error uploading file:", error);
// // // // // // // // // // // // // //       setError("Failed to upload image.");
// // // // // // // // // // // // // //     }
// // // // // // // // // // // // // //   };

// // // // // // // // // // // // // //   const handleAddNewPatient = async (e) => {
// // // // // // // // // // // // // //     e.preventDefault();
// // // // // // // // // // // // // //     const { name, email, patientId, gender, dateOfBirth, referredDoctor } = newPatient;

// // // // // // // // // // // // // //     if (!name || !email || !patientId || !gender || !dateOfBirth || !referredDoctor) {
// // // // // // // // // // // // // //       setError("All fields are required.");
// // // // // // // // // // // // // //       return;
// // // // // // // // // // // // // //     }

// // // // // // // // // // // // // //     try {
// // // // // // // // // // // // // //       const response = await axios.post(`${process.env.REACT_APP_ORGANIZATION_RESPONSE_URL}/api/signup`, {
// // // // // // // // // // // // // //         name,
// // // // // // // // // // // // // //         email,
// // // // // // // // // // // // // //         role: "patient",
// // // // // // // // // // // // // //         patientId,
// // // // // // // // // // // // // //         gender,
// // // // // // // // // // // // // //         dateOfBirth,
// // // // // // // // // // // // // //         referredDoctor,
// // // // // // // // // // // // // //         organizationName,
// // // // // // // // // // // // // //       });
// // // // // // // // // // // // // //       setSuccessMessage(response.data.message);
// // // // // // // // // // // // // //       setError("");
// // // // // // // // // // // // // //       setNewPatient({
// // // // // // // // // // // // // //         name: "",
// // // // // // // // // // // // // //         email: "",
// // // // // // // // // // // // // //         patientId: "",
// // // // // // // // // // // // // //         gender: "",
// // // // // // // // // // // // // //         dateOfBirth: "",
// // // // // // // // // // // // // //         referredDoctor: "",
// // // // // // // // // // // // // //       });
// // // // // // // // // // // // // //     } catch (error) {
// // // // // // // // // // // // // //       console.error("Error adding new patient:", error);
// // // // // // // // // // // // // //       setError("Failed to add new patient.");
// // // // // // // // // // // // // //     }
// // // // // // // // // // // // // //   };

// // // // // // // // // // // // // //   return (
// // // // // // // // // // // // // //     <div className="organization-page">
// // // // // // // // // // // // // //       {/* Sidebar */}
// // // // // // // // // // // // // //       <div className="sidebar">
// // // // // // // // // // // // // //         <h4>Organization: {organizationName}</h4>
// // // // // // // // // // // // // //         <button onClick={handleLogout} className="logout-btn">
// // // // // // // // // // // // // //           Logout
// // // // // // // // // // // // // //         </button>
// // // // // // // // // // // // // //       </div>

// // // // // // // // // // // // // //       {/* Main Content */}
// // // // // // // // // // // // // //       <div className="main-content">
// // // // // // // // // // // // // //         <div className="upload-section">
// // // // // // // // // // // // // //           <h2>{isAddNewPatient ? "Add New Patient" : "Existing Patients"}</h2>

// // // // // // // // // // // // // //           {/* Toggle between "Add New Patient" and "Existing Patients" */}
// // // // // // // // // // // // // //           <button onClick={() => setIsAddNewPatient(!isAddNewPatient)}>
// // // // // // // // // // // // // //             {isAddNewPatient ? "View Existing Patients" : "Add New Patient"}
// // // // // // // // // // // // // //           </button>

// // // // // // // // // // // // // //           {isAddNewPatient ? (
// // // // // // // // // // // // // //             <form onSubmit={handleAddNewPatient} className="add-new-patient-form">
// // // // // // // // // // // // // //               <div>
// // // // // // // // // // // // // //                 <label htmlFor="name">Patient Name</label>
// // // // // // // // // // // // // //                 <input
// // // // // // // // // // // // // //                   type="text"
// // // // // // // // // // // // // //                   id="name"
// // // // // // // // // // // // // //                   value={newPatient.name}
// // // // // // // // // // // // // //                   onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
// // // // // // // // // // // // // //                 />
// // // // // // // // // // // // // //               </div>

// // // // // // // // // // // // // //               <div>
// // // // // // // // // // // // // //                 <label htmlFor="email">Email</label>
// // // // // // // // // // // // // //                 <input
// // // // // // // // // // // // // //                   type="email"
// // // // // // // // // // // // // //                   id="email"
// // // // // // // // // // // // // //                   value={newPatient.email}
// // // // // // // // // // // // // //                   onChange={(e) => setNewPatient({ ...newPatient, email: e.target.value })}
// // // // // // // // // // // // // //                 />
// // // // // // // // // // // // // //               </div>

// // // // // // // // // // // // // //               <div>
// // // // // // // // // // // // // //                 <label htmlFor="patientId">Patient ID</label>
// // // // // // // // // // // // // //                 <input
// // // // // // // // // // // // // //                   type="text"
// // // // // // // // // // // // // //                   id="patientId"
// // // // // // // // // // // // // //                   value={newPatient.patientId}
// // // // // // // // // // // // // //                   onChange={(e) => setNewPatient({ ...newPatient, patientId: e.target.value })}
// // // // // // // // // // // // // //                 />
// // // // // // // // // // // // // //               </div>

// // // // // // // // // // // // // //               <div>
// // // // // // // // // // // // // //                 <label htmlFor="gender">Gender</label>
// // // // // // // // // // // // // //                 <select
// // // // // // // // // // // // // //                   id="gender"
// // // // // // // // // // // // // //                   value={newPatient.gender}
// // // // // // // // // // // // // //                   onChange={(e) => setNewPatient({ ...newPatient, gender: e.target.value })}
// // // // // // // // // // // // // //                 >
// // // // // // // // // // // // // //                   <option value="">Select Gender</option>
// // // // // // // // // // // // // //                   <option value="Male">Male</option>
// // // // // // // // // // // // // //                   <option value="Female">Female</option>
// // // // // // // // // // // // // //                   <option value="Other">Other</option>
// // // // // // // // // // // // // //                 </select>
// // // // // // // // // // // // // //               </div>

// // // // // // // // // // // // // //               <div>
// // // // // // // // // // // // // //                 <label htmlFor="dateOfBirth">Date of Birth</label>
// // // // // // // // // // // // // //                 <input
// // // // // // // // // // // // // //                   type="date"
// // // // // // // // // // // // // //                   id="dateOfBirth"
// // // // // // // // // // // // // //                   value={newPatient.dateOfBirth}
// // // // // // // // // // // // // //                   onChange={(e) => setNewPatient({ ...newPatient, dateOfBirth: e.target.value })}
// // // // // // // // // // // // // //                 />
// // // // // // // // // // // // // //               </div>

// // // // // // // // // // // // // //               <div>
// // // // // // // // // // // // // //                 <label htmlFor="referredDoctor">Referred Doctor</label>
// // // // // // // // // // // // // //                 <input
// // // // // // // // // // // // // //                   type="text"
// // // // // // // // // // // // // //                   id="referredDoctor"
// // // // // // // // // // // // // //                   value={newPatient.referredDoctor}
// // // // // // // // // // // // // //                   onChange={(e) => setNewPatient({ ...newPatient, referredDoctor: e.target.value })}
// // // // // // // // // // // // // //                 />
// // // // // // // // // // // // // //               </div>

// // // // // // // // // // // // // //               <button type="submit">Add Patient</button>
// // // // // // // // // // // // // //             </form>
// // // // // // // // // // // // // //           ) : (
// // // // // // // // // // // // // //             <>
// // // // // // // // // // // // // //               <div className="patient-list">
// // // // // // // // // // // // // //                 {patients.map((patient) => (
// // // // // // // // // // // // // //                   <div key={patient.patientId}>
// // // // // // // // // // // // // //                     <h3>{patient.name}</h3>
// // // // // // // // // // // // // //                     <button onClick={() => setSelectedPatientId(patient.patientId)}>Upload Image</button>
// // // // // // // // // // // // // //                   </div>
// // // // // // // // // // // // // //                 ))}
// // // // // // // // // // // // // //               </div>

// // // // // // // // // // // // // //               <form onSubmit={handleUpload} className="upload-form">
// // // // // // // // // // // // // //                 <div>
// // // // // // // // // // // // // //                   <label htmlFor="file">Upload Image</label>
// // // // // // // // // // // // // //                   <input
// // // // // // // // // // // // // //                     type="file"
// // // // // // // // // // // // // //                     id="file"
// // // // // // // // // // // // // //                     accept="image/*"
// // // // // // // // // // // // // //                     onChange={(e) => setFile(e.target.files[0])}
// // // // // // // // // // // // // //                   />
// // // // // // // // // // // // // //                 </div>
// // // // // // // // // // // // // //                 <button type="submit">Upload</button>
// // // // // // // // // // // // // //               </form>
// // // // // // // // // // // // // //             </>
// // // // // // // // // // // // // //           )}

// // // // // // // // // // // // // //           {error && <div className="alert alert-danger">{error}</div>}
// // // // // // // // // // // // // //           {successMessage && <div className="alert alert-success">{successMessage}</div>}
// // // // // // // // // // // // // //         </div>
// // // // // // // // // // // // // //       </div>
// // // // // // // // // // // // // //     </div>
// // // // // // // // // // // // // //   );
// // // // // // // // // // // // // // };

// // // // // // // // // // // // // // export default Organization;





// // // // // // // // // // // // // import React, { useState, useEffect } from "react";
// // // // // // // // // // // // // import axios from "axios";
// // // // // // // // // // // // // import { useNavigate } from "react-router-dom";
// // // // // // // // // // // // // import "./Organization.css";

// // // // // // // // // // // // // const Organization = () => {
// // // // // // // // // // // // //   const organizationName = localStorage.getItem("organizationName");
// // // // // // // // // // // // //   const navigate = useNavigate();

// // // // // // // // // // // // //   const [patients, setPatients] = useState([]);
// // // // // // // // // // // // //   const [patientIds, setPatientIds] = useState([]);
// // // // // // // // // // // // //   const [selectedPatientId, setSelectedPatientId] = useState("");
// // // // // // // // // // // // //   const [file, setFile] = useState(null);
// // // // // // // // // // // // //   const [newPatient, setNewPatient] = useState({
// // // // // // // // // // // // //     name: "",
// // // // // // // // // // // // //     email: "",
// // // // // // // // // // // // //     patientId: "",
// // // // // // // // // // // // //     gender: "",
// // // // // // // // // // // // //     dateOfBirth: "",
// // // // // // // // // // // // //     referredDoctor: "",
// // // // // // // // // // // // //   });
// // // // // // // // // // // // //   const [error, setError] = useState("");
// // // // // // // // // // // // //   const [successMessage, setSuccessMessage] = useState("");
// // // // // // // // // // // // //   const [isAddNewPatient, setIsAddNewPatient] = useState(false);

// // // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // // //     const fetchPatients = async () => {
// // // // // // // // // // // // //       try {
// // // // // // // // // // // // //         const response = await axios.get(`${process.env.REACT_APP_ORGANIZATION_RESPONSE_URL}/api/patients`);
// // // // // // // // // // // // //         setPatients(response.data);
// // // // // // // // // // // // //       } catch (error) {
// // // // // // // // // // // // //         console.error("Error fetching patients:", error);
// // // // // // // // // // // // //       }
// // // // // // // // // // // // //     };

// // // // // // // // // // // // //     fetchPatients();
// // // // // // // // // // // // //   }, []);

// // // // // // // // // // // // //   const handleLogout = () => {
// // // // // // // // // // // // //     localStorage.clear();
// // // // // // // // // // // // //     navigate("/Login");
// // // // // // // // // // // // //   };

// // // // // // // // // // // // //   const handleUpload = async (e) => {
// // // // // // // // // // // // //     e.preventDefault();
// // // // // // // // // // // // //     if (!selectedPatientId || !file) {
// // // // // // // // // // // // //       setError("Please select a patient ID and upload an image.");
// // // // // // // // // // // // //       return;
// // // // // // // // // // // // //     }

// // // // // // // // // // // // //     const formData = new FormData();
// // // // // // // // // // // // //     formData.append("patientId", selectedPatientId);
// // // // // // // // // // // // //     formData.append("organizationName", organizationName);
// // // // // // // // // // // // //     formData.append("image", file);

// // // // // // // // // // // // //     try {
// // // // // // // // // // // // //       const response = await axios.post(`${process.env.REACT_APP_ORGANIZATION_RESPONSE_UPLOAD_URL}/api/upload`, formData, {
// // // // // // // // // // // // //         headers: {
// // // // // // // // // // // // //           "Content-Type": "multipart/form-data",
// // // // // // // // // // // // //         },
// // // // // // // // // // // // //       });
// // // // // // // // // // // // //       setSuccessMessage(response.data.message);
// // // // // // // // // // // // //       setError("");
// // // // // // // // // // // // //       setFile(null);
// // // // // // // // // // // // //       setSelectedPatientId("");
// // // // // // // // // // // // //     } catch (error) {
// // // // // // // // // // // // //       console.error("Error uploading file:", error);
// // // // // // // // // // // // //       setError("Failed to upload image.");
// // // // // // // // // // // // //     }
// // // // // // // // // // // // //   };

// // // // // // // // // // // // //   const handleAddNewPatient = async (e) => {
// // // // // // // // // // // // //     e.preventDefault();
// // // // // // // // // // // // //     const { name, email, patientId, gender, dateOfBirth, referredDoctor } = newPatient;

// // // // // // // // // // // // //     if (!name || !email || !patientId || !gender || !dateOfBirth || !referredDoctor) {
// // // // // // // // // // // // //       setError("All fields are required.");
// // // // // // // // // // // // //       return;
// // // // // // // // // // // // //     }

// // // // // // // // // // // // //     try {
// // // // // // // // // // // // //       const response = await axios.post(`${process.env.REACT_APP_ORGANIZATION_RESPONSE_URL}/api/signup`, {
// // // // // // // // // // // // //         name,
// // // // // // // // // // // // //         email,
// // // // // // // // // // // // //         role: "patient",
// // // // // // // // // // // // //         patientId,
// // // // // // // // // // // // //         gender,
// // // // // // // // // // // // //         dateOfBirth,
// // // // // // // // // // // // //         referredDoctor,
// // // // // // // // // // // // //         organizationName,
// // // // // // // // // // // // //       });
// // // // // // // // // // // // //       setSuccessMessage(response.data.message);
// // // // // // // // // // // // //       setError("");
// // // // // // // // // // // // //       setNewPatient({
// // // // // // // // // // // // //         name: "",
// // // // // // // // // // // // //         email: "",
// // // // // // // // // // // // //         patientId: "",
// // // // // // // // // // // // //         gender: "",
// // // // // // // // // // // // //         dateOfBirth: "",
// // // // // // // // // // // // //         referredDoctor: "",
// // // // // // // // // // // // //       });
// // // // // // // // // // // // //     } catch (error) {
// // // // // // // // // // // // //       console.error("Error adding new patient:", error);
// // // // // // // // // // // // //       setError("Failed to add new patient.");
// // // // // // // // // // // // //     }
// // // // // // // // // // // // //   };

// // // // // // // // // // // // //   return (
// // // // // // // // // // // // //     <div className="organization-page">
// // // // // // // // // // // // //       {/* Sidebar */}
// // // // // // // // // // // // //       <div className="sidebar">
// // // // // // // // // // // // //         <h4>Organization: {organizationName}</h4>
// // // // // // // // // // // // //         <button onClick={handleLogout} className="logout-btn">
// // // // // // // // // // // // //           Logout
// // // // // // // // // // // // //         </button>
// // // // // // // // // // // // //       </div>

// // // // // // // // // // // // //       {/* Main Content */}
// // // // // // // // // // // // //       <div className="main-content">
// // // // // // // // // // // // //         {/* Button Section */}
// // // // // // // // // // // // //         <div className="button-section">
// // // // // // // // // // // // //           <button
// // // // // // // // // // // // //             className={`action-btn ${!isAddNewPatient ? "active" : ""}`}
// // // // // // // // // // // // //             onClick={() => setIsAddNewPatient(false)}
// // // // // // // // // // // // //           >
// // // // // // // // // // // // //             Existing Patients
// // // // // // // // // // // // //           </button>
// // // // // // // // // // // // //           <button
// // // // // // // // // // // // //             className={`action-btn ${isAddNewPatient ? "active" : ""}`}
// // // // // // // // // // // // //             onClick={() => setIsAddNewPatient(true)}
// // // // // // // // // // // // //           >
// // // // // // // // // // // // //             Add New Patient
// // // // // // // // // // // // //           </button>
// // // // // // // // // // // // //         </div>

// // // // // // // // // // // // //         {/* Add New Patient Form */}
// // // // // // // // // // // // //         {isAddNewPatient ? (
// // // // // // // // // // // // //           <div className="add-new-patient-form">
// // // // // // // // // // // // //             <h2>Add New Patient</h2>
// // // // // // // // // // // // //             <form onSubmit={handleAddNewPatient}>
// // // // // // // // // // // // //               <div>
// // // // // // // // // // // // //                 <label htmlFor="name">Patient Name</label>
// // // // // // // // // // // // //                 <input
// // // // // // // // // // // // //                   type="text"
// // // // // // // // // // // // //                   id="name"
// // // // // // // // // // // // //                   value={newPatient.name}
// // // // // // // // // // // // //                   onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
// // // // // // // // // // // // //                 />
// // // // // // // // // // // // //               </div>

// // // // // // // // // // // // //               <div>
// // // // // // // // // // // // //                 <label htmlFor="email">Email</label>
// // // // // // // // // // // // //                 <input
// // // // // // // // // // // // //                   type="email"
// // // // // // // // // // // // //                   id="email"
// // // // // // // // // // // // //                   value={newPatient.email}
// // // // // // // // // // // // //                   onChange={(e) => setNewPatient({ ...newPatient, email: e.target.value })}
// // // // // // // // // // // // //                 />
// // // // // // // // // // // // //               </div>

// // // // // // // // // // // // //               <div>
// // // // // // // // // // // // //                 <label htmlFor="patientId">Patient ID</label>
// // // // // // // // // // // // //                 <input
// // // // // // // // // // // // //                   type="text"
// // // // // // // // // // // // //                   id="patientId"
// // // // // // // // // // // // //                   value={newPatient.patientId}
// // // // // // // // // // // // //                   onChange={(e) => setNewPatient({ ...newPatient, patientId: e.target.value })}
// // // // // // // // // // // // //                 />
// // // // // // // // // // // // //               </div>

// // // // // // // // // // // // //               <div>
// // // // // // // // // // // // //                 <label htmlFor="gender">Gender</label>
// // // // // // // // // // // // //                 <select
// // // // // // // // // // // // //                   id="gender"
// // // // // // // // // // // // //                   value={newPatient.gender}
// // // // // // // // // // // // //                   onChange={(e) => setNewPatient({ ...newPatient, gender: e.target.value })}
// // // // // // // // // // // // //                 >
// // // // // // // // // // // // //                   <option value="">Select Gender</option>
// // // // // // // // // // // // //                   <option value="Male">Male</option>
// // // // // // // // // // // // //                   <option value="Female">Female</option>
// // // // // // // // // // // // //                   <option value="Other">Other</option>
// // // // // // // // // // // // //                 </select>
// // // // // // // // // // // // //               </div>

// // // // // // // // // // // // //               <div>
// // // // // // // // // // // // //                 <label htmlFor="dateOfBirth">Date of Birth</label>
// // // // // // // // // // // // //                 <input
// // // // // // // // // // // // //                   type="date"
// // // // // // // // // // // // //                   id="dateOfBirth"
// // // // // // // // // // // // //                   value={newPatient.dateOfBirth}
// // // // // // // // // // // // //                   onChange={(e) => setNewPatient({ ...newPatient, dateOfBirth: e.target.value })}
// // // // // // // // // // // // //                 />
// // // // // // // // // // // // //               </div>

// // // // // // // // // // // // //               <div>
// // // // // // // // // // // // //                 <label htmlFor="referredDoctor">Referred Doctor</label>
// // // // // // // // // // // // //                 <input
// // // // // // // // // // // // //                   type="text"
// // // // // // // // // // // // //                   id="referredDoctor"
// // // // // // // // // // // // //                   value={newPatient.referredDoctor}
// // // // // // // // // // // // //                   onChange={(e) => setNewPatient({ ...newPatient, referredDoctor: e.target.value })}
// // // // // // // // // // // // //                 />
// // // // // // // // // // // // //               </div>

// // // // // // // // // // // // //               <button type="submit">Add Patient</button>
// // // // // // // // // // // // //             </form>
// // // // // // // // // // // // //           </div>
// // // // // // // // // // // // //         ) : (
// // // // // // // // // // // // //           // Existing Patients Section
// // // // // // // // // // // // //           <div className="existing-patients">
// // // // // // // // // // // // //             <h2>Existing Patients</h2>
// // // // // // // // // // // // //             <table className="patients-table">
// // // // // // // // // // // // //               <thead>
// // // // // // // // // // // // //                 <tr>
// // // // // // // // // // // // //                   <th>Patient ID</th>
// // // // // // // // // // // // //                   <th>Name</th>
// // // // // // // // // // // // //                   <th>Email</th>
// // // // // // // // // // // // //                   <th>Gender</th>
// // // // // // // // // // // // //                   <th>Date of Birth</th>
// // // // // // // // // // // // //                   <th>Referred Doctor</th>
// // // // // // // // // // // // //                   <th>Image</th>
// // // // // // // // // // // // //                   <th>Update Image</th>
// // // // // // // // // // // // //                 </tr>
// // // // // // // // // // // // //               </thead>
// // // // // // // // // // // // //               <tbody>
// // // // // // // // // // // // //                 {patients.map((patient) => (
// // // // // // // // // // // // //                   <tr key={patient.patientId}>
// // // // // // // // // // // // //                     <td>{patient.patientId}</td>
// // // // // // // // // // // // //                     <td>{patient.name}</td>
// // // // // // // // // // // // //                     <td>{patient.email}</td>
// // // // // // // // // // // // //                     <td>{patient.gender}</td>
// // // // // // // // // // // // //                     <td>{patient.dateOfBirth}</td>
// // // // // // // // // // // // //                     <td>{patient.referredDoctor}</td>
// // // // // // // // // // // // //                     <td>
// // // // // // // // // // // // //                       {patient.imageData && patient.imageData.length > 0 ? (
// // // // // // // // // // // // //                         <img src={patient.imageData[0].imagePath} alt="Patient" className="patient-image" />
// // // // // // // // // // // // //                       ) : (
// // // // // // // // // // // // //                         <span>No Image</span>
// // // // // // // // // // // // //                       )}
// // // // // // // // // // // // //                     </td>
// // // // // // // // // // // // //                     <td>
// // // // // // // // // // // // //                       <button
// // // // // // // // // // // // //                         onClick={() => setSelectedPatientId(patient.patientId)}
// // // // // // // // // // // // //                         className="upload-image-btn"
// // // // // // // // // // // // //                       >
// // // // // // // // // // // // //                         Update Image
// // // // // // // // // // // // //                       </button>
// // // // // // // // // // // // //                     </td>
// // // // // // // // // // // // //                   </tr>
// // // // // // // // // // // // //                 ))}
// // // // // // // // // // // // //               </tbody>
// // // // // // // // // // // // //             </table>

// // // // // // // // // // // // //             {selectedPatientId && (
// // // // // // // // // // // // //               <form onSubmit={handleUpload} className="upload-form">
// // // // // // // // // // // // //                 <h3>Update Image for Patient ID: {selectedPatientId}</h3>
// // // // // // // // // // // // //                 <div>
// // // // // // // // // // // // //                   <label htmlFor="file">Upload New Image</label>
// // // // // // // // // // // // //                   <input
// // // // // // // // // // // // //                     type="file"
// // // // // // // // // // // // //                     id="file"
// // // // // // // // // // // // //                     accept="image/*"
// // // // // // // // // // // // //                     onChange={(e) => setFile(e.target.files[0])}
// // // // // // // // // // // // //                   />
// // // // // // // // // // // // //                 </div>
// // // // // // // // // // // // //                 <button type="submit">Upload</button>
// // // // // // // // // // // // //               </form>
// // // // // // // // // // // // //             )}
// // // // // // // // // // // // //           </div>
// // // // // // // // // // // // //         )}

// // // // // // // // // // // // //         {error && <div className="alert alert-danger">{error}</div>}
// // // // // // // // // // // // //         {successMessage && <div className="alert alert-success">{successMessage}</div>}
// // // // // // // // // // // // //       </div>
// // // // // // // // // // // // //     </div>
// // // // // // // // // // // // //   );
// // // // // // // // // // // // // };

// // // // // // // // // // // // // export default Organization;




// // // // // // // // // // // // import React, { useState, useEffect } from "react";
// // // // // // // // // // // // import axios from "axios";
// // // // // // // // // // // // import { useNavigate } from "react-router-dom";
// // // // // // // // // // // // import "./Organization.css";

// // // // // // // // // // // // const Organization = () => {
// // // // // // // // // // // //   const organizationName = localStorage.getItem("organizationName");
// // // // // // // // // // // //   const navigate = useNavigate();

// // // // // // // // // // // //   const [patients, setPatients] = useState([]);
// // // // // // // // // // // //   const [selectedPatientId, setSelectedPatientId] = useState("");
// // // // // // // // // // // //   const [file, setFile] = useState(null);
// // // // // // // // // // // //   const [newPatient, setNewPatient] = useState({
// // // // // // // // // // // //     name: "",
// // // // // // // // // // // //     email: "",
// // // // // // // // // // // //     patientId: "",
// // // // // // // // // // // //     gender: "",
// // // // // // // // // // // //     dateOfBirth: "",
// // // // // // // // // // // //     referredDoctor: "",
// // // // // // // // // // // //   });
// // // // // // // // // // // //   const [error, setError] = useState("");
// // // // // // // // // // // //   const [successMessage, setSuccessMessage] = useState("");
// // // // // // // // // // // //   const [isAddNewPatient, setIsAddNewPatient] = useState(false);
// // // // // // // // // // // //   const [selectedImage, setSelectedImage] = useState(null);  // To store the selected image

// // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // //     const fetchPatients = async () => {
// // // // // // // // // // // //       try {
// // // // // // // // // // // //         const response = await axios.get(`${process.env.REACT_APP_ORGANIZATION_RESPONSE_URL}/api/patients`);
// // // // // // // // // // // //         setPatients(response.data);
// // // // // // // // // // // //       } catch (error) {
// // // // // // // // // // // //         console.error("Error fetching patients:", error);
// // // // // // // // // // // //       }
// // // // // // // // // // // //     };

// // // // // // // // // // // //     fetchPatients();
// // // // // // // // // // // //   }, []);

// // // // // // // // // // // //   const handleLogout = () => {
// // // // // // // // // // // //     localStorage.clear();
// // // // // // // // // // // //     navigate("/Login");
// // // // // // // // // // // //   };

// // // // // // // // // // // //   const handleUpload = async (e) => {
// // // // // // // // // // // //     e.preventDefault();
// // // // // // // // // // // //     if (!selectedPatientId || !file) {
// // // // // // // // // // // //       setError("Please select a patient ID and upload an image.");
// // // // // // // // // // // //       return;
// // // // // // // // // // // //     }

// // // // // // // // // // // //     const formData = new FormData();
// // // // // // // // // // // //     formData.append("patientId", selectedPatientId);
// // // // // // // // // // // //     formData.append("organizationName", organizationName);
// // // // // // // // // // // //     formData.append("image", file);

// // // // // // // // // // // //     try {
// // // // // // // // // // // //       const response = await axios.post(`${process.env.REACT_APP_ORGANIZATION_RESPONSE_UPLOAD_URL}/api/upload`, formData, {
// // // // // // // // // // // //         headers: {
// // // // // // // // // // // //           "Content-Type": "multipart/form-data",
// // // // // // // // // // // //         },
// // // // // // // // // // // //       });
// // // // // // // // // // // //       setSuccessMessage(response.data.message);
// // // // // // // // // // // //       setError("");
// // // // // // // // // // // //       setFile(null);
// // // // // // // // // // // //       setSelectedPatientId("");
// // // // // // // // // // // //     } catch (error) {
// // // // // // // // // // // //       console.error("Error uploading file:", error);
// // // // // // // // // // // //       setError("Failed to upload image.");
// // // // // // // // // // // //     }
// // // // // // // // // // // //   };

// // // // // // // // // // // //   const handleAddNewPatient = async (e) => {
// // // // // // // // // // // //     e.preventDefault();
// // // // // // // // // // // //     const { name, email, patientId, gender, dateOfBirth, referredDoctor } = newPatient;

// // // // // // // // // // // //     if (!name || !email || !patientId || !gender || !dateOfBirth || !referredDoctor) {
// // // // // // // // // // // //       setError("All fields are required.");
// // // // // // // // // // // //       return;
// // // // // // // // // // // //     }

// // // // // // // // // // // //     try {
// // // // // // // // // // // //       const response = await axios.post(`${process.env.REACT_APP_ORGANIZATION_RESPONSE_URL}/api/signup`, {
// // // // // // // // // // // //         name,
// // // // // // // // // // // //         email,
// // // // // // // // // // // //         role: "patient",
// // // // // // // // // // // //         patientId,
// // // // // // // // // // // //         gender,
// // // // // // // // // // // //         dateOfBirth,
// // // // // // // // // // // //         referredDoctor,
// // // // // // // // // // // //         organizationName,
// // // // // // // // // // // //       });
// // // // // // // // // // // //       setSuccessMessage(response.data.message);
// // // // // // // // // // // //       setError("");
// // // // // // // // // // // //       setNewPatient({
// // // // // // // // // // // //         name: "",
// // // // // // // // // // // //         email: "",
// // // // // // // // // // // //         patientId: "",
// // // // // // // // // // // //         gender: "",
// // // // // // // // // // // //         dateOfBirth: "",
// // // // // // // // // // // //         referredDoctor: "",
// // // // // // // // // // // //       });
// // // // // // // // // // // //     } catch (error) {
// // // // // // // // // // // //       console.error("Error adding new patient:", error);
// // // // // // // // // // // //       setError("Failed to add new patient.");
// // // // // // // // // // // //     }
// // // // // // // // // // // //   };

// // // // // // // // // // // //   // Function to handle image click and open it in a modal
// // // // // // // // // // // //   const handleImageClick = (imagePath) => {
// // // // // // // // // // // //     setSelectedImage(imagePath);  // Set the image path to show in the modal
// // // // // // // // // // // //   };

// // // // // // // // // // // //   // Function to close the modal
// // // // // // // // // // // //   const closeModal = () => {
// // // // // // // // // // // //     setSelectedImage(null);  // Clear the selected image to close the modal
// // // // // // // // // // // //   };

// // // // // // // // // // // //   return (
// // // // // // // // // // // //     <div className="organization-page">
// // // // // // // // // // // //       {/* Sidebar */}
// // // // // // // // // // // //       <div className="sidebar">
// // // // // // // // // // // //         <h4>Organization: {organizationName}</h4>
// // // // // // // // // // // //         <button onClick={handleLogout} className="logout-btn">
// // // // // // // // // // // //           Logout
// // // // // // // // // // // //         </button>
// // // // // // // // // // // //       </div>

// // // // // // // // // // // //       {/* Main Content */}
// // // // // // // // // // // //       <div className="main-content">
// // // // // // // // // // // //         {/* Button Section */}
// // // // // // // // // // // //         <div className="button-section">
// // // // // // // // // // // //           <button
// // // // // // // // // // // //             className={`action-btn ${!isAddNewPatient ? "active" : ""}`}
// // // // // // // // // // // //             onClick={() => setIsAddNewPatient(false)}
// // // // // // // // // // // //           >
// // // // // // // // // // // //             Existing Patients
// // // // // // // // // // // //           </button>
// // // // // // // // // // // //           <button
// // // // // // // // // // // //             className={`action-btn ${isAddNewPatient ? "active" : ""}`}
// // // // // // // // // // // //             onClick={() => setIsAddNewPatient(true)}
// // // // // // // // // // // //           >
// // // // // // // // // // // //             Add New Patient
// // // // // // // // // // // //           </button>
// // // // // // // // // // // //         </div>

// // // // // // // // // // // //         {/* Add New Patient Form */}
// // // // // // // // // // // //         {isAddNewPatient ? (
// // // // // // // // // // // //           <div className="add-new-patient-form">
// // // // // // // // // // // //             <h2>Add New Patient</h2>
// // // // // // // // // // // //             <form onSubmit={handleAddNewPatient}>
// // // // // // // // // // // //               {/* Form fields for new patient */}
// // // // // // // // // // // //               <div>
// // // // // // // // // // // //                 <label htmlFor="name">Patient Name</label>
// // // // // // // // // // // //                 <input
// // // // // // // // // // // //                   type="text"
// // // // // // // // // // // //                   id="name"
// // // // // // // // // // // //                   value={newPatient.name}
// // // // // // // // // // // //                   onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
// // // // // // // // // // // //                 />
// // // // // // // // // // // //               </div>
// // // // // // // // // // // //               {/* Other fields */}
// // // // // // // // // // // //               <button type="submit">Add Patient</button>
// // // // // // // // // // // //             </form>
// // // // // // // // // // // //           </div>
// // // // // // // // // // // //         ) : (
// // // // // // // // // // // //           // Existing Patients Section
// // // // // // // // // // // //           <div className="existing-patients">
// // // // // // // // // // // //             <h2>Existing Patients</h2>
// // // // // // // // // // // //             <table className="patients-table">
// // // // // // // // // // // //               <thead>
// // // // // // // // // // // //                 <tr>
// // // // // // // // // // // //                   <th>Patient ID</th>
// // // // // // // // // // // //                   <th>Name</th>
// // // // // // // // // // // //                   <th>Email</th>
// // // // // // // // // // // //                   <th>Gender</th>
// // // // // // // // // // // //                   <th>Date of Birth</th>
// // // // // // // // // // // //                   <th>Referred Doctor</th>
// // // // // // // // // // // //                   <th>Image</th>
// // // // // // // // // // // //                   <th>Update Image</th>
// // // // // // // // // // // //                 </tr>
// // // // // // // // // // // //               </thead>
// // // // // // // // // // // //               <tbody>
// // // // // // // // // // // //                 {patients.map((patient) => (
// // // // // // // // // // // //                   <tr key={patient.patientId}>
// // // // // // // // // // // //                     <td>{patient.patientId}</td>
// // // // // // // // // // // //                     <td>{patient.name}</td>
// // // // // // // // // // // //                     <td>{patient.email}</td>
// // // // // // // // // // // //                     <td>{patient.gender}</td>
// // // // // // // // // // // //                     <td>{patient.dateOfBirth}</td>
// // // // // // // // // // // //                     <td>{patient.referredDoctor}</td>
// // // // // // // // // // // //                     <td>
// // // // // // // // // // // //                       {patient.imageData && patient.imageData.length > 0 ? (
// // // // // // // // // // // //                         <img
// // // // // // // // // // // //                           src={patient.imageData[0].imagePath}
// // // // // // // // // // // //                           alt="Patient"
// // // // // // // // // // // //                           className="patient-image"
// // // // // // // // // // // //                           onClick={() => handleImageClick(patient.imageData[0].imagePath)}  // Open image on click
// // // // // // // // // // // //                         />
// // // // // // // // // // // //                       ) : (
// // // // // // // // // // // //                         <span>No Image</span>
// // // // // // // // // // // //                       )}
// // // // // // // // // // // //                     </td>
// // // // // // // // // // // //                     <td>
// // // // // // // // // // // //                       <button
// // // // // // // // // // // //                         onClick={() => setSelectedPatientId(patient.patientId)}
// // // // // // // // // // // //                         className="upload-image-btn"
// // // // // // // // // // // //                       >
// // // // // // // // // // // //                         Update Image
// // // // // // // // // // // //                       </button>
// // // // // // // // // // // //                     </td>
// // // // // // // // // // // //                   </tr>
// // // // // // // // // // // //                 ))}
// // // // // // // // // // // //               </tbody>
// // // // // // // // // // // //             </table>

// // // // // // // // // // // //             {selectedPatientId && (
// // // // // // // // // // // //               <form onSubmit={handleUpload} className="upload-form">
// // // // // // // // // // // //                 <h3>Update Image for Patient ID: {selectedPatientId}</h3>
// // // // // // // // // // // //                 <div>
// // // // // // // // // // // //                   <label htmlFor="file">Upload New Image</label>
// // // // // // // // // // // //                   <input
// // // // // // // // // // // //                     type="file"
// // // // // // // // // // // //                     id="file"
// // // // // // // // // // // //                     accept="image/*"
// // // // // // // // // // // //                     onChange={(e) => setFile(e.target.files[0])}
// // // // // // // // // // // //                   />
// // // // // // // // // // // //                 </div>
// // // // // // // // // // // //                 <button type="submit">Upload</button>
// // // // // // // // // // // //               </form>
// // // // // // // // // // // //             )}
// // // // // // // // // // // //           </div>
// // // // // // // // // // // //         )}

// // // // // // // // // // // //         {error && <div className="alert alert-danger">{error}</div>}
// // // // // // // // // // // //         {successMessage && <div className="alert alert-success">{successMessage}</div>}
// // // // // // // // // // // //       </div>

// // // // // // // // // // // //       {/* Modal to display image */}
// // // // // // // // // // // //       {selectedImage && (
// // // // // // // // // // // //         <div className="modal">
// // // // // // // // // // // //           <div className="modal-content">
// // // // // // // // // // // //             <span className="close" onClick={closeModal}>&times;</span>
// // // // // // // // // // // //             <img src={selectedImage} alt="Selected" className="modal-image" />
// // // // // // // // // // // //           </div>
// // // // // // // // // // // //         </div>
// // // // // // // // // // // //       )}
// // // // // // // // // // // //     </div>
// // // // // // // // // // // //   );
// // // // // // // // // // // // };

// // // // // // // // // // // // export default Organization;




// // // // // // // // // // // import React, { useState, useEffect } from "react";
// // // // // // // // // // // import axios from "axios";
// // // // // // // // // // // import { useNavigate } from "react-router-dom";
// // // // // // // // // // // import "./Organization.css";

// // // // // // // // // // // const Organization = () => {
// // // // // // // // // // //   const organizationName = localStorage.getItem("organizationName");
// // // // // // // // // // //   const navigate = useNavigate();

// // // // // // // // // // //   const [patients, setPatients] = useState([]);
// // // // // // // // // // //   const [patientIds, setPatientIds] = useState([]);
// // // // // // // // // // //   const [selectedPatientId, setSelectedPatientId] = useState("");
// // // // // // // // // // //   const [file, setFile] = useState(null);
// // // // // // // // // // //   const [newPatient, setNewPatient] = useState({
// // // // // // // // // // //     name: "",
// // // // // // // // // // //     email: "",
// // // // // // // // // // //     patientId: "",
// // // // // // // // // // //     gender: "",
// // // // // // // // // // //     dateOfBirth: "",
// // // // // // // // // // //     referredDoctor: "",
// // // // // // // // // // //   });
// // // // // // // // // // //   const [error, setError] = useState("");
// // // // // // // // // // //   const [successMessage, setSuccessMessage] = useState("");
// // // // // // // // // // //   const [isAddNewPatient, setIsAddNewPatient] = useState(false);
// // // // // // // // // // //   const [selectedImage, setSelectedImage] = useState(null); // State for the selected image to be displayed in the modal

// // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // //     const fetchPatients = async () => {
// // // // // // // // // // //       try {
// // // // // // // // // // //         const response = await axios.get(`${process.env.REACT_APP_ORGANIZATION_RESPONSE_URL}/api/patients`);
// // // // // // // // // // //         setPatients(response.data);
// // // // // // // // // // //       } catch (error) {
// // // // // // // // // // //         console.error("Error fetching patients:", error);
// // // // // // // // // // //       }
// // // // // // // // // // //     };

// // // // // // // // // // //     fetchPatients();
// // // // // // // // // // //   }, []);

// // // // // // // // // // //   const handleLogout = () => {
// // // // // // // // // // //     localStorage.clear();
// // // // // // // // // // //     navigate("/Login");
// // // // // // // // // // //   };

// // // // // // // // // // //   const handleUpload = async (e) => {
// // // // // // // // // // //     e.preventDefault();
// // // // // // // // // // //     if (!selectedPatientId || !file) {
// // // // // // // // // // //       setError("Please select a patient ID and upload an image.");
// // // // // // // // // // //       return;
// // // // // // // // // // //     }

// // // // // // // // // // //     const formData = new FormData();
// // // // // // // // // // //     formData.append("patientId", selectedPatientId);
// // // // // // // // // // //     formData.append("organizationName", organizationName);
// // // // // // // // // // //     formData.append("image", file);

// // // // // // // // // // //     try {
// // // // // // // // // // //       const response = await axios.post(`${process.env.REACT_APP_ORGANIZATION_RESPONSE_UPLOAD_URL}/api/upload`, formData, {
// // // // // // // // // // //         headers: {
// // // // // // // // // // //           "Content-Type": "multipart/form-data",
// // // // // // // // // // //         },
// // // // // // // // // // //       });
// // // // // // // // // // //       setSuccessMessage(response.data.message);
// // // // // // // // // // //       setError("");
// // // // // // // // // // //       setFile(null);
// // // // // // // // // // //       setSelectedPatientId("");
// // // // // // // // // // //     } catch (error) {
// // // // // // // // // // //       console.error("Error uploading file:", error);
// // // // // // // // // // //       setError("Failed to upload image.");
// // // // // // // // // // //     }
// // // // // // // // // // //   };

// // // // // // // // // // //   const handleAddNewPatient = async (e) => {
// // // // // // // // // // //     e.preventDefault();
// // // // // // // // // // //     const { name, email, patientId, gender, dateOfBirth, referredDoctor } = newPatient;

// // // // // // // // // // //     if (!name || !email || !patientId || !gender || !dateOfBirth || !referredDoctor) {
// // // // // // // // // // //       setError("All fields are required.");
// // // // // // // // // // //       return;
// // // // // // // // // // //     }

// // // // // // // // // // //     try {
// // // // // // // // // // //       const response = await axios.post(`${process.env.REACT_APP_ORGANIZATION_RESPONSE_URL}/api/signup`, {
// // // // // // // // // // //         name,
// // // // // // // // // // //         email,
// // // // // // // // // // //         role: "patient",
// // // // // // // // // // //         patientId,
// // // // // // // // // // //         gender,
// // // // // // // // // // //         dateOfBirth,
// // // // // // // // // // //         referredDoctor,
// // // // // // // // // // //         organizationName,
// // // // // // // // // // //       });
// // // // // // // // // // //       setSuccessMessage(response.data.message);
// // // // // // // // // // //       setError("");
// // // // // // // // // // //       setNewPatient({
// // // // // // // // // // //         name: "",
// // // // // // // // // // //         email: "",
// // // // // // // // // // //         patientId: "",
// // // // // // // // // // //         gender: "",
// // // // // // // // // // //         dateOfBirth: "",
// // // // // // // // // // //         referredDoctor: "",
// // // // // // // // // // //       });
// // // // // // // // // // //     } catch (error) {
// // // // // // // // // // //       console.error("Error adding new patient:", error);
// // // // // // // // // // //       setError("Failed to add new patient.");
// // // // // // // // // // //     }
// // // // // // // // // // //   };

// // // // // // // // // // //   // Open modal with the selected image
// // // // // // // // // // //   const openModal = (imagePath) => {
// // // // // // // // // // //     setSelectedImage(imagePath);
// // // // // // // // // // //   };

// // // // // // // // // // //   // Close the modal
// // // // // // // // // // //   const closeModal = () => {
// // // // // // // // // // //     setSelectedImage(null);
// // // // // // // // // // //   };

// // // // // // // // // // //   return (
// // // // // // // // // // //     <div className="organization-page">
// // // // // // // // // // //       {/* Sidebar */}
// // // // // // // // // // //       <div className="sidebar">
// // // // // // // // // // //         <h4>Organization: {organizationName}</h4>
// // // // // // // // // // //         <button onClick={handleLogout} className="logout-btn">
// // // // // // // // // // //           Logout
// // // // // // // // // // //         </button>
// // // // // // // // // // //       </div>

// // // // // // // // // // //       {/* Main Content */}
// // // // // // // // // // //       <div className="main-content">
// // // // // // // // // // //         {/* Button Section */}
// // // // // // // // // // //         <div className="button-section">
// // // // // // // // // // //           <button
// // // // // // // // // // //             className={`action-btn ${!isAddNewPatient ? "active" : ""}`}
// // // // // // // // // // //             onClick={() => setIsAddNewPatient(false)}
// // // // // // // // // // //           >
// // // // // // // // // // //             Existing Patients
// // // // // // // // // // //           </button>
// // // // // // // // // // //           <button
// // // // // // // // // // //             className={`action-btn ${isAddNewPatient ? "active" : ""}`}
// // // // // // // // // // //             onClick={() => setIsAddNewPatient(true)}
// // // // // // // // // // //           >
// // // // // // // // // // //             Add New Patient
// // // // // // // // // // //           </button>
// // // // // // // // // // //         </div>

// // // // // // // // // // //         {/* Add New Patient Form */}
// // // // // // // // // // //         {isAddNewPatient ? (
// // // // // // // // // // //           <div className="add-new-patient-form">
// // // // // // // // // // //             <h2>Add New Patient</h2>
// // // // // // // // // // //             <form onSubmit={handleAddNewPatient}>
// // // // // // // // // // //               {/* form fields */}
// // // // // // // // // // //               <button type="submit">Add Patient</button>
// // // // // // // // // // //             </form>
// // // // // // // // // // //           </div>
// // // // // // // // // // //         ) : (
// // // // // // // // // // //           // Existing Patients Section
// // // // // // // // // // //           <div className="existing-patients">
// // // // // // // // // // //             <h2>Existing Patients</h2>
// // // // // // // // // // //             <table className="patients-table">
// // // // // // // // // // //               <thead>
// // // // // // // // // // //                 <tr>
// // // // // // // // // // //                   <th>Patient ID</th>
// // // // // // // // // // //                   <th>Name</th>
// // // // // // // // // // //                   <th>Email</th>
// // // // // // // // // // //                   <th>Gender</th>
// // // // // // // // // // //                   <th>Date of Birth</th>
// // // // // // // // // // //                   <th>Referred Doctor</th>
// // // // // // // // // // //                   <th>Image</th>
// // // // // // // // // // //                   <th>Update Image</th>
// // // // // // // // // // //                 </tr>
// // // // // // // // // // //               </thead>
// // // // // // // // // // //               <tbody>
// // // // // // // // // // //                 {patients.map((patient) => (
// // // // // // // // // // //                   <tr key={patient.patientId}>
// // // // // // // // // // //                     <td>{patient.patientId}</td>
// // // // // // // // // // //                     <td>{patient.name}</td>
// // // // // // // // // // //                     <td>{patient.email}</td>
// // // // // // // // // // //                     <td>{patient.gender}</td>
// // // // // // // // // // //                     <td>{patient.dateOfBirth}</td>
// // // // // // // // // // //                     <td>{patient.referredDoctor}</td>
// // // // // // // // // // //                     {/* <td>
// // // // // // // // // // //                       {patient.imageData && patient.imageData.length > 0 ? (
// // // // // // // // // // //                         <img
// // // // // // // // // // //                           src={patient.imageData[0].imagePath}
// // // // // // // // // // //                           alt="Patient"
// // // // // // // // // // //                           className="patient-image"
// // // // // // // // // // //                           onClick={() => openModal(patient.imageData[0].imagePath)} // Open image in modal on click
// // // // // // // // // // //                         />
// // // // // // // // // // //                       ) : (
// // // // // // // // // // //                         <span>No Image</span>
// // // // // // // // // // //                       )}
// // // // // // // // // // //                     </td> */}
// // // // // // // // // // //                     <td>
// // // // // // // // // // //                     {patient.imageData && patient.imageData.length > 0 ? (
// // // // // // // // // // //                       <ul>
// // // // // // // // // // //                         {patient.imageData.map((image, i) => (
// // // // // // // // // // //                           <li key={i}>
// // // // // // // // // // //                             <strong>Image Name:</strong> {image.imageName} <br />
// // // // // // // // // // //                             <strong>Upload Date:</strong> {new Date(image.uploadDate).toLocaleString()} <br />
// // // // // // // // // // //                             <strong>Organization Name:</strong> {image.organizationName} <br />
// // // // // // // // // // //                             <strong>Image Path:</strong>
// // // // // // // // // // //                             <a href={`http://localhost:5001/${image.imagePath}`} target="_blank" rel="noopener noreferrer">
// // // // // // // // // // //                               View Image
// // // // // // // // // // //                             </a>
// // // // // // // // // // //                           </li>
// // // // // // // // // // //                         ))}
// // // // // // // // // // //                       </ul>
// // // // // // // // // // //                     ) : (
// // // // // // // // // // //                       <span>No images uploaded</span>
// // // // // // // // // // //                     )}
// // // // // // // // // // //                   </td>
// // // // // // // // // // //                     <td>
// // // // // // // // // // //                       <button
// // // // // // // // // // //                         onClick={() => setSelectedPatientId(patient.patientId)}
// // // // // // // // // // //                         className="upload-image-btn"
// // // // // // // // // // //                       >
// // // // // // // // // // //                         Update Image
// // // // // // // // // // //                       </button>
// // // // // // // // // // //                     </td>
// // // // // // // // // // //                   </tr>
// // // // // // // // // // //                 ))}
// // // // // // // // // // //               </tbody>
// // // // // // // // // // //             </table>

// // // // // // // // // // //             {selectedPatientId && (
// // // // // // // // // // //               <form onSubmit={handleUpload} className="upload-form">
// // // // // // // // // // //                 <h3>Update Image for Patient ID: {selectedPatientId}</h3>
// // // // // // // // // // //                 <div>
// // // // // // // // // // //                   <label htmlFor="file">Upload New Image</label>
// // // // // // // // // // //                   <input
// // // // // // // // // // //                     type="file"
// // // // // // // // // // //                     id="file"
// // // // // // // // // // //                     accept="image/*"
// // // // // // // // // // //                     onChange={(e) => setFile(e.target.files[0])}
// // // // // // // // // // //                   />
// // // // // // // // // // //                 </div>
// // // // // // // // // // //                 <button type="submit">Upload</button>
// // // // // // // // // // //               </form>
// // // // // // // // // // //             )}
// // // // // // // // // // //           </div>
// // // // // // // // // // //         )}

// // // // // // // // // // //         {error && <div className="alert alert-danger">{error}</div>}
// // // // // // // // // // //         {successMessage && <div className="alert alert-success">{successMessage}</div>}
// // // // // // // // // // //       </div>

// // // // // // // // // // //       {/* Modal for viewing image */}
// // // // // // // // // // //       {selectedImage && (
// // // // // // // // // // //         <div className="modal" onClick={closeModal}>
// // // // // // // // // // //           <span className="close" onClick={closeModal}>&times;</span>
// // // // // // // // // // //           <img className="modal-content" src={selectedImage} alt="Patient" />
// // // // // // // // // // //         </div>
// // // // // // // // // // //       )}
// // // // // // // // // // //     </div>
// // // // // // // // // // //   );
// // // // // // // // // // // };

// // // // // // // // // // // export default Organization;




// // // // // // // // // // import React, { useState, useEffect } from "react";
// // // // // // // // // // import axios from "axios";
// // // // // // // // // // import { useNavigate } from "react-router-dom";
// // // // // // // // // // import "./Organization.css";

// // // // // // // // // // const Organization = () => {
// // // // // // // // // //   const organizationName = localStorage.getItem("organizationName");
// // // // // // // // // //   const navigate = useNavigate();

// // // // // // // // // //   const [patients, setPatients] = useState([]);
// // // // // // // // // //   const [selectedImage, setSelectedImage] = useState(null); // State for the modal image
// // // // // // // // // //   const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

// // // // // // // // // //   // Fetch patients from the backend
// // // // // // // // // //   useEffect(() => {
// // // // // // // // // //     const fetchPatients = async () => {
// // // // // // // // // //       try {
// // // // // // // // // //         const response = await axios.get(`${process.env.REACT_APP_ORGANIZATION_RESPONSE_URL}/api/patients`);
// // // // // // // // // //         setPatients(response.data);
// // // // // // // // // //       } catch (error) {
// // // // // // // // // //         console.error("Error fetching patients:", error);
// // // // // // // // // //       }
// // // // // // // // // //     };

// // // // // // // // // //     fetchPatients();
// // // // // // // // // //   }, []);

// // // // // // // // // //   const handleLogout = () => {
// // // // // // // // // //     localStorage.clear();
// // // // // // // // // //     navigate("/Login");
// // // // // // // // // //   };

// // // // // // // // // //   // Open Modal with the selected image
// // // // // // // // // //   const openModal = (imagePath) => {
// // // // // // // // // //     setSelectedImage(imagePath);
// // // // // // // // // //     setIsModalOpen(true);
// // // // // // // // // //   };

// // // // // // // // // //   // Close the modal
// // // // // // // // // //   const closeModal = () => {
// // // // // // // // // //     setIsModalOpen(false);
// // // // // // // // // //     setSelectedImage(null);
// // // // // // // // // //   };

// // // // // // // // // //   return (
// // // // // // // // // //     <div className="organization-page">
// // // // // // // // // //       {/* Sidebar */}
// // // // // // // // // //       <div className="sidebar">
// // // // // // // // // //         <h4>Organization: {organizationName}</h4>
// // // // // // // // // //         <button onClick={handleLogout} className="logout-btn">
// // // // // // // // // //           Logout
// // // // // // // // // //         </button>
// // // // // // // // // //       </div>

// // // // // // // // // //       {/* Main Content */}
// // // // // // // // // //       <div className="main-content">
// // // // // // // // // //         {/* Existing Patients Section */}
// // // // // // // // // //         <div className="existing-patients">
// // // // // // // // // //           <h2>Existing Patients</h2>
// // // // // // // // // //           <table className="patients-table">
// // // // // // // // // //             <thead>
// // // // // // // // // //               <tr>
// // // // // // // // // //                 <th>Patient ID</th>
// // // // // // // // // //                 <th>Name</th>
// // // // // // // // // //                 <th>Email</th>
// // // // // // // // // //                 <th>Gender</th>
// // // // // // // // // //                 <th>Date of Birth</th>
// // // // // // // // // //                 <th>Referred Doctor</th>
// // // // // // // // // //                 <th>Image</th>
// // // // // // // // // //               </tr>
// // // // // // // // // //             </thead>
// // // // // // // // // //             <tbody>
// // // // // // // // // //               {patients.map((patient) => (
// // // // // // // // // //                 <tr key={patient.patientId}>
// // // // // // // // // //                   <td>{patient.patientId}</td>
// // // // // // // // // //                   <td>{patient.name}</td>
// // // // // // // // // //                   <td>{patient.email}</td>
// // // // // // // // // //                   <td>{patient.gender}</td>
// // // // // // // // // //                   <td>{patient.dateOfBirth}</td>
// // // // // // // // // //                   <td>{patient.referredDoctor}</td>
// // // // // // // // // //                   <td>
// // // // // // // // // //                     {patient.imageData && patient.imageData.length > 0 ? (
// // // // // // // // // //                       <div className="image-box">
// // // // // // // // // //                         {patient.imageData.map((image, i) => (
// // // // // // // // // //                           <div key={i}>
// // // // // // // // // //                             <img
// // // // // // // // // //                               src={`http://localhost:5001/${image.imagePath}`}
// // // // // // // // // //                               alt={`Patient Image ${i + 1}`}
// // // // // // // // // //                               className="patient-image"
// // // // // // // // // //                               onClick={() => openModal(`http://localhost:5001/${image.imagePath}`)} // Open image in modal on click
// // // // // // // // // //                             />
// // // // // // // // // //                           </div>
// // // // // // // // // //                         ))}
// // // // // // // // // //                       </div>
// // // // // // // // // //                     ) : (
// // // // // // // // // //                       <span>No images uploaded</span>
// // // // // // // // // //                     )}
// // // // // // // // // //                   </td>
// // // // // // // // // //                 </tr>
// // // // // // // // // //               ))}
// // // // // // // // // //             </tbody>
// // // // // // // // // //           </table>
// // // // // // // // // //         </div>
// // // // // // // // // //       </div>

// // // // // // // // // //       {/* Modal for Viewing Image */}
// // // // // // // // // //       {isModalOpen && (
// // // // // // // // // //         <div className="modal" onClick={closeModal}>
// // // // // // // // // //           <span className="close" onClick={closeModal}>
// // // // // // // // // //             &times;
// // // // // // // // // //           </span>
// // // // // // // // // //           <img className="modal-content" src={selectedImage} alt="Patient" />
// // // // // // // // // //         </div>
// // // // // // // // // //       )}
// // // // // // // // // //     </div>
// // // // // // // // // //   );
// // // // // // // // // // };

// // // // // // // // // // export default Organization;





// // // // // // // // // import React, { useState, useEffect } from "react";
// // // // // // // // // import axios from "axios";
// // // // // // // // // import { useNavigate } from "react-router-dom";
// // // // // // // // // import "./Organization.css";

// // // // // // // // // const Organization = () => {
// // // // // // // // //   const organizationName = localStorage.getItem("organizationName");
// // // // // // // // //   const navigate = useNavigate();

// // // // // // // // //   const [patients, setPatients] = useState([]);
// // // // // // // // //   const [file, setFile] = useState(null); // File selected for uploading
// // // // // // // // //   const [selectedPatientId, setSelectedPatientId] = useState(null); // Selected patient for update
// // // // // // // // //   const [selectedImage, setSelectedImage] = useState(null); // State for the modal image
// // // // // // // // //   const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

// // // // // // // // //   useEffect(() => {
// // // // // // // // //     const fetchPatients = async () => {
// // // // // // // // //       try {
// // // // // // // // //         const response = await axios.get(`${process.env.REACT_APP_ORGANIZATION_RESPONSE_URL}/api/patients`);
// // // // // // // // //         setPatients(response.data);
// // // // // // // // //       } catch (error) {
// // // // // // // // //         console.error("Error fetching patients:", error);
// // // // // // // // //       }
// // // // // // // // //     };

// // // // // // // // //     fetchPatients();
// // // // // // // // //   }, []);

// // // // // // // // //   const handleLogout = () => {
// // // // // // // // //     localStorage.clear();
// // // // // // // // //     navigate("/Login");
// // // // // // // // //   };

// // // // // // // // //   // Handle Image Upload for Patient
// // // // // // // // //   const handleUpload = async (e) => {
// // // // // // // // //     e.preventDefault();
// // // // // // // // //     if (!selectedPatientId || !file) {
// // // // // // // // //       alert("Please select a patient and an image to upload.");
// // // // // // // // //       return;
// // // // // // // // //     }

// // // // // // // // //     const formData = new FormData();
// // // // // // // // //     formData.append("patientId", selectedPatientId);
// // // // // // // // //     formData.append("organizationName", organizationName);
// // // // // // // // //     formData.append("image", file);


// // // // // // // // //     try {
// // // // // // // // //       const response = await axios.post(`${process.env.REACT_APP_ORGANIZATION_RESPONSE_UPLOAD_URL}/api/upload`, formData, {
// // // // // // // // //         headers: {
// // // // // // // // //           "Content-Type": "multipart/form-data",
// // // // // // // // //         },
// // // // // // // // //       });
// // // // // // // // //       alert(response.data.message);
// // // // // // // // //       setFile(null);
// // // // // // // // //       setSelectedPatientId(null);
// // // // // // // // //       fetchPatients(); // Fetch updated patient list
// // // // // // // // //     } catch (error) {
// // // // // // // // //       console.error("Error uploading image:", error);
// // // // // // // // //       alert("Failed to upload image.");
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   // Open Modal with the selected image
// // // // // // // // //   const openModal = (imagePath) => {
// // // // // // // // //     setSelectedImage(imagePath);
// // // // // // // // //     setIsModalOpen(true);
// // // // // // // // //   };

// // // // // // // // //   // Close the modal
// // // // // // // // //   const closeModal = () => {
// // // // // // // // //     setIsModalOpen(false);
// // // // // // // // //     setSelectedImage(null);
// // // // // // // // //   };

// // // // // // // // //   return (
// // // // // // // // //     <div className="organization-page">
// // // // // // // // //       {/* Sidebar */}
// // // // // // // // //       <div className="sidebar">
// // // // // // // // //         <h4>Organization: {organizationName}</h4>
// // // // // // // // //         <button onClick={handleLogout} className="logout-btn">
// // // // // // // // //           Logout
// // // // // // // // //         </button>
// // // // // // // // //       </div>

// // // // // // // // //       {/* Main Content */}
// // // // // // // // //       <div className="main-content">
// // // // // // // // //         {/* Existing Patients Section */}
// // // // // // // // //         <div className="existing-patients">
// // // // // // // // //           <h2>Existing Patients</h2>
// // // // // // // // //           <table className="patients-table">
// // // // // // // // //             <thead>
// // // // // // // // //               <tr>
// // // // // // // // //                 <th>Patient ID</th>
// // // // // // // // //                 <th>Name</th>
// // // // // // // // //                 <th>Email</th>
// // // // // // // // //                 <th>Gender</th>
// // // // // // // // //                 <th>Date of Birth</th>
// // // // // // // // //                 <th>Referred Doctor</th>
// // // // // // // // //                 <th>Image</th>
// // // // // // // // //                 <th>Update Image</th>
// // // // // // // // //               </tr>
// // // // // // // // //             </thead>
// // // // // // // // //             <tbody>
// // // // // // // // //               {patients.map((patient) => (
// // // // // // // // //                 <tr key={patient.patientId}>
// // // // // // // // //                   <td>{patient.patientId}</td>
// // // // // // // // //                   <td>{patient.name}</td>
// // // // // // // // //                   <td>{patient.email}</td>
// // // // // // // // //                   <td>{patient.gender}</td>
// // // // // // // // //                   <td>{patient.dateOfBirth}</td>
// // // // // // // // //                   <td>{patient.referredDoctor}</td>
// // // // // // // // //                   <td>
// // // // // // // // //                     {patient.imageData && patient.imageData.length > 0 ? (
// // // // // // // // //                       <div className="image-box">
// // // // // // // // //                         {patient.imageData.map((image, i) => (
// // // // // // // // //                           <div key={i}>
// // // // // // // // //                             <img
// // // // // // // // //                               src={`http://localhost:5001/${image.imagePath}`}
// // // // // // // // //                               alt={`Patient Image ${i + 1}`}
// // // // // // // // //                               className="patient-image"
// // // // // // // // //                               onClick={() => openModal(`http://localhost:5001/${image.imagePath}`)} // Open image in modal on click
// // // // // // // // //                             />
// // // // // // // // //                           </div>
// // // // // // // // //                         ))}
// // // // // // // // //                       </div>
// // // // // // // // //                     ) : (
// // // // // // // // //                       <span>No images uploaded</span>
// // // // // // // // //                     )}
// // // // // // // // //                   </td>
// // // // // // // // //                   <td>
// // // // // // // // //                     <button
// // // // // // // // //                       onClick={() => setSelectedPatientId(patient.patientId)} 
// // // // // // // // //                       className="upload-image-btn"
// // // // // // // // //                     >
// // // // // // // // //                       Update Image
// // // // // // // // //                     </button>
// // // // // // // // //                   </td>
// // // // // // // // //                 </tr>
// // // // // // // // //               ))}
// // // // // // // // //             </tbody>
// // // // // // // // //           </table>
// // // // // // // // //         </div>

// // // // // // // // //         {/* Form for Updating Image */}
// // // // // // // // //         {selectedPatientId && (
// // // // // // // // //           <form onSubmit={handleUpload} className="upload-form">
// // // // // // // // //             <h3>Update Image for Patient ID: {selectedPatientId}</h3>
// // // // // // // // //             <div>
// // // // // // // // //               <label htmlFor="file">Upload New Image</label>
// // // // // // // // //               <input
// // // // // // // // //                 type="file"
// // // // // // // // //                 id="file"
// // // // // // // // //                 accept="image/*"
// // // // // // // // //                 onChange={(e) => setFile(e.target.files[0])}
// // // // // // // // //               />
// // // // // // // // //             </div>
// // // // // // // // //             <button type="submit">Upload Image</button>
// // // // // // // // //           </form>
// // // // // // // // //         )}
// // // // // // // // //       </div>

// // // // // // // // //       {/* Modal for Viewing Image */}
// // // // // // // // //       {isModalOpen && (
// // // // // // // // //         <div className="modal" onClick={closeModal}>
// // // // // // // // //           <span className="close" onClick={closeModal}>
// // // // // // // // //             &times;
// // // // // // // // //           </span>
// // // // // // // // //           <img className="modal-content" src={selectedImage} alt="Patient" />
// // // // // // // // //         </div>
// // // // // // // // //       )}
// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // };

// // // // // // // // // export default Organization;



// // // // // // // // import React, { useState, useEffect } from "react";
// // // // // // // // import axios from "axios";
// // // // // // // // import { useNavigate } from "react-router-dom";
// // // // // // // // import "./Organization.css";

// // // // // // // // const Organization = () => {
// // // // // // // //   const organizationName = localStorage.getItem("organizationName");
// // // // // // // //   const navigate = useNavigate();

// // // // // // // //   const [patients, setPatients] = useState([]);
// // // // // // // //   const [file, setFile] = useState(null); // File selected for uploading
// // // // // // // //   const [selectedPatientId, setSelectedPatientId] = useState(null); // Selected patient for update
// // // // // // // //   const [selectedImage, setSelectedImage] = useState(null); // State for the modal image
// // // // // // // //   const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

// // // // // // // //   // Fetch patients from the server
// // // // // // // //   const fetchPatients = async () => {
// // // // // // // //     try {
// // // // // // // //       const response = await axios.get(`${process.env.REACT_APP_ORGANIZATION_RESPONSE_URL}/api/patients`);
// // // // // // // //       setPatients(response.data);
// // // // // // // //     } catch (error) {
// // // // // // // //       console.error("Error fetching patients:", error);
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   useEffect(() => {
// // // // // // // //     fetchPatients(); // Fetch patients when the component mounts
// // // // // // // //   }, []);

// // // // // // // //   const handleLogout = () => {
// // // // // // // //     localStorage.clear();
// // // // // // // //     navigate("/Login");
// // // // // // // //   };

// // // // // // // //   // Handle Image Upload for Patient
// // // // // // // //   const handleUpload = async (e) => {
// // // // // // // //     e.preventDefault();
// // // // // // // //     if (!selectedPatientId || !file) {
// // // // // // // //       alert("Please select a patient and an image to upload.");
// // // // // // // //       return;
// // // // // // // //     }

// // // // // // // //     const formData = new FormData();
// // // // // // // //     formData.append("patientId", selectedPatientId);
// // // // // // // //     formData.append("organizationName", organizationName);
// // // // // // // //     formData.append("image", file);

// // // // // // // //     try {
// // // // // // // //       const response = await axios.post(`${process.env.REACT_APP_ORGANIZATION_RESPONSE_UPLOAD_URL}/api/upload`, formData, {
// // // // // // // //         headers: {
// // // // // // // //           "Content-Type": "multipart/form-data",
// // // // // // // //         },
// // // // // // // //       });
// // // // // // // //       alert(response.data.message);
// // // // // // // //       setFile(null);
// // // // // // // //       setSelectedPatientId(null);
// // // // // // // //       fetchPatients(); // Fetch updated patient list after image upload
// // // // // // // //     } catch (error) {
// // // // // // // //       console.error("Error uploading image:", error);
// // // // // // // //       alert("Failed to upload image.");
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   // Open Modal with the selected image
// // // // // // // //   const openModal = (imagePath) => {
// // // // // // // //     setSelectedImage(imagePath);
// // // // // // // //     setIsModalOpen(true);
// // // // // // // //   };

// // // // // // // //   // Close the modal
// // // // // // // //   const closeModal = () => {
// // // // // // // //     setIsModalOpen(false);
// // // // // // // //     setSelectedImage(null);
// // // // // // // //   };

// // // // // // // //   return (
// // // // // // // //     <div className="organization-page">
// // // // // // // //       {/* Sidebar */}
// // // // // // // //       <div className="sidebar">
// // // // // // // //         <h4>Organization: {organizationName}</h4>
// // // // // // // //         <button onClick={handleLogout} className="logout-btn">
// // // // // // // //           Logout
// // // // // // // //         </button>
// // // // // // // //       </div>

// // // // // // // //       {/* Main Content */}
// // // // // // // //       <div className="main-content">
// // // // // // // //         {/* Existing Patients Section */}
// // // // // // // //         <div className="existing-patients">
// // // // // // // //           <h2>Existing Patients</h2>
// // // // // // // //           <table className="patients-table">
// // // // // // // //             <thead>
// // // // // // // //               <tr>
// // // // // // // //                 <th>Patient ID</th>
// // // // // // // //                 <th>Name</th>
// // // // // // // //                 <th>Email</th>
// // // // // // // //                 <th>Gender</th>
// // // // // // // //                 <th>Date of Birth</th>
// // // // // // // //                 <th>Referred Doctor</th>
// // // // // // // //                 <th>Image</th>
// // // // // // // //                 <th>Update Image</th>
// // // // // // // //               </tr>
// // // // // // // //             </thead>
// // // // // // // //             <tbody>
// // // // // // // //               {patients.map((patient) => (
// // // // // // // //                 <tr key={patient.patientId}>
// // // // // // // //                   <td>{patient.patientId}</td>
// // // // // // // //                   <td>{patient.name}</td>
// // // // // // // //                   <td>{patient.email}</td>
// // // // // // // //                   <td>{patient.gender}</td>
// // // // // // // //                   <td>{patient.dateOfBirth}</td>
// // // // // // // //                   <td>{patient.referredDoctor}</td>
// // // // // // // //                   <td>
// // // // // // // //                     {patient.imageData && patient.imageData.length > 0 ? (
// // // // // // // //                       <div className="image-box">
// // // // // // // //                         {patient.imageData.map((image, i) => (
// // // // // // // //                           <div key={i}>
// // // // // // // //                             <img
// // // // // // // //                               src={`http://localhost:5001/${image.imagePath}`}
// // // // // // // //                               alt={`Patient Image ${i + 1}`}
// // // // // // // //                               className="patient-image"
// // // // // // // //                               onClick={() => openModal(`http://localhost:5001/${image.imagePath}`)} // Open image in modal on click
// // // // // // // //                             />
// // // // // // // //                           </div>
// // // // // // // //                         ))}
// // // // // // // //                       </div>
// // // // // // // //                     ) : (
// // // // // // // //                       <span>No images uploaded</span>
// // // // // // // //                     )}
// // // // // // // //                   </td>
// // // // // // // //                   <td>
// // // // // // // //                     <button
// // // // // // // //                       onClick={() => setSelectedPatientId(patient.patientId)} 
// // // // // // // //                       className="upload-image-btn"
// // // // // // // //                     >
// // // // // // // //                       Update Image
// // // // // // // //                     </button>
// // // // // // // //                   </td>
// // // // // // // //                 </tr>
// // // // // // // //               ))}
// // // // // // // //             </tbody>
// // // // // // // //           </table>
// // // // // // // //         </div>

// // // // // // // //         {/* Form for Updating Image */}
// // // // // // // //         {selectedPatientId && (
// // // // // // // //           <form onSubmit={handleUpload} className="upload-form">
// // // // // // // //             <h3>Update Image for Patient ID: {selectedPatientId}</h3>
// // // // // // // //             <div>
// // // // // // // //               <label htmlFor="file">Upload New Image</label>
// // // // // // // //               <input
// // // // // // // //                 type="file"
// // // // // // // //                 id="file"
// // // // // // // //                 accept="image/*"
// // // // // // // //                 onChange={(e) => setFile(e.target.files[0])}
// // // // // // // //               />
// // // // // // // //             </div>
// // // // // // // //             <button type="submit">Upload Image</button>
// // // // // // // //           </form>
// // // // // // // //         )}
// // // // // // // //       </div>

// // // // // // // //       {/* Modal for Viewing Image */}
// // // // // // // //       {isModalOpen && (
// // // // // // // //         <div className="modal" onClick={closeModal}>
// // // // // // // //           <span className="close" onClick={closeModal}>
// // // // // // // //             &times;
// // // // // // // //           </span>
// // // // // // // //           <img className="modal-content" src={selectedImage} alt="Patient" />
// // // // // // // //         </div>
// // // // // // // //       )}
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // };

// // // // // // // // export default Organization;



// // // // // // // import React, { useState, useEffect } from "react";
// // // // // // // import axios from "axios";
// // // // // // // import { useNavigate } from "react-router-dom";
// // // // // // // import "./Organization.css";

// // // // // // // const Organization = () => {
// // // // // // //   const organizationName = localStorage.getItem("organizationName");
// // // // // // //   const navigate = useNavigate();

// // // // // // //   const [patients, setPatients] = useState([]);
// // // // // // //   const [file, setFile] = useState(null); // File selected for uploading
// // // // // // //   const [selectedPatientId, setSelectedPatientId] = useState(null); // Selected patient for update
// // // // // // //   const [selectedImage, setSelectedImage] = useState(null); // State for the modal image
// // // // // // //   const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
// // // // // // //   const [isAddNewPatient, setIsAddNewPatient] = useState(false); // Show Add New Patient Form
// // // // // // //   const [newPatient, setNewPatient] = useState({
// // // // // // //     name: "",
// // // // // // //     email: "",
// // // // // // //     patientId: "",
// // // // // // //     gender: "",
// // // // // // //     dateOfBirth: "",
// // // // // // //     referredDoctor: "",
// // // // // // //   });

// // // // // // //   // Fetch patients from the server
// // // // // // //   const fetchPatients = async () => {
// // // // // // //     try {
// // // // // // //       const response = await axios.get(`${process.env.REACT_APP_ORGANIZATION_RESPONSE_URL}/api/patients`);
// // // // // // //       setPatients(response.data);
// // // // // // //     } catch (error) {
// // // // // // //       console.error("Error fetching patients:", error);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   useEffect(() => {
// // // // // // //     fetchPatients(); // Fetch patients when the component mounts
// // // // // // //   }, []);

// // // // // // //   const handleLogout = () => {
// // // // // // //     localStorage.clear();
// // // // // // //     navigate("/Login");
// // // // // // //   };

// // // // // // //   // Handle Image Upload for Patient
// // // // // // //   const handleUpload = async (e) => {
// // // // // // //     e.preventDefault();
// // // // // // //     if (!selectedPatientId || !file) {
// // // // // // //       alert("Please select a patient and an image to upload.");
// // // // // // //       return;
// // // // // // //     }

// // // // // // //     const formData = new FormData();
// // // // // // //     formData.append("patientId", selectedPatientId);
// // // // // // //     formData.append("organizationName", organizationName);
// // // // // // //     formData.append("image", file);

// // // // // // //     try {
// // // // // // //       const response = await axios.post(`${process.env.REACT_APP_ORGANIZATION_RESPONSE_UPLOAD_URL}/api/upload`, formData, {
// // // // // // //         headers: {
// // // // // // //           "Content-Type": "multipart/form-data",
// // // // // // //         },
// // // // // // //       });
// // // // // // //       alert(response.data.message);
// // // // // // //       setFile(null);
// // // // // // //       setSelectedPatientId(null);
// // // // // // //       fetchPatients(); // Fetch updated patient list after image upload
// // // // // // //     } catch (error) {
// // // // // // //       console.error("Error uploading image:", error);
// // // // // // //       alert("Failed to upload image.");
// // // // // // //     }
// // // // // // //   };

// // // // // // //   // Handle Adding a New Patient
// // // // // // //   const handleAddNewPatient = async (e) => {
// // // // // // //     e.preventDefault();
// // // // // // //     const { name, email, patientId, gender, dateOfBirth, referredDoctor } = newPatient;

// // // // // // //     if (!name || !email || !patientId || !gender || !dateOfBirth || !referredDoctor) {
// // // // // // //       alert("All fields are required.");
// // // // // // //       return;
// // // // // // //     }

// // // // // // //     try {
// // // // // // //       const response = await axios.post(`${process.env.REACT_APP_ORGANIZATION_RESPONSE_URL}/api/signup`, {
// // // // // // //         name,
// // // // // // //         email,
// // // // // // //         role: "patient",
// // // // // // //         patientId,
// // // // // // //         gender,
// // // // // // //         dateOfBirth,
// // // // // // //         referredDoctor,
// // // // // // //         organizationName,
// // // // // // //       });
// // // // // // //       alert(response.data.message);
// // // // // // //       setNewPatient({
// // // // // // //         name: "",
// // // // // // //         email: "",
// // // // // // //         patientId: "",
// // // // // // //         gender: "",
// // // // // // //         dateOfBirth: "",
// // // // // // //         referredDoctor: "",
// // // // // // //       });
// // // // // // //       setIsAddNewPatient(false); // Close "Add New Patient" form after submission
// // // // // // //       fetchPatients(); // Fetch updated patient list after adding new patient
// // // // // // //     } catch (error) {
// // // // // // //       console.error("Error adding new patient:", error);
// // // // // // //       alert("Failed to add new patient.");
// // // // // // //     }
// // // // // // //   };

// // // // // // //   // Open Modal with the selected image
// // // // // // //   const openModal = (imagePath) => {
// // // // // // //     setSelectedImage(imagePath);
// // // // // // //     setIsModalOpen(true);
// // // // // // //   };

// // // // // // //   // Close the modal
// // // // // // //   const closeModal = () => {
// // // // // // //     setIsModalOpen(false);
// // // // // // //     setSelectedImage(null);
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <div className="organization-page">
// // // // // // //       {/* Sidebar */}
// // // // // // //       <div className="sidebar">
// // // // // // //         <h4>Organization: {organizationName}</h4>
// // // // // // //         <button onClick={handleLogout} className="logout-btn">
// // // // // // //           Logout
// // // // // // //         </button>
// // // // // // //       </div>

// // // // // // //       {/* Main Content */}
// // // // // // //       <div className="main-content">
// // // // // // //         {/* Button Section for Toggle Between Add New Patient and Existing Patients */}
// // // // // // //         <div className="button-section">
// // // // // // //           <button
// // // // // // //             className={`action-btn ${!isAddNewPatient ? "active" : ""}`}
// // // // // // //             onClick={() => setIsAddNewPatient(false)}
// // // // // // //           >
// // // // // // //             Existing Patients
// // // // // // //           </button>
// // // // // // //           <button
// // // // // // //             className={`action-btn ${isAddNewPatient ? "active" : ""}`}
// // // // // // //             onClick={() => setIsAddNewPatient(true)}
// // // // // // //           >
// // // // // // //             Add New Patient
// // // // // // //           </button>
// // // // // // //         </div>

// // // // // // //         {/* Add New Patient Form */}
// // // // // // //         {isAddNewPatient ? (
// // // // // // //           <div className="add-new-patient-form">
// // // // // // //             <h2>Add New Patient</h2>
// // // // // // //             <form onSubmit={handleAddNewPatient}>
// // // // // // //               <input
// // // // // // //                 type="text"
// // // // // // //                 placeholder="Name"
// // // // // // //                 value={newPatient.name}
// // // // // // //                 onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
// // // // // // //               />
// // // // // // //               <input
// // // // // // //                 type="email"
// // // // // // //                 placeholder="Email"
// // // // // // //                 value={newPatient.email}
// // // // // // //                 onChange={(e) => setNewPatient({ ...newPatient, email: e.target.value })}
// // // // // // //               />
// // // // // // //               <input
// // // // // // //                 type="text"
// // // // // // //                 placeholder="Patient ID"
// // // // // // //                 value={newPatient.patientId}
// // // // // // //                 onChange={(e) => setNewPatient({ ...newPatient, patientId: e.target.value })}
// // // // // // //               />
// // // // // // //               <select
// // // // // // //                 value={newPatient.gender}
// // // // // // //                 onChange={(e) => setNewPatient({ ...newPatient, gender: e.target.value })}
// // // // // // //               >
// // // // // // //                 <option value="">Gender</option>
// // // // // // //                 <option value="Male">Male</option>
// // // // // // //                 <option value="Female">Female</option>
// // // // // // //                 <option value="Other">Other</option>
// // // // // // //               </select>
// // // // // // //               <input
// // // // // // //                 type="date"
// // // // // // //                 placeholder="Date of Birth"
// // // // // // //                 value={newPatient.dateOfBirth}
// // // // // // //                 onChange={(e) => setNewPatient({ ...newPatient, dateOfBirth: e.target.value })}
// // // // // // //               />
// // // // // // //               <input
// // // // // // //                 type="text"
// // // // // // //                 placeholder="Referred Doctor"
// // // // // // //                 value={newPatient.referredDoctor}
// // // // // // //                 onChange={(e) => setNewPatient({ ...newPatient, referredDoctor: e.target.value })}
// // // // // // //               />
// // // // // // //               <button type="submit">Add Patient</button>
// // // // // // //             </form>
// // // // // // //           </div>
// // // // // // //         ) : (
// // // // // // //           // Existing Patients Section
// // // // // // //           <div className="existing-patients">
// // // // // // //             <h2>Existing Patients</h2>
// // // // // // //             <table className="patients-table">
// // // // // // //               <thead>
// // // // // // //                 <tr>
// // // // // // //                   <th>Patient ID</th>
// // // // // // //                   <th>Name</th>
// // // // // // //                   <th>Email</th>
// // // // // // //                   <th>Gender</th>
// // // // // // //                   <th>Date of Birth</th>
// // // // // // //                   <th>Referred Doctor</th>
// // // // // // //                   <th>Image</th>
// // // // // // //                   <th>Update Image</th>
// // // // // // //                 </tr>
// // // // // // //               </thead>
// // // // // // //               <tbody>
// // // // // // //                 {patients.map((patient) => (
// // // // // // //                   <tr key={patient.patientId}>
// // // // // // //                     <td>{patient.patientId}</td>
// // // // // // //                     <td>{patient.name}</td>
// // // // // // //                     <td>{patient.email}</td>
// // // // // // //                     <td>{patient.gender}</td>
// // // // // // //                     <td>{patient.dateOfBirth}</td>
// // // // // // //                     <td>{patient.referredDoctor}</td>
// // // // // // //                     <td>
// // // // // // //                       {patient.imageData && patient.imageData.length > 0 ? (
// // // // // // //                         <div className="image-box">
// // // // // // //                           {patient.imageData.map((image, i) => (
// // // // // // //                             <div key={i}>
// // // // // // //                               <img
// // // // // // //                                 src={`http://localhost:5001/${image.imagePath}`}
// // // // // // //                                 alt={`Patient Image ${i + 1}`}
// // // // // // //                                 className="patient-image"
// // // // // // //                                 onClick={() => openModal(`http://localhost:5001/${image.imagePath}`)} // Open image in modal on click
// // // // // // //                               />
// // // // // // //                             </div>
// // // // // // //                           ))}
// // // // // // //                         </div>
// // // // // // //                       ) : (
// // // // // // //                         <span>No images uploaded</span>
// // // // // // //                       )}
// // // // // // //                     </td>
// // // // // // //                     <td>
// // // // // // //                       <button
// // // // // // //                         onClick={() => setSelectedPatientId(patient.patientId)} 
// // // // // // //                         className="upload-image-btn"
// // // // // // //                       >
// // // // // // //                         Update Image
// // // // // // //                       </button>
// // // // // // //                     </td>
// // // // // // //                   </tr>
// // // // // // //                 ))}
// // // // // // //               </tbody>
// // // // // // //             </table>
// // // // // // //           </div>
// // // // // // //         )}

// // // // // // //         {/* Form for Updating Image */}
// // // // // // //         {selectedPatientId && (
// // // // // // //           <form onSubmit={handleUpload} className="upload-form">
// // // // // // //             <h3>Update Image for Patient ID: {selectedPatientId}</h3>
// // // // // // //             <div>
// // // // // // //               <label htmlFor="file">Upload New Image</label>
// // // // // // //               <input
// // // // // // //                 type="file"
// // // // // // //                 id="file"
// // // // // // //                 accept="image/*"
// // // // // // //                 onChange={(e) => setFile(e.target.files[0])}
// // // // // // //               />
// // // // // // //             </div>
// // // // // // //             <button type="submit">Upload Image</button>
// // // // // // //           </form>
// // // // // // //         )}
// // // // // // //       </div>

// // // // // // //       {/* Modal for Viewing Image */}
// // // // // // //       {isModalOpen && (
// // // // // // //         <div className="modal" onClick={closeModal}>
// // // // // // //           <span className="close" onClick={closeModal}>
// // // // // // //             &times;
// // // // // // //           </span>
// // // // // // //           <img className="modal-content" src={selectedImage} alt="Patient" />
// // // // // // //         </div>
// // // // // // //       )}
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // };

// // // // // // // export default Organization;





// // // // // // import React, { useState, useEffect } from "react";
// // // // // // import axios from "axios";
// // // // // // import { useNavigate } from "react-router-dom";
// // // // // // import "./Organization.css";

// // // // // // const Organization = () => {
// // // // // //   const organizationName = localStorage.getItem("organizationName");
// // // // // //   const navigate = useNavigate();

// // // // // //   const [patients, setPatients] = useState([]);
// // // // // //   const [file, setFile] = useState(null); // File selected for uploading
// // // // // //   const [selectedPatientId, setSelectedPatientId] = useState(null); // Selected patient for update
// // // // // //   const [selectedImage, setSelectedImage] = useState(null); // State for the modal image
// // // // // //   const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
// // // // // //   const [isAddNewPatient, setIsAddNewPatient] = useState(false); // Show Add New Patient Form
// // // // // //   const [newPatient, setNewPatient] = useState({
// // // // // //     name: "",
// // // // // //     email: "",
// // // // // //     patientId: "",
// // // // // //     gender: "",
// // // // // //     dateOfBirth: "",
// // // // // //     referredDoctor: "",
// // // // // //   });

// // // // // //   // Fetch patients from the server
// // // // // //   const fetchPatients = async () => {
// // // // // //     try {
// // // // // //       const response = await axios.get(
// // // // // //         `${process.env.REACT_APP_ORGANIZATION_RESPONSE_URL}/api/patients`
// // // // // //       );
// // // // // //       setPatients(response.data);
// // // // // //     } catch (error) {
// // // // // //       console.error("Error fetching patients:", error);
// // // // // //     }
// // // // // //   };

// // // // // //   useEffect(() => {
// // // // // //     fetchPatients(); // Fetch patients when the component mounts
// // // // // //   }, []);

// // // // // //   const handleLogout = () => {
// // // // // //     localStorage.clear();
// // // // // //     navigate("/Login");
// // // // // //   };

// // // // // //   // Handle Image Upload for Patient
// // // // // //   const handleUpload = async (e) => {
// // // // // //     e.preventDefault();
// // // // // //     if (!selectedPatientId || !file) {
// // // // // //       alert("Please select a patient and an image to upload.");
// // // // // //       return;
// // // // // //     }

// // // // // //     const formData = new FormData();
// // // // // //     formData.append("patientId", selectedPatientId);
// // // // // //     formData.append("organizationName", organizationName);
// // // // // //     formData.append("image", file);

// // // // // //     try {
// // // // // //       const response = await axios.post(
// // // // // //         `${process.env.REACT_APP_ORGANIZATION_RESPONSE_UPLOAD_URL}/api/upload`,
// // // // // //         formData,
// // // // // //         {
// // // // // //           headers: {
// // // // // //             "Content-Type": "multipart/form-data",
// // // // // //           },
// // // // // //         }
// // // // // //       );
// // // // // //       alert(response.data.message);
// // // // // //       setFile(null);
// // // // // //       setSelectedPatientId(null);
// // // // // //       fetchPatients(); // Fetch updated patient list after image upload
// // // // // //     } catch (error) {
// // // // // //       console.error("Error uploading image:", error);
// // // // // //       alert("Failed to upload image.");
// // // // // //     }
// // // // // //   };

// // // // // //   // Handle Adding a New Patient
// // // // // //   const handleAddNewPatient = async (e) => {
// // // // // //     e.preventDefault();
// // // // // //     const { name, email, patientId, gender, dateOfBirth, referredDoctor } = newPatient;

// // // // // //     if (!name || !email || !patientId || !gender || !dateOfBirth || !referredDoctor) {
// // // // // //       alert("All fields are required.");
// // // // // //       return;
// // // // // //     }

// // // // // //     try {
// // // // // //       const response = await axios.post(
// // // // // //         `${process.env.REACT_APP_ORGANIZATION_RESPONSE_URL}/api/signup`,
// // // // // //         {
// // // // // //           name,
// // // // // //           email,
// // // // // //           role: "patient",
// // // // // //           patientId,
// // // // // //           gender,
// // // // // //           dateOfBirth,
// // // // // //           referredDoctor,
// // // // // //           organizationName,
// // // // // //         }
// // // // // //       );
// // // // // //       alert(response.data.message);
// // // // // //       setNewPatient({
// // // // // //         name: "",
// // // // // //         email: "",
// // // // // //         patientId: "",
// // // // // //         gender: "",
// // // // // //         dateOfBirth: "",
// // // // // //         referredDoctor: "",
// // // // // //       });
// // // // // //       setIsAddNewPatient(false); // Close "Add New Patient" form after submission
// // // // // //       fetchPatients(); // Fetch updated patient list after adding new patient
// // // // // //     } catch (error) {
// // // // // //       console.error("Error adding new patient:", error);
// // // // // //       alert("Failed to add new patient.");
// // // // // //     }
// // // // // //   };

// // // // // //   // Open Modal with the selected image
// // // // // //   const openModal = (imagePath) => {
// // // // // //     setSelectedImage(imagePath);
// // // // // //     setIsModalOpen(true);
// // // // // //   };

// // // // // //   // Close the modal
// // // // // //   const closeModal = () => {
// // // // // //     setIsModalOpen(false);
// // // // // //     setSelectedImage(null);
// // // // // //   };

// // // // // //   return (
// // // // // //     <div className="organization-page">
// // // // // //       {/* Sidebar */}
// // // // // //       <div className="sidebar">
// // // // // //         <h4 className="organization-name">Organization: {organizationName}</h4>
// // // // // //         <button onClick={handleLogout} className="logout-btn">
// // // // // //           Logout
// // // // // //         </button>
// // // // // //       </div>

// // // // // //       {/* Main Content */}
// // // // // //       <div className="main-content">
// // // // // //         {/* Toggle Buttons for Existing Patients vs. Add New Patient */}
// // // // // //         <div className="button-section">
// // // // // //           <button
// // // // // //             className={`action-btn ${!isAddNewPatient ? "active" : ""}`}
// // // // // //             onClick={() => setIsAddNewPatient(false)}
// // // // // //           >
// // // // // //             Existing Patients
// // // // // //           </button>
// // // // // //           <button
// // // // // //             className={`action-btn ${isAddNewPatient ? "active" : ""}`}
// // // // // //             onClick={() => setIsAddNewPatient(true)}
// // // // // //           >
// // // // // //             Add New Patient
// // // // // //           </button>
// // // // // //         </div>

// // // // // //         {/* Add New Patient Form */}
// // // // // //         {isAddNewPatient ? (
// // // // // //           <div className="add-new-patient-form fade-in">
// // // // // //             <h2>Add New Patient</h2>
// // // // // //             <form onSubmit={handleAddNewPatient}>
// // // // // //               <input
// // // // // //                 type="text"
// // // // // //                 placeholder="Name"
// // // // // //                 value={newPatient.name}
// // // // // //                 onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
// // // // // //               />
// // // // // //               <input
// // // // // //                 type="email"
// // // // // //                 placeholder="Email"
// // // // // //                 value={newPatient.email}
// // // // // //                 onChange={(e) => setNewPatient({ ...newPatient, email: e.target.value })}
// // // // // //               />
// // // // // //               <input
// // // // // //                 type="text"
// // // // // //                 placeholder="Patient ID"
// // // // // //                 value={newPatient.patientId}
// // // // // //                 onChange={(e) => setNewPatient({ ...newPatient, patientId: e.target.value })}
// // // // // //               />
// // // // // //               <select
// // // // // //                 value={newPatient.gender}
// // // // // //                 onChange={(e) => setNewPatient({ ...newPatient, gender: e.target.value })}
// // // // // //               >
// // // // // //                 <option value="">Gender</option>
// // // // // //                 <option value="Male">Male</option>
// // // // // //                 <option value="Female">Female</option>
// // // // // //                 <option value="Other">Other</option>
// // // // // //               </select>
// // // // // //               <input
// // // // // //                 type="date"
// // // // // //                 placeholder="Date of Birth"
// // // // // //                 value={newPatient.dateOfBirth}
// // // // // //                 onChange={(e) => setNewPatient({ ...newPatient, dateOfBirth: e.target.value })}
// // // // // //               />
// // // // // //               <input
// // // // // //                 type="text"
// // // // // //                 placeholder="Referred Doctor"
// // // // // //                 value={newPatient.referredDoctor}
// // // // // //                 onChange={(e) => setNewPatient({ ...newPatient, referredDoctor: e.target.value })}
// // // // // //               />
// // // // // //               <button type="submit" className="submit-btn">
// // // // // //                 Add Patient
// // // // // //               </button>
// // // // // //             </form>
// // // // // //           </div>
// // // // // //         ) : (
// // // // // //           // Existing Patients Section
// // // // // //           <div className="existing-patients fade-in">
// // // // // //             <h2>Existing Patients</h2>
// // // // // //             <table className="patients-table">
// // // // // //               <thead>
// // // // // //                 <tr>
// // // // // //                   <th>Patient ID</th>
// // // // // //                   <th>Name</th>
// // // // // //                   <th>Email</th>
// // // // // //                   <th>Gender</th>
// // // // // //                   <th>Date of Birth</th>
// // // // // //                   <th>Referred Doctor</th>
// // // // // //                   <th>Image</th>
// // // // // //                   <th>Update Image</th>
// // // // // //                 </tr>
// // // // // //               </thead>
// // // // // //               <tbody>
// // // // // //                 {patients.map((patient) => (
// // // // // //                   <tr key={patient.patientId}>
// // // // // //                     <td>{patient.patientId}</td>
// // // // // //                     <td>{patient.name}</td>
// // // // // //                     <td>{patient.email}</td>
// // // // // //                     <td>{patient.gender}</td>
// // // // // //                     <td>{patient.dateOfBirth}</td>
// // // // // //                     <td>{patient.referredDoctor}</td>
// // // // // //                     <td>
// // // // // //                       {patient.imageData && patient.imageData.length > 0 ? (
// // // // // //                         <div className="image-box">
// // // // // //                           {patient.imageData.map((image, i) => (
// // // // // //                             <div key={i} className="thumbnail-box">
// // // // // //                               <img
// // // // // //                                 src={`http://localhost:5001/${image.imagePath}`}
// // // // // //                                 alt={`Patient Image ${i + 1}`}
// // // // // //                                 className="patient-image"
// // // // // //                                 onClick={() =>
// // // // // //                                   openModal(`http://localhost:5001/${image.imagePath}`)
// // // // // //                                 }
// // // // // //                               />
// // // // // //                             </div>
// // // // // //                           ))}
// // // // // //                         </div>
// // // // // //                       ) : (
// // // // // //                         <span>No images uploaded</span>
// // // // // //                       )}
// // // // // //                     </td>
// // // // // //                     <td>
// // // // // //                       <button
// // // // // //                         onClick={() => setSelectedPatientId(patient.patientId)}
// // // // // //                         className="upload-image-btn"
// // // // // //                       >
// // // // // //                         Update Image
// // // // // //                       </button>
// // // // // //                     </td>
// // // // // //                   </tr>
// // // // // //                 ))}
// // // // // //               </tbody>
// // // // // //             </table>
// // // // // //           </div>
// // // // // //         )}

// // // // // //         {/* Form for Updating Image */}
// // // // // //         {selectedPatientId && (
// // // // // //           <form onSubmit={handleUpload} className="upload-form fade-in-up">
// // // // // //             <h3>Update Image for Patient ID: {selectedPatientId}</h3>
// // // // // //             <div className="file-upload-row">
// // // // // //               <label htmlFor="file" className="file-label">
// // // // // //                 Choose a File:
// // // // // //               </label>
// // // // // //               <input
// // // // // //                 type="file"
// // // // // //                 id="file"
// // // // // //                 accept="image/*"
// // // // // //                 onChange={(e) => setFile(e.target.files[0])}
// // // // // //               />
// // // // // //             </div>
// // // // // //             <button type="submit" className="submit-btn">
// // // // // //               Upload Image
// // // // // //             </button>
// // // // // //           </form>
// // // // // //         )}
// // // // // //       </div>

// // // // // //       {/* Modal for Viewing Image */}
// // // // // //       {isModalOpen && (
// // // // // //         <div className="modal" onClick={closeModal}>
// // // // // //           <div className="modal-content">
// // // // // //             <span className="close" onClick={closeModal}>
// // // // // //               &times;
// // // // // //             </span>
// // // // // //             <img className="modal-image" src={selectedImage} alt="Patient" />
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       )}
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default Organization;



// // // // // import React, { useState, useEffect } from "react";
// // // // // import axios from "axios";
// // // // // import { useNavigate } from "react-router-dom";
// // // // // import "./Organization.css";

// // // // // const Organization = () => {
// // // // //   const organizationName = localStorage.getItem("organizationName");
// // // // //   const navigate = useNavigate();

// // // // //   const [patients, setPatients] = useState([]);
// // // // //   const [file, setFile] = useState(null);
// // // // //   const [selectedPatientId, setSelectedPatientId] = useState(null);
// // // // //   const [isModalOpen, setIsModalOpen] = useState(false);
// // // // //   const [newPatient, setNewPatient] = useState({
// // // // //     firstName: "",
// // // // //     lastName: "",
// // // // //     patientId: "",
// // // // //     dob: "",
// // // // //     gender: "",
// // // // //     referredDoctor: ""
// // // // //   });

// // // // //   // Fetch patients when component mounts
// // // // //   const fetchPatients = async () => {
// // // // //     try {
// // // // //       const response = await axios.get(
// // // // //         `${process.env.REACT_APP_ORGANIZATION_RESPONSE_URL}/api/patients`
// // // // //       );
// // // // //       setPatients(response.data);
// // // // //     } catch (error) {
// // // // //       console.error("Error fetching patients:", error);
// // // // //     }
// // // // //   };

// // // // //   useEffect(() => {
// // // // //     fetchPatients();
// // // // //   }, []);

// // // // //   const handleLogout = () => {
// // // // //     localStorage.clear();
// // // // //     navigate("/Login");
// // // // //   };

// // // // //   // Handle image upload for a patient
// // // // //   const handleUpload = async (e) => {
// // // // //     e.preventDefault();
// // // // //     if (!selectedPatientId || !file) {
// // // // //       alert("Please select a patient and an image to upload.");
// // // // //       return;
// // // // //     }
// // // // //     const formData = new FormData();
// // // // //     formData.append("patientId", selectedPatientId);
// // // // //     formData.append("organizationName", organizationName);
// // // // //     formData.append("image", file);

// // // // //     try {
// // // // //       const response = await axios.post(
// // // // //         `${process.env.REACT_APP_ORGANIZATION_RESPONSE_UPLOAD_URL}/api/upload`,
// // // // //         formData,
// // // // //         { headers: { "Content-Type": "multipart/form-data" } }
// // // // //       );
// // // // //       alert(response.data.message);
// // // // //       setFile(null);
// // // // //       setSelectedPatientId(null);
// // // // //       fetchPatients();
// // // // //     } catch (error) {
// // // // //       console.error("Error uploading image:", error);
// // // // //       alert("Failed to upload image.");
// // // // //     }
// // // // //   };

// // // // //   // Handle new patient form submission
// // // // //   const handleAddNewPatient = async (e) => {
// // // // //     e.preventDefault();
// // // // //     const { firstName, lastName, patientId, dob, gender, referredDoctor } = newPatient;
// // // // //     if (!firstName || !lastName || !patientId || !dob || !gender || !referredDoctor) {
// // // // //       alert("All fields are required.");
// // // // //       return;
// // // // //     }
// // // // //     try {
// // // // //       const response = await axios.post(
// // // // //         `${process.env.REACT_APP_ORGANIZATION_RESPONSE_URL}/api/signup`,
// // // // //         {
// // // // //           name: `${firstName} ${lastName}`,
// // // // //           email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
// // // // //           role: "patient",
// // // // //           patientId,
// // // // //           gender,
// // // // //           dateOfBirth: dob,
// // // // //           referredDoctor,
// // // // //           organizationName,
// // // // //         }
// // // // //       );
// // // // //       alert(response.data.message);
// // // // //       setNewPatient({
// // // // //         firstName: "",
// // // // //         lastName: "",
// // // // //         patientId: "",
// // // // //         dob: "",
// // // // //         gender: "",
// // // // //         referredDoctor: ""
// // // // //       });
// // // // //       setIsModalOpen(false);
// // // // //       fetchPatients();
// // // // //     } catch (error) {
// // // // //       console.error("Error adding new patient:", error);
// // // // //       alert("Failed to add new patient.");
// // // // //     }
// // // // //   };

// // // // //   // Open modal for adding a new patient
// // // // //   const openModal = () => {
// // // // //     setIsModalOpen(true);
// // // // //   };

// // // // //   // Close modal
// // // // //   const closeModal = () => {
// // // // //     setIsModalOpen(false);
// // // // //   };

// // // // //   return (
// // // // //     <div className="organization-page">
// // // // //       {/* Sidebar */}
// // // // //       <aside className="sidebar">
// // // // //         <h3>Organization: {organizationName}</h3>
// // // // //         <button className="logout-btn" onClick={handleLogout}>
// // // // //           Logout
// // // // //         </button>
// // // // //       </aside>

// // // // //       {/* Main content */}
// // // // //       <div className="main-content">
// // // // //         <div className="header-section">
// // // // //           <h1>Patients</h1>
// // // // //           <button className="new-patient-btn" onClick={openModal}>
// // // // //             + New Patient
// // // // //           </button>
// // // // //         </div>

// // // // //         {/* Patient Table */}
// // // // //         <div className="table-container">
// // // // //           <table className="patients-table">
// // // // //             <thead>
// // // // //               <tr>
// // // // //                 <th>Patient ID</th>
// // // // //                 <th>Name</th>
// // // // //                 <th>Email</th>
// // // // //                 <th>Gender</th>
// // // // //                 <th>Date of Birth</th>
// // // // //                 <th>Referred Doctor</th>
// // // // //                 <th>Image</th>
// // // // //                 <th>Update Image</th>
// // // // //               </tr>
// // // // //             </thead>
// // // // //             <tbody>
// // // // //               {patients.map((patient) => (
// // // // //                 <tr key={patient.patientId}>
// // // // //                   <td>{patient.patientId}</td>
// // // // //                   <td>{patient.name}</td>
// // // // //                   <td>{patient.email}</td>
// // // // //                   <td>{patient.gender}</td>
// // // // //                   <td>{patient.dateOfBirth}</td>
// // // // //                   <td>{patient.referredDoctor}</td>
// // // // //                   <td>
// // // // //                     {patient.imageData && patient.imageData.length > 0 ? (
// // // // //                       <div className="image-box">
// // // // //                         {patient.imageData.map((image, i) => (
// // // // //                           <img
// // // // //                             key={i}
// // // // //                             src={`http://localhost:5001/${image.imagePath}`}
// // // // //                             alt={`Patient ${i + 1}`}
// // // // //                             className="patient-image"
// // // // //                             onClick={() => window.open(`http://localhost:5001/${image.imagePath}`, "_blank")}
// // // // //                           />
// // // // //                         ))}
// // // // //                       </div>
// // // // //                     ) : (
// // // // //                       <span>No image</span>
// // // // //                     )}
// // // // //                   </td>
// // // // //                   <td>
// // // // //                     <button
// // // // //                       className="upload-btn"
// // // // //                       onClick={() => setSelectedPatientId(patient.patientId)}
// // // // //                     >
// // // // //                       Upload
// // // // //                     </button>
// // // // //                   </td>
// // // // //                 </tr>
// // // // //               ))}
// // // // //             </tbody>
// // // // //           </table>
// // // // //         </div>

// // // // //         {/* Update Image Form */}
// // // // //         {selectedPatientId && (
// // // // //           <form onSubmit={handleUpload} className="upload-form">
// // // // //             <h3>Update Image for Patient ID: {selectedPatientId}</h3>
// // // // //             <div className="file-input-group">
// // // // //               <label htmlFor="file">Select Image:</label>
// // // // //               <input
// // // // //                 type="file"
// // // // //                 id="file"
// // // // //                 accept="image/*"
// // // // //                 onChange={(e) => setFile(e.target.files[0])}
// // // // //               />
// // // // //             </div>
// // // // //             <button type="submit" className="upload-submit-btn">
// // // // //               Upload Image
// // // // //             </button>
// // // // //           </form>
// // // // //         )}
// // // // //       </div>

// // // // //       {/* Modal Overlay for New Patient */}
// // // // //       {isModalOpen && (
// // // // //         <div className="modal-overlay" onClick={closeModal}>
// // // // //           <div
// // // // //             className="modal-container"
// // // // //             onClick={(e) => e.stopPropagation()}
// // // // //           >
// // // // //             <h2>New Patient</h2>
// // // // //             <form onSubmit={handleAddNewPatient}>
// // // // //               <div className="modal-form-row">
// // // // //                 <input
// // // // //                   type="text"
// // // // //                   placeholder="First Name"
// // // // //                   value={newPatient.firstName}
// // // // //                   onChange={(e) =>
// // // // //                     setNewPatient({ ...newPatient, firstName: e.target.value })
// // // // //                   }
// // // // //                   required
// // // // //                 />
// // // // //                 <input
// // // // //                   type="text"
// // // // //                   placeholder="Last Name"
// // // // //                   value={newPatient.lastName}
// // // // //                   onChange={(e) =>
// // // // //                     setNewPatient({ ...newPatient, lastName: e.target.value })
// // // // //                   }
// // // // //                   required
// // // // //                 />
// // // // //               </div>
// // // // //               <div className="modal-form-row">
// // // // //                 <input
// // // // //                   type="text"
// // // // //                   placeholder="Patient ID"
// // // // //                   value={newPatient.patientId}
// // // // //                   onChange={(e) =>
// // // // //                     setNewPatient({ ...newPatient, patientId: e.target.value })
// // // // //                   }
// // // // //                   required
// // // // //                 />
// // // // //                 <input
// // // // //                   type="date"
// // // // //                   placeholder="Date of Birth"
// // // // //                   value={newPatient.dob}
// // // // //                   onChange={(e) =>
// // // // //                     setNewPatient({ ...newPatient, dob: e.target.value })
// // // // //                   }
// // // // //                   required
// // // // //                 />
// // // // //               </div>
// // // // //               <div className="modal-form-row">
// // // // //                 <input
// // // // //                   type="text"
// // // // //                   placeholder="Gender"
// // // // //                   value={newPatient.gender}
// // // // //                   onChange={(e) =>
// // // // //                     setNewPatient({ ...newPatient, gender: e.target.value })
// // // // //                   }
// // // // //                   required
// // // // //                 />
// // // // //                 <input
// // // // //                   type="text"
// // // // //                   placeholder="Referred Doctor"
// // // // //                   value={newPatient.referredDoctor}
// // // // //                   onChange={(e) =>
// // // // //                     setNewPatient({ ...newPatient, referredDoctor: e.target.value })
// // // // //                   }
// // // // //                   required
// // // // //                 />
// // // // //               </div>
// // // // //               <div className="modal-buttons">
// // // // //                 <button type="button" className="cancel-btn" onClick={closeModal}>
// // // // //                   Cancel
// // // // //                 </button>
// // // // //                 <button type="submit" className="submit-btn">
// // // // //                   Create Patient
// // // // //                 </button>
// // // // //               </div>
// // // // //             </form>
// // // // //           </div>
// // // // //         </div>
// // // // //       )}
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default Organization;



// // // // import React, { useState, useEffect } from "react";
// // // // import axios from "axios";
// // // // import { useNavigate } from "react-router-dom";
// // // // import "./Organization.css";

// // // // const Organization = () => {
// // // //   const organizationName = localStorage.getItem("organizationName");
// // // //   const navigate = useNavigate();

// // // //   const [patients, setPatients] = useState([]);
// // // //   const [file, setFile] = useState(null);
// // // //   const [selectedPatientId, setSelectedPatientId] = useState(null);
// // // //   const [isModalOpen, setIsModalOpen] = useState(false);
// // // //   const [newPatient, setNewPatient] = useState({
// // // //     firstName: "",
// // // //     lastName: "",
// // // //     patientId: "",
// // // //     dob: "",
// // // //     gender: "",
// // // //     referredDoctor: ""
// // // //   });

// // // //   // Fetch patients when component mounts
// // // //   const fetchPatients = async () => {
// // // //     try {
// // // //       const response = await axios.get(
// // // //         `${process.env.REACT_APP_ORGANIZATION_RESPONSE_URL}/api/patients`
// // // //       );
// // // //       setPatients(response.data);
// // // //     } catch (error) {
// // // //       console.error("Error fetching patients:", error);
// // // //     }
// // // //   };

// // // //   useEffect(() => {
// // // //     fetchPatients();
// // // //   }, []);

// // // //   const handleLogout = () => {
// // // //     localStorage.clear();
// // // //     navigate("/Login");
// // // //   };

// // // //   // Handle image upload for a patient
// // // //   const handleUpload = async (e) => {
// // // //     e.preventDefault();
// // // //     if (!selectedPatientId || !file) {
// // // //       alert("Please select a patient and an image to upload.");
// // // //       return;
// // // //     }
// // // //     const formData = new FormData();
// // // //     formData.append("patientId", selectedPatientId);
// // // //     formData.append("organizationName", organizationName);
// // // //     formData.append("image", file);

// // // //     try {
// // // //       const response = await axios.post(
// // // //         `${process.env.REACT_APP_ORGANIZATION_RESPONSE_UPLOAD_URL}/api/upload`,
// // // //         formData,
// // // //         { headers: { "Content-Type": "multipart/form-data" } }
// // // //       );
// // // //       alert(response.data.message);
// // // //       setFile(null);
// // // //       setSelectedPatientId(null);
// // // //       fetchPatients();
// // // //     } catch (error) {
// // // //       console.error("Error uploading image:", error);
// // // //       alert("Failed to upload image.");
// // // //     }
// // // //   };

// // // //   // Handle new patient form submission
// // // //   const handleAddNewPatient = async (e) => {
// // // //     e.preventDefault();
// // // //     const { firstName, lastName, patientId, dob, gender, referredDoctor } = newPatient;
// // // //     if (!firstName || !lastName || !patientId || !dob || !gender || !referredDoctor) {
// // // //       alert("All fields are required.");
// // // //       return;
// // // //     }
// // // //     try {
// // // //       const response = await axios.post(
// // // //         `${process.env.REACT_APP_ORGANIZATION_RESPONSE_URL}/api/signup`,
// // // //         {
// // // //           name: `${firstName} ${lastName}`,
// // // //           email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
// // // //           role: "patient",
// // // //           patientId,
// // // //           gender,
// // // //           dateOfBirth: dob,
// // // //           referredDoctor,
// // // //           organizationName,
// // // //         }
// // // //       );
// // // //       alert(response.data.message);
// // // //       setNewPatient({
// // // //         firstName: "",
// // // //         lastName: "",
// // // //         patientId: "",
// // // //         dob: "",
// // // //         gender: "",
// // // //         referredDoctor: ""
// // // //       });
// // // //       setIsModalOpen(false);
// // // //       fetchPatients();
// // // //     } catch (error) {
// // // //       console.error("Error adding new patient:", error);
// // // //       alert("Failed to add new patient.");
// // // //     }
// // // //   };

// // // //   // Open modal for adding a new patient
// // // //   const openModal = () => {
// // // //     setIsModalOpen(true);
// // // //   };

// // // //   // Close modal
// // // //   const closeModal = () => {
// // // //     setIsModalOpen(false);
// // // //   };

// // // //   return (
// // // //     <div className="organization-page">
// // // //       {/* Sidebar */}
// // // //       <aside className="sidebar">
// // // //         <h3>Organization: {organizationName}</h3>
// // // //         <button className="logout-btn" onClick={handleLogout}>
// // // //           Logout
// // // //         </button>
// // // //       </aside>

// // // //       {/* Main content */}
// // // //       <div className="main-content">
// // // //         <div className="header-section">
// // // //           <h1>Patients</h1>
// // // //           <button className="new-patient-btn" onClick={openModal}>
// // // //             + New Patient
// // // //           </button>
// // // //         </div>

// // // //         {/* Patient Table */}
// // // //         <div className="table-container">
// // // //           <table className="patients-table">
// // // //             <thead>
// // // //               <tr>
// // // //                 <th>Patient ID</th>
// // // //                 <th>Name</th>
// // // //                 <th>Email</th>
// // // //                 <th>Gender</th>
// // // //                 <th>Date of Birth</th>
// // // //                 <th>Referred Doctor</th>
// // // //                 <th>Image</th>
// // // //                 <th>Update Image</th>
// // // //               </tr>
// // // //             </thead>
// // // //             <tbody>
// // // //               {patients.map((patient) => (
// // // //                 <tr key={patient.patientId}>
// // // //                   <td>{patient.patientId}</td>
// // // //                   <td>{patient.name}</td>
// // // //                   <td>{patient.email}</td>
// // // //                   <td>{patient.gender}</td>
// // // //                   <td>{patient.dateOfBirth}</td>
// // // //                   <td>{patient.referredDoctor}</td>
// // // //                   <td>
// // // //                     {patient.imageData && patient.imageData.length > 0 ? (
// // // //                       <div className="image-box">
// // // //                         {patient.imageData.map((image, i) => (
// // // //                           <img
// // // //                             key={i}
// // // //                             src={`http://localhost:5001/${image.imagePath}`}
// // // //                             alt={`Patient ${i + 1}`}
// // // //                             className="patient-image"
// // // //                             onClick={() => window.open(`http://localhost:5001/${image.imagePath}`, "_blank")}
// // // //                           />
// // // //                         ))}
// // // //                       </div>
// // // //                     ) : (
// // // //                       <span>No image</span>
// // // //                     )}
// // // //                   </td>
// // // //                   <td>
// // // //                     <button
// // // //                       className="upload-btn"
// // // //                       onClick={() => setSelectedPatientId(patient.patientId)}
// // // //                     >
// // // //                       Upload
// // // //                     </button>
// // // //                   </td>
// // // //                 </tr>
// // // //               ))}
// // // //             </tbody>
// // // //           </table>
// // // //         </div>

// // // //         {/* Update Image Form */}
// // // //         {selectedPatientId && (
// // // //           <form onSubmit={handleUpload} className="upload-form">
// // // //             <h3>Update Image for Patient ID: {selectedPatientId}</h3>
// // // //             <div className="file-input-group">
// // // //               <label htmlFor="file">Select Image:</label>
// // // //               <input
// // // //                 type="file"
// // // //                 id="file"
// // // //                 accept="image/*"
// // // //                 onChange={(e) => setFile(e.target.files[0])}
// // // //               />
// // // //             </div>
// // // //             <button type="submit" className="upload-submit-btn">
// // // //               Upload Image
// // // //             </button>
// // // //           </form>
// // // //         )}
// // // //       </div>

// // // //       {/* Modal Overlay for New Patient */}
// // // //       {isModalOpen && (
// // // //         <div className="modal-overlay" onClick={closeModal}>
// // // //           <div
// // // //             className="modal-container"
// // // //             onClick={(e) => e.stopPropagation()}
// // // //           >
// // // //             <h2>New Patient</h2>
// // // //             <form onSubmit={handleAddNewPatient}>
// // // //               <div className="modal-form-row">
// // // //                 <input
// // // //                   type="text"
// // // //                   placeholder="First Name"
// // // //                   value={newPatient.firstName}
// // // //                   onChange={(e) =>
// // // //                     setNewPatient({ ...newPatient, firstName: e.target.value })
// // // //                   }
// // // //                   required
// // // //                 />
// // // //                 <input
// // // //                   type="text"
// // // //                   placeholder="Last Name"
// // // //                   value={newPatient.lastName}
// // // //                   onChange={(e) =>
// // // //                     setNewPatient({ ...newPatient, lastName: e.target.value })
// // // //                   }
// // // //                   required
// // // //                 />
// // // //               </div>
// // // //               <div className="modal-form-row">
// // // //                 <input
// // // //                   type="text"
// // // //                   placeholder="Patient ID"
// // // //                   value={newPatient.patientId}
// // // //                   onChange={(e) =>
// // // //                     setNewPatient({ ...newPatient, patientId: e.target.value })
// // // //                   }
// // // //                   required
// // // //                 />
// // // //                 <input
// // // //                   type="date"
// // // //                   placeholder="Date of Birth"
// // // //                   value={newPatient.dob}
// // // //                   onChange={(e) =>
// // // //                     setNewPatient({ ...newPatient, dob: e.target.value })
// // // //                   }
// // // //                   required
// // // //                 />
// // // //               </div>
// // // //               <div className="modal-form-row">
// // // //                 <input
// // // //                   type="text"
// // // //                   placeholder="Gender"
// // // //                   value={newPatient.gender}
// // // //                   onChange={(e) =>
// // // //                     setNewPatient({ ...newPatient, gender: e.target.value })
// // // //                   }
// // // //                   required
// // // //                 />
// // // //                 <input
// // // //                   type="text"
// // // //                   placeholder="Referred Doctor"
// // // //                   value={newPatient.referredDoctor}
// // // //                   onChange={(e) =>
// // // //                     setNewPatient({ ...newPatient, referredDoctor: e.target.value })
// // // //                   }
// // // //                   required
// // // //                 />
// // // //               </div>
// // // //               <div className="modal-buttons">
// // // //                 <button type="button" className="cancel-btn" onClick={closeModal}>
// // // //                   Cancel
// // // //                 </button>
// // // //                 <button type="submit" className="submit-btn">
// // // //                   Create Patient
// // // //                 </button>
// // // //               </div>
// // // //             </form>
// // // //           </div>
// // // //         </div>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // };

// // // // export default Organization;




// // // import React, { useState, useEffect } from "react";
// // // import axios from "axios";
// // // import { useNavigate } from "react-router-dom";
// // // import "./Organization.css";

// // // const Organization = () => {
// // //   const organizationName = localStorage.getItem("organizationName");
// // //   const navigate = useNavigate();

// // //   // Data states
// // //   const [patients, setPatients] = useState([]);
// // //   const [file, setFile] = useState(null);
// // //   const [selectedPatientId, setSelectedPatientId] = useState(null);
// // //   const [isModalOpen, setIsModalOpen] = useState(false);
// // //   const [searchTerm, setSearchTerm] = useState("");

// // //   const [newPatient, setNewPatient] = useState({
// // //     firstName: "",
// // //     lastName: "",
// // //     patientId: "",
// // //     dob: "",
// // //     gender: "",
// // //     referredDoctor: ""
// // //   });

// // //   // Fetch patients from the API
// // //   const fetchPatients = async () => {
// // //     try {
// // //       const response = await axios.get(
// // //         `${process.env.REACT_APP_ORGANIZATION_RESPONSE_URL}/api/patients`
// // //       );
// // //       setPatients(response.data);
// // //     } catch (error) {
// // //       console.error("Error fetching patients:", error);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchPatients();
// // //   }, []);

// // //   const handleLogout = () => {
// // //     localStorage.clear();
// // //     navigate("/Login");
// // //   };

// // //   // Filter patients based on search term
// // //   const filteredPatients = patients.filter((patient) => {
// // //     const fullName = patient.name?.toLowerCase();
// // //     const id = patient.patientId?.toLowerCase();
// // //     const email = patient.email?.toLowerCase();
// // //     const term = searchTerm.toLowerCase();
// // //     return (
// // //       fullName?.includes(term) ||
// // //       id?.includes(term) ||
// // //       email?.includes(term)
// // //     );
// // //   });

// // //   // Handle image upload for a patient
// // //   const handleUpload = async (e) => {
// // //     e.preventDefault();
// // //     if (!selectedPatientId || !file) {
// // //       alert("Please select a patient and an image to upload.");
// // //       return;
// // //     }
// // //     const formData = new FormData();
// // //     formData.append("patientId", selectedPatientId);
// // //     formData.append("organizationName", organizationName);
// // //     formData.append("image", file);

// // //     try {
// // //       const response = await axios.post(
// // //         `${process.env.REACT_APP_ORGANIZATION_RESPONSE_UPLOAD_URL}/api/upload`,
// // //         formData,
// // //         { headers: { "Content-Type": "multipart/form-data" } }
// // //       );
// // //       alert(response.data.message);
// // //       setFile(null);
// // //       setSelectedPatientId(null);
// // //       fetchPatients();
// // //     } catch (error) {
// // //       console.error("Error uploading image:", error);
// // //       alert("Failed to upload image.");
// // //     }
// // //   };

// // //   // Handle new patient submission
// // //   const handleAddNewPatient = async (e) => {
// // //     e.preventDefault();
// // //     const { firstName, lastName, patientId, dob, gender, referredDoctor } = newPatient;
// // //     if (!firstName || !lastName || !patientId || !dob || !gender || !referredDoctor) {
// // //       alert("All fields are required.");
// // //       return;
// // //     }
// // //     try {
// // //       const response = await axios.post(
// // //         `${process.env.REACT_APP_ORGANIZATION_RESPONSE_URL}/api/signup`,
// // //         {
// // //           name: `${firstName}`,
// // //           email: `${firstName.toLowerCase()}@gmail.com`,
// // //           role: "patient",
// // //           patientId,
// // //           gender,
// // //           dateOfBirth: dob,
// // //           referredDoctor,
// // //           organizationName,
// // //         }
// // //       );
// // //       alert("Successful upload");
// // //       setNewPatient({
// // //         firstName: "",
// // //         lastName: "",
// // //         patientId: "",
// // //         dob: "",
// // //         gender: "",
// // //         referredDoctor: ""
// // //       });
// // //       setIsModalOpen(false);
// // //       fetchPatients();
// // //     } catch (error) {
// // //       console.error("Error adding new patient:", error);
// // //       alert("Failed to add new patient.");
// // //     }
// // //   };

// // //   // Open new patient modal
// // //   const openModal = () => {
// // //     setIsModalOpen(true);
// // //   };

// // //   // Close new patient modal
// // //   const closeModal = () => {
// // //     setIsModalOpen(false);
// // //   };

// // //   return (
// // //     <div className="organization-page">
// // //       {/* Sidebar */}
// // //       <aside className="sidebar">
// // //         <h3>Organization: {organizationName}</h3>
// // //         <button className="logout-btn" onClick={handleLogout}>
// // //           Logout
// // //         </button>
// // //       </aside>

// // //       {/* Main Content */}
// // //       <div className="main-content">
// // //         <div className="header-section">
// // //           <h1>Patients</h1>
// // //           <div className="search-container">
// // //             <input
// // //               type="text"
// // //               placeholder="Search patients..."
// // //               value={searchTerm}
// // //               onChange={(e) => setSearchTerm(e.target.value)}
// // //               className="search-input"
// // //             />
// // //           </div>
// // //           <button className="new-patient-btn" onClick={openModal}>
// // //             + New Patient
// // //           </button>
// // //         </div>

// // //         {/* Patients Table */}
// // //         <div className="table-container">
// // //           <table className="patients-table">
// // //             <thead>
// // //               <tr>
// // //                 <th>Patient ID</th>
// // //                 <th>Name</th>
// // //                 <th>Email</th>
// // //                 <th>Gender</th>
// // //                 <th>Date of Birth</th>
// // //                 <th>Referred Doctor</th>
// // //                 <th>Image</th>
// // //                 <th>Update Image</th>
// // //                 <th>Prediction</th>
// // //               </tr>
// // //             </thead>
// // //             <tbody>
// // //               {filteredPatients.map((patient) => (
// // //                 <tr key={patient.patientId}>
// // //                   <td>{patient.patientId}</td>
// // //                   <td>{patient.name}</td>
// // //                   <td>{patient.email}</td>
// // //                   <td>{patient.gender}</td>
// // //                   <td>{patient.dateOfBirth}</td>
// // //                   <td>{patient.referredDoctor}</td>
// // //                   {/* <td>{patient.referredDoctor}</td> */}
// // //                   <td>
// // //                     {patient.imageData && patient.imageData.length > 0 ? (
// // //                       <div className="image-box">
// // //                         {patient.imageData.map((image, i) => (
// // //                           <img
// // //                             key={i}
// // //                             src={`http://localhost:5001/${image.imagePath}`}
// // //                             alt={`Patient ${i + 1}`}
// // //                             className="patient-image"
// // //                             onClick={() => window.open(`http://localhost:5001/${image.imagePath}`, "_blank")}
// // //                           />
// // //                         ))}
// // //                       </div>
// // //                     ) : (
// // //                       <span>No image</span>
// // //                     )}
// // //                   </td>
// // //                   <td>
// // //                     <button
// // //                       className="upload-btn"
// // //                       onClick={() => setSelectedPatientId(patient.patientId)}
// // //                     >
// // //                       Upload
// // //                     </button>
// // //                   </td>
// // //                 </tr>
// // //               ))}
// // //             </tbody>
// // //           </table>
// // //         </div>

// // //         {/* Image Upload Form */}
// // //         {selectedPatientId && (
// // //           <form onSubmit={handleUpload} className="upload-form">
// // //             <h3>Update Image for Patient ID: {selectedPatientId}</h3>
// // //             <div className="file-input-group">
// // //               <label htmlFor="file">Select Image:</label>
// // //               <input
// // //                 type="file"
// // //                 id="file"
// // //                 accept="image/*"
// // //                 onChange={(e) => setFile(e.target.files[0])}
// // //               />
// // //             </div>
// // //             <button type="submit" className="upload-submit-btn">
// // //               Upload Image
// // //             </button>
// // //           </form>
// // //         )}
// // //       </div>

// // //       {/* New Patient Modal */}
// // //       {isModalOpen && (
// // //         <div className="modal-overlay" onClick={closeModal}>
// // //           <div className="modal-container" onClick={(e) => e.stopPropagation()}>
// // //             <h2>New Patient</h2>
// // //             <form onSubmit={handleAddNewPatient}>
// // //               <div className="modal-form-row">
// // //                 <input
// // //                   type="text"
// // //                   placeholder="First Name"
// // //                   value={newPatient.firstName}
// // //                   onChange={(e) =>
// // //                     setNewPatient({ ...newPatient, firstName: e.target.value })
// // //                   }
// // //                   required
// // //                 />
// // //                 <input
// // //                   type="text"
// // //                   placeholder="Last Name"
// // //                   value={newPatient.lastName}
// // //                   onChange={(e) =>
// // //                     setNewPatient({ ...newPatient, lastName: e.target.value })
// // //                   }
// // //                   required
// // //                 />
// // //               </div>
// // //               <div className="modal-form-row">
// // //                 <input
// // //                   type="text"
// // //                   placeholder="Patient ID"
// // //                   value={newPatient.patientId}
// // //                   onChange={(e) =>
// // //                     setNewPatient({ ...newPatient, patientId: e.target.value })
// // //                   }
// // //                   required
// // //                 />
// // //                 <input
// // //                   type="date"
// // //                   placeholder="Date of Birth"
// // //                   value={newPatient.dob}
// // //                   onChange={(e) =>
// // //                     setNewPatient({ ...newPatient, dob: e.target.value })
// // //                   }
// // //                   required
// // //                 />
// // //               </div>
// // //               <div className="modal-form-row">
// // //                 <input
// // //                   type="text"
// // //                   placeholder="Gender"
// // //                   value={newPatient.gender}
// // //                   onChange={(e) =>
// // //                     setNewPatient({ ...newPatient, gender: e.target.value })
// // //                   }
// // //                   required
// // //                 />
// // //                 <input
// // //                   type="text"
// // //                   placeholder="Referred Doctor"
// // //                   value={newPatient.referredDoctor}
// // //                   onChange={(e) =>
// // //                     setNewPatient({ ...newPatient, referredDoctor: e.target.value })
// // //                   }
// // //                   required
// // //                 />
// // //               </div>
// // //               <div className="modal-buttons">
// // //                 <button type="button" className="cancel-btn" onClick={closeModal}>
// // //                   Cancel
// // //                 </button>
// // //                 <button type="submit" className="submit-btn">
// // //                   Create Patient
// // //                 </button>
// // //               </div>
// // //             </form>
// // //           </div>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default Organization;


// // import React, { useState, useEffect } from "react";
// // import axios from "axios";
// // import { useNavigate } from "react-router-dom";
// // import "./Organization.css";

// // const Organization = () => {
// //   const organizationName = localStorage.getItem("organizationName");
// //   const navigate = useNavigate();

// //   // Data states
// //   const [patients, setPatients] = useState([]);
// //   const [file, setFile] = useState(null);
// //   const [selectedPatientIdForUpload, setSelectedPatientIdForUpload] = useState(null); // Renamed for clarity
// //   const [isModalOpen, setIsModalOpen] = useState(false);
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [predictions, setPredictions] = useState({}); // State to store predictions { patientId: prediction }
// //   const [predicting, setPredicting] = useState({}); // State to track loading { patientId: boolean }


// //   const [newPatient, setNewPatient] = useState({
// //     firstName: "",
// //     lastName: "",
// //     patientId: "",
// //     dob: "",
// //     gender: "",
// //     referredDoctor: ""
// //   });

// //   // Base URLs from environment variables (ensure they are set in your .env file)
// //   const API_BASE_URL = process.env.REACT_APP_ORGANIZATION_RESPONSE_URL || 'http://localhost:5001'; // Fallback if env var not set
// //   const UPLOAD_API_URL = process.env.REACT_APP_ORGANIZATION_RESPONSE_UPLOAD_URL || 'http://localhost:5001'; // Fallback
// //   const PREDICT_API_URL = process.env.REACT_APP_PREDICT_API_URL || 'http://localhost:5002'; // Your new prediction backend URL

// //   // Fetch patients from the API
// //   const fetchPatients = async () => {
// //     try {
// //       // Use template literals correctly
// //       const response = await axios.get(`${API_BASE_URL}/api/patients`);
// //       setPatients(response.data);
// //     } catch (error) {
// //       console.error("Error fetching patients:", error);
// //       // Handle error appropriately, maybe show a message to the user
// //     }
// //   };

// //   useEffect(() => {
// //     fetchPatients();
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, []); // Added dependency array if fetchPatients doesn't change, otherwise add dependencies

// //   const handleLogout = () => {
// //     localStorage.clear();
// //     navigate("/Login");
// //   };

// //   // Filter patients based on search term
// //   const filteredPatients = patients.filter((patient) => {
// //     // Added nullish coalescing for safety
// //     const fullName = patient.name?.toLowerCase() ?? '';
// //     const id = patient.patientId?.toLowerCase() ?? '';
// //     const email = patient.email?.toLowerCase() ?? '';
// //     const term = searchTerm.toLowerCase();
// //     return (
// //       fullName.includes(term) ||
// //       id.includes(term) ||
// //       email.includes(term)
// //     );
// //   });

// //   // Handle image upload for a patient
// //   const handleUpload = async (e) => {
// //     e.preventDefault();
// //     if (!selectedPatientIdForUpload || !file) {
// //       alert("Please select a patient and an image to upload.");
// //       return;
// //     }
// //     const formData = new FormData();
// //     formData.append("patientId", selectedPatientIdForUpload);
// //     formData.append("organizationName", organizationName);
// //     formData.append("image", file);

// //     try {
// //       // Use template literals correctly
// //       const response = await axios.post(
// //         `${UPLOAD_API_URL}/api/upload`,
// //         formData,
// //         { headers: { "Content-Type": "multipart/form-data" } }
// //       );
// //       alert(response.data.message || "Upload successful"); // Use message from response if available
// //       setFile(null);
// //       setSelectedPatientIdForUpload(null); // Clear the selected ID for upload
// //       fetchPatients(); // Refresh patient list to show new image
// //     } catch (error) {
// //       console.error("Error uploading image:", error);
// //       alert(`Failed to upload image: ${error.response?.data?.error || error.message}`);
// //     }
// //   };

// //   // Handle new patient submission
// //   const handleAddNewPatient = async (e) => {
// //     e.preventDefault();
// //     const { firstName, lastName, patientId, dob, gender, referredDoctor } = newPatient;

// //     // Combine first and last names for the 'name' field
// //     const fullName = `${firstName} ${lastName}`.trim();
// //     // Simple email generation (consider a more robust approach)
// //     const email = `${firstName.toLowerCase().replace(/\s+/g, '')}${lastName.toLowerCase().replace(/\s+/g, '')}@example.com`; // Example email

// //     if (!firstName || !lastName || !patientId || !dob || !gender || !referredDoctor) {
// //       alert("All fields are required.");
// //       return;
// //     }
// //     try {
// //         // Ensure template literals are used correctly for URLs and data
// //         const response = await axios.post(
// //             `${API_BASE_URL}/api/signup`, // Assuming this is the correct endpoint for adding patients
// //             {
// //                 name: fullName, // Send combined name
// //                 email: email, // Send generated email
// //                 role: "patient",
// //                 patientId,
// //                 gender,
// //                 dateOfBirth: dob,
// //                 referredDoctor,
// //                 organizationName,
// //             }
// //         );
// //       alert(response.data.message || "Successful upload"); // Use message from response
// //       setNewPatient({ // Reset form
// //         firstName: "",
// //         lastName: "",
// //         patientId: "",
// //         dob: "",
// //         gender: "",
// //         referredDoctor: ""
// //       });
// //       setIsModalOpen(false);
// //       fetchPatients(); // Refresh patient list
// //     } catch (error) {
// //       console.error("Error adding new patient:", error);
// //        alert(`Failed to add new patient: ${error.response?.data?.error || error.message}`);
// //     }
// //   };

// //   // --- New Function: Handle Prediction Request ---
// //   const handlePredict = async (patientId, imageData) => {
// //     if (!imageData || imageData.length === 0 || !imageData[0].imagePath) {
// //       alert("No image available for prediction for this patient.");
// //       return;
// //     }

// //     const imagePath = imageData[0].imagePath; // Predict using the first image's path

// //     setPredicting(prev => ({ ...prev, [patientId]: true })); // Set loading state for this patient
// //     setPredictions(prev => ({ ...prev, [patientId]: 'Predicting...' })); // Show 'Predicting...'

// //     try {
// //         console.log(`Sending prediction request for patient ${patientId} with image path: ${imagePath}`); // Debug log
// //         const response = await axios.post(`${PREDICT_API_URL}/api/predict`, {
// //             imagePath: imagePath // Send the relative path
// //         });
// //         setPredictions(prev => ({ ...prev, [patientId]: response.data.prediction }));
// //         console.log(`Prediction received for ${patientId}: ${response.data.prediction}`); // Debug log
// //     } catch (error) {
// //         console.error(`Error predicting for patient ${patientId}:`, error);
// //         const errorMessage = error.response?.data?.error || "Prediction failed";
// //         setPredictions(prev => ({ ...prev, [patientId]: `Error: ${errorMessage}` }));
// //          alert(`Prediction failed for patient ${patientId}: ${errorMessage}`); // Show alert on error
// //     } finally {
// //         setPredicting(prev => ({ ...prev, [patientId]: false })); // Clear loading state
// //     }
// //   };


// //   // Open new patient modal
// //   const openModal = () => {
// //     setIsModalOpen(true);
// //   };

// //   // Close new patient modal
// //   const closeModal = () => {
// //     setIsModalOpen(false);
// //   };

// //   return (
// //     <div className="organization-page">
// //       {/* Sidebar */}
// //       <aside className="sidebar">
// //         <h3>Organization: {organizationName || "N/A"}</h3>
// //         <button className="logout-btn" onClick={handleLogout}>
// //           Logout
// //         </button>
// //       </aside>

// //       {/* Main Content */}
// //       <div className="main-content">
// //         <div className="header-section">
// //           <h1>Patients</h1>
// //           <div className="search-container">
// //             <input
// //               type="text"
// //               placeholder="Search patients..."
// //               value={searchTerm}
// //               onChange={(e) => setSearchTerm(e.target.value)}
// //               className="search-input"
// //             />
// //           </div>
// //           <button className="new-patient-btn" onClick={openModal}>
// //             + New Patient
// //           </button>
// //         </div>

// //         {/* Patients Table */}
// //         <div className="table-container">
// //           <table className="patients-table">
// //             <thead>
// //               <tr>
// //                 <th>Patient ID</th>
// //                 <th>Name</th>
// //                 <th>Email</th>
// //                 <th>Gender</th>
// //                 <th>Date of Birth</th>
// //                 <th>Referred Doctor</th>
// //                 <th>Image(s)</th>
// //                 <th>Update Image</th>
// //                 <th>Prediction</th> {/* Added Prediction Column Header */}
// //                 <th>Action</th>     {/* Added Action Column Header */}
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {filteredPatients.length > 0 ? (
// //                   filteredPatients.map((patient) => (
// //                     <tr key={patient.patientId}>
// //                       <td>{patient.patientId || 'N/A'}</td>
// //                       <td>{patient.name || 'N/A'}</td>
// //                       <td>{patient.email || 'N/A'}</td>
// //                       <td>{patient.gender || 'N/A'}</td>
// //                       <td>{patient.dateOfBirth ? new Date(patient.dateOfBirth).toLocaleDateString() : 'N/A'}</td> {/* Format Date */}
// //                       <td>{patient.referredDoctor || 'N/A'}</td>
// //                       <td>
// //                         {patient.imageData && patient.imageData.length > 0 ? (
// //                           <div className="image-box">
// //                             {patient.imageData.map((image, i) => (
// //                               image.imagePath ? ( // Check if imagePath exists
// //                                 <img
// //                                   key={i}
// //                                   // Use the correct base URL for displaying images (from port 5001)
// //                                   src={`${API_BASE_URL}/${image.imagePath}`}
// //                                   alt={`Patient ${patient.patientId} - ${i + 1}`}
// //                                   className="patient-image"
// //                                   // Open image in new tab - ensure URL is correct
// //                                   onClick={() => window.open(`${API_BASE_URL}/${image.imagePath}`, "_blank")}
// //                                   onError={(e) => e.target.style.display='none'} // Hide if image fails to load
// //                                 />
// //                               ) : <span key={i}>Invalid Image Data</span>
// //                             ))}
// //                           </div>
// //                         ) : (
// //                           <span>No image</span>
// //                         )}
// //                       </td>
// //                       <td>
// //                         {/* Button to select patient for upload */}
// //                         <button
// //                           className="upload-select-btn" // Changed class for clarity
// //                           onClick={() => setSelectedPatientIdForUpload(patient.patientId)}
// //                         >
// //                           Select
// //                         </button>
// //                       </td>
// //                       <td>
// //                         {/* Display Prediction Result */}
// //                         {predictions[patient.patientId] || 'N/A'}
// //                       </td>
// //                       <td>
// //                         {/* Prediction Button */}
// //                         <button
// //                           className="predict-btn"
// //                           onClick={() => handlePredict(patient.patientId, patient.imageData)}
// //                           // Disable button if no image data or already predicting
// //                           disabled={!patient.imageData || patient.imageData.length === 0 || predicting[patient.patientId]}
// //                         >
// //                           {predicting[patient.patientId] ? 'Predicting...' : 'Predict'}
// //                         </button>
// //                       </td>
// //                     </tr>
// //                   ))
// //               ) : (
// //                   <tr>
// //                       <td colSpan="10" style={{ textAlign: 'center' }}>No patients found.</td>
// //                   </tr>
// //               )}
// //             </tbody>
// //           </table>
// //         </div>

// //         {/* Image Upload Form - Shows only if a patient is selected for upload */}
// //         {selectedPatientIdForUpload && (
// //           <form onSubmit={handleUpload} className="upload-form">
// //             <h3>Update Image for Patient ID: {selectedPatientIdForUpload}</h3>
// //             <div className="file-input-group">
// //               <label htmlFor="file">Select Image:</label>
// //               <input
// //                 type="file"
// //                 id="file"
// //                 accept="image/*"
// //                 onChange={(e) => setFile(e.target.files[0])}
// //                 required // Make file input required if form is shown
// //               />
// //             </div>
// //             <div className="upload-form-buttons">
// //               <button type="submit" className="upload-submit-btn">
// //                 Upload Image
// //               </button>
// //               <button 
// //                  type="button" 
// //                  className="cancel-btn" 
// //                  onClick={() => setSelectedPatientIdForUpload(null)} // Add a cancel button
// //               >
// //                 Cancel
// //               </button>
// //             </div>
// //           </form>
// //         )}
// //       </div>

// //       {/* New Patient Modal */}
// //       {isModalOpen && (
// //         <div className="modal-overlay" onClick={closeModal}>
// //           {/* Prevent modal close when clicking inside */}
// //           <div className="modal-container" onClick={(e) => e.stopPropagation()}>
// //             <h2>New Patient</h2>
// //             <form onSubmit={handleAddNewPatient}>
// //               <div className="modal-form-row">
// //                 <input
// //                   type="text"
// //                   placeholder="First Name"
// //                   value={newPatient.firstName}
// //                   onChange={(e) =>
// //                     setNewPatient({ ...newPatient, firstName: e.target.value })
// //                   }
// //                   required
// //                 />
// //                 <input
// //                   type="text"
// //                   placeholder="Last Name"
// //                   value={newPatient.lastName}
// //                   onChange={(e) =>
// //                     setNewPatient({ ...newPatient, lastName: e.target.value })
// //                   }
// //                   required
// //                 />
// //               </div>
// //               <div className="modal-form-row">
// //                 <input
// //                   type="text"
// //                   placeholder="Patient ID"
// //                   value={newPatient.patientId}
// //                   onChange={(e) =>
// //                     setNewPatient({ ...newPatient, patientId: e.target.value })
// //                   }
// //                   required
// //                 />
// //                 <input
// //                   type="date"
// //                   placeholder="Date of Birth" // Placeholder might not show for type="date"
// //                   value={newPatient.dob}
// //                   onChange={(e) =>
// //                     setNewPatient({ ...newPatient, dob: e.target.value })
// //                   }
// //                   required
// //                 />
// //               </div>
// //               <div className="modal-form-row">
// //                 {/* Consider using a <select> dropdown for gender */}
// //                 <input
// //                   type="text" 
// //                   placeholder="Gender"
// //                   value={newPatient.gender}
// //                   onChange={(e) =>
// //                     setNewPatient({ ...newPatient, gender: e.target.value })
// //                   }
// //                   required
// //                 />
// //                 <input
// //                   type="text"
// //                   placeholder="Referred Doctor"
// //                   value={newPatient.referredDoctor}
// //                   onChange={(e) =>
// //                     setNewPatient({ ...newPatient, referredDoctor: e.target.value })
// //                   }
// //                   required
// //                 />
// //               </div>
// //               <div className="modal-buttons">
// //                 <button type="button" className="cancel-btn" onClick={closeModal}>
// //                   Cancel
// //                 </button>
// //                 <button type="submit" className="submit-btn">
// //                   Create Patient
// //                 </button>
// //               </div>
// //             </form>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default Organization;




// import React, { useState, useEffect, useCallback } from "react"; // Added useCallback
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "./Organization.css";

// const Organization = () => {
//     const organizationName = localStorage.getItem("organizationName");
//     const navigate = useNavigate();

//     // Data states
//     const [patients, setPatients] = useState([]);
//     const [file, setFile] = useState(null);
//     const [selectedPatientIdForUpload, setSelectedPatientIdForUpload] = useState(null);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [searchTerm, setSearchTerm] = useState("");
//     // Removed local predictions state, rely on fetched patient data
//     // const [predictions, setPredictions] = useState({});
//     const [predicting, setPredicting] = useState({}); // Still useful for loading state { imageId: boolean }
//     const [savingPrediction, setSavingPrediction] = useState({}); // State for saving { imageId: boolean }


//     const [newPatient, setNewPatient] = useState({
//         firstName: "",
//         lastName: "",
//         patientId: "",
//         dob: "",
//         gender: "",
//         referredDoctor: ""
//     });

//     // Base URLs from environment variables (ensure they are set in your .env file)
//     // Use REACT_APP_ prefix for create-react-app
//     const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5001'; // Your Node.js backend
//     const PREDICT_API_URL = process.env.REACT_APP_PREDICT_API_URL || 'http://localhost:5002'; // Your Python backend

//     // Fetch patients from the Node.js API (now includes predictions in imageData)
//     // Use useCallback to prevent re-creation on every render unless dependencies change
//     const fetchPatients = useCallback(async () => {
//         console.log("Fetching patients...");
//         try {
//             // TODO: Add authentication headers if needed
//             // const token = localStorage.getItem('token');
//             // const config = { headers: { Authorization: `Bearer ${token}` } };
//             const response = await axios.get(`${API_BASE_URL}/api/patients` /*, config */);
//             setPatients(response.data);
//             console.log("Patients fetched:", response.data);
//         } catch (error) {
//             console.error("Error fetching patients:", error);
//             alert(`Failed to fetch patients: ${error.response?.data?.message || error.message}`);
//             // Handle specific errors like 401 Unauthorized if implementing auth
//         }
//     }, [API_BASE_URL]); // Dependency: API_BASE_URL

//     useEffect(() => {
//         fetchPatients();
//         // Run fetchPatients when the component mounts and if fetchPatients changes (due to URL change)
//     }, [fetchPatients]);

//     const handleLogout = () => {
//         localStorage.clear(); // Clear all local storage (token, user info, etc.)
//         navigate("/Login");
//     };

//     // Filter patients based on search term
//     const filteredPatients = patients.filter((patient) => {
//         const fullName = patient.name?.toLowerCase() ?? '';
//         const id = patient.patientId?.toLowerCase() ?? '';
//         const email = patient.email?.toLowerCase() ?? '';
//         const term = searchTerm.toLowerCase();
//         return (
//             fullName.includes(term) ||
//             id.includes(term) ||
//             email.includes(term)
//         );
//     });

//     // Handle image upload for a patient
//     const handleUpload = async (e) => {
//         e.preventDefault();
//         if (!selectedPatientIdForUpload || !file) {
//             alert("Please select a patient and an image to upload.");
//             return;
//         }
//         const formData = new FormData();
//         formData.append("patientId", selectedPatientIdForUpload);
//         // Ensure organizationName is available and sent if needed by backend
//         if (organizationName) {
//             formData.append("organizationName", organizationName);
//         }
//         formData.append("image", file);

//         // Add loading state indicator if needed

//         try {
//             // TODO: Add authentication headers if needed
//             // const token = localStorage.getItem('token');
//             // const config = { headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" } };
//              const config = { headers: { "Content-Type": "multipart/form-data" } }; // Basic config

//             const response = await axios.post(
//                 `${API_BASE_URL}/api/upload`,
//                 formData,
//                 config
//             );
//             alert(response.data.message || "Upload successful");
//             setFile(null);
//             setSelectedPatientIdForUpload(null);
//             fetchPatients(); // Refresh patient list to show new image
//         } catch (error) {
//             console.error("Error uploading image:", error);
//             alert(`Failed to upload image: ${error.response?.data?.message || error.message}`);
//         } finally {
//             // Clear loading state if added
//         }
//     };

//     // Handle new patient submission (using the /api/signup endpoint)
//     const handleAddNewPatient = async (e) => {
//         e.preventDefault();
//         const { firstName, lastName, patientId, dob, gender, referredDoctor } = newPatient;

//         // const fullName = `${firstName} ${lastName}`.trim();
//         const fullName = `${firstName}`.trim();
//         // Simple email generation (requires password field in modal)
//         // You'll need to add password fields to the modal or adjust backend logic
//         const password = prompt("Enter a temporary password for the new patient:"); // VERY insecure - just for demo
//          if (!password) {
//             alert("Password is required.");
//             return;
//         }
//         // const email = `${firstName.toLowerCase().replace(/\s+/g, '')}${lastName.toLowerCase().replace(/\s+/g, '')}@example.com`;
//         const email = `${firstName.toLowerCase().replace(/\s+/g, '')}@gmail.com`;

//         if (!firstName || !lastName || !patientId || !dob || !gender || !referredDoctor) {
//             alert("All fields are required.");
//             return;
//         }
//         try {
//             // TODO: Add authentication if needed (e.g., only staff can add patients)
//             const response = await axios.post(
//                 `${API_BASE_URL}/api/signup`,
//                 {
//                     name: fullName,
//                     email: email, // Consider making email unique/user-provided
//                     password: password, // Send password
//                     role: "patient", // Hardcoded role
//                     patientId,
//                     gender,
//                     dateOfBirth: dob,
//                     referredDoctor,
//                     organizationName: organizationName, // Pass current org context if relevant
//                 }
//             );
//             alert(response.data.message || "Patient added successfully");
//             setNewPatient({ // Reset form
//                 firstName: "", lastName: "", patientId: "", dob: "", gender: "", referredDoctor: ""
//             });
//             setIsModalOpen(false);
//             fetchPatients(); // Refresh patient list
//         } catch (error) {
//             console.error("Error adding new patient:", error);
//             alert(`Failed to add patient: ${error.response?.data?.message || error.message}`);
//         }
//     };

//     // --- Modified Function: Handle Prediction Request and Save ---
//     const handlePredict = async (patientId, imageObject) => {
//         if (!imageObject || !imageObject.imagePath || !imageObject._id) {
//             alert("Image data is missing or invalid for prediction.");
//             return;
//         }

//         const imagePath = imageObject.imagePath; // e.g., "uploads/xyz.jpg"
//         const imageId = imageObject._id; // MongoDB ObjectId of the image subdocument

//         // Use imageId for loading state keys
//         setPredicting(prev => ({ ...prev, [imageId]: true }));
//         setSavingPrediction(prev => ({ ...prev, [imageId]: false })); // Ensure saving state is reset

//         let predictionResult = null;

//         // Step 1: Call Python backend for prediction
//         try {
//             console.log(`1. Requesting prediction for imageId ${imageId} (path: ${imagePath})`);
//             const predictResponse = await axios.post(`${PREDICT_API_URL}/api/predict`, {
//                 // Send the image path *as stored* in MongoDB (relative path)
//                 // The Python backend needs to resolve this to a local file path
//                 imagePath: imagePath
//             });
//             predictionResult = predictResponse.data.prediction;
//             console.log(`   Prediction received: ${predictionResult}`);

//         } catch (error) {
//             console.error(`Error predicting for imageId ${imageId}:`, error);
//             alert(`Prediction failed: ${error.response?.data?.error || error.message}`);
//             setPredicting(prev => ({ ...prev, [imageId]: false })); // Clear loading state on error
//             return; // Stop the process if prediction fails
//         } finally {
//              // Set predicting false here only if NOT proceeding to save? Or keep it true until save finishes?
//              // Let's keep predicting true and introduce savingPrediction state.
//         }

//         // Step 2: Call Node.js backend to save the prediction
//         if (predictionResult) {
//             setSavingPrediction(prev => ({ ...prev, [imageId]: true })); // Indicate saving started
//             try {
//                 console.log(`2. Saving prediction "${predictionResult}" for imageId ${imageId} (patientId: ${patientId})`);
//                  // TODO: Add authentication headers if needed
//                 // const token = localStorage.getItem('token');
//                 // const config = { headers: { Authorization: `Bearer ${token}` } };

//                 await axios.put(
//                     `${API_BASE_URL}/api/patients/${patientId}/images/${imageId}/predict`,
//                     { prediction: predictionResult } // Send prediction in request body
//                    /* , config */
//                 );
//                 console.log(`   Prediction saved successfully.`);
//                 // Refresh data to show the saved prediction
//                 fetchPatients();

//             } catch (error) {
//                 console.error(`Error saving prediction for imageId ${imageId}:`, error);
//                 alert(`Failed to save prediction: ${error.response?.data?.message || error.message}`);
//                 // Optionally revert the UI or show a specific save error state
//             } finally {
//                  setPredicting(prev => ({ ...prev, [imageId]: false })); // Clear predicting state
//                  setSavingPrediction(prev => ({ ...prev, [imageId]: false })); // Clear saving state
//             }
//         } else {
//              setPredicting(prev => ({ ...prev, [imageId]: false })); // Clear predicting state if no result
//         }
//     };


//     // Open/Close Modal
//     const openModal = () => setIsModalOpen(true);
//     const closeModal = () => setIsModalOpen(false);

//     // --- JSX Rendering ---
//     return (
//         <div className="organization-page">
//             {/* Sidebar */}
//             <aside className="sidebar">
//                 <h3>Organization: {organizationName || "N/A"}</h3>
//                 <button className="logout-btn" onClick={handleLogout}>
//                     Logout
//                 </button>
//             </aside>

//             {/* Main Content */}
//             <div className="main-content">
//                 <div className="header-section">
//                     <h1>Patients</h1>
//                     <div className="search-container">
//                         <input
//                             type="text"
//                             placeholder="Search patients..."
//                             value={searchTerm}
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                             className="search-input"
//                         />
//                     </div>
//                     <button className="new-patient-btn" onClick={openModal}>
//                         + New Patient
//                     </button>
//                 </div>

//                 {/* Patients Table */}
//                 <div className="table-container">
//                     <table className="patients-table">
//                         <thead>
//                             <tr>
//                                 <th>Patient ID</th>
//                                 <th>Name</th>
//                                 <th>Email</th>
//                                 <th>Gender</th>
//                                 <th>Date of Birth</th>
//                                 <th>Referred Doctor</th>
//                                 <th>Image(s)</th>
//                                 <th>Update Image</th>
//                                 <th>Prediction (1st Img)</th> {/* Label clearly */}
//                                 <th>Action (1st Img)</th>    {/* Label clearly */}
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {filteredPatients.length > 0 ? (
//                                 filteredPatients.map((patient) => {
//                                     // Get the first image object, if it exists
//                                     const firstImage = patient.imageData && patient.imageData.length > 0
//                                         ? patient.imageData[0]
//                                         : null;
//                                     const firstImageId = firstImage?._id; // Get ID of first image

//                                     return (
//                                         <tr key={patient.patientId}>
//                                             <td>{patient.patientId || 'N/A'}</td>
//                                             <td>{patient.name || 'N/A'}</td>
//                                             <td>{patient.email || 'N/A'}</td>
//                                             <td>{patient.gender || 'N/A'}</td>
//                                             <td>{patient.dateOfBirth ? new Date(patient.dateOfBirth).toLocaleDateString() : 'N/A'}</td>
//                                             <td>{patient.referredDoctor || 'N/A'}</td>
//                                             <td>
//                                                 {patient.imageData && patient.imageData.length > 0 ? (
//                                                     <div className="image-box">
//                                                         {patient.imageData.map((image, i) => (
//                                                             image.imagePath ? (
//                                                                 <img
//                                                                     key={image._id || i} // Use mongo _id if available
//                                                                     // Construct URL using API_BASE_URL (Node backend serves images)
//                                                                     src={`${API_BASE_URL}/${image.imagePath}`}
//                                                                     alt={`Patient ${patient.patientId} - ${i + 1}`}
//                                                                     className="patient-image"
//                                                                     onClick={() => window.open(`${API_BASE_URL}/${image.imagePath}`, "_blank")}
//                                                                     onError={(e) => {
//                                                                         e.target.style.display = 'none'; // Hide broken image icon
//                                                                         // Optionally show a placeholder
//                                                                         const placeholder = document.createElement('span');
//                                                                         placeholder.textContent = 'Error';
//                                                                         e.target.parentNode.insertBefore(placeholder, e.target.nextSibling);
//                                                                         }}
//                                                                 />
//                                                             ) : <span key={i}>Invalid Path</span>
//                                                         ))}
//                                                     </div>
//                                                 ) : (
//                                                     <span>No image</span>
//                                                 )}
//                                             </td>
//                                             <td>
//                                                 {/* Button to select patient for upload */}
//                                                 <button
//                                                     className="upload-select-btn"
//                                                     onClick={() => setSelectedPatientIdForUpload(patient.patientId)}
//                                                     // Disable if already selected?
//                                                     disabled={selectedPatientIdForUpload === patient.patientId}
//                                                 >
//                                                     {selectedPatientIdForUpload === patient.patientId ? 'Selected' : 'Select'}
//                                                 </button>
//                                             </td>
//                                             <td>
//                                                 {/* Display Prediction Result (from first image) */}
//                                                 {firstImage?.prediction ? (
//                                                     <span>{firstImage.prediction}</span>
//                                                  ) : (
//                                                      <span style={{ color: '#aaa' }}>N/A</span> // Style N/A
//                                                  )}
//                                                 {/* Show loading/saving indicators */}
//                                                 {predicting[firstImageId] && <span className="status-indicator"> Predicting...</span>}
//                                                 {savingPrediction[firstImageId] && <span className="status-indicator"> Saving...</span>}
//                                             </td>
//                                             <td>
//                                                 {/* Prediction Button (for first image) */}
//                                                 <button
//                                                     className="predict-btn"
//                                                     // Pass the entire first image object
//                                                     onClick={() => handlePredict(patient.patientId, firstImage)}
//                                                     // Disable if no first image or already processing this image
//                                                     disabled={!firstImage || predicting[firstImageId] || savingPrediction[firstImageId]}
//                                                 >
//                                                      {(predicting[firstImageId] || savingPrediction[firstImageId]) ? 'Processing...' : 'Predict'}
//                                                 </button>
//                                             </td>
//                                         </tr>
//                                     );
//                                 }) // End map patients
//                             ) : (
//                                 <tr>
//                                     <td colSpan="10" style={{ textAlign: 'center' }}>No patients found matching search.</td>
//                                 </tr>
//                             )}
//                         </tbody>
//                     </table>
//                 </div>

//                 {/* Image Upload Form */}
//                 {selectedPatientIdForUpload && (
//                     <form onSubmit={handleUpload} className="upload-form">
//                         <h3>Update Image for Patient ID: {selectedPatientIdForUpload}</h3>
//                         <div className="file-input-group">
//                             <label htmlFor="file">Select Image:</label>
//                             <input
//                                 type="file" id="file" accept="image/*" required
//                                 onChange={(e) => setFile(e.target.files[0])}
//                             />
//                         </div>
//                         <div className="upload-form-buttons">
//                             <button type="submit" className="upload-submit-btn"> Upload Image </button>
//                             <button type="button" className="cancel-btn" onClick={() => setSelectedPatientIdForUpload(null)}> Cancel </button>
//                         </div>
//                     </form>
//                 )}
//             </div> {/* End main-content */}

//             {/* New Patient Modal */}
//             {isModalOpen && (
//                 <div className="modal-overlay" onClick={closeModal}>
//                     <div className="modal-container" onClick={(e) => e.stopPropagation()}>
//                         <h2>New Patient</h2>
//                         <form onSubmit={handleAddNewPatient}>
//                            {/* Add password input fields here if using signup endpoint */}
//                            {/* Example:
//                             <input type="password" placeholder="Password" required onChange={...} />
//                             <input type="password" placeholder="Confirm Password" required onChange={...} />
//                            */}
//                             <div className="modal-form-row">
//                                 <input type="text" placeholder="First Name" value={newPatient.firstName} onChange={(e) => setNewPatient({ ...newPatient, firstName: e.target.value })} required/>
//                                 <input type="text" placeholder="Last Name" value={newPatient.lastName} onChange={(e) => setNewPatient({ ...newPatient, lastName: e.target.value })} required/>
//                             </div>
//                             <div className="modal-form-row">
//                                 <input type="text" placeholder="Patient ID" value={newPatient.patientId} onChange={(e) => setNewPatient({ ...newPatient, patientId: e.target.value })} required/>
//                                 <input type="date" placeholder="Date of Birth" value={newPatient.dob} onChange={(e) => setNewPatient({ ...newPatient, dob: e.target.value })} required/>
//                             </div>
//                             <div className="modal-form-row">
//                                 <input type="text" placeholder="Gender" value={newPatient.gender} onChange={(e) => setNewPatient({ ...newPatient, gender: e.target.value })} required/>
//                                 <input type="text" placeholder="Referred Doctor" value={newPatient.referredDoctor} onChange={(e) => setNewPatient({ ...newPatient, referredDoctor: e.target.value })} required/>
//                             </div>
//                              {/* Add password and confirm password inputs here */}
//                             <div className="modal-buttons">
//                                 <button type="button" className="cancel-btn" onClick={closeModal}> Cancel </button>
//                                 <button type="submit" className="submit-btn"> Create Patient </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             )}
//         </div> // End organization-page
//     );
// };

// export default Organization;



// import React, { useState, useEffect, useCallback } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "./Organization.css"; // Make sure this CSS file exists and is styled

// const Organization = () => {
//     const organizationName = localStorage.getItem("organizationName");
//     const navigate = useNavigate();

//     // Data states
//     const [patients, setPatients] = useState([]);
//     const [file, setFile] = useState(null);
//     const [selectedPatientIdForUpload, setSelectedPatientIdForUpload] = useState(null); // This will store CUSTOM patient ID for upload form
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [searchTerm, setSearchTerm] = useState("");
//     const [predicting, setPredicting] = useState({}); // { imageId: boolean }
//     const [savingPrediction, setSavingPrediction] = useState({}); // { imageId: boolean }

//     const [newPatient, setNewPatient] = useState({
//         firstName: "",
//         lastName: "", // Keep lastName if you intend to use it
//         patientId: "", // Custom Patient ID
//         dob: "",
//         gender: "",
//         referredDoctor: ""
//     });

//     const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5001';
//     const PREDICT_API_URL = process.env.REACT_APP_PREDICT_API_URL || 'http://localhost:5002';

//     const fetchPatients = useCallback(async () => {
//         console.log("Fetching patients...");
//         const token = localStorage.getItem('token');
//         if (!token) {
//             alert("Authentication token not found. Please log in.");
//             navigate("/Login");
//             return;
//         }
//         try {
//             const config = { headers: { Authorization: `Bearer ${token}` } };
//             const response = await axios.get(`${API_BASE_URL}/api/patients`, config);
//             setPatients(response.data);
//             console.log("Patients fetched:", response.data);
//         } catch (error) {
//             console.error("Error fetching patients:", error);
//             if (error.response && (error.response.status === 401 || error.response.status === 403)) {
//                 alert("Session expired or unauthorized. Please log in again.");
//                 localStorage.clear();
//                 navigate("/Login");
//             } else {
//                 alert(`Failed to fetch patients: ${error.response?.data?.message || error.message}`);
//             }
//         }
//     }, [API_BASE_URL, navigate]);

//     useEffect(() => {
//         if (!localStorage.getItem('token')) { // Redirect if no token
//             navigate("/Login");
//         } else {
//             fetchPatients();
//         }
//     }, [fetchPatients, navigate]);

//     const handleLogout = () => {
//         localStorage.clear();
//         navigate("/Login");
//     };

//     const filteredPatients = patients.filter((patient) => {
//         const name = patient.name?.toLowerCase() ?? '';
//         const customId = patient.patientId?.toLowerCase() ?? ''; // Search by custom patientId
//         const email = patient.email?.toLowerCase() ?? '';
//         const term = searchTerm.toLowerCase();
//         return (
//             name.includes(term) ||
//             customId.includes(term) ||
//             email.includes(term)
//         );
//     });

//     // Handle image upload for a patient
//     const handleUpload = async (e) => {
//         e.preventDefault();
//         if (!selectedPatientIdForUpload || !file) { // selectedPatientIdForUpload is the CUSTOM ID
//             alert("Please select a patient and an image to upload.");
//             return;
//         }
//         const formData = new FormData();
//         // This patientId is the CUSTOM ID (e.g., P001) which staff selects
//         formData.append("patientId", selectedPatientIdForUpload);
//         if (organizationName) { // Logged-in user's organization
//             formData.append("organizationName", organizationName);
//         }
//         formData.append("image", file);

//         const token = localStorage.getItem('token');
//         if (!token) {
//             alert("Authentication error. Please log in again.");
//             navigate("/Login");
//             return;
//         }

//         console.log("Uploading image for custom patient ID:", selectedPatientIdForUpload);
//         try {
//             const config = {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                     "Content-Type": "multipart/form-data"
//                 }
//             };

//             const response = await axios.post(
//                 `${API_BASE_URL}/api/upload`,
//                 formData,
//                 config
//             );
//             alert(response.data.message || "Upload successful");
//             setFile(null);
//             document.getElementById('file').value = null; // Clear file input
//             setSelectedPatientIdForUpload(null); // Clear selection
//             fetchPatients(); // Refresh patient list to show new image
//         } catch (error) {
//             console.error("Error uploading image:", error);
//             alert(`Failed to upload image: ${error.response?.data?.message || error.message}`);
//         }
//     };

//     const handleAddNewPatient = async (e) => {
//         e.preventDefault();
//         const { firstName, lastName, patientId, dob, gender, referredDoctor } = newPatient;
//         // const fullName = `${firstName} ${lastName}`.trim(); // If using lastName
//         const fullName = firstName.trim(); // If only using firstName as 'name'
//         const email = `${firstName.toLowerCase().replace(/\s+/g, '')}@gmail.com`; // Auto-generate or have a field

//         if (!fullName || !patientId || !dob || !gender || !referredDoctor) { // Removed !lastName
//             alert("All fields (First Name, Patient ID, DOB, Gender, Referred Doctor) are required.");
//             return;
//         }
//         const password = prompt(`Enter a temporary password for new patient ${fullName} (ID: ${patientId}):`);
//         if (!password) {
//             alert("Password is required for the new patient account.");
//             return;
//         }
//         const token = localStorage.getItem('token');
//         if (!token) {
//             alert("Authentication error. Please log in again.");
//             navigate("/Login");
//             return;
//         }

//         try {
//             // Staff (authenticated by token) adds a new patient
//             const config = { headers: { Authorization: `Bearer ${token}` } };
//             const response = await axios.post(
//                 `${API_BASE_URL}/api/signup`,
//                 {
//                     name: fullName,
//                     email: email,
//                     password: password,
//                     role: "patient",
//                     patientId, // This is the custom Patient ID
//                     gender,
//                     dateOfBirth: dob,
//                     referredDoctor,
//                     organizationName: organizationName, // Logged-in org's name
//                 },
//                 config // Send auth token if signup endpoint is protected for staff actions
//             );
//             alert(response.data.message || "Patient added successfully");
//             setNewPatient({ firstName: "", lastName: "", patientId: "", dob: "", gender: "", referredDoctor: "" });
//             setIsModalOpen(false);
//             fetchPatients();
//         } catch (error) {
//             console.error("Error adding new patient:", error);
//             alert(`Failed to add patient: ${error.response?.data?.message || error.message}`);
//         }
//     };

//     // patientMongoId is the patient's MongoDB _id
//     // imageObject is the specific image subdocument from patient.imageData
//     const handlePredict = async (patientMongoId, imageObject) => {
//         if (!imageObject || !imageObject.imagePath || !imageObject._id) {
//             alert("Image data is missing or invalid for prediction.");
//             return;
//         }

//         const imageId = imageObject._id; // MongoDB ObjectId of the image subdocument

//         setPredicting(prev => ({ ...prev, [imageId]: true }));
//         setSavingPrediction(prev => ({ ...prev, [imageId]: false }));

//         let predictionResult = null;
//         const token = localStorage.getItem('token');
//         if (!token) {
//             alert("Authentication error. Please log in again.");
//             navigate("/Login");
//             setPredicting(prev => ({ ...prev, [imageId]: false }));
//             return;
//         }

//         try {
//             console.log(`1. Requesting prediction for imageId ${imageId} (path: ${imageObject.imagePath})`);
//             const predictResponse = await axios.post(`${PREDICT_API_URL}/api/predict`, {
//                 imagePath: imageObject.imagePath // Path as stored in DB, e.g., "uploads/xyz.jpg"
//             });
//             predictionResult = predictResponse.data.prediction;
//             console.log(`   Prediction received: ${predictionResult}`);
//         } catch (error) {
//             console.error(`Error predicting for imageId ${imageId}:`, error);
//             alert(`Prediction failed: ${error.response?.data?.error || error.message}`);
//             setPredicting(prev => ({ ...prev, [imageId]: false }));
//             return;
//         }

//         if (predictionResult) {
//             setSavingPrediction(prev => ({ ...prev, [imageId]: true }));
//             try {
//                 console.log(`2. Saving prediction "${predictionResult}" for imageId ${imageId} (patientMongoId: ${patientMongoId})`);
//                 const config = { headers: { Authorization: `Bearer ${token}` } };
//                 await axios.put(
//                     `${API_BASE_URL}/api/patients/${patientMongoId}/images/${imageId}/predict`,
//                     { prediction: predictionResult },
//                     config
//                 );
//                 console.log(`   Prediction saved successfully.`);
//                 fetchPatients(); // Refresh data
//             } catch (error) {
//                 console.error(`Error saving prediction for imageId ${imageId}:`, error);
//                 alert(`Failed to save prediction: ${error.response?.data?.message || error.message}`);
//             } finally {
//                 setPredicting(prev => ({ ...prev, [imageId]: false }));
//                 setSavingPrediction(prev => ({ ...prev, [imageId]: false }));
//             }
//         } else {
//             setPredicting(prev => ({ ...prev, [imageId]: false }));
//         }
//     };

//     const openModal = () => setIsModalOpen(true);
//     const closeModal = () => setIsModalOpen(false);

//     return (
//         <div className="organization-page">
//             <aside className="sidebar">
//                 <h3>Org: {organizationName || "N/A"}</h3>
//                 <button className="logout-btn" onClick={handleLogout}>
//                     Logout
//                 </button>
//             </aside>

//             <div className="main-content">
//                 <div className="header-section">
//                     <h1>Patients</h1>
//                     <div className="search-container">
//                         <input
//                             type="text"
//                             placeholder="Search by Name, Patient ID, Email..."
//                             value={searchTerm}
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                             className="search-input"
//                         />
//                     </div>
//                     <button className="new-patient-btn" onClick={openModal}>
//                         + New Patient
//                     </button>
//                 </div>

//                 <div className="table-container">
//                     <table className="patients-table">
//                         <thead>
//                             <tr>
//                                 <th>Patient ID</th>
//                                 <th>Name</th>
//                                 <th>Email</th>
//                                 <th>Images</th>
//                                 <th>Select to Upload</th>
//                                 <th>Image Details (Prediction/Action for 1st Image)</th>
//                                 <th>Image Details (Prediction/Action for 1st Image)</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {filteredPatients.length > 0 ? (
//                                 filteredPatients.map((patient) => {
//                                     const firstImage = patient.imageData && patient.imageData.length > 0
//                                         ? patient.imageData[0]
//                                         : null;
//                                     const firstImageId = firstImage?._id;

//                                     return (
//                                         <tr key={patient._id}> {/* Use patient's MongoDB _id for React key */}
//                                             <td>{patient.patientId || 'N/A'}</td> {/* Display CUSTOM Patient ID */}
//                                             <td>{patient.name || 'N/A'}</td>
//                                             <td>{patient.email || 'N/A'}</td>
//                                             <td>
//                                                 {patient.imageData && patient.imageData.length > 0 ? (
//                                                     <div className="image-previews">
//                                                         {patient.imageData.map((imgObj, idx) => (
//                                                             imgObj.imagePath ? (
//                                                                 <img
//                                                                     key={imgObj._id || idx}
//                                                                     src={`${API_BASE_URL}/${imgObj.imagePath}`}
//                                                                     alt={`${patient.name || 'Patient'} image ${idx + 1}`}
//                                                                     className="patient-image-thumbnail"
//                                                                     onClick={() => window.open(`${API_BASE_URL}/${imgObj.imagePath}`, "_blank")}
//                                                                 />
//                                                             ) : <span key={idx} className="no-image-text">Invalid Path</span>
//                                                         ))}
//                                                     </div>
//                                                 ) : (
//                                                     <span className="no-image-text">No images</span>
//                                                 )}
//                                             </td>
//                                             <td>
//                                                 <button
//                                                     className={`upload-select-btn ${selectedPatientIdForUpload === patient.patientId ? 'selected' : ''}`}
//                                                     onClick={() => setSelectedPatientIdForUpload(patient.patientId)} // Select by CUSTOM patient ID
//                                                     disabled={selectedPatientIdForUpload === patient.patientId}
//                                                 >
//                                                     {selectedPatientIdForUpload === patient.patientId ? 'Selected' : 'Select'}
//                                                 </button>
//                                             </td>
//                                             <td>
//                                                 {firstImage ? (
//                                                     <>
//                                                         {/* <span>Pred: {firstImage.prediction || 'N/A'}</span> */}
//                                                         <button
//                                                             className="predict-btn"
//                                                             onClick={() => handlePredict(patient._id, firstImage)} // Pass patient's MongoDB _id
//                                                             disabled={predicting[firstImageId] || savingPrediction[firstImageId]}
//                                                         >
//                                                             {(predicting[firstImageId] || savingPrediction[firstImageId]) ? 'Processing...' : 'Predict'}
//                                                         </button>
//                                                     </>
//                                                 ) : (
//                                                     <span className="no-image-text">N/A</span>
//                                                 )}
//                                             </td>
//                                             <td>
//                                             {firstImage ? (
//                                                     <>
//                                                         <span>Pred: {firstImage.prediction || 'N/A'}</span>
//                                                         {predicting[firstImageId] && <span className="status-indicator"> Predicting...</span>}
//                                                         {savingPrediction[firstImageId] && <span className="status-indicator"> Saving...</span>}
//                                                     </>
//                                                 ) : (
//                                                     <span className="no-image-text">N/A</span>
//                                                 )}
//                                             </td>
//                                         </tr>
//                                     );
//                                 })
//                             ) : (
//                                 <tr>
//                                     <td colSpan="6" style={{ textAlign: 'center' }}>
//                                         {patients.length === 0 ? "No patients found. Add a new patient." : "No patients match your search."}
//                                     </td>
//                                 </tr>
//                             )}
//                         </tbody>
//                     </table>
//                 </div>

//                 {selectedPatientIdForUpload && ( // selectedPatientIdForUpload is CUSTOM ID
//                     <form onSubmit={handleUpload} className="upload-form">
//                         <h3>Upload Image for Patient ID: {selectedPatientIdForUpload}</h3>
//                         <div className="file-input-group">
//                             <label htmlFor="file">Select Image:</label>
//                             <input type="file" id="file" accept="image/*" required onChange={(e) => setFile(e.target.files[0])} />
//                         </div>
//                         <div className="upload-form-buttons">
//                             <button type="submit" className="upload-submit-btn"> Upload Image </button>
//                             <button type="button" className="cancel-btn" onClick={() => { setFile(null); setSelectedPatientIdForUpload(null); if (document.getElementById('file')) document.getElementById('file').value = null; }}> Cancel </button>
//                         </div>
//                         {file && <p className="selected-file-info">Selected file: {file.name}</p>}
//                     </form>
//                 )}
//             </div>

//             {isModalOpen && (
//                 <div className="modal-overlay" onClick={closeModal}>
//                     <div className="modal-container" onClick={(e) => e.stopPropagation()}>
//                         <h2>Add New Patient</h2>
//                         <form onSubmit={handleAddNewPatient}>
//                             <div className="modal-form-row">
//                                 <input type="text" placeholder="First Name (becomes 'Name')" value={newPatient.firstName} onChange={(e) => setNewPatient({ ...newPatient, firstName: e.target.value })} required />
//                                 {/* <input type="text" placeholder="Last Name" value={newPatient.lastName} onChange={(e) => setNewPatient({ ...newPatient, lastName: e.target.value })} required/> */}
//                             </div>
//                             <div className="modal-form-row">
//                                 <input type="text" placeholder="Patient ID (e.g., P001, must be unique)" value={newPatient.patientId} onChange={(e) => setNewPatient({ ...newPatient, patientId: e.target.value })} required />
//                                 <input type="date" placeholder="Date of Birth" value={newPatient.dob} onChange={(e) => setNewPatient({ ...newPatient, dob: e.target.value })} required />
//                             </div>
//                             <div className="modal-form-row">
//                                 <input type="text" placeholder="Gender" value={newPatient.gender} onChange={(e) => setNewPatient({ ...newPatient, gender: e.target.value })} required />
//                                 <input type="text" placeholder="Referred Doctor" value={newPatient.referredDoctor} onChange={(e) => setNewPatient({ ...newPatient, referredDoctor: e.target.value })} required />
//                             </div>
//                             <p className="modal-note">An email and password will be auto-generated/prompted. Ensure the patient ID is unique.</p>
//                             <div className="modal-buttons">
//                                 <button type="button" className="cancel-btn" onClick={closeModal}> Cancel </button>
//                                 <button type="submit" className="submit-btn"> Create Patient </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Organization;










import React, { useState, useEffect, useCallback } from "react"; // Added useCallback
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Organization.css";

const Organization = () => {
    const organizationName = localStorage.getItem("organizationName");
    const navigate = useNavigate();

    // Data states
    const [patients, setPatients] = useState([]);
    const [file, setFile] = useState(null);
    const [selectedPatientIdForUpload, setSelectedPatientIdForUpload] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    // Removed local predictions state, rely on fetched patient data
    // const [predictions, setPredictions] = useState({});
    const [predicting, setPredicting] = useState({}); // Still useful for loading state { imageId: boolean }
    const [savingPrediction, setSavingPrediction] = useState({}); // State for saving { imageId: boolean }


    const [newPatient, setNewPatient] = useState({
        firstName: "",
        lastName: "",
        patientId: "",
        dob: "",
        gender: "",
        referredDoctor: ""
    });

    // Base URLs from environment variables (ensure they are set in your .env file)
    // Use REACT_APP_ prefix for create-react-app
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5001'; // Your Node.js backend
    const PREDICT_API_URL = process.env.REACT_APP_PREDICT_API_URL || 'http://localhost:5002'; // Your Python backend

    // Fetch patients from the Node.js API (now includes predictions in imageData)
    // Use useCallback to prevent re-creation on every render unless dependencies change
    const fetchPatients = useCallback(async () => {
        console.log("Fetching patients...");
        try {
            // TODO: Add authentication headers if needed
            // const token = localStorage.getItem('token');
            // const config = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.get(`${API_BASE_URL}/api/patients` /*, config */);
            setPatients(response.data);
            console.log("Patients fetched:", response.data);
        } catch (error) {
            console.error("Error fetching patients:", error);
            alert(`Failed to fetch patients: ${error.response?.data?.message || error.message}`);
            // Handle specific errors like 401 Unauthorized if implementing auth
        }
    }, [API_BASE_URL]); // Dependency: API_BASE_URL

    useEffect(() => {
        fetchPatients();
        // Run fetchPatients when the component mounts and if fetchPatients changes (due to URL change)
    }, [fetchPatients]);

    const handleLogout = () => {
        localStorage.clear(); // Clear all local storage (token, user info, etc.)
        navigate("/Login");
    };

    // Filter patients based on search term
    const filteredPatients = patients.filter((patient) => {
        const fullName = patient.name?.toLowerCase() ?? '';
        const id = patient.patientId?.toLowerCase() ?? '';
        const email = patient.email?.toLowerCase() ?? '';
        const term = searchTerm.toLowerCase();
        return (
            fullName.includes(term) ||
            id.includes(term) ||
            email.includes(term)
        );
    });

    // Handle image upload for a patient
    const handleUpload = async (e) => {
        e.preventDefault();
        if (!selectedPatientIdForUpload || !file) {
            alert("Please select a patient and an image to upload.");
            return;
        }
        const formData = new FormData();
        formData.append("patientId", selectedPatientIdForUpload);
        // Ensure organizationName is available and sent if needed by backend
        if (organizationName) {
            formData.append("organizationName", organizationName);
        }
        formData.append("image", file);

        // Add loading state indicator if needed

        try {
            // TODO: Add authentication headers if needed
            // const token = localStorage.getItem('token');
            // const config = { headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" } };
             const config = { headers: { "Content-Type": "multipart/form-data" } }; // Basic config

            const response = await axios.post(
                `${API_BASE_URL}/api/upload`,
                formData,
                config
            );
            alert(response.data.message || "Upload successful");
            setFile(null);
            setSelectedPatientIdForUpload(null);
            fetchPatients(); // Refresh patient list to show new image
        } catch (error) {
            console.error("Error uploading image:", error);
            alert(`Failed to upload image: ${error.response?.data?.message || error.message}`);
        } finally {
            // Clear loading state if added
        }
    };

    // Handle new patient submission (using the /api/signup endpoint)
    const handleAddNewPatient = async (e) => {
        e.preventDefault();
        const { firstName, lastName, patientId, dob, gender, referredDoctor } = newPatient;

        // const fullName = `${firstName} ${lastName}`.trim();
        const fullName = `${firstName}`.trim();
        // Simple email generation (requires password field in modal)
        // You'll need to add password fields to the modal or adjust backend logic
        const password = prompt("Enter a temporary password for the new patient:"); // VERY insecure - just for demo
         if (!password) {
            alert("Password is required.");
            return;
        }
        // const email = `${firstName.toLowerCase().replace(/\s+/g, '')}${lastName.toLowerCase().replace(/\s+/g, '')}@example.com`;
        const email = `${firstName.toLowerCase().replace(/\s+/g, '')}@gmail.com`;

        if (!firstName || !lastName || !patientId || !dob || !gender || !referredDoctor) {
            alert("All fields are required.");
            return;
        }
        try {
            // TODO: Add authentication if needed (e.g., only staff can add patients)
            const response = await axios.post(
                `${API_BASE_URL}/api/signup`,
                {
                    name: fullName,
                    email: email, // Consider making email unique/user-provided
                    password: password, // Send password
                    role: "patient", // Hardcoded role
                    patientId,
                    gender,
                    dateOfBirth: dob,
                    referredDoctor,
                    organizationName: organizationName, // Pass current org context if relevant
                }
            );
            alert(response.data.message || "Patient added successfully");
            setNewPatient({ // Reset form
                firstName: "", lastName: "", patientId: "", dob: "", gender: "", referredDoctor: ""
            });
            setIsModalOpen(false);
            fetchPatients(); // Refresh patient list
        } catch (error) {
            console.error("Error adding new patient:", error);
            alert(`Failed to add patient: ${error.response?.data?.message || error.message}`);
        }
    };

    // --- Modified Function: Handle Prediction Request and Save ---
    const handlePredict = async (patientId, imageObject) => {
        if (!imageObject || !imageObject.imagePath || !imageObject._id) {
            alert("Image data is missing or invalid for prediction.");
            return;
        }

        const imagePath = imageObject.imagePath; // e.g., "uploads/xyz.jpg"
        const imageId = imageObject._id; // MongoDB ObjectId of the image subdocument

        // Use imageId for loading state keys
        setPredicting(prev => ({ ...prev, [imageId]: true }));
        setSavingPrediction(prev => ({ ...prev, [imageId]: false })); // Ensure saving state is reset

        let predictionResult = null;

        // Step 1: Call Python backend for prediction
        try {
            console.log(`1. Requesting prediction for imageId ${imageId} (path: ${imagePath})`);
            const predictResponse = await axios.post(`${PREDICT_API_URL}/api/predict`, {
                // Send the image path *as stored* in MongoDB (relative path)
                // The Python backend needs to resolve this to a local file path
                imagePath: imagePath
            });
            predictionResult = predictResponse.data.prediction;
            console.log(`   Prediction received: ${predictionResult}`);

        } catch (error) {
            console.error(`Error predicting for imageId ${imageId}:`, error);
            alert(`Prediction failed: ${error.response?.data?.error || error.message}`);
            setPredicting(prev => ({ ...prev, [imageId]: false })); // Clear loading state on error
            return; // Stop the process if prediction fails
        } finally {
             // Set predicting false here only if NOT proceeding to save? Or keep it true until save finishes?
             // Let's keep predicting true and introduce savingPrediction state.
        }

        // Step 2: Call Node.js backend to save the prediction
        if (predictionResult) {
            setSavingPrediction(prev => ({ ...prev, [imageId]: true })); // Indicate saving started
            try {
                console.log(`2. Saving prediction "${predictionResult}" for imageId ${imageId} (patientId: ${patientId})`);
                 // TODO: Add authentication headers if needed
                // const token = localStorage.getItem('token');
                // const config = { headers: { Authorization: `Bearer ${token}` } };

                await axios.put(
                    `${API_BASE_URL}/api/patients/${patientId}/images/${imageId}/predict`,
                    { prediction: predictionResult } // Send prediction in request body
                   /* , config */
                );
                console.log(`   Prediction saved successfully.`);
                // Refresh data to show the saved prediction
                fetchPatients();

            } catch (error) {
                console.error(`Error saving prediction for imageId ${imageId}:`, error);
                alert(`Failed to save prediction: ${error.response?.data?.message || error.message}`);
                // Optionally revert the UI or show a specific save error state
            } finally {
                 setPredicting(prev => ({ ...prev, [imageId]: false })); // Clear predicting state
                 setSavingPrediction(prev => ({ ...prev, [imageId]: false })); // Clear saving state
            }
        } else {
             setPredicting(prev => ({ ...prev, [imageId]: false })); // Clear predicting state if no result
        }
    };


    // Open/Close Modal
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    // --- JSX Rendering ---
    return (
        <div className="organization-page">
            {/* Sidebar */}
            <aside className="sidebar">
                <h3>Organization: {organizationName || "N/A"}</h3>
                <button className="logout-btn" onClick={handleLogout}>
                    Logout
                </button>
            </aside>

            {/* Main Content */}
            <div className="main-content">
                <div className="header-section">
                    <h1>Patients</h1>
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Search patients..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input"
                        />
                    </div>
                    <button className="new-patient-btn" onClick={openModal}>
                        + New Patient
                    </button>
                </div>

                {/* Patients Table */}
                <div className="table-container">
                    <table className="patients-table">
                        <thead>
                            <tr>
                                <th>Patient ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Gender</th>
                                <th>Date of Birth</th>
                                <th>Referred Doctor</th>
                                <th>Image(s)</th>
                                <th>Update Image</th>
                                <th>Prediction (1st Img)</th> {/* Label clearly */}
                                <th>Action (1st Img)</th>    {/* Label clearly */}
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPatients.length > 0 ? (
                                filteredPatients.map((patient) => {
                                    // Get the first image object, if it exists
                                    const firstImage = patient.imageData && patient.imageData.length > 0
                                        ? patient.imageData[0]
                                        : null;
                                    const firstImageId = firstImage?._id; // Get ID of first image

                                    return (
                                        <tr key={patient.patientId}>
                                            <td>{patient.patientId || 'N/A'}</td>
                                            <td>{patient.name || 'N/A'}</td>
                                            <td>{patient.email || 'N/A'}</td>
                                            <td>{patient.gender || 'N/A'}</td>
                                            <td>{patient.dateOfBirth ? new Date(patient.dateOfBirth).toLocaleDateString() : 'N/A'}</td>
                                            <td>{patient.referredDoctor || 'N/A'}</td>
                                            <td>
                                                {patient.imageData && patient.imageData.length > 0 ? (
                                                    <div className="image-box">
                                                        {patient.imageData.map((image, i) => (
                                                            image.imagePath ? (
                                                                <img
                                                                    key={image._id || i} // Use mongo _id if available
                                                                    // Construct URL using API_BASE_URL (Node backend serves images)
                                                                    src={`${API_BASE_URL}/${image.imagePath}`}
                                                                    alt={`Patient ${patient.patientId} - ${i + 1}`}
                                                                    className="patient-image"
                                                                    onClick={() => window.open(`${API_BASE_URL}/${image.imagePath}`, "_blank")}
                                                                    onError={(e) => {
                                                                        e.target.style.display = 'none'; // Hide broken image icon
                                                                        // Optionally show a placeholder
                                                                        const placeholder = document.createElement('span');
                                                                        placeholder.textContent = 'Error';
                                                                        e.target.parentNode.insertBefore(placeholder, e.target.nextSibling);
                                                                        }}
                                                                />
                                                            ) : <span key={i}>Invalid Path</span>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <span>No image</span>
                                                )}
                                            </td>
                                            <td>
                                                {/* Button to select patient for upload */}
                                                <button
                                                    className="upload-select-btn"
                                                    onClick={() => setSelectedPatientIdForUpload(patient.patientId)}
                                                    // Disable if already selected?
                                                    disabled={selectedPatientIdForUpload === patient.patientId}
                                                >
                                                    {selectedPatientIdForUpload === patient.patientId ? 'Selected' : 'Select'}
                                                </button>
                                            </td>
                                            <td>
                                                {/* Display Prediction Result (from first image) */}
                                                {firstImage?.prediction ? (
                                                    <span>{firstImage.prediction}</span>
                                                 ) : (
                                                     <span style={{ color: '#aaa' }}>N/A</span> // Style N/A
                                                 )}
                                                {/* Show loading/saving indicators */}
                                                {predicting[firstImageId] && <span className="status-indicator"> Predicting...</span>}
                                                {savingPrediction[firstImageId] && <span className="status-indicator"> Saving...</span>}
                                            </td>
                                            <td>
                                                {/* Prediction Button (for first image) */}
                                                <button
                                                    className="predict-btn"
                                                    // Pass the entire first image object
                                                    onClick={() => handlePredict(patient.patientId, firstImage)}
                                                    // Disable if no first image or already processing this image
                                                    disabled={!firstImage || predicting[firstImageId] || savingPrediction[firstImageId]}
                                                >
                                                     {(predicting[firstImageId] || savingPrediction[firstImageId]) ? 'Processing...' : 'Predict'}
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                }) // End map patients
                            ) : (
                                <tr>
                                    <td colSpan="10" style={{ textAlign: 'center' }}>No patients found matching search.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Image Upload Form */}
                {selectedPatientIdForUpload && (
                    <form onSubmit={handleUpload} className="upload-form">
                        <h3>Update Image for Patient ID: {selectedPatientIdForUpload}</h3>
                        <div className="file-input-group">
                            <label htmlFor="file">Select Image:</label>
                            <input
                                type="file" id="file" accept="image/*" required
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                        </div>
                        <div className="upload-form-buttons">
                            <button type="submit" className="upload-submit-btn"> Upload Image </button>
                            <button type="button" className="cancel-btn" onClick={() => setSelectedPatientIdForUpload(null)}> Cancel </button>
                        </div>
                    </form>
                )}
            </div> {/* End main-content */}

            {/* New Patient Modal */}
            {isModalOpen && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                        <h2>New Patient</h2>
                        <form onSubmit={handleAddNewPatient}>
                           {/* Add password input fields here if using signup endpoint */}
                           {/* Example:
                            <input type="password" placeholder="Password" required onChange={...} />
                            <input type="password" placeholder="Confirm Password" required onChange={...} />
                           */}
                            <div className="modal-form-row">
                                <input type="text" placeholder="First Name" value={newPatient.firstName} onChange={(e) => setNewPatient({ ...newPatient, firstName: e.target.value })} required/>
                                <input type="text" placeholder="Last Name" value={newPatient.lastName} onChange={(e) => setNewPatient({ ...newPatient, lastName: e.target.value })} required/>
                            </div>
                            <div className="modal-form-row">
                                <input type="text" placeholder="Patient ID" value={newPatient.patientId} onChange={(e) => setNewPatient({ ...newPatient, patientId: e.target.value })} required/>
                                <input type="date" placeholder="Date of Birth" value={newPatient.dob} onChange={(e) => setNewPatient({ ...newPatient, dob: e.target.value })} required/>
                            </div>
                            <div className="modal-form-row">
                                <input type="text" placeholder="Gender" value={newPatient.gender} onChange={(e) => setNewPatient({ ...newPatient, gender: e.target.value })} required/>
                                <input type="text" placeholder="Referred Doctor" value={newPatient.referredDoctor} onChange={(e) => setNewPatient({ ...newPatient, referredDoctor: e.target.value })} required/>
                            </div>
                             {/* Add password and confirm password inputs here */}
                            <div className="modal-buttons">
                                <button type="button" className="cancel-btn" onClick={closeModal}> Cancel </button>
                                <button type="submit" className="submit-btn"> Create Patient </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div> // End organization-page
    );
};

export default Organization;
