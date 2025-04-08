


// // import React, { useState } from 'react';
// // import axios from 'axios';
// // import { useNavigate } from 'react-router-dom';
// // import './Login.css';

// // const Login = () => {
// //   const [formData, setFormData] = useState({
// //     email: '',
// //     password: '',
// //   });
// //   const [error, setError] = useState('');
// //   const [successMessage, setSuccessMessage] = useState('');
// //   const navigate = useNavigate();

// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData((prevState) => ({
// //       ...prevState,
// //       [name]: value,
// //     }));
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const response = await axios.post('http://localhost:5001/api/login', formData);
// //       const { name, email, role, token, patientId, organizationName } = response.data;

// //       localStorage.setItem('token', token);
// //       localStorage.setItem('role', role);
// //       localStorage.setItem('name',name);
// //       localStorage.setItem('email',email);

// //       if (role === 'patient') {
// //         localStorage.setItem('patientId', patientId);
// //         navigate('/Patient');
// //       } else if (role === 'medicalStaff') {
// //         localStorage.setItem('organizationName', organizationName);
// //         navigate('/Organization');
// //       }
// //     } catch (err) {
// //       setError('Invalid email or password');
// //       setSuccessMessage('');
// //     }
// //   };

// //   return (
// //     <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
// //       <div className="card shadow-lg p-4 rounded" style={{ maxWidth: '400px', width: '100%' }}>
// //         <h2 className="text-center mb-4">Login</h2>
// //         {error && <div className="alert alert-danger">{error}</div>}
// //         {successMessage && <div className="alert alert-success">{successMessage}</div>}
// //         <form onSubmit={handleSubmit}>
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
// //           <button type="submit" className="btn-s">
// //             Login
// //           </button>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Login;



// // import React, { useState } from 'react';
// // import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// // const LoginPage = () => {
// //   // Login form state
// //   const [formData, setFormData] = useState({
// //     email: '',
// //     password: '',
// //   });
// //   const [error, setError] = useState('');

// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData((prevState) => ({
// //       ...prevState,
// //       [name]: value,
// //     }));
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       // Simulated login logic
// //       // In a real app, replace this with actual login API call
// //       if (formData.email === 'test@example.com' && formData.password === 'password') {
// //         // Simulated successful login
// //         alert('Login Successful!');
// //         // In a real app, you would handle navigation here
// //       } else {
// //         setError('Invalid email or password');
// //       }
// //     } catch (err) {
// //       setError('Login failed');
// //     }
// //   };

// //   // Sample data for graphs
// //   const userGrowthData = [
// //     { month: 'Jan', users: 400 },
// //     { month: 'Feb', users: 300 },
// //     { month: 'Mar', users: 200 },
// //     { month: 'Apr', users: 278 },
// //     { month: 'May', users: 189 },
// //     { month: 'Jun', users: 239 },
// //   ];

// //   const activeSessionsData = [
// //     { month: 'Jan', sessions: 200 },
// //     { month: 'Feb', sessions: 250 },
// //     { month: 'Mar', sessions: 180 },
// //     { month: 'Apr', sessions: 220 },
// //     { month: 'May', sessions: 190 },
// //     { month: 'Jun', sessions: 210 },
// //   ];

// //   return (
// //     <div className="container-fluid h-full">
// //       <div className="flex flex-row h-full">
// //         {/* Left Column - Graphs */}
// //         <div className="w-7/12 bg-gray-100 flex flex-col justify-center items-center p-5">
// //           <div className="w-full mb-5">
// //             <h3 className="text-center mb-4 text-xl font-bold">User Growth</h3>
// //             <ResponsiveContainer width="100%" height={250}>
// //               <LineChart data={userGrowthData}>
// //                 <CartesianGrid strokeDasharray="3 3" />
// //                 <XAxis dataKey="month" />
// //                 <YAxis />
// //                 <Tooltip />
// //                 <Legend />
// //                 <Line type="monotone" dataKey="users" stroke="#8884d8" activeDot={{ r: 8 }} />
// //               </LineChart>
// //             </ResponsiveContainer>
// //           </div>

// //           <div className="w-full">
// //             <h3 className="text-center mb-4 text-xl font-bold">Active Sessions</h3>
// //             <ResponsiveContainer width="100%" height={250}>
// //               <LineChart data={activeSessionsData}>
// //                 <CartesianGrid strokeDasharray="3 3" />
// //                 <XAxis dataKey="month" />
// //                 <YAxis />
// //                 <Tooltip />
// //                 <Legend />
// //                 <Line type="monotone" dataKey="sessions" stroke="#82ca9d" activeDot={{ r: 8 }} />
// //               </LineChart>
// //             </ResponsiveContainer>
// //           </div>
// //         </div>

// //         {/* Right Column - Login Form */}
// //         <div className="w-5/12 flex justify-center items-center bg-white">
// //           <div className="w-full max-w-md p-8 space-y-4">
// //             <h2 className="text-center text-2xl font-bold mb-6">Login</h2>
// //             {error && (
// //               <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
// //                 {error}
// //               </div>
// //             )}
// //             <form onSubmit={handleSubmit} className="space-y-4">
// //               <div>
// //                 <input
// //                   type="email"
// //                   name="email"
// //                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                   placeholder="Email"
// //                   value={formData.email}
// //                   onChange={handleInputChange}
// //                   required
// //                 />
// //               </div>
// //               <div>
// //                 <input
// //                   type="password"
// //                   name="password"
// //                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                   placeholder="Password"
// //                   value={formData.password}
// //                   onChange={handleInputChange}
// //                   required
// //                 />
// //               </div>
// //               <button
// //                 type="submit"
// //                 className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
// //               >
// //                 Login
// //               </button>
// //             </form>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default LoginPage;





// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './Login.css';

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });
//   const [error, setError] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');
//   const navigate = useNavigate();

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:5001/api/login', formData);
//       const { name, email, role, token, patientId, organizationName } = response.data;

//       localStorage.setItem('token', token);
//       localStorage.setItem('role', role);
//       localStorage.setItem('name', name);
//       localStorage.setItem('email', email);

//       if (role === 'patient') {
//         localStorage.setItem('patientId', patientId);
//         navigate('/Patient');
//       } else if (role === 'medicalStaff') {
//         localStorage.setItem('organizationName', organizationName);
//         navigate('/Organization');
//       }
//     } catch (err) {
//       setError('Invalid email or password');
//       setSuccessMessage('');
//     }
//   };

//   return (
//     <div className="d-flex vh-100">
//       {/* Left Half: Graph Section */}
//       <div className="w-50 d-flex flex-column justify-content-center align-items-center bg-light">
//         <h2>Website Analytics</h2>
//         <div className="graph-placeholder">
//           <img
//             src="https://d2jx2rerrg6sh3.cloudfront.net/image-handler/ts/20200107063435/ri/1000/picture/2020/1/shutterstock_565415560.jpg"
//             alt="AI-based Prediction"
//             className="card-img-top"
//           />
//         </div>
//       </div>

//       {/* Right Half: Login Form */}
//       <div className="w-50 d-flex justify-content-center align-items-center bg-white">
//         <div className="card shadow-lg p-4 rounded" style={{ maxWidth: '400px', width: '100%' }}>
//           <h2 className="text-center mb-4">Login</h2>
//           {error && <div className="alert alert-danger">{error}</div>}
//           {successMessage && <div className="alert alert-success">{successMessage}</div>}
//           <form onSubmit={handleSubmit}>
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
//             <button type="submit" className="btn btn-primary w-100">
//               Login
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;






import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto'; // Required for Chart.js to work properly
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Sample data for the bar graph
  const barData = {
    labels: ['2018', '2019', '2020', '2021', '2022', '2023', '2024'], // Years
    datasets: [
      {
        label: 'Accuracy (%)',
        data: [85, 87, 84, 88, 86, 89, 87], // Accuracy values 
        backgroundColor: [
          '#4CAF50',
          '#2196F3',
          '#FFC107',
          '#FF5722',
          '#9C27B0',
          '#03A9F4',
          '#8BC34A',
        ],
        borderColor: '#000',
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Year vs Accuracy',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("shashi")
      // console.log("Environment URL:", process.env.REACT_APP_LOGIN_RESPONSE_URL);
      console.log(formData)
      // const response = await axios.post("http://localhost:5001/api/login", formData);
      const response = await axios.post(`${process.env.REACT_APP_LOGIN_RESPONSE_URL}/api/login`, formData);
      const { name, email, role, token, patientId, organizationName } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      localStorage.setItem('name', name);
      localStorage.setItem('email', email);

      if (role === 'patient') {
        localStorage.setItem('patientId', patientId);
        navigate('/Patient');
      } else if (role === 'medicalStaff') {
        localStorage.setItem('organizationName', organizationName);
        navigate('/Organization');
      }
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="d-flex vh-100">
      <div className="w-50 d-flex flex-column justify-content-center align-items-center bg-light">
      {/* <div className="container w-50 d-flex flex-column justify-content-center align-items-center bg-success text-white p-4 shadow rounded"> */}

      {/* <div className="w-50 d-flex flex-column justify-content-center align-items-center"> */}
        <h2>Performance Metrics</h2>
        <div className="graph-placeholder" style={{ width: '80%', height: '400px' }}>
          <Bar data={barData} options={barOptions} />
        </div>
      </div> 

      {/* Right Half: Login Form */}
      {/* <div className="w-50 d-flex justify-content-center align-items-center bg-white"> */}
      <div className="w-50 d-flex justify-content-center align-items-center">
        <div className="card shadow-lg p-4 rounded" style={{ maxWidth: '400px', width: '100%' }}>
          <h2 className="text-center mb-4">Login</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
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
            {/* <button type="submit" className="btn btn-success cretere the t hghuio mn ytik  w-100"> */}
            <button type="submit" className="btn-login_click">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
