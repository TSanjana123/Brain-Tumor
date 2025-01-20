// import React, { useState } from "react";
// function Patient() {

//     return (
//         <div className="main-content">
//             <div className="side-navbar">
                
//             </div>
//         </div>
//     );
// }
// export default Patient;


import React from 'react';

const Patient = () => {
  const patientId = localStorage.getItem('patientId');

  return (
    <div className="main-content">
      <div className="side-navbar">
        <div className="navbar-top">
          <h4>Patient ID: {patientId}</h4>
        </div>
      </div>
      <div className="content">
        <h2>Welcome, Patient!</h2>
      </div>
    </div>
  );
};

export default Patient;
