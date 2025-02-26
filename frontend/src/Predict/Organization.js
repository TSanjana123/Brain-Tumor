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
//         const response = await axios.get('http://localhost:5001/api/patients'); // Use full URL if needed
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
//       const response = await axios.post('http://localhost:5001/api/upload', formData, {
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

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Organization.css';

const Organization = () => {
  const organizationName = localStorage.getItem('organizationName');
  const navigate = useNavigate();

  const [patients, setPatients] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState('');
  const [file, setFile] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  // Additional state for new patient details
  const [newPatient, setNewPatient] = useState({
    name: '',
    gender: '',
    age: '',
    referredDoctor: '',
  });

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/patients');
        console.log('Fetched Patients:', response.data);
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
    formData.append('organizationName', organizationName);
    formData.append('image', file);
    formData.append('name', newPatient.name);
    formData.append('gender', newPatient.gender);
    formData.append('age', newPatient.age);
    formData.append('referredDoctor', newPatient.referredDoctor);

    try {
      const response = await axios.post('http://localhost:5001/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert(response.data.message);
      setFile(null);
      setSelectedPatientId('');
      setNewPatient({ name: '', gender: '', age: '', referredDoctor: '' });
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload image.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPatient((prev) => ({ ...prev, [name]: value }));
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
        {isFormVisible && (
          <form onSubmit={handleUpload} className="upload-form">
            <div>
              <label htmlFor="patientId">Patient ID</label>
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
              <label>Name</label>
              <input
                type="text"
                name="name"
                placeholder="Patient Name"
                value={newPatient.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label>Gender</label>
              <input
                type="text"
                name="gender"
                placeholder="Gender"
                value={newPatient.gender}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label>Age</label>
              <input
                type="number"
                name="age"
                placeholder="Age"
                value={newPatient.age}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label>Referred Doctor</label>
              <input
                type="text"
                name="referredDoctor"
                placeholder="Referred Doctor"
                value={newPatient.referredDoctor}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label htmlFor="file">Upload Image</label>
              <input
                type="file"
                id="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
                required
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
