import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JS

function Navbar() {
  return (
    // <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
    // <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
    // <nav className="navbar navbar-expand-lg navbar-dark bg-success shadow-sm">
    // <nav className="navbar navbar-expand-lg navbar-light bg-transparent shadow">
    // <nav className="navbar navbar-expand-lg navbar-light bg-primary shadow-sm">
    // <nav className="navbar navbar-expand-lg navbar-light bg-danger shadow-sm">
    // <nav className="navbar navbar-expand-lg navbar-light" style={{background: "linear-gradient(45deg,rgb(124, 41, 34),rgb(54, 100, 75))"}}>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm" style={{ borderBottom: "4px solid gold" }}>

      <div className="container-fluid">
        {/* Replace Home text with an image */}
        <Link to="/" className="navbar-brand">
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-house" viewBox="0 0 16 16">
            <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" />
          </svg>
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
              <Link to="/Admin" className="nav-link">Admin test</Link>
            </li>
            {/* <li className="nav-item">
              <Link to="/services" className="nav-link">Services</Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link">Contact</Link>
            </li> */}
            <li className="nav-item">
              <Link to="/Signup" className="nav-link">Signup</Link>
            </li>
            <li className="nav-item">
              <Link to="/Login" className="nav-link">Login</Link>
            </li>
            <li className="nav-item">
              <Link to="/Patient" className="nav-link">Patient</Link>
            </li>
            <li className="nav-item">
              <Link to="/Organization" className="nav-link">Organization</Link>
            </li>
            <li className="nav-item">
              <Link to="/Test" className="nav-link">
               {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-folder" viewBox="0 0 16 16">
                  <path d="M.54 3.87.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.826a2 2 0 0 1-1.991-1.819l-.637-7a2 2 0 0 1 .342-1.31zM2.19 4a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4zm4.69-1.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139q.323-.119.684-.12h5.396z" />
                </svg>  */}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;