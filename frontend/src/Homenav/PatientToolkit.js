import React from 'react';
import './PatientToolkit.css';

const PatientToolkit = () => (
  <div className="toolkit-container">
    <div className="toolkit-card">
      <h1 className="toolkit-title">🧠 Brain Tumor Care Toolkit</h1>
      <p className="toolkit-description">
        Helpful tips for patients and caregivers to stay strong and positive:
      </p>
      <ul className="toolkit-list">
        <li>👨‍⚕️ Listen to your doctor and follow the treatment plan</li>
        <li>🥦 Eat brain-friendly foods and stay hydrated</li>
        <li>🛌 Get plenty of sleep and take breaks when needed</li>
        <li>🧘‍♀️ Practice mindfulness or gentle stretching daily</li>
        <li>💖 Stay connected with loved ones for support</li>
        <li>🗓️ Use a calendar to manage meds and appointments</li>
      </ul>
    </div>
  </div>
);

export default PatientToolkit;
