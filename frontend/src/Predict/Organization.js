
// // // // // // // // // // // import React, { useState, useEffect } from 'react';
// // // // // // // // // // // import axios from 'axios';
// // // // // // // // // // // import { useNavigate } from 'react-router-dom';
// // // // // // // // // // // import './Organization.css';

// // // // // // // // // // // const Organization = () => {
// // // // // // // // // // //   const organizationName = localStorage.getItem('organizationName');
// // // // // // // // // // //   const navigate = useNavigate();

// // // // // // // // // // //   const [patients, setPatients] = useState([]);
// // // // // // // // // // //   const [selectedPatientId, setSelectedPatientId] = useState('');
// // // // // // // // // // //   const [file, setFile] = useState(null);
// // // // // // // // // // //   const [isFormVisible, setIsFormVisible] = useState(false);

// // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // //     const fetchPatients = async () => {
// // // // // // // // // // //       try {
// // // // // // // // // // //         // const response = await axios.get('http://localhost:5001/api/patients'); // Use full URL if needed
// // // // // // // // // // //         const response = await axios.get(`${process.env.REACT_APP_ORGANIZATION_RESPONSE_URL}/api/patients`); // Use full URL if needed
// // // // // // // // // // //         console.log('Fetched Patients:', response.data); // Debugging log
// // // // // // // // // // //         setPatients(response.data);
// // // // // // // // // // //       } catch (error) {
// // // // // // // // // // //         console.error('Error fetching patients:', error);
// // // // // // // // // // //       }
// // // // // // // // // // //     };
  
// // // // // // // // // // //     fetchPatients();
// // // // // // // // // // //   }, []);
  

// // // // // // // // // // //   const handleLogout = () => {
// // // // // // // // // // //     localStorage.clear();
// // // // // // // // // // //     navigate('/Login');
// // // // // // // // // // //   };
  
// // // // // // // // // // //   const handleUpload = async (e) => {
// // // // // // // // // // //     e.preventDefault();
  
// // // // // // // // // // //     if (!selectedPatientId || !file) {
// // // // // // // // // // //       alert('Please select a patient ID and an image.');
// // // // // // // // // // //       return;
// // // // // // // // // // //     }
  
// // // // // // // // // // //     const formData = new FormData();
// // // // // // // // // // //     formData.append('patientId', selectedPatientId);
// // // // // // // // // // //     formData.append('organizationName', organizationName); // Include organization name
// // // // // // // // // // //     formData.append('image', file);
  
// // // // // // // // // // //     try {
// // // // // // // // // // //       const response = await axios.post(`${process.env.REACT_APP_ORGANIZATION_RESPONSE_UPLOAD_URL}/api/upload`, formData, {
// // // // // // // // // // //       // const response = await axios.post('http://localhost:5001/api/upload', formData, {
// // // // // // // // // // //         headers: { 'Content-Type': 'multipart/form-data' },
// // // // // // // // // // //       });
// // // // // // // // // // //       alert(response.data.message);
// // // // // // // // // // //       setFile(null);
// // // // // // // // // // //       setSelectedPatientId('');
// // // // // // // // // // //     } catch (error) {
// // // // // // // // // // //       console.error('Error uploading file:', error);
// // // // // // // // // // //       alert('Failed to upload image.');
// // // // // // // // // // //     }
// // // // // // // // // // //   };
  

// // // // // // // // // // //   return (
// // // // // // // // // // //     <div className="main-content">
// // // // // // // // // // //       <div className="side-navbar">
// // // // // // // // // // //         <div className="navbar-top">
// // // // // // // // // // //           <h4>Organization: {organizationName}</h4>
// // // // // // // // // // //           <button onClick={() => setIsFormVisible(!isFormVisible)} className="upload-btn">
// // // // // // // // // // //             Upload Patient Details
// // // // // // // // // // //           </button>
// // // // // // // // // // //           <button onClick={handleLogout} className="logout-btn">Logout</button>
// // // // // // // // // // //         </div>
// // // // // // // // // // //       </div>
// // // // // // // // // // //       <div className="content">
// // // // // // // // // // //         {isFormVisible && (
// // // // // // // // // // //           <form onSubmit={handleUpload} className="upload-form">
// // // // // // // // // // //             <div>
// // // // // // // // // // //               <label htmlFor="patientId">Patient ID</label>
// // // // // // // // // // //               <select
// // // // // // // // // // //                 id="patientId"
// // // // // // // // // // //                 value={selectedPatientId}
// // // // // // // // // // //                 onChange={(e) => setSelectedPatientId(e.target.value)}
// // // // // // // // // // //               >
// // // // // // // // // // //                 <option value="">Select a patient</option>
// // // // // // // // // // //                 {patients.map((patient, index) => (
// // // // // // // // // // //                   <option key={index} value={patient.patientId}>
// // // // // // // // // // //                     {patient.patientId}
// // // // // // // // // // //                   </option>
// // // // // // // // // // //                 ))}
// // // // // // // // // // //               </select>
// // // // // // // // // // //             </div>
// // // // // // // // // // //             <div>
// // // // // // // // // // //               <label htmlFor="file">Upload Image</label>
// // // // // // // // // // //               <input
// // // // // // // // // // //                 type="file"
// // // // // // // // // // //                 id="file"
// // // // // // // // // // //                 accept="image/*"
// // // // // // // // // // //                 onChange={(e) => setFile(e.target.files[0])}
// // // // // // // // // // //               />
// // // // // // // // // // //             </div>
// // // // // // // // // // //             <button type="submit">Upload</button>
// // // // // // // // // // //           </form>
// // // // // // // // // // //         )}
// // // // // // // // // // //       </div>
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
// // // // // // // // // //   const [patientIds, setPatientIds] = useState([]);
// // // // // // // // // //   const [selectedPatientId, setSelectedPatientId] = useState("");
// // // // // // // // // //   const [file, setFile] = useState(null);
// // // // // // // // // //   const [error, setError] = useState("");
// // // // // // // // // //   const [successMessage, setSuccessMessage] = useState("");

// // // // // // // // // //   useEffect(() => {
// // // // // // // // // //     const fetchPatients = async () => {
// // // // // // // // // //       try {
// // // // // // // // // //         const response = await axios.get(`${process.env.REACT_APP_ORGANIZATION_RESPONSE_URL}/api/patients`);
// // // // // // // // // //         setPatients(response.data);
// // // // // // // // // //       } catch (error) {
// // // // // // // // // //         console.error("Error fetching patients:", error);
// // // // // // // // // //       }
// // // // // // // // // //     };

// // // // // // // // // //     // const fetchPatientIds = async () => {
// // // // // // // // // //     //   // try {
// // // // // // // // // //     //   //   const response = await axios.get(`${process.env.REACT_APP_fetchPatientIds_RESPONSE_URL}/api/patient-ids`);
// // // // // // // // // //     //   //   setPatientIds(response.data);
// // // // // // // // // //     //   // } catch (err) {
// // // // // // // // // //     //   //   console.error(err);
// // // // // // // // // //     //   //   setError("Failed to fetch patient IDs");
// // // // // // // // // //     //   // }
// // // // // // // // // //     // };

// // // // // // // // // //     fetchPatients();
// // // // // // // // // //     // fetchPatientIds();
// // // // // // // // // //   }, []);

// // // // // // // // // //   const handleLogout = () => {
// // // // // // // // // //     localStorage.clear();
// // // // // // // // // //     navigate("/Login");
// // // // // // // // // //   };

// // // // // // // // // //   const handleUpload = async (e) => {
// // // // // // // // // //     e.preventDefault();
// // // // // // // // // //     if (!selectedPatientId || !file) {
// // // // // // // // // //       setError("Please select a patient ID and upload an image.");
// // // // // // // // // //       return;
// // // // // // // // // //     }

// // // // // // // // // //     const formData = new FormData();
// // // // // // // // // //     formData.append("patientId", selectedPatientId);
// // // // // // // // // //     formData.append("organizationName", organizationName);
// // // // // // // // // //     formData.append("image", file);

// // // // // // // // // //     try {
// // // // // // // // // //       const response = await axios.post(`${process.env.REACT_APP_ORGANIZATION_RESPONSE_UPLOAD_URL}/api/upload`, formData, {
// // // // // // // // // //         headers: {
// // // // // // // // // //           "Content-Type": "multipart/form-data",
// // // // // // // // // //         },
// // // // // // // // // //       });
// // // // // // // // // //       setSuccessMessage(response.data.message);
// // // // // // // // // //       setError("");
// // // // // // // // // //       setFile(null);
// // // // // // // // // //       setSelectedPatientId("");
// // // // // // // // // //     } catch (error) {
// // // // // // // // // //       console.error("Error uploading file:", error);
// // // // // // // // // //       setError("Failed to upload image.");
// // // // // // // // // //     }
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
// // // // // // // // // //         <div className="upload-section">
// // // // // // // // // //           <h2>Upload Patient Details</h2>
// // // // // // // // // //           {error && <div className="alert alert-danger">{error}</div>}
// // // // // // // // // //           {successMessage && <div className="alert alert-success">{successMessage}</div>}
// // // // // // // // // //           <form onSubmit={handleUpload} className="upload-form">
// // // // // // // // // //             <div>
// // // // // // // // // //               <label htmlFor="patientId">Select Patient ID</label>
// // // // // // // // // //               <select
// // // // // // // // // //                 id="patientId"
// // // // // // // // // //                 value={selectedPatientId}
// // // // // // // // // //                 onChange={(e) => setSelectedPatientId(e.target.value)}
// // // // // // // // // //               >
// // // // // // // // // //                 <option value="">Select a patient</option>
// // // // // // // // // //                 {patients.map((patient) => (
// // // // // // // // // //                   <option key={patient.patientId} value={patient.patientId}>
// // // // // // // // // //                     {patient.patientId}
// // // // // // // // // //                   </option>
// // // // // // // // // //                 ))}
// // // // // // // // // //               </select>
// // // // // // // // // //             </div>
// // // // // // // // // //             <div>
// // // // // // // // // //               <label htmlFor="file">Upload Image</label>
// // // // // // // // // //               <input
// // // // // // // // // //                 type="file"
// // // // // // // // // //                 id="file"
// // // // // // // // // //                 accept="image/*"
// // // // // // // // // //                 onChange={(e) => setFile(e.target.files[0])}
// // // // // // // // // //               />
// // // // // // // // // //             </div>
// // // // // // // // // //             <button type="submit">Upload</button>
// // // // // // // // // //           </form>
// // // // // // // // // //         </div>
// // // // // // // // // //       </div>
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
// // // // // // // // //   const [patientIds, setPatientIds] = useState([]);
// // // // // // // // //   const [selectedPatientId, setSelectedPatientId] = useState("");
// // // // // // // // //   const [file, setFile] = useState(null);
// // // // // // // // //   const [error, setError] = useState("");
// // // // // // // // //   const [successMessage, setSuccessMessage] = useState("");
// // // // // // // // //   const [newPatient, setNewPatient] = useState({
// // // // // // // // //     name: "",
// // // // // // // // //     email: "",
// // // // // // // // //     password: "",
// // // // // // // // //     confirmPassword: "",
// // // // // // // // //     role: "patient",
// // // // // // // // //     patientId: "",
// // // // // // // // //     age: "",
// // // // // // // // //     gender: "",
// // // // // // // // //     dateOfBirth: "",
// // // // // // // // //     referredDoctor: "",
// // // // // // // // //   });
// // // // // // // // //   const [view, setView] = useState("existing"); // 'existing' or 'new'

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

// // // // // // // // //   const handleUpload = async (e) => {
// // // // // // // // //     e.preventDefault();
// // // // // // // // //     if (!selectedPatientId || !file) {
// // // // // // // // //       setError("Please select a patient ID and upload an image.");
// // // // // // // // //       return;
// // // // // // // // //     }

// // // // // // // // //     const formData = new FormData();
// // // // // // // // //     formData.append("patientId", selectedPatientId);
// // // // // // // // //     formData.append("organizationName", organizationName);
// // // // // // // // //     formData.append("image", file);

// // // // // // // // //     try {
// // // // // // // // //       const response = await axios.post(`${process.env.REACT_APP_ORGANIZATION_RESPONSE_UPLOAD_URL}/api/uploadExistingPatientImage`, formData, {
// // // // // // // // //         headers: {
// // // // // // // // //           "Content-Type": "multipart/form-data",
// // // // // // // // //         },
// // // // // // // // //       });
// // // // // // // // //       setSuccessMessage(response.data.message);
// // // // // // // // //       setError("");
// // // // // // // // //       setFile(null);
// // // // // // // // //       setSelectedPatientId("");
// // // // // // // // //     } catch (error) {
// // // // // // // // //       console.error("Error uploading file:", error);
// // // // // // // // //       setError("Failed to upload image.");
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   const handleAddPatient = async (e) => {
// // // // // // // // //     e.preventDefault();
// // // // // // // // //     const { name, email, password, confirmPassword, role, patientId, age, gender, dateOfBirth, referredDoctor } = newPatient;

// // // // // // // // //     if (password !== confirmPassword) {
// // // // // // // // //       setError("Passwords do not match.");
// // // // // // // // //       return;
// // // // // // // // //     }

// // // // // // // // //     try {
// // // // // // // // //       const response = await axios.post(`${process.env.REACT_APP_ORGANIZATION_RESPONSE_URL}/api/addPatient`, {
// // // // // // // // //         name, email, password, confirmPassword, role, patientId, age, gender, dateOfBirth, referredDoctor
// // // // // // // // //       });
// // // // // // // // //       setSuccessMessage(response.data.message);
// // // // // // // // //       setError("");
// // // // // // // // //       setNewPatient({
// // // // // // // // //         name: "",
// // // // // // // // //         email: "",
// // // // // // // // //         password: "",
// // // // // // // // //         confirmPassword: "",
// // // // // // // // //         role: "patient",
// // // // // // // // //         patientId: "",
// // // // // // // // //         age: "",
// // // // // // // // //         gender: "",
// // // // // // // // //         dateOfBirth: "",
// // // // // // // // //         referredDoctor: "",
// // // // // // // // //       });
// // // // // // // // //     } catch (error) {
// // // // // // // // //       console.error("Error adding patient:", error);
// // // // // // // // //       setError("Failed to add patient.");
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   return (
// // // // // // // // //     <div className="organization-page">
// // // // // // // // //       <div className="sidebar">
// // // // // // // // //         <h4>Organization: {organizationName}</h4>
// // // // // // // // //         <button onClick={handleLogout} className="logout-btn">
// // // // // // // // //           Logout
// // // // // // // // //         </button>
// // // // // // // // //       </div>

// // // // // // // // //       <div className="main-content">
// // // // // // // // //         <div className="buttons-section">
// // // // // // // // //           <button onClick={() => setView("existing")}>Existing Patients</button>
// // // // // // // // //           <button onClick={() => setView("new")}>Add New Patient</button>
// // // // // // // // //         </div>

// // // // // // // // //         {view === "existing" && (
// // // // // // // // //           <div className="upload-section">
// // // // // // // // //             <h2>Upload Image for Existing Patient</h2>
// // // // // // // // //             {error && <div className="alert alert-danger">{error}</div>}
// // // // // // // // //             {successMessage && <div className="alert alert-success">{successMessage}</div>}
// // // // // // // // //             <form onSubmit={handleUpload}>
// // // // // // // // //               <div>
// // // // // // // // //                 <label htmlFor="patientId">Select Patient ID</label>
// // // // // // // // //                 <select
// // // // // // // // //                   id="patientId"
// // // // // // // // //                   value={selectedPatientId}
// // // // // // // // //                   onChange={(e) => setSelectedPatientId(e.target.value)}
// // // // // // // // //                 >
// // // // // // // // //                   <option value="">Select a patient</option>
// // // // // // // // //                   {patients.map((patient) => (
// // // // // // // // //                     <option key={patient.patientId} value={patient.patientId}>
// // // // // // // // //                       {patient.patientId}
// // // // // // // // //                     </option>
// // // // // // // // //                   ))}
// // // // // // // // //                 </select>
// // // // // // // // //               </div>
// // // // // // // // //               <div>
// // // // // // // // //                 <label htmlFor="file">Upload Image</label>
// // // // // // // // //                 <input
// // // // // // // // //                   type="file"
// // // // // // // // //                   id="file"
// // // // // // // // //                   accept="image/*"
// // // // // // // // //                   onChange={(e) => setFile(e.target.files[0])}
// // // // // // // // //                 />
// // // // // // // // //               </div>
// // // // // // // // //               <button type="submit">Upload</button>
// // // // // // // // //             </form>
// // // // // // // // //           </div>
// // // // // // // // //         )}

// // // // // // // // //         {view === "new" && (
// // // // // // // // //           <div className="new-patient-section">
// // // // // // // // //             <h2>Add New Patient</h2>
// // // // // // // // //             {error && <div className="alert alert-danger">{error}</div>}
// // // // // // // // //             {successMessage && <div className="alert alert-success">{successMessage}</div>}
// // // // // // // // //             <form onSubmit={handleAddPatient}>
// // // // // // // // //               <div>
// // // // // // // // //                 <label>Name</label>
// // // // // // // // //                 <input
// // // // // // // // //                   type="text"
// // // // // // // // //                   value={newPatient.name}
// // // // // // // // //                   onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
// // // // // // // // //                 />
// // // // // // // // //               </div>
// // // // // // // // //               <div>
// // // // // // // // //                 <label>Email</label>
// // // // // // // // //                 <input
// // // // // // // // //                   type="email"
// // // // // // // // //                   value={newPatient.email}
// // // // // // // // //                   onChange={(e) => setNewPatient({ ...newPatient, email: e.target.value })}
// // // // // // // // //                 />
// // // // // // // // //               </div>
// // // // // // // // //               <div>
// // // // // // // // //                 <label>Password</label>
// // // // // // // // //                 <input
// // // // // // // // //                   type="password"
// // // // // // // // //                   value={newPatient.password}
// // // // // // // // //                   onChange={(e) => setNewPatient({ ...newPatient, password: e.target.value })}
// // // // // // // // //                 />
// // // // // // // // //               </div>
// // // // // // // // //               <div>
// // // // // // // // //                 <label>Confirm Password</label>
// // // // // // // // //                 <input
// // // // // // // // //                   type="password"
// // // // // // // // //                   value={newPatient.confirmPassword}
// // // // // // // // //                   onChange={(e) => setNewPatient({ ...newPatient, confirmPassword: e.target.value })}
// // // // // // // // //                 />
// // // // // // // // //               </div>
// // // // // // // // //               <div>
// // // // // // // // //                 <label>Age</label>
// // // // // // // // //                 <input
// // // // // // // // //                   type="number"
// // // // // // // // //                   value={newPatient.age}
// // // // // // // // //                   onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })}
// // // // // // // // //                 />
// // // // // // // // //               </div>
// // // // // // // // //               <div>
// // // // // // // // //                 <label>Gender</label>
// // // // // // // // //                 <input
// // // // // // // // //                   type="text"
// // // // // // // // //                   value={newPatient.gender}
// // // // // // // // //                   onChange={(e) => setNewPatient({ ...newPatient, gender: e.target.value })}
// // // // // // // // //                 />
// // // // // // // // //               </div>
// // // // // // // // //               <div>
// // // // // // // // //                 <label>Date of Birth</label>
// // // // // // // // //                 <input
// // // // // // // // //                   type="date"
// // // // // // // // //                   value={newPatient.dateOfBirth}
// // // // // // // // //                   onChange={(e) => setNewPatient({ ...newPatient, dateOfBirth: e.target.value })}
// // // // // // // // //                 />
// // // // // // // // //               </div>
// // // // // // // // //               <div>
// // // // // // // // //                 <label>Referred Doctor</label>
// // // // // // // // //                 <input
// // // // // // // // //                   type="text"
// // // // // // // // //                   value={newPatient.referredDoctor}
// // // // // // // // //                   onChange={(e) => setNewPatient({ ...newPatient, referredDoctor: e.target.value })}
// // // // // // // // //                 />
// // // // // // // // //               </div>
// // // // // // // // //               <button type="submit">Add Patient</button>
// // // // // // // // //             </form>
// // // // // // // // //           </div>
// // // // // // // // //         )}
// // // // // // // // //       </div>
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
// // // // // // // //   const [patientIds, setPatientIds] = useState([]);
// // // // // // // //   const [selectedPatientId, setSelectedPatientId] = useState("");
// // // // // // // //   const [file, setFile] = useState(null);
// // // // // // // //   const [newPatient, setNewPatient] = useState({
// // // // // // // //     name: "",
// // // // // // // //     email: "",
// // // // // // // //     patientId: "",
// // // // // // // //     gender: "",
// // // // // // // //     dateOfBirth: "",
// // // // // // // //     referredDoctor: "",
// // // // // // // //   });
// // // // // // // //   const [error, setError] = useState("");
// // // // // // // //   const [successMessage, setSuccessMessage] = useState("");
// // // // // // // //   const [isAddNewPatient, setIsAddNewPatient] = useState(false);

// // // // // // // //   useEffect(() => {
// // // // // // // //     const fetchPatients = async () => {
// // // // // // // //       try {
// // // // // // // //         const response = await axios.get(`${process.env.REACT_APP_ORGANIZATION_RESPONSE_URL}/api/patients`);
// // // // // // // //         setPatients(response.data);
// // // // // // // //       } catch (error) {
// // // // // // // //         console.error("Error fetching patients:", error);
// // // // // // // //       }
// // // // // // // //     };

// // // // // // // //     fetchPatients();
// // // // // // // //   }, []);

// // // // // // // //   const handleLogout = () => {
// // // // // // // //     localStorage.clear();
// // // // // // // //     navigate("/Login");
// // // // // // // //   };

// // // // // // // //   const handleUpload = async (e) => {
// // // // // // // //     e.preventDefault();
// // // // // // // //     if (!selectedPatientId || !file) {
// // // // // // // //       setError("Please select a patient ID and upload an image.");
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
// // // // // // // //       setSuccessMessage(response.data.message);
// // // // // // // //       setError("");
// // // // // // // //       setFile(null);
// // // // // // // //       setSelectedPatientId("");
// // // // // // // //     } catch (error) {
// // // // // // // //       console.error("Error uploading file:", error);
// // // // // // // //       setError("Failed to upload image.");
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   const handleAddNewPatient = async (e) => {
// // // // // // // //     e.preventDefault();
// // // // // // // //     const { name, email, patientId, gender, dateOfBirth, referredDoctor } = newPatient;

// // // // // // // //     if (!name || !email || !patientId || !gender || !dateOfBirth || !referredDoctor) {
// // // // // // // //       setError("All fields are required.");
// // // // // // // //       return;
// // // // // // // //     }

// // // // // // // //     try {
// // // // // // // //       const response = await axios.post(`${process.env.REACT_APP_ORGANIZATION_RESPONSE_URL}/api/signup`, {
// // // // // // // //         name,
// // // // // // // //         email,
// // // // // // // //         role: "patient",
// // // // // // // //         patientId,
// // // // // // // //         gender,
// // // // // // // //         dateOfBirth,
// // // // // // // //         referredDoctor,
// // // // // // // //         organizationName,
// // // // // // // //       });
// // // // // // // //       setSuccessMessage(response.data.message);
// // // // // // // //       setError("");
// // // // // // // //       setNewPatient({
// // // // // // // //         name: "",
// // // // // // // //         email: "",
// // // // // // // //         patientId: "",
// // // // // // // //         gender: "",
// // // // // // // //         dateOfBirth: "",
// // // // // // // //         referredDoctor: "",
// // // // // // // //       });
// // // // // // // //     } catch (error) {
// // // // // // // //       console.error("Error adding new patient:", error);
// // // // // // // //       setError("Failed to add new patient.");
// // // // // // // //     }
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
// // // // // // // //         <div className="upload-section">
// // // // // // // //           <h2>{isAddNewPatient ? "Add New Patient" : "Existing Patients"}</h2>

// // // // // // // //           {/* Toggle between "Add New Patient" and "Existing Patients" */}
// // // // // // // //           <button onClick={() => setIsAddNewPatient(!isAddNewPatient)}>
// // // // // // // //             {isAddNewPatient ? "View Existing Patients" : "Add New Patient"}
// // // // // // // //           </button>

// // // // // // // //           {isAddNewPatient ? (
// // // // // // // //             <form onSubmit={handleAddNewPatient} className="add-new-patient-form">
// // // // // // // //               <div>
// // // // // // // //                 <label htmlFor="name">Patient Name</label>
// // // // // // // //                 <input
// // // // // // // //                   type="text"
// // // // // // // //                   id="name"
// // // // // // // //                   value={newPatient.name}
// // // // // // // //                   onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
// // // // // // // //                 />
// // // // // // // //               </div>

// // // // // // // //               <div>
// // // // // // // //                 <label htmlFor="email">Email</label>
// // // // // // // //                 <input
// // // // // // // //                   type="email"
// // // // // // // //                   id="email"
// // // // // // // //                   value={newPatient.email}
// // // // // // // //                   onChange={(e) => setNewPatient({ ...newPatient, email: e.target.value })}
// // // // // // // //                 />
// // // // // // // //               </div>

// // // // // // // //               <div>
// // // // // // // //                 <label htmlFor="patientId">Patient ID</label>
// // // // // // // //                 <input
// // // // // // // //                   type="text"
// // // // // // // //                   id="patientId"
// // // // // // // //                   value={newPatient.patientId}
// // // // // // // //                   onChange={(e) => setNewPatient({ ...newPatient, patientId: e.target.value })}
// // // // // // // //                 />
// // // // // // // //               </div>

// // // // // // // //               <div>
// // // // // // // //                 <label htmlFor="gender">Gender</label>
// // // // // // // //                 <select
// // // // // // // //                   id="gender"
// // // // // // // //                   value={newPatient.gender}
// // // // // // // //                   onChange={(e) => setNewPatient({ ...newPatient, gender: e.target.value })}
// // // // // // // //                 >
// // // // // // // //                   <option value="">Select Gender</option>
// // // // // // // //                   <option value="Male">Male</option>
// // // // // // // //                   <option value="Female">Female</option>
// // // // // // // //                   <option value="Other">Other</option>
// // // // // // // //                 </select>
// // // // // // // //               </div>

// // // // // // // //               <div>
// // // // // // // //                 <label htmlFor="dateOfBirth">Date of Birth</label>
// // // // // // // //                 <input
// // // // // // // //                   type="date"
// // // // // // // //                   id="dateOfBirth"
// // // // // // // //                   value={newPatient.dateOfBirth}
// // // // // // // //                   onChange={(e) => setNewPatient({ ...newPatient, dateOfBirth: e.target.value })}
// // // // // // // //                 />
// // // // // // // //               </div>

// // // // // // // //               <div>
// // // // // // // //                 <label htmlFor="referredDoctor">Referred Doctor</label>
// // // // // // // //                 <input
// // // // // // // //                   type="text"
// // // // // // // //                   id="referredDoctor"
// // // // // // // //                   value={newPatient.referredDoctor}
// // // // // // // //                   onChange={(e) => setNewPatient({ ...newPatient, referredDoctor: e.target.value })}
// // // // // // // //                 />
// // // // // // // //               </div>

// // // // // // // //               <button type="submit">Add Patient</button>
// // // // // // // //             </form>
// // // // // // // //           ) : (
// // // // // // // //             <>
// // // // // // // //               <div className="patient-list">
// // // // // // // //                 {patients.map((patient) => (
// // // // // // // //                   <div key={patient.patientId}>
// // // // // // // //                     <h3>{patient.name}</h3>
// // // // // // // //                     <button onClick={() => setSelectedPatientId(patient.patientId)}>Upload Image</button>
// // // // // // // //                   </div>
// // // // // // // //                 ))}
// // // // // // // //               </div>

// // // // // // // //               <form onSubmit={handleUpload} className="upload-form">
// // // // // // // //                 <div>
// // // // // // // //                   <label htmlFor="file">Upload Image</label>
// // // // // // // //                   <input
// // // // // // // //                     type="file"
// // // // // // // //                     id="file"
// // // // // // // //                     accept="image/*"
// // // // // // // //                     onChange={(e) => setFile(e.target.files[0])}
// // // // // // // //                   />
// // // // // // // //                 </div>
// // // // // // // //                 <button type="submit">Upload</button>
// // // // // // // //               </form>
// // // // // // // //             </>
// // // // // // // //           )}

// // // // // // // //           {error && <div className="alert alert-danger">{error}</div>}
// // // // // // // //           {successMessage && <div className="alert alert-success">{successMessage}</div>}
// // // // // // // //         </div>
// // // // // // // //       </div>
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
// // // // // // //   const [patientIds, setPatientIds] = useState([]);
// // // // // // //   const [selectedPatientId, setSelectedPatientId] = useState("");
// // // // // // //   const [file, setFile] = useState(null);
// // // // // // //   const [newPatient, setNewPatient] = useState({
// // // // // // //     name: "",
// // // // // // //     email: "",
// // // // // // //     patientId: "",
// // // // // // //     gender: "",
// // // // // // //     dateOfBirth: "",
// // // // // // //     referredDoctor: "",
// // // // // // //   });
// // // // // // //   const [error, setError] = useState("");
// // // // // // //   const [successMessage, setSuccessMessage] = useState("");
// // // // // // //   const [isAddNewPatient, setIsAddNewPatient] = useState(false);

// // // // // // //   useEffect(() => {
// // // // // // //     const fetchPatients = async () => {
// // // // // // //       try {
// // // // // // //         const response = await axios.get(`${process.env.REACT_APP_ORGANIZATION_RESPONSE_URL}/api/patients`);
// // // // // // //         setPatients(response.data);
// // // // // // //       } catch (error) {
// // // // // // //         console.error("Error fetching patients:", error);
// // // // // // //       }
// // // // // // //     };

// // // // // // //     fetchPatients();
// // // // // // //   }, []);

// // // // // // //   const handleLogout = () => {
// // // // // // //     localStorage.clear();
// // // // // // //     navigate("/Login");
// // // // // // //   };

// // // // // // //   const handleUpload = async (e) => {
// // // // // // //     e.preventDefault();
// // // // // // //     if (!selectedPatientId || !file) {
// // // // // // //       setError("Please select a patient ID and upload an image.");
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
// // // // // // //       setSuccessMessage(response.data.message);
// // // // // // //       setError("");
// // // // // // //       setFile(null);
// // // // // // //       setSelectedPatientId("");
// // // // // // //     } catch (error) {
// // // // // // //       console.error("Error uploading file:", error);
// // // // // // //       setError("Failed to upload image.");
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const handleAddNewPatient = async (e) => {
// // // // // // //     e.preventDefault();
// // // // // // //     const { name, email, patientId, gender, dateOfBirth, referredDoctor } = newPatient;

// // // // // // //     if (!name || !email || !patientId || !gender || !dateOfBirth || !referredDoctor) {
// // // // // // //       setError("All fields are required.");
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
// // // // // // //       setSuccessMessage(response.data.message);
// // // // // // //       setError("");
// // // // // // //       setNewPatient({
// // // // // // //         name: "",
// // // // // // //         email: "",
// // // // // // //         patientId: "",
// // // // // // //         gender: "",
// // // // // // //         dateOfBirth: "",
// // // // // // //         referredDoctor: "",
// // // // // // //       });
// // // // // // //     } catch (error) {
// // // // // // //       console.error("Error adding new patient:", error);
// // // // // // //       setError("Failed to add new patient.");
// // // // // // //     }
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
// // // // // // //         {/* Button Section */}
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
// // // // // // //               <div>
// // // // // // //                 <label htmlFor="name">Patient Name</label>
// // // // // // //                 <input
// // // // // // //                   type="text"
// // // // // // //                   id="name"
// // // // // // //                   value={newPatient.name}
// // // // // // //                   onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
// // // // // // //                 />
// // // // // // //               </div>

// // // // // // //               <div>
// // // // // // //                 <label htmlFor="email">Email</label>
// // // // // // //                 <input
// // // // // // //                   type="email"
// // // // // // //                   id="email"
// // // // // // //                   value={newPatient.email}
// // // // // // //                   onChange={(e) => setNewPatient({ ...newPatient, email: e.target.value })}
// // // // // // //                 />
// // // // // // //               </div>

// // // // // // //               <div>
// // // // // // //                 <label htmlFor="patientId">Patient ID</label>
// // // // // // //                 <input
// // // // // // //                   type="text"
// // // // // // //                   id="patientId"
// // // // // // //                   value={newPatient.patientId}
// // // // // // //                   onChange={(e) => setNewPatient({ ...newPatient, patientId: e.target.value })}
// // // // // // //                 />
// // // // // // //               </div>

// // // // // // //               <div>
// // // // // // //                 <label htmlFor="gender">Gender</label>
// // // // // // //                 <select
// // // // // // //                   id="gender"
// // // // // // //                   value={newPatient.gender}
// // // // // // //                   onChange={(e) => setNewPatient({ ...newPatient, gender: e.target.value })}
// // // // // // //                 >
// // // // // // //                   <option value="">Select Gender</option>
// // // // // // //                   <option value="Male">Male</option>
// // // // // // //                   <option value="Female">Female</option>
// // // // // // //                   <option value="Other">Other</option>
// // // // // // //                 </select>
// // // // // // //               </div>

// // // // // // //               <div>
// // // // // // //                 <label htmlFor="dateOfBirth">Date of Birth</label>
// // // // // // //                 <input
// // // // // // //                   type="date"
// // // // // // //                   id="dateOfBirth"
// // // // // // //                   value={newPatient.dateOfBirth}
// // // // // // //                   onChange={(e) => setNewPatient({ ...newPatient, dateOfBirth: e.target.value })}
// // // // // // //                 />
// // // // // // //               </div>

// // // // // // //               <div>
// // // // // // //                 <label htmlFor="referredDoctor">Referred Doctor</label>
// // // // // // //                 <input
// // // // // // //                   type="text"
// // // // // // //                   id="referredDoctor"
// // // // // // //                   value={newPatient.referredDoctor}
// // // // // // //                   onChange={(e) => setNewPatient({ ...newPatient, referredDoctor: e.target.value })}
// // // // // // //                 />
// // // // // // //               </div>

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
// // // // // // //                         <img src={patient.imageData[0].imagePath} alt="Patient" className="patient-image" />
// // // // // // //                       ) : (
// // // // // // //                         <span>No Image</span>
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

// // // // // // //             {selectedPatientId && (
// // // // // // //               <form onSubmit={handleUpload} className="upload-form">
// // // // // // //                 <h3>Update Image for Patient ID: {selectedPatientId}</h3>
// // // // // // //                 <div>
// // // // // // //                   <label htmlFor="file">Upload New Image</label>
// // // // // // //                   <input
// // // // // // //                     type="file"
// // // // // // //                     id="file"
// // // // // // //                     accept="image/*"
// // // // // // //                     onChange={(e) => setFile(e.target.files[0])}
// // // // // // //                   />
// // // // // // //                 </div>
// // // // // // //                 <button type="submit">Upload</button>
// // // // // // //               </form>
// // // // // // //             )}
// // // // // // //           </div>
// // // // // // //         )}

// // // // // // //         {error && <div className="alert alert-danger">{error}</div>}
// // // // // // //         {successMessage && <div className="alert alert-success">{successMessage}</div>}
// // // // // // //       </div>
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
// // // // // //   const [selectedPatientId, setSelectedPatientId] = useState("");
// // // // // //   const [file, setFile] = useState(null);
// // // // // //   const [newPatient, setNewPatient] = useState({
// // // // // //     name: "",
// // // // // //     email: "",
// // // // // //     patientId: "",
// // // // // //     gender: "",
// // // // // //     dateOfBirth: "",
// // // // // //     referredDoctor: "",
// // // // // //   });
// // // // // //   const [error, setError] = useState("");
// // // // // //   const [successMessage, setSuccessMessage] = useState("");
// // // // // //   const [isAddNewPatient, setIsAddNewPatient] = useState(false);
// // // // // //   const [selectedImage, setSelectedImage] = useState(null);  // To store the selected image

// // // // // //   useEffect(() => {
// // // // // //     const fetchPatients = async () => {
// // // // // //       try {
// // // // // //         const response = await axios.get(`${process.env.REACT_APP_ORGANIZATION_RESPONSE_URL}/api/patients`);
// // // // // //         setPatients(response.data);
// // // // // //       } catch (error) {
// // // // // //         console.error("Error fetching patients:", error);
// // // // // //       }
// // // // // //     };

// // // // // //     fetchPatients();
// // // // // //   }, []);

// // // // // //   const handleLogout = () => {
// // // // // //     localStorage.clear();
// // // // // //     navigate("/Login");
// // // // // //   };

// // // // // //   const handleUpload = async (e) => {
// // // // // //     e.preventDefault();
// // // // // //     if (!selectedPatientId || !file) {
// // // // // //       setError("Please select a patient ID and upload an image.");
// // // // // //       return;
// // // // // //     }

// // // // // //     const formData = new FormData();
// // // // // //     formData.append("patientId", selectedPatientId);
// // // // // //     formData.append("organizationName", organizationName);
// // // // // //     formData.append("image", file);

// // // // // //     try {
// // // // // //       const response = await axios.post(`${process.env.REACT_APP_ORGANIZATION_RESPONSE_UPLOAD_URL}/api/upload`, formData, {
// // // // // //         headers: {
// // // // // //           "Content-Type": "multipart/form-data",
// // // // // //         },
// // // // // //       });
// // // // // //       setSuccessMessage(response.data.message);
// // // // // //       setError("");
// // // // // //       setFile(null);
// // // // // //       setSelectedPatientId("");
// // // // // //     } catch (error) {
// // // // // //       console.error("Error uploading file:", error);
// // // // // //       setError("Failed to upload image.");
// // // // // //     }
// // // // // //   };

// // // // // //   const handleAddNewPatient = async (e) => {
// // // // // //     e.preventDefault();
// // // // // //     const { name, email, patientId, gender, dateOfBirth, referredDoctor } = newPatient;

// // // // // //     if (!name || !email || !patientId || !gender || !dateOfBirth || !referredDoctor) {
// // // // // //       setError("All fields are required.");
// // // // // //       return;
// // // // // //     }

// // // // // //     try {
// // // // // //       const response = await axios.post(`${process.env.REACT_APP_ORGANIZATION_RESPONSE_URL}/api/signup`, {
// // // // // //         name,
// // // // // //         email,
// // // // // //         role: "patient",
// // // // // //         patientId,
// // // // // //         gender,
// // // // // //         dateOfBirth,
// // // // // //         referredDoctor,
// // // // // //         organizationName,
// // // // // //       });
// // // // // //       setSuccessMessage(response.data.message);
// // // // // //       setError("");
// // // // // //       setNewPatient({
// // // // // //         name: "",
// // // // // //         email: "",
// // // // // //         patientId: "",
// // // // // //         gender: "",
// // // // // //         dateOfBirth: "",
// // // // // //         referredDoctor: "",
// // // // // //       });
// // // // // //     } catch (error) {
// // // // // //       console.error("Error adding new patient:", error);
// // // // // //       setError("Failed to add new patient.");
// // // // // //     }
// // // // // //   };

// // // // // //   // Function to handle image click and open it in a modal
// // // // // //   const handleImageClick = (imagePath) => {
// // // // // //     setSelectedImage(imagePath);  // Set the image path to show in the modal
// // // // // //   };

// // // // // //   // Function to close the modal
// // // // // //   const closeModal = () => {
// // // // // //     setSelectedImage(null);  // Clear the selected image to close the modal
// // // // // //   };

// // // // // //   return (
// // // // // //     <div className="organization-page">
// // // // // //       {/* Sidebar */}
// // // // // //       <div className="sidebar">
// // // // // //         <h4>Organization: {organizationName}</h4>
// // // // // //         <button onClick={handleLogout} className="logout-btn">
// // // // // //           Logout
// // // // // //         </button>
// // // // // //       </div>

// // // // // //       {/* Main Content */}
// // // // // //       <div className="main-content">
// // // // // //         {/* Button Section */}
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
// // // // // //           <div className="add-new-patient-form">
// // // // // //             <h2>Add New Patient</h2>
// // // // // //             <form onSubmit={handleAddNewPatient}>
// // // // // //               {/* Form fields for new patient */}
// // // // // //               <div>
// // // // // //                 <label htmlFor="name">Patient Name</label>
// // // // // //                 <input
// // // // // //                   type="text"
// // // // // //                   id="name"
// // // // // //                   value={newPatient.name}
// // // // // //                   onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
// // // // // //                 />
// // // // // //               </div>
// // // // // //               {/* Other fields */}
// // // // // //               <button type="submit">Add Patient</button>
// // // // // //             </form>
// // // // // //           </div>
// // // // // //         ) : (
// // // // // //           // Existing Patients Section
// // // // // //           <div className="existing-patients">
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
// // // // // //                         <img
// // // // // //                           src={patient.imageData[0].imagePath}
// // // // // //                           alt="Patient"
// // // // // //                           className="patient-image"
// // // // // //                           onClick={() => handleImageClick(patient.imageData[0].imagePath)}  // Open image on click
// // // // // //                         />
// // // // // //                       ) : (
// // // // // //                         <span>No Image</span>
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

// // // // // //             {selectedPatientId && (
// // // // // //               <form onSubmit={handleUpload} className="upload-form">
// // // // // //                 <h3>Update Image for Patient ID: {selectedPatientId}</h3>
// // // // // //                 <div>
// // // // // //                   <label htmlFor="file">Upload New Image</label>
// // // // // //                   <input
// // // // // //                     type="file"
// // // // // //                     id="file"
// // // // // //                     accept="image/*"
// // // // // //                     onChange={(e) => setFile(e.target.files[0])}
// // // // // //                   />
// // // // // //                 </div>
// // // // // //                 <button type="submit">Upload</button>
// // // // // //               </form>
// // // // // //             )}
// // // // // //           </div>
// // // // // //         )}

// // // // // //         {error && <div className="alert alert-danger">{error}</div>}
// // // // // //         {successMessage && <div className="alert alert-success">{successMessage}</div>}
// // // // // //       </div>

// // // // // //       {/* Modal to display image */}
// // // // // //       {selectedImage && (
// // // // // //         <div className="modal">
// // // // // //           <div className="modal-content">
// // // // // //             <span className="close" onClick={closeModal}>&times;</span>
// // // // // //             <img src={selectedImage} alt="Selected" className="modal-image" />
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
// // // // //   const [patientIds, setPatientIds] = useState([]);
// // // // //   const [selectedPatientId, setSelectedPatientId] = useState("");
// // // // //   const [file, setFile] = useState(null);
// // // // //   const [newPatient, setNewPatient] = useState({
// // // // //     name: "",
// // // // //     email: "",
// // // // //     patientId: "",
// // // // //     gender: "",
// // // // //     dateOfBirth: "",
// // // // //     referredDoctor: "",
// // // // //   });
// // // // //   const [error, setError] = useState("");
// // // // //   const [successMessage, setSuccessMessage] = useState("");
// // // // //   const [isAddNewPatient, setIsAddNewPatient] = useState(false);
// // // // //   const [selectedImage, setSelectedImage] = useState(null); // State for the selected image to be displayed in the modal

// // // // //   useEffect(() => {
// // // // //     const fetchPatients = async () => {
// // // // //       try {
// // // // //         const response = await axios.get(`${process.env.REACT_APP_ORGANIZATION_RESPONSE_URL}/api/patients`);
// // // // //         setPatients(response.data);
// // // // //       } catch (error) {
// // // // //         console.error("Error fetching patients:", error);
// // // // //       }
// // // // //     };

// // // // //     fetchPatients();
// // // // //   }, []);

// // // // //   const handleLogout = () => {
// // // // //     localStorage.clear();
// // // // //     navigate("/Login");
// // // // //   };

// // // // //   const handleUpload = async (e) => {
// // // // //     e.preventDefault();
// // // // //     if (!selectedPatientId || !file) {
// // // // //       setError("Please select a patient ID and upload an image.");
// // // // //       return;
// // // // //     }

// // // // //     const formData = new FormData();
// // // // //     formData.append("patientId", selectedPatientId);
// // // // //     formData.append("organizationName", organizationName);
// // // // //     formData.append("image", file);

// // // // //     try {
// // // // //       const response = await axios.post(`${process.env.REACT_APP_ORGANIZATION_RESPONSE_UPLOAD_URL}/api/upload`, formData, {
// // // // //         headers: {
// // // // //           "Content-Type": "multipart/form-data",
// // // // //         },
// // // // //       });
// // // // //       setSuccessMessage(response.data.message);
// // // // //       setError("");
// // // // //       setFile(null);
// // // // //       setSelectedPatientId("");
// // // // //     } catch (error) {
// // // // //       console.error("Error uploading file:", error);
// // // // //       setError("Failed to upload image.");
// // // // //     }
// // // // //   };

// // // // //   const handleAddNewPatient = async (e) => {
// // // // //     e.preventDefault();
// // // // //     const { name, email, patientId, gender, dateOfBirth, referredDoctor } = newPatient;

// // // // //     if (!name || !email || !patientId || !gender || !dateOfBirth || !referredDoctor) {
// // // // //       setError("All fields are required.");
// // // // //       return;
// // // // //     }

// // // // //     try {
// // // // //       const response = await axios.post(`${process.env.REACT_APP_ORGANIZATION_RESPONSE_URL}/api/signup`, {
// // // // //         name,
// // // // //         email,
// // // // //         role: "patient",
// // // // //         patientId,
// // // // //         gender,
// // // // //         dateOfBirth,
// // // // //         referredDoctor,
// // // // //         organizationName,
// // // // //       });
// // // // //       setSuccessMessage(response.data.message);
// // // // //       setError("");
// // // // //       setNewPatient({
// // // // //         name: "",
// // // // //         email: "",
// // // // //         patientId: "",
// // // // //         gender: "",
// // // // //         dateOfBirth: "",
// // // // //         referredDoctor: "",
// // // // //       });
// // // // //     } catch (error) {
// // // // //       console.error("Error adding new patient:", error);
// // // // //       setError("Failed to add new patient.");
// // // // //     }
// // // // //   };

// // // // //   // Open modal with the selected image
// // // // //   const openModal = (imagePath) => {
// // // // //     setSelectedImage(imagePath);
// // // // //   };

// // // // //   // Close the modal
// // // // //   const closeModal = () => {
// // // // //     setSelectedImage(null);
// // // // //   };

// // // // //   return (
// // // // //     <div className="organization-page">
// // // // //       {/* Sidebar */}
// // // // //       <div className="sidebar">
// // // // //         <h4>Organization: {organizationName}</h4>
// // // // //         <button onClick={handleLogout} className="logout-btn">
// // // // //           Logout
// // // // //         </button>
// // // // //       </div>

// // // // //       {/* Main Content */}
// // // // //       <div className="main-content">
// // // // //         {/* Button Section */}
// // // // //         <div className="button-section">
// // // // //           <button
// // // // //             className={`action-btn ${!isAddNewPatient ? "active" : ""}`}
// // // // //             onClick={() => setIsAddNewPatient(false)}
// // // // //           >
// // // // //             Existing Patients
// // // // //           </button>
// // // // //           <button
// // // // //             className={`action-btn ${isAddNewPatient ? "active" : ""}`}
// // // // //             onClick={() => setIsAddNewPatient(true)}
// // // // //           >
// // // // //             Add New Patient
// // // // //           </button>
// // // // //         </div>

// // // // //         {/* Add New Patient Form */}
// // // // //         {isAddNewPatient ? (
// // // // //           <div className="add-new-patient-form">
// // // // //             <h2>Add New Patient</h2>
// // // // //             <form onSubmit={handleAddNewPatient}>
// // // // //               {/* form fields */}
// // // // //               <button type="submit">Add Patient</button>
// // // // //             </form>
// // // // //           </div>
// // // // //         ) : (
// // // // //           // Existing Patients Section
// // // // //           <div className="existing-patients">
// // // // //             <h2>Existing Patients</h2>
// // // // //             <table className="patients-table">
// // // // //               <thead>
// // // // //                 <tr>
// // // // //                   <th>Patient ID</th>
// // // // //                   <th>Name</th>
// // // // //                   <th>Email</th>
// // // // //                   <th>Gender</th>
// // // // //                   <th>Date of Birth</th>
// // // // //                   <th>Referred Doctor</th>
// // // // //                   <th>Image</th>
// // // // //                   <th>Update Image</th>
// // // // //                 </tr>
// // // // //               </thead>
// // // // //               <tbody>
// // // // //                 {patients.map((patient) => (
// // // // //                   <tr key={patient.patientId}>
// // // // //                     <td>{patient.patientId}</td>
// // // // //                     <td>{patient.name}</td>
// // // // //                     <td>{patient.email}</td>
// // // // //                     <td>{patient.gender}</td>
// // // // //                     <td>{patient.dateOfBirth}</td>
// // // // //                     <td>{patient.referredDoctor}</td>
// // // // //                     {/* <td>
// // // // //                       {patient.imageData && patient.imageData.length > 0 ? (
// // // // //                         <img
// // // // //                           src={patient.imageData[0].imagePath}
// // // // //                           alt="Patient"
// // // // //                           className="patient-image"
// // // // //                           onClick={() => openModal(patient.imageData[0].imagePath)} // Open image in modal on click
// // // // //                         />
// // // // //                       ) : (
// // // // //                         <span>No Image</span>
// // // // //                       )}
// // // // //                     </td> */}
// // // // //                     <td>
// // // // //                     {patient.imageData && patient.imageData.length > 0 ? (
// // // // //                       <ul>
// // // // //                         {patient.imageData.map((image, i) => (
// // // // //                           <li key={i}>
// // // // //                             <strong>Image Name:</strong> {image.imageName} <br />
// // // // //                             <strong>Upload Date:</strong> {new Date(image.uploadDate).toLocaleString()} <br />
// // // // //                             <strong>Organization Name:</strong> {image.organizationName} <br />
// // // // //                             <strong>Image Path:</strong>
// // // // //                             <a href={`http://localhost:5001/${image.imagePath}`} target="_blank" rel="noopener noreferrer">
// // // // //                               View Image
// // // // //                             </a>
// // // // //                           </li>
// // // // //                         ))}
// // // // //                       </ul>
// // // // //                     ) : (
// // // // //                       <span>No images uploaded</span>
// // // // //                     )}
// // // // //                   </td>
// // // // //                     <td>
// // // // //                       <button
// // // // //                         onClick={() => setSelectedPatientId(patient.patientId)}
// // // // //                         className="upload-image-btn"
// // // // //                       >
// // // // //                         Update Image
// // // // //                       </button>
// // // // //                     </td>
// // // // //                   </tr>
// // // // //                 ))}
// // // // //               </tbody>
// // // // //             </table>

// // // // //             {selectedPatientId && (
// // // // //               <form onSubmit={handleUpload} className="upload-form">
// // // // //                 <h3>Update Image for Patient ID: {selectedPatientId}</h3>
// // // // //                 <div>
// // // // //                   <label htmlFor="file">Upload New Image</label>
// // // // //                   <input
// // // // //                     type="file"
// // // // //                     id="file"
// // // // //                     accept="image/*"
// // // // //                     onChange={(e) => setFile(e.target.files[0])}
// // // // //                   />
// // // // //                 </div>
// // // // //                 <button type="submit">Upload</button>
// // // // //               </form>
// // // // //             )}
// // // // //           </div>
// // // // //         )}

// // // // //         {error && <div className="alert alert-danger">{error}</div>}
// // // // //         {successMessage && <div className="alert alert-success">{successMessage}</div>}
// // // // //       </div>

// // // // //       {/* Modal for viewing image */}
// // // // //       {selectedImage && (
// // // // //         <div className="modal" onClick={closeModal}>
// // // // //           <span className="close" onClick={closeModal}>&times;</span>
// // // // //           <img className="modal-content" src={selectedImage} alt="Patient" />
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
// // // //   const [selectedImage, setSelectedImage] = useState(null); // State for the modal image
// // // //   const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

// // // //   // Fetch patients from the backend
// // // //   useEffect(() => {
// // // //     const fetchPatients = async () => {
// // // //       try {
// // // //         const response = await axios.get(`${process.env.REACT_APP_ORGANIZATION_RESPONSE_URL}/api/patients`);
// // // //         setPatients(response.data);
// // // //       } catch (error) {
// // // //         console.error("Error fetching patients:", error);
// // // //       }
// // // //     };

// // // //     fetchPatients();
// // // //   }, []);

// // // //   const handleLogout = () => {
// // // //     localStorage.clear();
// // // //     navigate("/Login");
// // // //   };

// // // //   // Open Modal with the selected image
// // // //   const openModal = (imagePath) => {
// // // //     setSelectedImage(imagePath);
// // // //     setIsModalOpen(true);
// // // //   };

// // // //   // Close the modal
// // // //   const closeModal = () => {
// // // //     setIsModalOpen(false);
// // // //     setSelectedImage(null);
// // // //   };

// // // //   return (
// // // //     <div className="organization-page">
// // // //       {/* Sidebar */}
// // // //       <div className="sidebar">
// // // //         <h4>Organization: {organizationName}</h4>
// // // //         <button onClick={handleLogout} className="logout-btn">
// // // //           Logout
// // // //         </button>
// // // //       </div>

// // // //       {/* Main Content */}
// // // //       <div className="main-content">
// // // //         {/* Existing Patients Section */}
// // // //         <div className="existing-patients">
// // // //           <h2>Existing Patients</h2>
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
// // // //                           <div key={i}>
// // // //                             <img
// // // //                               src={`http://localhost:5001/${image.imagePath}`}
// // // //                               alt={`Patient Image ${i + 1}`}
// // // //                               className="patient-image"
// // // //                               onClick={() => openModal(`http://localhost:5001/${image.imagePath}`)} // Open image in modal on click
// // // //                             />
// // // //                           </div>
// // // //                         ))}
// // // //                       </div>
// // // //                     ) : (
// // // //                       <span>No images uploaded</span>
// // // //                     )}
// // // //                   </td>
// // // //                 </tr>
// // // //               ))}
// // // //             </tbody>
// // // //           </table>
// // // //         </div>
// // // //       </div>

// // // //       {/* Modal for Viewing Image */}
// // // //       {isModalOpen && (
// // // //         <div className="modal" onClick={closeModal}>
// // // //           <span className="close" onClick={closeModal}>
// // // //             &times;
// // // //           </span>
// // // //           <img className="modal-content" src={selectedImage} alt="Patient" />
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

// // //   const [patients, setPatients] = useState([]);
// // //   const [file, setFile] = useState(null); // File selected for uploading
// // //   const [selectedPatientId, setSelectedPatientId] = useState(null); // Selected patient for update
// // //   const [selectedImage, setSelectedImage] = useState(null); // State for the modal image
// // //   const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

// // //   useEffect(() => {
// // //     const fetchPatients = async () => {
// // //       try {
// // //         const response = await axios.get(`${process.env.REACT_APP_ORGANIZATION_RESPONSE_URL}/api/patients`);
// // //         setPatients(response.data);
// // //       } catch (error) {
// // //         console.error("Error fetching patients:", error);
// // //       }
// // //     };

// // //     fetchPatients();
// // //   }, []);

// // //   const handleLogout = () => {
// // //     localStorage.clear();
// // //     navigate("/Login");
// // //   };

// // //   // Handle Image Upload for Patient
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
// // //       const response = await axios.post(`${process.env.REACT_APP_ORGANIZATION_RESPONSE_UPLOAD_URL}/api/upload`, formData, {
// // //         headers: {
// // //           "Content-Type": "multipart/form-data",
// // //         },
// // //       });
// // //       alert(response.data.message);
// // //       setFile(null);
// // //       setSelectedPatientId(null);
// // //       fetchPatients(); // Fetch updated patient list
// // //     } catch (error) {
// // //       console.error("Error uploading image:", error);
// // //       alert("Failed to upload image.");
// // //     }
// // //   };

// // //   // Open Modal with the selected image
// // //   const openModal = (imagePath) => {
// // //     setSelectedImage(imagePath);
// // //     setIsModalOpen(true);
// // //   };

// // //   // Close the modal
// // //   const closeModal = () => {
// // //     setIsModalOpen(false);
// // //     setSelectedImage(null);
// // //   };

// // //   return (
// // //     <div className="organization-page">
// // //       {/* Sidebar */}
// // //       <div className="sidebar">
// // //         <h4>Organization: {organizationName}</h4>
// // //         <button onClick={handleLogout} className="logout-btn">
// // //           Logout
// // //         </button>
// // //       </div>

// // //       {/* Main Content */}
// // //       <div className="main-content">
// // //         {/* Existing Patients Section */}
// // //         <div className="existing-patients">
// // //           <h2>Existing Patients</h2>
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
// // //               </tr>
// // //             </thead>
// // //             <tbody>
// // //               {patients.map((patient) => (
// // //                 <tr key={patient.patientId}>
// // //                   <td>{patient.patientId}</td>
// // //                   <td>{patient.name}</td>
// // //                   <td>{patient.email}</td>
// // //                   <td>{patient.gender}</td>
// // //                   <td>{patient.dateOfBirth}</td>
// // //                   <td>{patient.referredDoctor}</td>
// // //                   <td>
// // //                     {patient.imageData && patient.imageData.length > 0 ? (
// // //                       <div className="image-box">
// // //                         {patient.imageData.map((image, i) => (
// // //                           <div key={i}>
// // //                             <img
// // //                               src={`http://localhost:5001/${image.imagePath}`}
// // //                               alt={`Patient Image ${i + 1}`}
// // //                               className="patient-image"
// // //                               onClick={() => openModal(`http://localhost:5001/${image.imagePath}`)} // Open image in modal on click
// // //                             />
// // //                           </div>
// // //                         ))}
// // //                       </div>
// // //                     ) : (
// // //                       <span>No images uploaded</span>
// // //                     )}
// // //                   </td>
// // //                   <td>
// // //                     <button
// // //                       onClick={() => setSelectedPatientId(patient.patientId)} 
// // //                       className="upload-image-btn"
// // //                     >
// // //                       Update Image
// // //                     </button>
// // //                   </td>
// // //                 </tr>
// // //               ))}
// // //             </tbody>
// // //           </table>
// // //         </div>

// // //         {/* Form for Updating Image */}
// // //         {selectedPatientId && (
// // //           <form onSubmit={handleUpload} className="upload-form">
// // //             <h3>Update Image for Patient ID: {selectedPatientId}</h3>
// // //             <div>
// // //               <label htmlFor="file">Upload New Image</label>
// // //               <input
// // //                 type="file"
// // //                 id="file"
// // //                 accept="image/*"
// // //                 onChange={(e) => setFile(e.target.files[0])}
// // //               />
// // //             </div>
// // //             <button type="submit">Upload Image</button>
// // //           </form>
// // //         )}
// // //       </div>

// // //       {/* Modal for Viewing Image */}
// // //       {isModalOpen && (
// // //         <div className="modal" onClick={closeModal}>
// // //           <span className="close" onClick={closeModal}>
// // //             &times;
// // //           </span>
// // //           <img className="modal-content" src={selectedImage} alt="Patient" />
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

// //   const [patients, setPatients] = useState([]);
// //   const [file, setFile] = useState(null); // File selected for uploading
// //   const [selectedPatientId, setSelectedPatientId] = useState(null); // Selected patient for update
// //   const [selectedImage, setSelectedImage] = useState(null); // State for the modal image
// //   const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

// //   // Fetch patients from the server
// //   const fetchPatients = async () => {
// //     try {
// //       const response = await axios.get(`${process.env.REACT_APP_ORGANIZATION_RESPONSE_URL}/api/patients`);
// //       setPatients(response.data);
// //     } catch (error) {
// //       console.error("Error fetching patients:", error);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchPatients(); // Fetch patients when the component mounts
// //   }, []);

// //   const handleLogout = () => {
// //     localStorage.clear();
// //     navigate("/Login");
// //   };

// //   // Handle Image Upload for Patient
// //   const handleUpload = async (e) => {
// //     e.preventDefault();
// //     if (!selectedPatientId || !file) {
// //       alert("Please select a patient and an image to upload.");
// //       return;
// //     }

// //     const formData = new FormData();
// //     formData.append("patientId", selectedPatientId);
// //     formData.append("organizationName", organizationName);
// //     formData.append("image", file);

// //     try {
// //       const response = await axios.post(`${process.env.REACT_APP_ORGANIZATION_RESPONSE_UPLOAD_URL}/api/upload`, formData, {
// //         headers: {
// //           "Content-Type": "multipart/form-data",
// //         },
// //       });
// //       alert(response.data.message);
// //       setFile(null);
// //       setSelectedPatientId(null);
// //       fetchPatients(); // Fetch updated patient list after image upload
// //     } catch (error) {
// //       console.error("Error uploading image:", error);
// //       alert("Failed to upload image.");
// //     }
// //   };

// //   // Open Modal with the selected image
// //   const openModal = (imagePath) => {
// //     setSelectedImage(imagePath);
// //     setIsModalOpen(true);
// //   };

// //   // Close the modal
// //   const closeModal = () => {
// //     setIsModalOpen(false);
// //     setSelectedImage(null);
// //   };

// //   return (
// //     <div className="organization-page">
// //       {/* Sidebar */}
// //       <div className="sidebar">
// //         <h4>Organization: {organizationName}</h4>
// //         <button onClick={handleLogout} className="logout-btn">
// //           Logout
// //         </button>
// //       </div>

// //       {/* Main Content */}
// //       <div className="main-content">
// //         {/* Existing Patients Section */}
// //         <div className="existing-patients">
// //           <h2>Existing Patients</h2>
// //           <table className="patients-table">
// //             <thead>
// //               <tr>
// //                 <th>Patient ID</th>
// //                 <th>Name</th>
// //                 <th>Email</th>
// //                 <th>Gender</th>
// //                 <th>Date of Birth</th>
// //                 <th>Referred Doctor</th>
// //                 <th>Image</th>
// //                 <th>Update Image</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {patients.map((patient) => (
// //                 <tr key={patient.patientId}>
// //                   <td>{patient.patientId}</td>
// //                   <td>{patient.name}</td>
// //                   <td>{patient.email}</td>
// //                   <td>{patient.gender}</td>
// //                   <td>{patient.dateOfBirth}</td>
// //                   <td>{patient.referredDoctor}</td>
// //                   <td>
// //                     {patient.imageData && patient.imageData.length > 0 ? (
// //                       <div className="image-box">
// //                         {patient.imageData.map((image, i) => (
// //                           <div key={i}>
// //                             <img
// //                               src={`http://localhost:5001/${image.imagePath}`}
// //                               alt={`Patient Image ${i + 1}`}
// //                               className="patient-image"
// //                               onClick={() => openModal(`http://localhost:5001/${image.imagePath}`)} // Open image in modal on click
// //                             />
// //                           </div>
// //                         ))}
// //                       </div>
// //                     ) : (
// //                       <span>No images uploaded</span>
// //                     )}
// //                   </td>
// //                   <td>
// //                     <button
// //                       onClick={() => setSelectedPatientId(patient.patientId)} 
// //                       className="upload-image-btn"
// //                     >
// //                       Update Image
// //                     </button>
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>

// //         {/* Form for Updating Image */}
// //         {selectedPatientId && (
// //           <form onSubmit={handleUpload} className="upload-form">
// //             <h3>Update Image for Patient ID: {selectedPatientId}</h3>
// //             <div>
// //               <label htmlFor="file">Upload New Image</label>
// //               <input
// //                 type="file"
// //                 id="file"
// //                 accept="image/*"
// //                 onChange={(e) => setFile(e.target.files[0])}
// //               />
// //             </div>
// //             <button type="submit">Upload Image</button>
// //           </form>
// //         )}
// //       </div>

// //       {/* Modal for Viewing Image */}
// //       {isModalOpen && (
// //         <div className="modal" onClick={closeModal}>
// //           <span className="close" onClick={closeModal}>
// //             &times;
// //           </span>
// //           <img className="modal-content" src={selectedImage} alt="Patient" />
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default Organization;



// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "./Organization.css";

// const Organization = () => {
//   const organizationName = localStorage.getItem("organizationName");
//   const navigate = useNavigate();

//   const [patients, setPatients] = useState([]);
//   const [file, setFile] = useState(null); // File selected for uploading
//   const [selectedPatientId, setSelectedPatientId] = useState(null); // Selected patient for update
//   const [selectedImage, setSelectedImage] = useState(null); // State for the modal image
//   const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
//   const [isAddNewPatient, setIsAddNewPatient] = useState(false); // Show Add New Patient Form
//   const [newPatient, setNewPatient] = useState({
//     name: "",
//     email: "",
//     patientId: "",
//     gender: "",
//     dateOfBirth: "",
//     referredDoctor: "",
//   });

//   // Fetch patients from the server
//   const fetchPatients = async () => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_ORGANIZATION_RESPONSE_URL}/api/patients`);
//       setPatients(response.data);
//     } catch (error) {
//       console.error("Error fetching patients:", error);
//     }
//   };

//   useEffect(() => {
//     fetchPatients(); // Fetch patients when the component mounts
//   }, []);

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/Login");
//   };

//   // Handle Image Upload for Patient
//   const handleUpload = async (e) => {
//     e.preventDefault();
//     if (!selectedPatientId || !file) {
//       alert("Please select a patient and an image to upload.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("patientId", selectedPatientId);
//     formData.append("organizationName", organizationName);
//     formData.append("image", file);

//     try {
//       const response = await axios.post(`${process.env.REACT_APP_ORGANIZATION_RESPONSE_UPLOAD_URL}/api/upload`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       alert(response.data.message);
//       setFile(null);
//       setSelectedPatientId(null);
//       fetchPatients(); // Fetch updated patient list after image upload
//     } catch (error) {
//       console.error("Error uploading image:", error);
//       alert("Failed to upload image.");
//     }
//   };

//   // Handle Adding a New Patient
//   const handleAddNewPatient = async (e) => {
//     e.preventDefault();
//     const { name, email, patientId, gender, dateOfBirth, referredDoctor } = newPatient;

//     if (!name || !email || !patientId || !gender || !dateOfBirth || !referredDoctor) {
//       alert("All fields are required.");
//       return;
//     }

//     try {
//       const response = await axios.post(`${process.env.REACT_APP_ORGANIZATION_RESPONSE_URL}/api/signup`, {
//         name,
//         email,
//         role: "patient",
//         patientId,
//         gender,
//         dateOfBirth,
//         referredDoctor,
//         organizationName,
//       });
//       alert(response.data.message);
//       setNewPatient({
//         name: "",
//         email: "",
//         patientId: "",
//         gender: "",
//         dateOfBirth: "",
//         referredDoctor: "",
//       });
//       setIsAddNewPatient(false); // Close "Add New Patient" form after submission
//       fetchPatients(); // Fetch updated patient list after adding new patient
//     } catch (error) {
//       console.error("Error adding new patient:", error);
//       alert("Failed to add new patient.");
//     }
//   };

//   // Open Modal with the selected image
//   const openModal = (imagePath) => {
//     setSelectedImage(imagePath);
//     setIsModalOpen(true);
//   };

//   // Close the modal
//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedImage(null);
//   };

//   return (
//     <div className="organization-page">
//       {/* Sidebar */}
//       <div className="sidebar">
//         <h4>Organization: {organizationName}</h4>
//         <button onClick={handleLogout} className="logout-btn">
//           Logout
//         </button>
//       </div>

//       {/* Main Content */}
//       <div className="main-content">
//         {/* Button Section for Toggle Between Add New Patient and Existing Patients */}
//         <div className="button-section">
//           <button
//             className={`action-btn ${!isAddNewPatient ? "active" : ""}`}
//             onClick={() => setIsAddNewPatient(false)}
//           >
//             Existing Patients
//           </button>
//           <button
//             className={`action-btn ${isAddNewPatient ? "active" : ""}`}
//             onClick={() => setIsAddNewPatient(true)}
//           >
//             Add New Patient
//           </button>
//         </div>

//         {/* Add New Patient Form */}
//         {isAddNewPatient ? (
//           <div className="add-new-patient-form">
//             <h2>Add New Patient</h2>
//             <form onSubmit={handleAddNewPatient}>
//               <input
//                 type="text"
//                 placeholder="Name"
//                 value={newPatient.name}
//                 onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
//               />
//               <input
//                 type="email"
//                 placeholder="Email"
//                 value={newPatient.email}
//                 onChange={(e) => setNewPatient({ ...newPatient, email: e.target.value })}
//               />
//               <input
//                 type="text"
//                 placeholder="Patient ID"
//                 value={newPatient.patientId}
//                 onChange={(e) => setNewPatient({ ...newPatient, patientId: e.target.value })}
//               />
//               <select
//                 value={newPatient.gender}
//                 onChange={(e) => setNewPatient({ ...newPatient, gender: e.target.value })}
//               >
//                 <option value="">Gender</option>
//                 <option value="Male">Male</option>
//                 <option value="Female">Female</option>
//                 <option value="Other">Other</option>
//               </select>
//               <input
//                 type="date"
//                 placeholder="Date of Birth"
//                 value={newPatient.dateOfBirth}
//                 onChange={(e) => setNewPatient({ ...newPatient, dateOfBirth: e.target.value })}
//               />
//               <input
//                 type="text"
//                 placeholder="Referred Doctor"
//                 value={newPatient.referredDoctor}
//                 onChange={(e) => setNewPatient({ ...newPatient, referredDoctor: e.target.value })}
//               />
//               <button type="submit">Add Patient</button>
//             </form>
//           </div>
//         ) : (
//           // Existing Patients Section
//           <div className="existing-patients">
//             <h2>Existing Patients</h2>
//             <table className="patients-table">
//               <thead>
//                 <tr>
//                   <th>Patient ID</th>
//                   <th>Name</th>
//                   <th>Email</th>
//                   <th>Gender</th>
//                   <th>Date of Birth</th>
//                   <th>Referred Doctor</th>
//                   <th>Image</th>
//                   <th>Update Image</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {patients.map((patient) => (
//                   <tr key={patient.patientId}>
//                     <td>{patient.patientId}</td>
//                     <td>{patient.name}</td>
//                     <td>{patient.email}</td>
//                     <td>{patient.gender}</td>
//                     <td>{patient.dateOfBirth}</td>
//                     <td>{patient.referredDoctor}</td>
//                     <td>
//                       {patient.imageData && patient.imageData.length > 0 ? (
//                         <div className="image-box">
//                           {patient.imageData.map((image, i) => (
//                             <div key={i}>
//                               <img
//                                 src={`http://localhost:5001/${image.imagePath}`}
//                                 alt={`Patient Image ${i + 1}`}
//                                 className="patient-image"
//                                 onClick={() => openModal(`http://localhost:5001/${image.imagePath}`)} // Open image in modal on click
//                               />
//                             </div>
//                           ))}
//                         </div>
//                       ) : (
//                         <span>No images uploaded</span>
//                       )}
//                     </td>
//                     <td>
//                       <button
//                         onClick={() => setSelectedPatientId(patient.patientId)} 
//                         className="upload-image-btn"
//                       >
//                         Update Image
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {/* Form for Updating Image */}
//         {selectedPatientId && (
//           <form onSubmit={handleUpload} className="upload-form">
//             <h3>Update Image for Patient ID: {selectedPatientId}</h3>
//             <div>
//               <label htmlFor="file">Upload New Image</label>
//               <input
//                 type="file"
//                 id="file"
//                 accept="image/*"
//                 onChange={(e) => setFile(e.target.files[0])}
//               />
//             </div>
//             <button type="submit">Upload Image</button>
//           </form>
//         )}
//       </div>

//       {/* Modal for Viewing Image */}
//       {isModalOpen && (
//         <div className="modal" onClick={closeModal}>
//           <span className="close" onClick={closeModal}>
//             &times;
//           </span>
//           <img className="modal-content" src={selectedImage} alt="Patient" />
//         </div>
//       )}
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
  const [file, setFile] = useState(null); // File selected for uploading
  const [selectedPatientId, setSelectedPatientId] = useState(null); // Selected patient for update
  const [selectedImage, setSelectedImage] = useState(null); // State for the modal image
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [isAddNewPatient, setIsAddNewPatient] = useState(false); // Show Add New Patient Form
  const [newPatient, setNewPatient] = useState({
    name: "",
    email: "",
    patientId: "",
    gender: "",
    dateOfBirth: "",
    referredDoctor: "",
  });

  // Fetch patients from the server
  const fetchPatients = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_ORGANIZATION_RESPONSE_URL}/api/patients`
      );
      setPatients(response.data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  useEffect(() => {
    fetchPatients(); // Fetch patients when the component mounts
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/Login");
  };

  // Handle Image Upload for Patient
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedPatientId || !file) {
      alert("Please select a patient and an image to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("patientId", selectedPatientId);
    formData.append("organizationName", organizationName);
    formData.append("image", file);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_ORGANIZATION_RESPONSE_UPLOAD_URL}/api/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert(response.data.message);
      setFile(null);
      setSelectedPatientId(null);
      fetchPatients(); // Fetch updated patient list after image upload
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image.");
    }
  };

  // Handle Adding a New Patient
  const handleAddNewPatient = async (e) => {
    e.preventDefault();
    const { name, email, patientId, gender, dateOfBirth, referredDoctor } = newPatient;

    if (!name || !email || !patientId || !gender || !dateOfBirth || !referredDoctor) {
      alert("All fields are required.");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_ORGANIZATION_RESPONSE_URL}/api/signup`,
        {
          name,
          email,
          role: "patient",
          patientId,
          gender,
          dateOfBirth,
          referredDoctor,
          organizationName,
        }
      );
      alert(response.data.message);
      setNewPatient({
        name: "",
        email: "",
        patientId: "",
        gender: "",
        dateOfBirth: "",
        referredDoctor: "",
      });
      setIsAddNewPatient(false); // Close "Add New Patient" form after submission
      fetchPatients(); // Fetch updated patient list after adding new patient
    } catch (error) {
      console.error("Error adding new patient:", error);
      alert("Failed to add new patient.");
    }
  };

  // Open Modal with the selected image
  const openModal = (imagePath) => {
    setSelectedImage(imagePath);
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <div className="organization-page">
      {/* Sidebar */}
      <div className="sidebar">
        <h4 className="organization-name">Organization: {organizationName}</h4>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Toggle Buttons for Existing Patients vs. Add New Patient */}
        <div className="button-section">
          <button
            className={`action-btn ${!isAddNewPatient ? "active" : ""}`}
            onClick={() => setIsAddNewPatient(false)}
          >
            Existing Patients
          </button>
          <button
            className={`action-btn ${isAddNewPatient ? "active" : ""}`}
            onClick={() => setIsAddNewPatient(true)}
          >
            Add New Patient
          </button>
        </div>

        {/* Add New Patient Form */}
        {isAddNewPatient ? (
          <div className="add-new-patient-form fade-in">
            <h2>Add New Patient</h2>
            <form onSubmit={handleAddNewPatient}>
              <input
                type="text"
                placeholder="Name"
                value={newPatient.name}
                onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
              />
              <input
                type="email"
                placeholder="Email"
                value={newPatient.email}
                onChange={(e) => setNewPatient({ ...newPatient, email: e.target.value })}
              />
              <input
                type="text"
                placeholder="Patient ID"
                value={newPatient.patientId}
                onChange={(e) => setNewPatient({ ...newPatient, patientId: e.target.value })}
              />
              <select
                value={newPatient.gender}
                onChange={(e) => setNewPatient({ ...newPatient, gender: e.target.value })}
              >
                <option value="">Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <input
                type="date"
                placeholder="Date of Birth"
                value={newPatient.dateOfBirth}
                onChange={(e) => setNewPatient({ ...newPatient, dateOfBirth: e.target.value })}
              />
              <input
                type="text"
                placeholder="Referred Doctor"
                value={newPatient.referredDoctor}
                onChange={(e) => setNewPatient({ ...newPatient, referredDoctor: e.target.value })}
              />
              <button type="submit" className="submit-btn">
                Add Patient
              </button>
            </form>
          </div>
        ) : (
          // Existing Patients Section
          <div className="existing-patients fade-in">
            <h2>Existing Patients</h2>
            <table className="patients-table">
              <thead>
                <tr>
                  <th>Patient ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Gender</th>
                  <th>Date of Birth</th>
                  <th>Referred Doctor</th>
                  <th>Image</th>
                  <th>Update Image</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient) => (
                  <tr key={patient.patientId}>
                    <td>{patient.patientId}</td>
                    <td>{patient.name}</td>
                    <td>{patient.email}</td>
                    <td>{patient.gender}</td>
                    <td>{patient.dateOfBirth}</td>
                    <td>{patient.referredDoctor}</td>
                    <td>
                      {patient.imageData && patient.imageData.length > 0 ? (
                        <div className="image-box">
                          {patient.imageData.map((image, i) => (
                            <div key={i} className="thumbnail-box">
                              <img
                                src={`http://localhost:5001/${image.imagePath}`}
                                alt={`Patient Image ${i + 1}`}
                                className="patient-image"
                                onClick={() =>
                                  openModal(`http://localhost:5001/${image.imagePath}`)
                                }
                              />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <span>No images uploaded</span>
                      )}
                    </td>
                    <td>
                      <button
                        onClick={() => setSelectedPatientId(patient.patientId)}
                        className="upload-image-btn"
                      >
                        Update Image
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Form for Updating Image */}
        {selectedPatientId && (
          <form onSubmit={handleUpload} className="upload-form fade-in-up">
            <h3>Update Image for Patient ID: {selectedPatientId}</h3>
            <div className="file-upload-row">
              <label htmlFor="file" className="file-label">
                Choose a File:
              </label>
              <input
                type="file"
                id="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <button type="submit" className="submit-btn">
              Upload Image
            </button>
          </form>
        )}
      </div>

      {/* Modal for Viewing Image */}
      {isModalOpen && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <img className="modal-image" src={selectedImage} alt="Patient" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Organization;
