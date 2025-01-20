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




// import React from 'react';
// import { useHistory } from 'react-router-dom';

// const Patient = () => {
//   const patientId = localStorage.getItem('patientId');
//   const name = localStorage.getItem('name');
//   const history = useHistory();

//   const handleLogout = () => {
//     localStorage.clear();
//     history.push('/Login');
//   }

//   return (
//     <div className="main-content">
//       <div className="side-navbar">
//         <div className="navbar-top">
//           <h4>Patient ID: {patientId}</h4>
//           <button onClick={handleLogout} className='logout-btn'>Logout</button>
//         </div>
//       </div>
//       <div className="content">
//         <h2>Welcome,{name}</h2>
//       </div>
//     </div>
//   );
// };

// export default Patient;



// import React from 'react';
// import { useNavigate } from 'react-router-dom'; // Updated hook for navigation

// const Patient = () => {
//     const patientId = localStorage.getItem('patientId');
//     const name = localStorage.getItem('name');
//     const navigate = useNavigate(); // using useNavigate instead of useHistory

//     // Function to handle logout
//     const handleLogout = () => {
//         localStorage.clear(); // Clears all data from localStorage
//         navigate('/Login'); // Redirects to the login page
//     };

//     return (
//         <div className="main-content">
//             <div className="side-navbar">
//                 <div className="navbar-top">
//                     <h4>Patient ID: {patientId}</h4>
//                     <button onClick={handleLogout} className="logout-btn">
//                         Logout 
//                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
//                             <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z" />
//                             <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
//                         </svg>
//                     </button>
//                 </div>
//             </div>
//             <div className="content">
//                 <h2>Welcome, {name}</h2>
//             </div>
//         </div>
//     );
// };

// export default Patient;



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Updated hook for navigation

const Patient = () => {
    const patientId = localStorage.getItem('patientId');
    const name = localStorage.getItem('name');
    const navigate = useNavigate(); // using useNavigate instead of useHistory

    // State to manage visibility of user details
    const [showDetails, setShowDetails] = useState(false);

    // Function to handle logout
    const handleLogout = () => {
        localStorage.clear(); // Clears all data from localStorage
        navigate('/Login'); // Redirects to the login page
    };

    // Function to toggle the visibility of user details
    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    return (
        <div className="main-content">
            <div className="side-navbar">
                <div className="navbar-top">
                    <h4>Patient ID: {patientId}</h4>
                    <button onClick={toggleDetails} className="details-btn">
                        My Details
                    </button>
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
                {showDetails && (
                    <div className="user-details">
                        <p><strong>Name:</strong> {name}</p>
                        <p><strong>Patient ID:</strong> {patientId}</p>
                        <p><strong>Total Images:</strong>XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</p>
                        {/* Add other details if needed */}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Patient;
