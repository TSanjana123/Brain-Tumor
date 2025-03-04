// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const Patient = () => {
//     const patientId = localStorage.getItem('patientId');
//     const name = localStorage.getItem('name');
//     const navigate = useNavigate();

//     const [age, setAge] = useState(localStorage.getItem('age') || '');
//     const [sex, setSex] = useState(localStorage.getItem('sex') || '');
//     const [date, setDate] = useState(localStorage.getItem('date') || '');
//     const [refDoctor, setRefDoctor] = useState(localStorage.getItem('refDoctor') || '');

//     // Function to handle logout
//     const handleLogout = () => {
//         localStorage.clear();
//         navigate('/Login');
//     };

//     // Save patient details in localStorage
//     const handleSave = () => {
//         localStorage.setItem('age', age);
//         localStorage.setItem('sex', sex);
//         localStorage.setItem('date', date);
//         localStorage.setItem('refDoctor', refDoctor);
//         alert('Details saved successfully!');
//     };

//     return (
//         <div className="d-flex">
//             {/* Sidebar */}
//             <div className="bg-light border-end p-3" style={{ width: '300px', height: '100vh' }}>
//                 <div className="d-flex flex-column gap-2">
//                     <h4>Patient ID: {patientId}</h4>
//                     <div className="d-flex flex-column gap-1">
//                         <small><strong>Age:</strong> {age || 'N/A'}</small>
//                         <small><strong>Sex:</strong> {sex || 'N/A'}</small>
//                         <small><strong>Date:</strong> {date || 'N/A'}</small>
//                         <small><strong>Ref. Doctor:</strong> {refDoctor || 'N/A'}</small>
//                     </div>
//                     <button 
//                         onClick={handleLogout} 
//                         className="btn btn-danger mt-3 d-flex align-items-center justify-content-center"
//                     >
//                         Logout 
//                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="ms-2" viewBox="0 0 16 16">
//                             <path fillRule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z" />
//                             <path fillRule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
//                         </svg>
//                     </button>
//                 </div>
//             </div>

//             {/* Main Content */}
//             <div className="flex-grow-1 p-4">
//                 <h2 className="mb-4">Welcome, {name}</h2>

//                 <div className="card p-4">
//                     <div className="mb-3">
//                         <label className="form-label">Age:</label>
//                         <input 
//                             type="number" 
//                             className="form-control"
//                             value={age} 
//                             onChange={(e) => setAge(e.target.value)} 
//                             placeholder="Enter Age" 
//                         />
//                     </div>

//                     <div className="mb-3">
//                         <label className="form-label">Sex:</label>
//                         <select 
//                             className="form-select"
//                             value={sex} 
//                             onChange={(e) => setSex(e.target.value)}
//                         >
//                             <option value="">Select Sex</option>
//                             <option value="Male">Male</option>
//                             <option value="Female">Female</option>
//                             <option value="Other">Other</option>
//                         </select>
//                     </div>

//                     <div className="mb-3">
//                         <label className="form-label">Date:</label>
//                         <input 
//                             type="date" 
//                             className="form-control"
//                             value={date} 
//                             onChange={(e) => setDate(e.target.value)} 
//                         />
//                     </div>

//                     <div className="mb-3">
//                         <label className="form-label">Referring Doctor:</label>
//                         <input 
//                             type="text" 
//                             className="form-control"
//                             value={refDoctor} 
//                             onChange={(e) => setRefDoctor(e.target.value)} 
//                             placeholder="Enter Referring Doctor Name" 
//                         />
//                     </div>

//                     <button 
//                         onClick={handleSave} 
//                         className="btn btn-primary w-100"
//                     >
//                         Save Details
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Patient;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Patient = () => {
    const patientId = localStorage.getItem('patientId');
    const name = localStorage.getItem('name');
    const navigate = useNavigate();
    const organizationName = localStorage.getItem('organizationName');

    const [age, setAge] = useState('');
    const [sex, setSex] = useState('');
    const [date, setDate] = useState('');
    const [refDoctor, setRefDoctor] = useState('');

    useEffect(() => {
        const fetchPatientData = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/api/patients/${patientId}`);
                const { age, sex, date, refDoctor, name } = response.data;
                setAge(age);
                setSex(sex);
                setDate(date);
                setRefDoctor(refDoctor);
            } catch (error) {
                console.error('Error fetching patient data:', error);
            }
        };

        if (patientId) {
            fetchPatientData();
        }
    }, [patientId]);

    const handleLogout = () => {
        localStorage.clear();
        navigate('/Login');
    };

    return (
        <div className="d-flex">
            <div className="bg-light border-end p-3" style={{ width: '300px', height: '100vh' }}>
                <div className="d-flex flex-column gap-2">
                    <h4>Organization: {organizationName}</h4>
                    <h4>Patient ID: {patientId}</h4>
                    <h4>Name: {name}</h4>
                    <div className="d-flex flex-column gap-1">
                        <small><strong>Age:</strong> {age || 'N/A'}</small>
                        <small><strong>Sex:</strong> {sex || 'N/A'}</small>
                        <small><strong>Date:</strong> {date || 'N/A'}</small>
                        <small><strong>Ref. Doctor:</strong> {refDoctor || 'N/A'}</small>
                    </div>
                    <button 
                        onClick={handleLogout} 
                        className="btn btn-danger mt-3 d-flex align-items-center justify-content-center"
                    >
                        Logout
                    </button>
                </div>
            </div>

            <div className="flex-grow-1 p-4">
                <h2 className="mb-4">Welcome, {name}</h2>
            </div>
        </div>
    );
};

export default Patient;
