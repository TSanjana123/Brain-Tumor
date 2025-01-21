// // // import React, { useState } from "react";
// // // function Organization() {

// // //     return (
// // //         <div className="main-content">
// // //             <div className="side-navbar">

// // //             </div>
// // //         </div>
// // //     );
// // // }
// // // export default Organization;


// // import React from 'react';
// // import { useNavigate } from 'react-router-dom'; // Updated hook for navigation

// // const Organization = () => {
// //   const organizationName = localStorage.getItem('organizationName');
// //   const navigate = useNavigate();
// //   const handleLogout = () => {
// //     localStorage.clear(); // Clears all data from localStorage
// //     navigate('/Login'); // Redirects to the login page
// //   };
// //   return (
// //     <div className="main-content">
// //       <div className="side-navbar">
// //         <div className="navbar-top">
// //           <h4>Organization: {organizationName}</h4>
// //           <button onClick={handleLogout} className="logout-btn">
// //             Logout
// //             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
// //               <path fillRule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z" />
// //               <path fillRule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
// //             </svg>
// //           </button>
// //         </div>
// //       </div>
// //       <div className="content">
// //         <h2>Welcome, Organization!</h2>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Organization;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Organization = () => {
  const organizationName = localStorage.getItem('organizationName');
  const navigate = useNavigate();

  const [patients, setPatients] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState('');
  const [file, setFile] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/patients'); // Use full URL if needed
        console.log('Fetched Patients:', response.data); // Debugging log
        setPatients(response.data);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };
  
    fetchPatients();
  }, []);
  

  const handleLogout = () => {
    localStorage.clear();
    navigate('/Login');
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!selectedPatientId || !file) {
      alert('Please select a patient ID and an image.');
      return;
    }

    const formData = new FormData();
    formData.append('patientId', selectedPatientId);
    formData.append('image', file);

    try {
      const response = await axios.post('http://localhost:5001/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert(response.data.message);
      setFile(null);
      setSelectedPatientId('');
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload image.');
    }
  };

  return (
    <div className="main-content">
      <div className="side-navbar">
        <div className="navbar-top">
          <h4>Organization: {organizationName}</h4>
          <button onClick={() => setIsFormVisible(!isFormVisible)} className="upload-btn">
            Upload Patient Details
          </button>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </div>
      <div className="content">
        <h2>Welcome, Organization!</h2>
        {isFormVisible && (
          <form onSubmit={handleUpload} className="upload-form">
            <div>
              <label htmlFor="patientId">Patient ID:</label>
              <select
                id="patientId"
                value={selectedPatientId}
                onChange={(e) => setSelectedPatientId(e.target.value)}
              >
                <option value="">Select a patient</option>
                {patients.map((patient, index) => (
                  <option key={index} value={patient.patientId}>
                    {patient.patientId}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="file">Upload Image:</label>
              <input
                type="file"
                id="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <button type="submit">Upload</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Organization;

































































// // // // // import React, { useState } from "react";
// // // // // import axios from "axios";

// // // // // function Organization() {
// // // // //   const [patientId, setPatientId] = useState('');
// // // // //   const [image, setImage] = useState(null);
// // // // //   const [message, setMessage] = useState('');

// // // // //   const handleFileChange = (e) => {
// // // // //     setImage(e.target.files[0]);
// // // // //   };

// // // // //   const handleSubmit = async (e) => {
// // // // //     e.preventDefault();

// // // // //     if (!patientId || !image) {
// // // // //       setMessage('Please provide patient ID and an image');
// // // // //       return;
// // // // //     }

// // // // //     const formData = new FormData();
// // // // //     formData.append('patientId', patientId);
// // // // //     formData.append('image', image);
// // // // //     formData.append('organizationEmail', localStorage.getItem('email')); // Assume email is stored in localStorage

// // // // //     try {
// // // // //       const response = await axios.post('http://localhost:5001/api/upload', formData, {
// // // // //         headers: {
// // // // //           'Content-Type': 'multipart/form-data',
// // // // //         },
// // // // //       });

// // // // //       setMessage(response.data.message);
// // // // //     } catch (error) {
// // // // //       console.error(error);
// // // // //       setMessage('Failed to upload image');
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <div className="main-content">
// // // // //       <div className="side-navbar">
// // // // //         <h2>Organization Dashboard</h2>
// // // // //         <button
// // // // //           className="btn btn-primary"
// // // // //           data-bs-toggle="modal"
// // // // //           data-bs-target="#uploadModal"
// // // // //         >
// // // // //           Upload Details
// // // // //         </button>
// // // // //       </div>

// // // // //       {/* Modal for Upload Form */}
// // // // //       <div
// // // // //         className="modal fade"
// // // // //         id="uploadModal"
// // // // //         tabIndex="-1"
// // // // //         aria-labelledby="uploadModalLabel"
// // // // //         aria-hidden="true"
// // // // //       >
// // // // //         <div className="modal-dialog">
// // // // //           <div className="modal-content">
// // // // //             <div className="modal-header">
// // // // //               <h5 className="modal-title" id="uploadModalLabel">Upload Patient Details</h5>
// // // // //               <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
// // // // //             </div>
// // // // //             <div className="modal-body">
// // // // //               <form onSubmit={handleSubmit}>
// // // // //                 <div className="mb-3">
// // // // //                   <input
// // // // //                     type="text"
// // // // //                     className="form-control"
// // // // //                     placeholder="Patient ID"
// // // // //                     value={patientId}
// // // // //                     onChange={(e) => setPatientId(e.target.value)}
// // // // //                     required
// // // // //                   />
// // // // //                 </div>
// // // // //                 <div className="mb-3">
// // // // //                   <input
// // // // //                     type="file"
// // // // //                     className="form-control"
// // // // //                     onChange={handleFileChange}
// // // // //                     required
// // // // //                   />
// // // // //                 </div>
// // // // //                 <button type="submit" className="btn btn-primary">
// // // // //                   Upload
// // // // //                 </button>
// // // // //               </form>
// // // // //               {message && <p className="mt-3">{message}</p>}
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // export default Organization;



// // // // import React, { useState } from 'react';
// // // // import UploadDetails from './UploadDetails';

// // // // const Organization = () => {
// // // //   const [activeSection, setActiveSection] = useState('dashboard'); // To switch between sections

// // // //   return (
// // // //     <div className="container mt-5">
// // // //       <h1>Organization Dashboard</h1>

// // // //       {/* Navigation Buttons */}
// // // //       <div className="mb-4">
// // // //         <button
// // // //           className={`btn ${activeSection === 'dashboard' ? 'btn-primary' : 'btn-outline-primary'} me-2`}
// // // //           onClick={() => setActiveSection('dashboard')}
// // // //         >
// // // //           Dashboard
// // // //         </button>
// // // //         <button
// // // //           className={`btn ${activeSection === 'uploadDetails' ? 'btn-primary' : 'btn-outline-primary'}`}
// // // //           onClick={() => setActiveSection('uploadDetails')}
// // // //         >
// // // //           Upload Details
// // // //         </button>
// // // //       </div>

// // // //       {/* Conditional Rendering of Sections */}
// // // //       {activeSection === 'dashboard' && (
// // // //         <div>
// // // //           <h2>Welcome to the Organization Dashboard</h2>
// // // //           <p>Here you can manage patients and staff information.</p>
// // // //         </div>
// // // //       )}

// // // //       {activeSection === 'uploadDetails' && <UploadDetails />}
// // // //     </div>
// // // //   );
// // // // };

// // // // export default Organization;




// // // import React, { useState, useEffect } from 'react';
// // // import axios from 'axios';

// // // const Organization = () => {
// // //   const [patientIds, setPatientIds] = useState([]);
// // //   const [selectedPatientId, setSelectedPatientId] = useState('');
// // //   const [image, setImage] = useState(null);
// // //   const [error, setError] = useState('');
// // //   const [successMessage, setSuccessMessage] = useState('');
// // //   const [activeSection, setActiveSection] = useState('dashboard'); // To toggle between sections

// // //   // Fetch patient IDs on component mount
// // //   useEffect(() => {
// // //     const fetchPatientIds = async () => {
// // //       try {
// // //         const response = await axios.get('http://localhost:5001/api/patient-ids');
// // //         setPatientIds(response.data);
// // //       } catch (err) {
// // //         console.error(err);
// // //         setError('Failed to fetch patient IDs');
// // //       }
// // //     };

// // //     fetchPatientIds();
// // //   }, []);

// // //   // Handle form submission
// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     if (!selectedPatientId || !image) {
// // //       setError('Please select a patient ID and upload an image');
// // //       return;
// // //     }

// // //     const formData = new FormData();
// // //     formData.append('patientId', selectedPatientId);
// // //     formData.append('image', image);

// // //     try {
// // //       const response = await axios.post('http://localhost:5001/api/upload-details', formData, {
// // //         headers: { 'Content-Type': 'multipart/form-data' },
// // //       });
// // //       setSuccessMessage(response.data.message);
// // //       setError('');
// // //     } catch (err) {
// // //       console.error(err);
// // //       setError('Failed to upload details');
// // //     }
// // //   };

// // //   return (
// // //     <div className="container mt-5">
// // //       <div className="row">
// // //         {/* Sidebar Navigation */}
// // //         <div className="col-md-3">
// // //           <nav className="side-navbar">
// // //             <button
// // //               className={`btn ${activeSection === 'dashboard' ? 'btn-primary' : 'btn-outline-primary'} mb-2`}
// // //               onClick={() => setActiveSection('dashboard')}
// // //             >
// // //               Dashboard
// // //             </button>
// // //             <button
// // //               className={`btn ${activeSection === 'uploadDetails' ? 'btn-primary' : 'btn-outline-primary'}`}
// // //               onClick={() => setActiveSection('uploadDetails')}
// // //             >
// // //               Upload Details
// // //             </button>
// // //           </nav>
// // //         </div>

// // //         {/* Main Content */}
// // //         <div className="col-md-9">
// // //           {activeSection === 'dashboard' && (
// // //             <div>
// // //               <h2>Welcome to the Organization Dashboard</h2>
// // //               <p>Here you can manage patients and staff information.</p>
// // //             </div>
// // //           )}

// // //           {activeSection === 'uploadDetails' && (
// // //             <div>
// // //               <h2>Upload Patient Details</h2>

// // //               {error && <div className="alert alert-danger">{error}</div>}
// // //               {successMessage && <div className="alert alert-success">{successMessage}</div>}

// // //               <form onSubmit={handleSubmit}>
// // //                 <div className="mb-3">
// // //                   <label htmlFor="patientId" className="form-label">Select Patient ID</label>
// // //                   <select
// // //                     id="patientId"
// // //                     className="form-select"
// // //                     value={selectedPatientId}
// // //                     onChange={(e) => setSelectedPatientId(e.target.value)}
// // //                   >
// // //                     <option value="">Select a patient</option>
// // //                     {patientIds.map((patient) => (
// // //                       <option key={patient.patientId} value={patient.patientId}>
// // //                         {patient.patientId}
// // //                       </option>
// // //                     ))}
// // //                   </select>
// // //                 </div>

// // //                 <div className="mb-3">
// // //                   <label htmlFor="image" className="form-label">Upload Image</label>
// // //                   <input
// // //                     type="file"
// // //                     id="image"
// // //                     className="form-control"
// // //                     onChange={(e) => setImage(e.target.files[0])}
// // //                   />
// // //                 </div>

// // //                 <button type="submit" className="btn btn-primary">Upload</button>
// // //               </form>
// // //             </div>
// // //           )}
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default Organization;




// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';

// // const Organization = () => {
// //   const [patientIds, setPatientIds] = useState([]);
// //   const [selectedPatientId, setSelectedPatientId] = useState('');
// //   const [image, setImage] = useState(null);
// //   const [error, setError] = useState('');
// //   const [successMessage, setSuccessMessage] = useState('');
// //   const [activeSection, setActiveSection] = useState('dashboard'); // To toggle between sections

// //   // Fetch patient IDs on component mount
// //   useEffect(() => {
// //     const fetchPatientIds = async () => {
// //       try {
// //         const response = await axios.get('http://localhost:5001/api/patient-ids');
// //         console.log('Fetched patient IDs:', response.data); // Log the fetched data
// //         setPatientIds(response.data);
// //       } catch (err) {
// //         console.error('Error fetching patient IDs:', err); // Log errors
// //         setError('Failed to fetch patient IDs');
// //       }
// //     };
  
// //     fetchPatientIds();
// //   }, []);
  

// //   // Handle form submission
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     if (!selectedPatientId || !image) {
// //       setError('Please select a patient ID and upload an image');
// //       return;
// //     }

// //     const formData = new FormData();
// //     formData.append('patientId', selectedPatientId);
// //     formData.append('image', image);

// //     try {
// //       const response = await axios.post('http://localhost:5001/api/upload-details', formData, {
// //         headers: { 'Content-Type': 'multipart/form-data' },
// //       });
// //       setSuccessMessage(response.data.message);
// //       setError('');
// //     } catch (err) {
// //       console.error(err);
// //       setError('Failed to upload details');
// //     }
// //   };

// //   return (
// //     <div className="container mt-5">
// //       <div className="row">
// //         {/* Sidebar Navigation */}
// //         <div className="col-md-3">
// //           <nav className="side-navbar">
// //             <button
// //               className={`btn ${activeSection === 'dashboard' ? 'btn-primary' : 'btn-outline-primary'} mb-2`}
// //               onClick={() => setActiveSection('dashboard')}
// //             >
// //               Dashboard
// //             </button>
// //             <button
// //               className={`btn ${activeSection === 'uploadDetails' ? 'btn-primary' : 'btn-outline-primary'}`}
// //               onClick={() => setActiveSection('uploadDetails')}
// //             >
// //               Upload Details
// //             </button>
// //           </nav>
// //         </div>

// //         {/* Main Content */}
// //         <div className="col-md-9">
// //           {activeSection === 'dashboard' && (
// //             <div>
// //               <h2>Welcome to the Organization Dashboard</h2>
// //               <p>Here you can manage patients and staff information.</p>
// //             </div>
// //           )}

// //           {activeSection === 'uploadDetails' && (
// //             <div>
// //               <h2>Upload Patient Details</h2>

// //               {error && <div className="alert alert-danger">{error}</div>}
// //               {successMessage && <div className="alert alert-success">{successMessage}</div>}

// //               <form onSubmit={handleSubmit}>
// //                 <div className="mb-3">
// //                   <label htmlFor="patientId" className="form-label">Select Patient ID</label>
// //                   <select
// //                     id="patientId"
// //                     className="form-select"
// //                     value={selectedPatientId}
// //                     onChange={(e) => setSelectedPatientId(e.target.value)}
// //                   >
// //                     <option value="">Select a patient</option>
// //                     {patientIds.map((patient) => (
// //                       <option key={patient._id} value={patient.patientId}>
// //                         {patient.patientId}
// //                       </option>
// //                     ))}
// //                   </select>
// //                 </div>

// //                 <div className="mb-3">
// //                   <label htmlFor="image" className="form-label">Upload Image</label>
// //                   <input
// //                     type="file"
// //                     id="image"
// //                     className="form-control"
// //                     onChange={(e) => setImage(e.target.files[0])}
// //                   />
// //                 </div>

// //                 <button type="submit" className="btn btn-primary">Upload</button>
// //               </form>
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Organization;



// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// // import './Organization.css'; // Import custom styles

// const Organization = () => {
//   const organizationName = localStorage.getItem('organizationName');
//   const navigate = useNavigate();
//   const [showForm, setShowForm] = useState(false);
//   const [patientIds, setPatientIds] = useState([]);
//   const [selectedPatientId, setSelectedPatientId] = useState('');
//   const [image, setImage] = useState(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     // Fetch patient IDs from the backend
//     const fetchPatientIds = async () => {
//       try {
//         const response = await axios.get('/api/patientIds');
//         setPatientIds(response.data);
//       } catch (err) {
//         console.error('Error fetching patient IDs:', err);
//       }
//     };
//     fetchPatientIds();
//   }, []);

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate('/Login');
//   };

//   const handleImageUpload = async (e) => {
//     e.preventDefault();
//     if (!image || !selectedPatientId) {
//       alert('Please select a patient and upload an image.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('image', image);
//     formData.append('patientId', selectedPatientId);

//     setLoading(true);
//     try {
//       const response = await axios.post('/api/uploadImage', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });
//       alert(response.data.message);
//       setShowForm(false);
//       setImage(null);
//       setSelectedPatientId('');
//     } catch (err) {
//       console.error('Error uploading image:', err);
//       alert('Failed to upload image.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="main-content">
//       <div className="side-navbar">
//         <div className="navbar-top">
//           <h4>Organization: {organizationName}</h4>
//           <button onClick={handleLogout} className="logout-btn">Logout</button>
//           <button onClick={() => setShowForm(true)} className="update-details-btn">Update Details</button>
//         </div>
//       </div>
//       <div className="content">
//         <h2>Welcome, Organization!</h2>
//       </div>

//       {showForm && (
//         <div className="form-modal">
//           <div className="form-container">
//             <h3>Update Details</h3>
//             <form onSubmit={handleImageUpload}>
//               <label htmlFor="patientId">Select Patient ID:</label>
//               <select
//                 id="patientId"
//                 value={selectedPatientId}
//                 onChange={(e) => setSelectedPatientId(e.target.value)}
//               >
//                 <option value="">--Select Patient--</option>
//                 {patientIds.map((id) => (
//                   <option key={id} value={id}>{id}</option>
//                 ))}
//               </select>

//               <label htmlFor="image">Upload Image:</label>
//               <input
//                 type="file"
//                 id="image"
//                 accept="image/*"
//                 onChange={(e) => setImage(e.target.files[0])}
//               />

//               <div className="form-actions">
//                 <button type="submit" disabled={loading}>
//                   {loading ? 'Uploading...' : 'Upload'}
//                 </button>
//                 <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Organization;
