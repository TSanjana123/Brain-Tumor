import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar/Navbar'; // Import the Navbar component
import Home from './Home/Home'; // Import pages (create these in the next steps)
// import About from './pages/About';
// import Services from './pages/Services';
// import Contact from './pages/Contact';
import Signup from './Signup/Signup';
import Login from './Login/Login';
import Predict from './Predict/Predict';
import Test from './Test_random/Test';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Predict" element={<Predict />} />
            <Route path="/Test" element={<Test />} />
            {/* <Route path="/about" element={<About />} /> */}
            {/* <Route path="/services" element={<Services />} /> */}
            {/* <Route path="/contact" element={<Contact />} /> */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
