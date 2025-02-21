import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Patient = () => {
    const patientId = localStorage.getItem('patientId');
    const name = localStorage.getItem('name');
    const navigate = useNavigate();

    const [age, setAge] = useState(localStorage.getItem('age') || '');
    const [sex, setSex] = useState(localStorage.getItem('sex') || '');
    const [date, setDate] = useState(localStorage.getItem('date') || '');
    const [refDoctor, setRefDoctor] = useState(localStorage.getItem('refDoctor') || '');

    // Function to handle logout
    const handleLogout = () => {
        localStorage.clear();
        navigate('/Login');
    };

    // Save patient details in localStorage
    const handleSave = () => {
        localStorage.setItem('age', age);
        localStorage.setItem('sex', sex);
        localStorage.setItem('date', date);
        localStorage.setItem('refDoctor', refDoctor);
        alert('Details saved successfully!');
    };

    return (
        <div className="main-content">
            <div className="side-navbar">
                <div className="navbar-top">
                    <h4>Patient ID: {patientId}</h4>
                    <button onClick={handleLogout} className="logout-btn">
                        Logout 
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z" />
                            <path fillRule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className="content">
                <h2>Welcome, {name}</h2>
                <div className="patient-details-box">
                    <div className="form-group">
                        <label>Age:</label>
                        <input 
                            type="number" 
                            value={age} 
                            onChange={(e) => setAge(e.target.value)} 
                            placeholder="Enter Age" 
                        />
                    </div>
                    <div className="form-group">
                        <label>Sex:</label>
                        <select 
                            value={sex} 
                            onChange={(e) => setSex(e.target.value)}>
                            <option value="">Select Sex</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Date:</label>
                        <input 
                            type="date" 
                            value={date} 
                            onChange={(e) => setDate(e.target.value)} 
                        />
                    </div>
                    <div className="form-group">
                        <label>Referring Doctor:</label>
                        <input 
                            type="text" 
                            value={refDoctor} 
                            onChange={(e) => setRefDoctor(e.target.value)} 
                            placeholder="Enter Referring Doctor Name" 
                        />
                    </div>
                    <button onClick={handleSave} className="save-btn">Save Details</button>
                </div>
            </div>
        </div>
    );
};

export default Patient;
