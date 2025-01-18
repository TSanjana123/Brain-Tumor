// // // // Navbar.js
// // // import React from 'react';
// // // import { Link } from 'react-router-dom';
// // // import './Navbar.css';

// // // function Navbar() {
// // //   return (
// // //     <nav className="navbar">
// // //       <div className="navbar-container">
// // //         <Link to="/" className="navbar-logo">Home</Link>
// // //         <ul className="navbar-links">
// // //           <li className="navbar-item">
// // //             <Link to="/about" className="navbar-link">About</Link>
// // //           </li>
// // //           <li className="navbar-item">
// // //             <Link to="/services" className="navbar-link">Services</Link>
// // //           </li>
// // //           <li className="navbar-item">
// // //             <Link to="/contact" className="navbar-link">Contact</Link>
// // //           </li>
// // //           <li className="navbar-item">
// // //             <Link to="/Signup" className="navbar-link">Signup</Link>
// // //           </li>
// // //           <li className="navbar-item">
// // //             <Link to="/Login" className="navbar-link">Login</Link>
// // //           </li>
// // //         </ul>
// // //       </div>
// // //     </nav>
// // //   );
// // // }

// // // export default Navbar;



// // import React from 'react';
// // import { Link } from 'react-router-dom';
// // import 'bootstrap/dist/css/bootstrap.min.css';

// // function Navbar() {
// //   return (
// //     // <nav className="navbar navbar-expand-lg">
// //     <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
// //       <div className="container-fluid">
// //         <Link to="/" className="navbar-brand fw-bold fs-4 text-danger">Home</Link>

// //         {/* Navbar Toggle Button for Mobile */}
// //         <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
// //           <span className="navbar-toggler-icon"></span>
// //         </button>

// //         {/* Navbar Links */}
// //         <div className="collapse navbar-collapse" id="navbarNav">
// //           <ul className="navbar-nav ms-auto">
// //             <li className="nav-item">
// //               <Link to="/about" className="nav-link">About</Link>
// //             </li>
// //             <li className="nav-item">
// //               <Link to="/services" className="nav-link">Services</Link>
// //             </li>
// //             <li className="nav-item">
// //               <Link to="/contact" className="nav-link">Contact</Link>
// //             </li>
// //             <li className="nav-item">
// //               <Link to="/Signup" className="nav-link">Signup</Link>
// //             </li>
// //             <li className="nav-item">
// //               <Link to="/Login" className="nav-link">Login</Link>
// //             </li>
// //           </ul>
// //         </div>
// //       </div>
// //     </nav>
// //   );
// // }

// // export default Navbar;


// import React from 'react';
// import { Link } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JS

// function Navbar() {
//   return (
//     <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
//       <div className="container-fluid">
//         <Link to="/" className="navbar-brand fw-bold fs-4 text-primary">Home</Link>

//         {/* Navbar Toggle Button for Mobile */}
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarNav"
//           aria-controls="navbarNav"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         {/* Navbar Links */}
//         <div className="collapse navbar-collapse" id="navbarNav">
//           <ul className="navbar-nav ms-auto">
//             <li className="nav-item">
//               <Link to="/about" className="nav-link">About</Link>
//             </li>
//             <li className="nav-item">
//               <Link to="/services" className="nav-link">Services</Link>
//             </li>
//             <li className="nav-item">
//               <Link to="/contact" className="nav-link">Contact</Link>
//             </li>
//             <li className="nav-item">
//               <Link to="/Signup" className="nav-link">Signup</Link>
//             </li>
//             <li className="nav-item">
//               <Link to="/Login" className="nav-link">Login</Link>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;




import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JS
import logo from '../images/home.png';
function Navbar() {
  return (
    // <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
    // <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
    // <nav className="navbar navbar-expand-lg navbar-dark bg-success shadow-sm">
    // <nav className="navbar navbar-expand-lg navbar-light bg-transparent shadow">
    // <nav className="navbar navbar-expand-lg navbar-light bg-primary shadow-sm">
    // <nav className="navbar navbar-expand-lg navbar-light bg-danger shadow-sm">
    // <nav className="navbar navbar-expand-lg navbar-light" style={{background: "linear-gradient(45deg,rgb(124, 41, 34),rgb(54, 100, 75))"}}>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm" style={{borderBottom: "4px solid gold"}}>
      
      <div className="container-fluid">
        {/* Replace Home text with an image */}
        <Link to="/" className="navbar-brand">
          <img
            src={logo}
            alt="Logo"
            style={{ height: '40px', width: 'auto' }} // Adjust size of the logo
          />
        </Link>

        {/* Navbar Toggle Button for Mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/about" className="nav-link">About</Link>
            </li>
            <li className="nav-item">
              <Link to="/services" className="nav-link">Services</Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link">Contact</Link>
            </li>
            <li className="nav-item">
              <Link to="/Signup" className="nav-link">Signup</Link>
            </li>
            <li className="nav-item">
              <Link to="/Login" className="nav-link">Login</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
