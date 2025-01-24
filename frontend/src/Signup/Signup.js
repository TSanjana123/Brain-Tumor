// // import React, { useState } from 'react';
// // import axios from 'axios';
// // import { useNavigate } from 'react-router-dom';
// // const Signup = () => {
// //   const [formData, setFormData] = useState({
// //     name: '',
// //     email: '',
// //     password: '',
// //     confirmPassword: '',
// //     role: '',
// //     patientId: '',
// //     organizationName: '',
// //   });
// //   const navigate = useNavigate();
// //   const [error, setError] = useState('');
// //   const [successMessage, setSuccessMessage] = useState('');

// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData((prevState) => ({
// //       ...prevState,
// //       [name]: value,
// //     }));
// //   };

// //   const handleRoleChange = (e) => {
// //     setFormData((prevState) => ({
// //       ...prevState,
// //       role: e.target.value,
// //     }));
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     if (formData.password !== formData.confirmPassword) {
// //       setError('Passwords do not match');
// //       return;
// //     }

// //     setError('');
// //     try {
// //       const response = await axios.post('http://localhost:5001/api/signup', formData);

// //       // Check if the response has data
// //       if (response && response.data) {
// //         setSuccessMessage(response.data.message); // Display success message from response
// //         navigate('/Login');
// //       } else {
// //         setError('Unknown error occurred');
// //       }
// //     } catch (err) {
// //       console.error(err); // Log the error to the console
// //       // Check if there's a response from the server
// //       if (err.response) {
// //         setError(err.response.data.message || 'An error occurred');
// //       } else {
// //         setError('An unexpected error occurred');
// //       }
// //     }
// //   };

// //   return (
// //     <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
// //       <div className="card shadow-lg p-4 rounded" style={{ maxWidth: '500px', width: '100%' }}>
// //         <h2 className="text-center mb-4">Sign Up</h2>

// //         {error && <div className="alert alert-danger">{error}</div>}
// //         {successMessage && <div className="alert alert-success">{successMessage}</div>}

// //         <form onSubmit={handleSubmit}>
// //           <div className="mb-3">
// //             <input
// //               type="text"
// //               name="name"
// //               className="form-control"
// //               placeholder="Name"
// //               value={formData.name}
// //               onChange={handleInputChange}
// //               required
// //             />
// //           </div>

// //           <div className="mb-3">
// //             <input
// //               type="email"
// //               name="email"
// //               className="form-control"
// //               placeholder="Email"
// //               value={formData.email}
// //               onChange={handleInputChange}
// //               required
// //             />
// //           </div>

// //           <div className="mb-3">
// //             <input
// //               type="password"
// //               name="password"
// //               className="form-control"
// //               placeholder="Password"
// //               value={formData.password}
// //               onChange={handleInputChange}
// //               required
// //             />
// //           </div>

// //           <div className="mb-3">
// //             <input
// //               type="password"
// //               name="confirmPassword"
// //               className="form-control"
// //               placeholder="Confirm Password"
// //               value={formData.confirmPassword}
// //               onChange={handleInputChange}
// //               required
// //             />
// //           </div>

// //           <div className="mb-3">
// //             <select
// //               name="role"
// //               className="form-select"
// //               onChange={handleRoleChange}
// //               value={formData.role}
// //               required
// //             >
// //               <option value="">Select Role</option>
// //               <option value="patient">Patient</option>
// //               <option value="medicalStaff">Organization</option>
// //             </select>
// //           </div>

// //           {formData.role === 'patient' && (
// //             <div className="mb-3">
// //               <input
// //                 type="text"
// //                 name="patientId"
// //                 className="form-control"
// //                 placeholder="Patient ID"
// //                 value={formData.patientId}
// //                 onChange={handleInputChange}
// //                 required
// //               />
// //             </div>
// //           )}

// //           {formData.role === 'medicalStaff' && (
// //             <div className="mb-3">
// //               <input
// //                 type="text"
// //                 name="organizationName"
// //                 className="form-control"
// //                 placeholder="Organization Name"
// //                 value={formData.organizationName}
// //                 onChange={handleInputChange}
// //                 required
// //               />
// //             </div>
// //           )}

// //           <button type="submit" className="btn btn-primary w-100 mt-3">
// //             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
// //               <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z" />
// //               <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
// //             </svg>
// //           </button>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Signup;




// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './Signup.css';

// const Signup = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     role: '',
//     patientId: '',
//     organizationName: '',
//   });
//   const navigate = useNavigate();
//   const [error, setError] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleRoleChange = (e) => {
//     setFormData((prevState) => ({
//       ...prevState,
//       role: e.target.value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (formData.password !== formData.confirmPassword) {
//       setError('Passwords do not match');
//       return;
//     }

//     setError('');
//     try {
//       const response = await axios.post('http://localhost:5001/api/signup', formData);

//       if (response && response.data) {
//         setSuccessMessage(response.data.message);
//         navigate('/Login');
//       } else {
//         setError('Unknown error occurred');
//       }
//     } catch (err) {
//       console.error(err);
//       if (err.response) {
//         setError(err.response.data.message || 'An error occurred');
//       } else {
//         setError('An unexpected error occurred');
//       }
//     }
//   };

//   return (
//     <div className="d-flex vh-100">
//       {/* Left Half: Content Section */}
//       <div className="w-50 d-flex flex-column justify-content-center align-items-center bg-light">
//         <h2>Welcome to Our Platform</h2>
//         <div className="content-placeholder">Graphs or other content go here</div>
//       </div>

//       {/* Right Half: Signup Form */}
//       <div className="w-50 d-flex justify-content-center align-items-center bg-white">
//         <div className="card shadow-lg p-4 rounded" style={{ maxWidth: '500px', width: '100%' }}>
//           <h2 className="text-center mb-4">Sign Up</h2>

//           {error && <div className="alert alert-danger">{error}</div>}
//           {successMessage && <div className="alert alert-success">{successMessage}</div>}

//           <form onSubmit={handleSubmit}>
//             <div className="mb-3">
//               <input
//                 type="text"
//                 name="name"
//                 className="form-control"
//                 placeholder="Name"
//                 value={formData.name}
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>

//             <div className="mb-3">
//               <input
//                 type="email"
//                 name="email"
//                 className="form-control"
//                 placeholder="Email"
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>

//             <div className="mb-3">
//               <input
//                 type="password"
//                 name="password"
//                 className="form-control"
//                 placeholder="Password"
//                 value={formData.password}
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>

//             <div className="mb-3">
//               <input
//                 type="password"
//                 name="confirmPassword"
//                 className="form-control"
//                 placeholder="Confirm Password"
//                 value={formData.confirmPassword}
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>

//             <div className="mb-3">
//               <select
//                 name="role"
//                 className="form-select"
//                 onChange={handleRoleChange}
//                 value={formData.role}
//                 required
//               >
//                 <option value="">Select Role</option>
//                 <option value="patient">Patient</option>
//                 <option value="medicalStaff">Organization</option>
//               </select>
//             </div>

//             {formData.role === 'patient' && (
//               <div className="mb-3">
//                 <input
//                   type="text"
//                   name="patientId"
//                   className="form-control"
//                   placeholder="Patient ID"
//                   value={formData.patientId}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>
//             )}

//             {formData.role === 'medicalStaff' && (
//               <div className="mb-3">
//                 <input
//                   type="text"
//                   name="organizationName"
//                   className="form-control"
//                   placeholder="Organization Name"
//                   value={formData.organizationName}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>
//             )}

//             <button type="submit" className="btn btn-primary w-100 mt-3">
//               Sign Up
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;





import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto'; // Required for Chart.js to work properly
import './Signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    patientId: '',
    organizationName: '',
  });
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Sample data for the pie chart
  const pieData = {
    // labels: ['Astrocitoma T1', 'Astrocitoma T1C+', 'Category C', 'Category D'],
    labels: ['Astrocitoma T1', 'Astrocitoma T1C+', 'Astrocitoma T2', 'Carcinoma T1', 'Carcinoma T1C+', 'Carcinoma T2', 'Ependimoma T1', 'Ependimoma T1C+', 'Ependimoma T2', 'Ganglioglioma T1', 'Ganglioglioma T1C+', 'Ganglioglioma T2', 'Germinoma T1', 'Germinoma T1C+', 'Germinoma T2', 'Glioblastoma T1', 'Glioblastoma T1C+', 'Glioblastoma T2', 'Granuloma T1', 'Granuloma T1C+', 'Granuloma T2', 'Meduloblastoma T1', 'Meduloblastoma T1C+', 'Meduloblastoma T2', 'Meningioma T1', 'Meningioma T1C+', 'Meningioma T2', 'Neurocitoma T1', 'Neurocitoma T1C+', 'Neurocitoma T2', 'Oligodendroglioma T1', 'Oligodendroglioma T1C+', 'Oligodendroglioma T2', 'Papiloma T1', 'Papiloma T1C+', 'Papiloma T2', 'Schwannoma T1', 'Schwannoma T1C+', 'Schwannoma T2', 'Tuberculoma T1', 'Tuberculoma T1C+', 'Tuberculoma T2', '_NORMAL T1', '_NORMAL T2'],
    datasets: [
      {
        data: [30, 20, 25, 25,30, 20, 25, 25,30, 20, 25, 25,30, 20, 25, 25,30, 20, 25, 25,30, 20, 25, 25,30, 20, 25, 25,30, 20, 25, 25], // Values for the pie chart
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      },
    ],
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRoleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      role: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setError('');
    try {
      const response = await axios.post('http://localhost:5001/api/signup', formData);

      if (response && response.data) {
        setSuccessMessage(response.data.message);
        navigate('/Login');
      } else {
        setError('Unknown error occurred');
      }
    } catch (err) {
      console.error(err);
      if (err.response) {
        setError(err.response.data.message || 'An error occurred');
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  return (
    <div className="d-flex vh-100">
      {/* Left Half: Content Section with Pie Chart */}
      <div className="w-50 d-flex flex-column justify-content-center align-items-center bg-light">
        <h2>Data Distribution</h2>
        <div className="graph-placeholder" style={{ width: '80%', height: '400px' }}>
          <Pie data={pieData} />
        </div>
      </div>

      {/* Right Half: Signup Form */}
      <div className="w-50 d-flex justify-content-center align-items-center bg-white">
        <div className="card shadow-lg p-4 rounded" style={{ maxWidth: '500px', width: '100%' }}>
          <h2 className="text-center mb-4">Sign Up</h2>

          {error && <div className="alert alert-danger">{error}</div>}
          {successMessage && <div className="alert alert-success">{successMessage}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="mb-3">
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="mb-3">
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="mb-3">
              <input
                type="password"
                name="confirmPassword"
                className="form-control"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="mb-3">
              <select
                name="role"
                className="form-select"
                onChange={handleRoleChange}
                value={formData.role}
                required
              >
                <option value="">Select Role</option>
                <option value="patient">Patient</option>
                <option value="medicalStaff">Organization</option>
              </select>
            </div>

            {formData.role === 'patient' && (
              <div className="mb-3">
                <input
                  type="text"
                  name="patientId"
                  className="form-control"
                  placeholder="Patient ID"
                  value={formData.patientId}
                  onChange={handleInputChange}
                  required
                />
              </div>
            )}

            {formData.role === 'medicalStaff' && (
              <div className="mb-3">
                <input
                  type="text"
                  name="organizationName"
                  className="form-control"
                  placeholder="Organization Name"
                  value={formData.organizationName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            )}

            <button type="submit" className="btn btn-primary w-100 mt-3">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;