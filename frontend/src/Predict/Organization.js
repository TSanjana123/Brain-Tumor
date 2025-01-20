// import React, { useState } from "react";
// function Organization() {

//     return (
//         <div className="main-content">
//             <div className="side-navbar">
                
//             </div>
//         </div>
//     );
// }
// export default Organization;


import React from 'react';

const Organization = () => {
  const organizationName = localStorage.getItem('organizationName');

  return (
    <div className="main-content">
      <div className="side-navbar">
        <div className="navbar-top">
          <h4>Organization: {organizationName}</h4>
        </div>
      </div>
      <div className="content">
        <h2>Welcome, Organization!</h2>
      </div>
    </div>
  );
};

export default Organization;
