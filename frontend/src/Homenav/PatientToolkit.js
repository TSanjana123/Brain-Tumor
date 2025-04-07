// import React from 'react';
// import './PatientToolkit.css';

// const PatientToolkit = () => (
//   <div className="toolkit-container">
//     <div className="toolkit-card">
//       <h1 className="toolkit-title">🧠 Brain Tumor Care Toolkit</h1>
//       <p className="toolkit-description">
//         Helpful tips for patients and caregivers to stay strong and positive:
//       </p>
//       <ul className="toolkit-list">
//         <li>👨‍⚕️ Listen to your doctor and follow the treatment plan</li>
//         <li>🥦 Eat brain-friendly foods and stay hydrated</li>
//         <li>🛌 Get plenty of sleep and take breaks when needed</li>
//         <li>🧘‍♀️ Practice mindfulness or gentle stretching daily</li>
//         <li>💖 Stay connected with loved ones for support</li>
//         <li>🗓️ Use a calendar to manage meds and appointments</li>
//       </ul>
//     </div>
//   </div>
// );

// export default PatientToolkit;

import React from 'react';
import './PatientToolkit.css';
import { GiBrain } from 'react-icons/gi';
import { FaUserMd, FaAppleAlt, FaBed, FaHandsHelping, FaCalendarCheck } from 'react-icons/fa';
import { GiMeditation } from 'react-icons/gi';

const PatientToolkit = () => (
  <div className="toolkit-container">
    <div className="toolkit-card">
      <h1 className="toolkit-title">
        <GiBrain className="brain-icon" /> Brain Tumor Care Toolkit
      </h1>
      <p className="toolkit-description">
        Helpful tips for patients and caregivers to stay strong and positive:
      </p>
      <ul className="toolkit-list">
        <li><FaUserMd className="list-icon" /> Listen to your doctor and follow the treatment plan</li>
        <li><FaAppleAlt className="list-icon" /> Eat brain-friendly foods and stay hydrated</li>
        <li><FaBed className="list-icon" /> Get plenty of sleep and take breaks when needed</li>
        <li><GiMeditation className="list-icon" /> Practice mindfulness or gentle stretching daily</li>
        <li><FaHandsHelping className="list-icon" /> Stay connected with loved ones for support</li>
        <li><FaCalendarCheck className="list-icon" /> Use a calendar to manage meds and appointments</li>
      </ul>
    </div>
  </div>
);

export default PatientToolkit;
