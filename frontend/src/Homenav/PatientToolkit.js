import React from 'react';
import './PatientToolkit.css';

const PatientToolkit = () => (
  <div className="toolkit-container">
    <div className="toolkit-card">
      <h1 className="toolkit-title">🧠 Brain Tumor Toolkit</h1>
      <p className="toolkit-description">
        Simple tips to support brain tumor patients and caregivers:
      </p>
      <ul className="toolkit-list">
        <li>👨‍⚕️ Follow your doctor’s advice carefully</li>
        <li>🥗 Eat healthy and drink plenty of water</li>
        <li>🛌 Rest well and don’t overdo things</li>
        <li>🧘 Stay calm with light exercise or meditation</li>
        <li>💬 Talk to someone you trust about how you feel</li>
        <li>📅 Keep track of your appointments and meds</li>
      </ul>
    </div>
  </div>
);

export default PatientToolkit;
