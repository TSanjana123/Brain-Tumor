// // // // import React from 'react';
// // // // import { useNavigate } from 'react-router-dom'; // Updated hook for navigation

// // // // const Patient = () => {
// // // //     const patientId = localStorage.getItem('patientId');
// // // //     const name = localStorage.getItem('name');
// // // //     const navigate = useNavigate(); // using useNavigate instead of useHistory

// // // //     // Function to handle logout
// // // //     const handleLogout = () => {
// // // //         localStorage.clear(); // Clears all data from localStorage
// // // //         navigate('/Login'); // Redirects to the login page
// // // //     };

// // // //     return (
// // // //         <div className="main-content">
// // // //             <div className="side-navbar">
// // // //                 <div className="navbar-top">
// // // //                     <h4>Patient ID: {patientId}</h4>
// // // //                     <button onClick={handleLogout} className="logout-btn">
// // // //                         Logout 
// // // //                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
// // // //                             <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z" />
// // // //                             <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
// // // //                         </svg>
// // // //                     </button>
// // // //                 </div>
// // // //             </div>
// // // //             <div className="content">
// // // //                 <h2>Welcome, {name}</h2>
// // // //             </div>
// // // //         </div>
// // // //     );
// // // // };

// // // // export default Patient;




// // // import React from 'react';
// // // import { useNavigate } from 'react-router-dom'; // Updated hook for navigation

// // // const Patient = () => {
// // //     const patientId = localStorage.getItem('patientId');
// // //     const name = localStorage.getItem('name');
// // //     const navigate = useNavigate(); // using useNavigate instead of useHistory

// // //     // Function to handle logout
// // //     const handleLogout = () => {
// // //         localStorage.clear(); // Clears all data from localStorage
// // //         navigate('/Login'); // Redirects to the login page
// // //     };

// // //     return (
// // //         <div className="main-content">
// // //             <div className="side-navbar">
// // //                 <div className="navbar-top">
// // //                     <h4>Patient ID: {patientId}</h4>
// // //                     <button onClick={handleLogout} className="logout-btn">
// // //                         Logout 
// // //                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
// // //                             <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z" />
// // //                             <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
// // //                         </svg>
// // //                     </button>
// // //                 </div>
// // //             </div>
// // //             <div className="content">
// // //                 <h2>Welcome, {name}</h2>
// // //             </div>
// // //         </div>
// // //     );
// // // };

// // // export default Patient;





// // import React, { useEffect, useState } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import axios from 'axios';
// // import './Patient.css'; // Reusing same styles

// // const Patient = () => {
// //   const [showToast, setShowToast] = useState(false);
// //   const patientId = localStorage.getItem('patientId');
// //   const name = localStorage.getItem('name');
// //   const navigate = useNavigate();

// //   const [patient, setPatient] = useState({});

// //   const handleLogout = () => {
// //     setShowToast(true);
// //     setTimeout(() => {
// //       localStorage.clear();
// //       navigate('/Login');
// //     }, 500);
// //   };

// //   const fetchPatient = async () => {
// //     try {
// //       const response = await axios.get(`${process.env.REACT_APP_ORGANIZATION_RESPONSE_URL}/api/patients`);
// //       const foundPatient = response.data.find(p => p.patientId === patientId);
// //       if (foundPatient) {
// //         setPatient(foundPatient);
// //       }
// //     } catch (err) {
// //       console.error('Error fetching patient data:', err);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchPatient();
// //   }, []);

// //   return (
// //     <>
// //       <div className="organization-page">
// //         <aside className="sidebar">
// //           <h3>Patient ID : {patientId}</h3>
// //           <button className="logout-btn" onClick={handleLogout}>
// //             Logout
// //           </button>

// //         </aside>

// //         <div className="main-content">
// //           {/* <h1>shashi</h1> */}
// //           <div class="card" >
// //             {/* <img src="..." class="card-img-top" alt="..." /> */}
// //             <div class="card-body">
// //               <h5 class="card-title">Patient ID</h5>
// //               <p class="card-text">{patient.patientId}</p>
// //               {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
// //             </div>
// //           </div>
// //           <div class="card" >
// //             {/* <img src="..." class="card-img-top" alt="..." /> */}
// //             <div class="card-body">
// //               <h5 class="card-title">Name</h5>
// //               <p class="card-text">{patient.name}</p>
// //               {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
// //             </div>
// //           </div>
// //           <div class="card" >
// //             {/* <img src="..." class="card-img-top" alt="..." /> */}
// //             <div class="card-body">
// //               <h5 class="card-title">Email</h5>
// //               <p class="card-text">{patient.email}</p>
// //               {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
// //             </div>
// //           </div>
// //           <div class="card" >
// //             {/* <img src="..." class="card-img-top" alt="..." /> */}
// //             <div class="card-body">
// //               <h5 class="card-title">Gender</h5>
// //               <p class="card-text">{patient.gender}</p>
// //               {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
// //             </div>
// //           </div>
// //           <div class="card" >
// //             {/* <img src="..." class="card-img-top" alt="..." /> */}
// //             <div class="card-body">
// //               <h5 class="card-title">Date of Birth</h5>
// //               <p class="card-text">{new Date(patient.dateOfBirth).toLocaleDateString()}</p>
// //               {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
// //             </div>
// //           </div>
// //           <div class="card" >
// //             {/* <img src="..." class="card-img-top" alt="..." /> */}
// //             <div class="card-body">
// //               <h5 class="card-title">Referred Doctor</h5>
// //               <p class="card-text">{patient.referredDoctor}</p>
// //               {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
// //             </div>
// //           </div>
          
// //           <div class="card" >
// //             {/* <img src="..." class="card-img-top" alt="..." /> */}
// //             <div class="card-body">
// //               <h5 class="card-title">My Reports</h5>
// //               <p class="card-text">{patient.imageData && patient.imageData.length > 0 ? (
// //                 <div className="image-box">
// //                   {patient.imageData.map((image, i) => (
// //                     <img
// //                       key={i}
// //                       src={`http://localhost:5001/${image.imagePath}`}
// //                       alt={`Uploaded ${i + 1}`}
// //                       className="patient-image"
// //                       onClick={() => window.open(`http://localhost:5001/${image.imagePath}`, "_blank")}
// //                     />
// //                   ))}
// //                 </div>
// //               ) : (
// //                 <span>No images</span>
// //               )}</p>
// //               {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
// //               <h5 class="card-title">Prediction</h5>
              
// //             </div>
// //           </div>

// //           <div class="card" >
// //             {/* <img src="..." class="card-img-top" alt="..." /> */}
// //             <div class="card-body">
// //               <h5 class="card-title">Chat</h5>
// //               <p class="card-text">{patient.referredDoctor}</p>
// //               <a href="#" class="btn btn-primary">Go somewhere</a>
// //             </div>
// //           </div>


// //           {/* <h1>Welcome, {name}</h1> */}
// //           {/* <div class="dropdown">
// //             <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
// //               My details
// //             </button>
// //             <ul class="dropdown-menu">
// //               <li><a class="dropdown-item">patient ID : {patient.patientId}</a></li>
// //               <li><a class="dropdown-item" >Name : {patient.name}</a></li>
// //               <li><a class="dropdown-item" >Email : {patient.email}</a></li>
// //               <li><a class="dropdown-item" >Gender : {patient.gender}</a></li>
// //               <li><a class="dropdown-item" >Date of Birth</a></li>
// //             </ul>
// //           </div> */}

// //           {/* {patient ? (
// //             <div className="table-container">
// //               <table className="patients-table">
// //                 <thead>
// //                   <tr>
// //                     <th>Patient ID</th>
// //                     <th>Name</th>
// //                     <th>Email</th>
// //                     <th>Gender</th>
// //                     <th>Date of Birth</th>
// //                     <th>Referred Doctor</th>
// //                     <th>Images</th>
// //                     <th>Ask</th>
// //                   </tr>
// //                 </thead>
// //                 <tbody>
// //                   <tr>
// //                     <td>{patient.patientId}</td>
// //                     <td>{patient.name}</td>
// //                     <td>{patient.email}</td>
// //                     <td>{patient.gender}</td>
// //                     <td>{new Date(patient.dateOfBirth).toLocaleDateString()}</td>
// //                     <td>{patient.referredDoctor}</td>
// //                     <td>
// //                       {patient.imageData && patient.imageData.length > 0 ? (
// //                         <div className="image-box">
// //                           {patient.imageData.map((image, i) => (
// //                             <img
// //                               key={i}
// //                               src={`http://localhost:5001/${image.imagePath}`}
// //                               alt={`Uploaded ${i + 1}`}
// //                               className="patient-image"
// //                               onClick={() => window.open(`http://localhost:5001/${image.imagePath}`, "_blank")}
// //                             />
// //                           ))}
// //                         </div>
// //                       ) : (
// //                         <span>No images</span>
// //                       )}
// //                     </td>
// //                     <td>{patient.referredDoctor}</td>
// //                   </tr>
// //                 </tbody>
// //               </table>
// //             </div>
// //           ) : (
// //             <div class="spinner-border text-danger" role="status">
// //               <span class="visually-hidden">Loading...</span>
// //             </div>
// //           )} */}
// //         </div>
// //       </div>
// //       {showToast && (
// //         <div className="toast show position-fixed bottom-0 end-0 p-3" role="alert" aria-live="assertive" aria-atomic="true">
// //           <div className="toast-header">

// //             <small></small>
// //             <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close" onClick={() => setShowToast(false)}></button>
// //           </div>
// //           <div className="toast-body">
// //             Loging Out......
// //           </div>
// //         </div>
// //       )}
// //     </>
// //   );
// // };


// // export default Patient;


// // import React, { useEffect, useState } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import axios from 'axios';
// // import './Patient.css'; // Reusing same styles

// // const Patient = () => {
// //   const [showToast, setShowToast] = useState(false);
// //   const patientId = localStorage.getItem('patientId');
// //   const name = localStorage.getItem('name');
// //   const navigate = useNavigate();

// //   const [patient, setPatient] = useState({});

// //   const handleLogout = () => {
// //     setShowToast(true);
// //     setTimeout(() => {
// //       localStorage.clear();
// //       navigate('/Login');
// //     }, 500);
// //   };

// //   const fetchPatient = async () => {
// //     try {
// //       const response = await axios.get(`${process.env.REACT_APP_ORGANIZATION_RESPONSE_URL}/api/patients`);
// //       const foundPatient = response.data.find(p => p.patientId === patientId);
// //       if (foundPatient) {
// //         setPatient(foundPatient);
// //       }
// //     } catch (err) {
// //       console.error('Error fetching patient data:', err);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchPatient();
// //   }, []);

// //   return (
// //     <>
// //       <div className="organization-page">
// //         <aside className="sidebar">
// //           <h3>Patient ID : {patientId}</h3>
// //           <button className="logout-btn" onClick={handleLogout}>
// //             Logout
// //           </button>
// //         </aside>

// //         <div className="main-content">
// //           <div className="card" >
// //             <div className="card-body">
// //               <h5 className="card-title">Patient ID</h5>
// //               <p className="card-text">{patient.patientId}</p>
// //             </div>
// //           </div>
// //           <div className="card" >
// //             <div className="card-body">
// //               <h5 className="card-title">Name</h5>
// //               <p className="card-text">{patient.name}</p>
// //             </div>
// //           </div>
// //           <div className="card" >
// //             <div className="card-body">
// //               <h5 className="card-title">Email</h5>
// //               <p className="card-text">{patient.email}</p>
// //             </div>
// //           </div>
// //           <div className="card" >
// //             <div className="card-body">
// //               <h5 className="card-title">Gender</h5>
// //               <p className="card-text">{patient.gender}</p>
// //             </div>
// //           </div>
// //           <div className="card" >
// //             <div className="card-body">
// //               <h5 className="card-title">Date of Birth</h5>
// //               <p className="card-text">{patient.dateOfBirth ? new Date(patient.dateOfBirth).toLocaleDateString() : 'N/A'}</p>
// //             </div>
// //           </div>
// //           <div className="card" >
// //             <div className="card-body">
// //               <h5 className="card-title">Referred Doctor</h5>
// //               <p className="card-text">{patient.referredDoctor || 'N/A'}</p>
// //             </div>
// //           </div>

// //           <div className="card" >
// //             <div className="card-body">
// //               <h5 className="card-title">My Reports</h5>
// //               <div className="card-text">
// //                 {patient.imageData && patient.imageData.length > 0 ? (
// //                   <div className="image-box">
// //                     {patient.imageData.map((image, i) => (
// //                       <div key={i} className="image-item">
// //                         <img
// //                           src={`http://localhost:5001/${image.imagePath}`}
// //                           alt={image.imageName || `Uploaded ${i + 1}`}
// //                           className="patient-image"
// //                           onClick={() => window.open(`http://localhost:5001/${image.imagePath}`, "_blank")}
// //                         />
// //                         {image.prediction && (
// //                           <p className="prediction-text">Prediction: {image.prediction}</p>
// //                         )}
// //                         {!image.prediction && (
// //                           <p className="prediction-text">Prediction: Pending</p>
// //                         )}
// //                       </div>
// //                     ))}
// //                   </div>
// //                 ) : (
// //                   <span>No reports uploaded yet.</span>
// //                 )}
// //               </div>
// //             </div>
// //           </div>

// //           <div className="card" >
// //             <div className="card-body">
// //               <h5 className="card-title">Chat</h5>
// //               <p className="card-text">Chat with your doctor.</p>
// //               <a href="#" className="btn btn-primary">Go to Chat</a>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //       {showToast && (
// //         <div className="toast show position-fixed bottom-0 end-0 p-3" role="alert" aria-live="assertive" aria-atomic="true">
// //           <div className="toast-header">
// //             <small></small>
// //             <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close" onClick={() => setShowToast(false)}></button>
// //           </div>
// //           <div className="toast-body">
// //             Logging Out......
// //           </div>
// //         </div>
// //       )}
// //     </>
// //   );
// // };

// // export default Patient;


// // import React, { useEffect, useState } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import axios from 'axios';
// // import './Patient.css';

// // const Patient = () => {
// //   const [showToast, setShowToast] = useState(false);
// //   const patientId = localStorage.getItem('patientId');
// //   const name = localStorage.getItem('name');
// //   const navigate = useNavigate();

// //   const [patient, setPatient] = useState({});

// //   const handleLogout = () => {
// //     setShowToast(true);
// //     setTimeout(() => {
// //       localStorage.clear();
// //       navigate('/Login');
// //     }, 500);
// //   };

// //   const fetchPatient = async () => {
// //     try {
// //       const response = await axios.get(`${process.env.REACT_APP_ORGANIZATION_RESPONSE_URL}/api/patients`);
// //       const foundPatient = response.data.find(p => p.patientId === patientId);
// //       if (foundPatient) {
// //         setPatient(foundPatient);
// //       }
// //     } catch (err) {
// //       console.error('Error fetching patient data:', err);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchPatient();
// //   }, []);

// //   return (
// //     <>
// //       <div className="patient-page">
// //         <aside className="sidebar">
// //           <h3>Patient ID: {patientId}</h3>
// //           <button className="logout-btn" onClick={handleLogout}>
// //             Logout
// //           </button>
// //         </aside>

// //         <div className="main-content">
// //           <h2 className="section-heading">Patient Details</h2>
// //           <div className="details-grid">
// //             <div className="detail-item"><strong>Patient ID:</strong> {patient.patientId}</div>
// //             <div className="detail-item"><strong>Name:</strong> {patient.name}</div>
// //             <div className="detail-item"><strong>Email:</strong> {patient.email}</div>
// //             <div className="detail-item"><strong>Gender:</strong> {patient.gender}</div>
// //             <div className="detail-item"><strong>Date of Birth:</strong> {patient.dateOfBirth ? new Date(patient.dateOfBirth).toLocaleDateString() : 'N/A'}</div>
// //             <div className="detail-item"><strong>Referred Doctor:</strong> {patient.referredDoctor || 'N/A'}</div>
// //           </div>

// //           <h2 className="section-heading">My Reports</h2>
// //           <div className="reports-section">
// //             {patient.imageData && patient.imageData.length > 0 ? (
// //               <div className="image-grid">
// //                 {patient.imageData.map((image, i) => (
// //                   <div key={i} className="image-item">
// //                     <img
// //                       src={`http://localhost:5001/${image.imagePath}`}
// //                       alt={image.imageName || `Uploaded ${i + 1}`}
// //                       className="patient-image1"
// //                       onClick={() => window.open(`http://localhost:5001/${image.imagePath}`, "_blank")}
// //                     />
// //                     <p className="prediction-text">Prediction: {image.prediction || 'Pending'}</p>
// //                   </div>
// //                 ))}
// //               </div>
// //             ) : (
// //               <p>No reports uploaded yet.</p>
// //             )}
// //           </div>

// //           {/* <h2 className="section-heading">Chat</h2> */}
// // <div className="chat-widget">
// //   <img src="https://img.icons8.com/ios-filled/50/3498db/chat.png" alt="Chat Icon" className="chat-icon" />
// //   <div className="chat-content">
// //     <div className="chat-title">Let’s Chat!</div>
// //     <div className="chat-subtitle">Connect with your doctor</div>
// //   </div>
// // </div>

// //         </div>
// //       </div>

// //       {showToast && (
// //         <div className="toast show position-fixed bottom-0 end-0 p-3" role="alert" aria-live="assertive" aria-atomic="true">
// //           <div className="toast-header">
// //             <small></small>
// //             <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close" onClick={() => setShowToast(false)}></button>
// //           </div>
// //           <div className="toast-body">
// //             Logging Out......
// //           </div>
// //         </div>
// //       )}
// //     </>
// //   );
// // };

// // export default Patient;


// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './Patient.css';

// // import ChatModal
// import ChatModal from './ChatModal';

// const Patient = () => {
//   const [showToast, setShowToast] = useState(false);
//   const patientId = localStorage.getItem('patientId');
//   const name = localStorage.getItem('name');
//   const navigate = useNavigate();

//   const [patient, setPatient] = useState({});
//   const [showChat, setShowChat] = useState(false); // added state to control chat popup

//   const handleLogout = () => {
//     setShowToast(true);
//     setTimeout(() => {
//       localStorage.clear();
//       navigate('/Login');
//     }, 500);
//   };

//   const fetchPatient = async () => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_ORGANIZATION_RESPONSE_URL}/api/patients`);
//       const foundPatient = response.data.find(p => p.patientId === patientId);
//       if (foundPatient) {
//         setPatient(foundPatient);
//       }
//     } catch (err) {
//       console.error('Error fetching patient data:', err);
//     }
//   };

//   useEffect(() => {
//     fetchPatient();
//   }, []);

//   return (
//     <>
//       <div className="patient-page">
//         <aside className="sidebar">
//           <h3>Patient ID: {patientId}</h3>
//           <button className="logout-btn" onClick={handleLogout}>
//             Logout
//           </button>
//         </aside>

//         <div className="main-content">
//           <h2 className="section-heading">Patient Details</h2>
//           <div className="details-grid">
//             <div className="detail-item"><strong>Patient ID:</strong> {patient.patientId}</div>
//             <div className="detail-item"><strong>Name:</strong> {patient.name}</div>
//             <div className="detail-item"><strong>Email:</strong> {patient.email}</div>
//             <div className="detail-item"><strong>Gender:</strong> {patient.gender}</div>
//             <div className="detail-item"><strong>Date of Birth:</strong> {patient.dateOfBirth ? new Date(patient.dateOfBirth).toLocaleDateString() : 'N/A'}</div>
//             <div className="detail-item"><strong>Referred Doctor:</strong> {patient.referredDoctor || 'N/A'}</div>
//           </div>

//           <h2 className="section-heading">My Reports</h2>
//           <div className="reports-section">
//             {patient.imageData && patient.imageData.length > 0 ? (
//               <div className="image-grid">
//                 {patient.imageData.map((image, i) => (
//                   <div key={i} className="image-item">
//                     <img
//                       src={`http://localhost:5001/${image.imagePath}`}
//                       alt={image.imageName || `Uploaded ${i + 1}`}
//                       className="patient-image1"
//                       onClick={() => window.open(`http://localhost:5001/${image.imagePath}`, "_blank")}
//                     />
//                     <p className="prediction-text">Prediction: {image.prediction || 'Pending'}</p>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p>No reports uploaded yet.</p>
//             )}
//           </div>
          

//           {/* Chat Widget */}
//           <div className="chat-widget" onClick={() => setShowChat(true)}>
//             <img src="https://img.icons8.com/ios-filled/50/3498db/chat.png" alt="Chat Icon" className="chat-icon" />
//             <div className="chat-content">
//               <div className="chat-title">Let’s Chat!</div>
//               <div className="chat-subtitle">Connect with your doctor</div>
//             </div>
//           </div>

//         </div>
//       </div>

//       {/* Toast */}
//       {showToast && (
//         <div className="toast show position-fixed bottom-0 end-0 p-3" role="alert" aria-live="assertive" aria-atomic="true">
//           <div className="toast-header">
//             <small></small>
//             <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close" onClick={() => setShowToast(false)}></button>
//           </div>
//           <div className="toast-body">
//             Logging Out......
//           </div>
//         </div>
//       )}

//       {/* Chat Modal */}
//       {showChat && <ChatModal onClose={() => setShowChat(false)} />}

//     </>
//   );
// };

// export default Patient;





// Patient.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Patient.css';
import ChatModal from './ChatModal'; // Import ChatModal

const Patient = () => {
  const [showToast, setShowToast] = useState(false);
  const localPatientId = localStorage.getItem('patientId'); // This is the application-specific patientId
  const userName = localStorage.getItem('name'); // User's name from localStorage
  const userId = localStorage.getItem('userId'); // MongoDB User _id from localStorage (ensure this is set at login)
  const navigate = useNavigate();

  const [patient, setPatient] = useState(null); // Initialize as null
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Chat Modal State
  const [showChatModal, setShowChatModal] = useState(false);
  const [selectedImageForChat, setSelectedImageForChat] = useState(null);

  const API_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5001'; // Ensure this is correct

  const handleLogout = () => {
    setShowToast(true);
    setTimeout(() => {
      localStorage.clear();
      navigate('/Login');
    }, 500);
  };

  useEffect(() => {
    const fetchPatientData = async () => {
      if (!localPatientId) {
        setError("Patient ID not found in local storage. Please login again.");
        setIsLoading(false);
        // navigate('/Login'); // Optionally redirect
        return;
      }
      if (!userId) {
        setError("User ID not found in local storage. Chat functionality might be affected. Please login again.");
        // It's crucial for API calls needing MongoDB _id
      }

      setIsLoading(true);
      try {
        // Assuming /api/patients returns an array and we need to find the specific one
        // Or, if you have an endpoint like /api/patients/:patientId (application ID) or /api/users/:userId (mongoDB ID)
        const response = await axios.get(`${API_URL}/api/patients`); // This fetches ALL patients
        const foundPatient = response.data.find(p => p.patientId === localPatientId);
        
        if (foundPatient) {
          setPatient(foundPatient);
        } else {
          setError(`Patient with ID ${localPatientId} not found.`);
        }
      } catch (err) {
        console.error('Error fetching patient data:', err);
        setError('Failed to fetch patient data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPatientData();
  }, [localPatientId, API_URL, navigate, userId]);

  const handleOpenChat = (image) => {
    if (!userId) {
        alert("User session is invalid. Please log in again to use chat.");
        return;
    }
    setSelectedImageForChat({
      imageId: image._id, // This is the subdocument _id from imageData
      imagePath: image.imagePath,
      imageName: image.imageName,
      prediction: image.prediction,
    });
    setShowChatModal(true);
  };

  if (isLoading) {
    return <div className="loading-indicator">Loading patient data...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  if (!patient) {
    return <div className="container mt-5">Patient data not available.</div>;
  }

  return (
    <>
      <div className="patient-page">
        <aside className="sidebar">
          <h3>Patient: {patient.name || userName}</h3>
          <p>ID: {patient.patientId}</p>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </aside>

        <div className="main-content">
          <h2 className="section-heading">Patient Details</h2>
          <div className="details-grid">
            <div className="detail-item"><strong>Patient ID:</strong> {patient.patientId}</div>
            <div className="detail-item"><strong>Name:</strong> {patient.name}</div>
            <div className="detail-item"><strong>Email:</strong> {patient.email}</div>
            <div className="detail-item"><strong>Gender:</strong> {patient.gender || 'N/A'}</div>
            <div className="detail-item"><strong>Date of Birth:</strong> {patient.dateOfBirth ? new Date(patient.dateOfBirth).toLocaleDateString() : 'N/A'}</div>
            <div className="detail-item"><strong>Referred Doctor:</strong> {patient.referredDoctor || 'N/A'}</div>
          </div>

          <h2 className="section-heading">My Reports</h2>
          <div className="reports-section">
            {patient.imageData && patient.imageData.length > 0 ? (
              <div className="image-grid">
                {patient.imageData.map((image, i) => (
                  <div key={image._id || i} className="image-item">
                    <img
                      src={`${API_URL}/${image.imagePath}`}
                      alt={image.imageName || `Uploaded Image ${i + 1}`}
                      className="patient-image-report" // Renamed class to avoid conflict if any
                      onClick={() => window.open(`${API_URL}/${image.imagePath}`, "_blank")}
                    />
                    <p className="prediction-text">Prediction: {image.prediction || 'Pending'}</p>
                    <button className="chat-on-image-btn" onClick={() => handleOpenChat(image)}>
                      Chat about this image
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p>No reports uploaded yet.</p>
            )}
          </div>
        </div>
      </div>

      {/* Toast for Logout */}
      {showToast && (
        <div className="toast show position-fixed bottom-0 end-0 p-3" role="alert" aria-live="assertive" aria-atomic="true">
          <div className="toast-header">
            <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close" onClick={() => setShowToast(false)}></button>
          </div>
          <div className="toast-body">Logging Out......</div>
        </div>
      )}

      {/* Chat Modal */}
      {showChatModal && selectedImageForChat && userId && (
        <ChatModal
          userId={userId} // Pass the MongoDB User _id
          imageDetails={selectedImageForChat}
          onClose={() => setShowChatModal(false)}
          apiUrl={API_URL}
        />
      )}
    </>
  );
};

export default Patient;