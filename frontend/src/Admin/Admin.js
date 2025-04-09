// // // // import React, { useEffect, useState } from "react";
// // // // import axios from "axios";

// // // // const Admin = () => {
// // // //     const [users, setUsers] = useState([]);
// // // //     const [loading, setLoading] = useState(true);
// // // //     const [error, setError] = useState(null);

// // // //     useEffect(() => {
// // // //         // Fetch data from your API
// // // //         const fetchUsers = async () => {
// // // //             try {
// // // //                 const response = await axios.get("http://localhost:5001/api/patients");
// // // //                 setUsers(response.data); // Set users data in state
// // // //                 setLoading(false);
// // // //             } catch (err) {
// // // //                 setError("Error fetching data");
// // // //                 console.error(err);
// // // //             }
// // // //         };

// // // //         fetchUsers();
// // // //     }, []);

// // // //     if (loading) {
// // // //         return <p>Loading...</p>;
// // // //     }

// // // //     if (error) {
// // // //         return <p>{error}</p>;
// // // //     }

// // // //     return (
// // // //         <>
// // // //             <div>
// // // //                 <h1>Patients List</h1>
// // // //                 <table border="1">
// // // //                     <thead>
// // // //                         <tr>
// // // //                             <th>Name</th>
// // // //                             <th>Email</th>
// // // //                             <th>Password</th>
// // // //                             <th>Role</th>
// // // //                             <th>Patient ID</th>
// // // //                             <th>Image Data</th>
// // // //                             {/* <th>Organization Name</th> */}
// // // //                         </tr>
// // // //                     </thead>
// // // //                     <tbody>
// // // //                         {users.map((user, index) => (
// // // //                             <tr key={index}>
// // // //                                 <td>{user.name}</td>
// // // //                                 <td>{user.email}</td>
// // // //                                 <td>{user.password}</td>
// // // //                                 <td>{user.role}</td>
// // // //                                 <td>{user.patientId}</td>
// // // //                                 <td>{user.imageData}</td>
// // // //                                 {/* <td>{user.organizationName}</td> */}
// // // //                             </tr>
// // // //                         ))}
// // // //                     </tbody>
// // // //                 </table>
// // // //             </div>
// // // //             <div>
// // // //                 <h1>organization List</h1>
// // // //                 <table border="1">
// // // //                     <thead>
// // // //                         <tr>
// // // //                             <th>Name</th>
// // // //                             <th>Email</th>
// // // //                             <th>Role</th>
// // // //                             <th>Patient ID</th>
// // // //                             {/* <th>Organization Name</th> */}
// // // //                         </tr>
// // // //                     </thead>
// // // //                     <tbody>
// // // //                         {users.map((user, index) => (
// // // //                             <tr key={index}>
// // // //                                 <td>{user.name}</td>
// // // //                                 <td>{user.email}</td>
// // // //                                 <td>{user.role}</td>
// // // //                                 <td>{user.patientId}</td>
// // // //                                 {/* <td>{user.organizationName}</td> */}
// // // //                             </tr>
// // // //                         ))}
// // // //                     </tbody>
// // // //                 </table>
// // // //             </div>
// // // //         </>
// // // //     );
// // // // };

// // // // export default Admin;






// // // import React, { useEffect, useState } from "react";
// // // import axios from "axios";

// // // const Admin = () => {
// // //     const [users, setUsers] = useState([]);
// // //     const [loading, setLoading] = useState(true);
// // //     const [error, setError] = useState(null);

// // //     useEffect(() => {
// // //         const fetchUsers = async () => {
// // //             try {
// // //                 const response = await axios.get("http://localhost:5001/api/patients");
// // //                 setUsers(response.data); // Set users data in state
// // //                 setLoading(false);
// // //             } catch (err) {
// // //                 setError("Error fetching data");
// // //                 console.error(err);
// // //             }
// // //         };

// // //         fetchUsers();
// // //     }, []);

// // //     if (loading) {
// // //         return <p>Loading...</p>;
// // //     }

// // //     if (error) {
// // //         return <p>{error}</p>;
// // //     }

// // //     return (
// // //         <>
// // //             <div>
// // //                 <h1>Patients List</h1>
// // //                 <table border="1">
// // //                     <thead>
// // //                         <tr>
// // //                             <th>Name</th>
// // //                             <th>Email</th>
// // //                             <th>Password</th>
// // //                             <th>Role</th>
// // //                             <th>Patient ID</th>
// // //                             <th>Image Data</th>
// // //                         </tr>
// // //                     </thead>
// // //                     <tbody>
// // //                         {users.map((user, index) => (
// // //                             <tr key={index}>
// // //                                 <td>{user.name}</td>
// // //                                 <td>{user.email}</td>
// // //                                 <td>{user.password}</td>
// // //                                 <td>{user.role}</td>
// // //                                 <td>{user.patientId}</td>
// // //                                 {/* Render image data correctly */}
// // //                                 <td>
// // //                                     {/* Check if imageData is an object */}
// // //                                     {typeof user.imageData === "object" 
// // //                                         ? `Image Name: ${user.imageData.imageName}`  // Customize what you want to display
// // //                                         : user.imageData} {/* Render as a string if it's not an object */}
// // //                                 </td>
// // //                             </tr>
// // //                         ))}
// // //                     </tbody>
// // //                 </table>
// // //             </div>

// // //             <div>
// // //                 <h1>Organization List</h1>
// // //                 <table border="1">
// // //                     <thead>
// // //                         <tr>
// // //                             <th>Name</th>
// // //                             <th>Email</th>
// // //                             <th>Role</th>
// // //                             <th>Patient ID</th>
// // //                         </tr>
// // //                     </thead>
// // //                     <tbody>
// // //                         {users.map((user, index) => (
// // //                             <tr key={index}>
// // //                                 <td>{user.name}</td>
// // //                                 <td>{user.email}</td>
// // //                                 <td>{user.role}</td>
// // //                                 <td>{user.patientId}</td>
// // //                             </tr>
// // //                         ))}
// // //                     </tbody>
// // //                 </table>
// // //             </div>
// // //         </>
// // //     );
// // // };

// // // export default Admin;




// // import React, { useEffect, useState } from "react";
// // import axios from "axios";

// // const Admin = () => {
// //     const [users, setUsers] = useState([]);
// //     const [loading, setLoading] = useState(true);
// //     const [error, setError] = useState(null);

// //     useEffect(() => {
// //         const fetchUsers = async () => {
// //             try {
// //                 const response = await axios.get("http://localhost:5001/api/patients");
// //                 setUsers(response.data); // Set users data in state
// //                 setLoading(false);
// //             } catch (err) {
// //                 setError("Error fetching data");
// //                 console.error(err);
// //             }
// //         };

// //         fetchUsers();
// //     }, []);

// //     if (loading) {
// //         return <p>Loading...</p>;
// //     }

// //     if (error) {
// //         return <p>{error}</p>;
// //     }

// //     return (
// //         <>
// //             <div>
// //                 <h1>Patients List</h1>
// //                 <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
// //                     <thead>
// //                         <tr>
// //                             <th>Name</th>
// //                             <th>Email</th>
// //                             <th>Role</th>
// //                             <th>Patient ID</th>
// //                             <th>Organization Name</th>
// //                             <th>Image Data</th>
// //                             <th>Chat History</th>
// //                         </tr>
// //                     </thead>
// //                     <tbody>
// //                         {users.map((user, index) => (
// //                             <React.Fragment key={index}>
// //                                 <tr>
// //                                     <td>{user.name}</td>
// //                                     <td>{user.email}</td>
// //                                     <td>{user.role}</td>
// //                                     <td>{user.patientId}</td>
// //                                     <td>{user.organizationName || "N/A"}</td>
// //                                     <td>
// //                                         {/* Render image data with expandability */}
// //                                         {user.imageData && user.imageData.length > 0 ? (
// //                                             <ul>
// //                                                 {user.imageData.map((image, i) => (
// //                                                     <li key={i}>
// //                                                         <strong>Image Name:</strong> {image.imageName} <br />
// //                                                         <strong>Upload Date:</strong> {new Date(image.uploadDate).toLocaleString()} <br />
// //                                                         <strong>Organization Name:</strong> {image.organizationName} <br />
// //                                                         <strong>Image Path:</strong> <a href={`http://localhost:5001/${image.imagePath}`} target="_blank" rel="noopener noreferrer">View Image</a>
// //                                                     </li>
// //                                                 ))}
// //                                             </ul>
// //                                         ) : (
// //                                             <span>No images uploaded</span>
// //                                         )}
// //                                     </td>
// //                                     <td>
// //                                         {/* Render chat history */}
// //                                         {user.chatHistory && user.chatHistory.length > 0 ? (
// //                                             <ul>
// //                                                 {user.chatHistory.map((chat, i) => (
// //                                                     <li key={i}>
// //                                                         <strong>Image Name:</strong> {chat.imageName} <br />
// //                                                         <strong>Upload Date:</strong> {new Date(chat.uploadDate).toLocaleString()} <br />
// //                                                         <strong>Chat Prompts:</strong> 
// //                                                         <ul>
// //                                                             {chat.allChat.map((msg, j) => (
// //                                                                 <li key={j}>
// //                                                                     <strong>Prompt:</strong> {msg.prompt}
// //                                                                 </li>
// //                                                             ))}
// //                                                         </ul>
// //                                                     </li>
// //                                                 ))}
// //                                             </ul>
// //                                         ) : (
// //                                             <span>No chat history available</span>
// //                                         )}
// //                                     </td>
// //                                 </tr>
// //                             </React.Fragment>
// //                         ))}
// //                     </tbody>
// //                 </table>
// //             </div>
// //         </>
// //     );
// // };

// // export default Admin;




// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import './Admin.css'
// const Admin = () => {
//     const [users, setUsers] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchUsers = async () => {
//             try {
//                 const response = await axios.get("http://localhost:5001/api/patients");
//                 setUsers(response.data); // Set users data in state
//                 setLoading(false);
//             } catch (err) {
//                 setError("Error fetching data");
//                 console.error(err);
//             }
//         };

//         fetchUsers();
//     }, []);

//     if (loading) {
//         return <p>Loading...</p>;
//     }

//     if (error) {
//         return <p>{error}</p>;
//     }

//     return (
//         <>
//             <div>
//                 <h1>Patients List</h1>
//                 <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
//                     <thead>
//                         <tr>
//                             <th>Name</th>
//                             <th>Email</th>
//                             <th>Patient ID</th>
//                             <th>Image Data</th>
//                             <th>Chat History</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {users
//                             .filter((user) => user.role === "patient") // Only display patients
//                             .map((user, index) => (
//                                 <React.Fragment key={index}>
//                                     <tr>
//                                         <td>{user.name}</td>
//                                         <td>{user.email}</td>
//                                         <td>{user.patientId}</td>
//                                         <td>
//                                             {/* Render image data */}
//                                             {user.imageData && user.imageData.length > 0 ? (
//                                                 <ul>
//                                                     {user.imageData.map((image, i) => (
//                                                         <li key={i}>
//                                                             <strong>Image Name:</strong> {image.imageName} <br />
//                                                             <strong>Upload Date:</strong> {new Date(image.uploadDate).toLocaleString()} <br />
//                                                             <strong>Organization Name:</strong> {image.organizationName} <br />
//                                                             <strong>Image Path:</strong> <a href={`http://localhost:5001/${image.imagePath}`} target="_blank" rel="noopener noreferrer">View Image</a>
//                                                         </li>
//                                                     ))}
//                                                 </ul>
//                                             ) : (
//                                                 <span>No images uploaded</span>
//                                             )}
//                                         </td>
//                                         <td>
//                                             {/* Render chat history */}
//                                             {user.chatHistory && user.chatHistory.length > 0 ? (
//                                                 <ul>
//                                                     {user.chatHistory.map((chat, i) => (
//                                                         <li key={i}>
//                                                             <strong>Image Name:</strong> {chat.imageName} <br />
//                                                             <strong>Upload Date:</strong> {new Date(chat.uploadDate).toLocaleString()} <br />
//                                                             <strong>Chat Prompts:</strong>
//                                                             <ul>
//                                                                 {chat.allChat.map((msg, j) => (
//                                                                     <li key={j}>
//                                                                         <strong>Prompt:</strong> {msg.prompt}
//                                                                     </li>
//                                                                 ))}
//                                                             </ul>
//                                                         </li>
//                                                     ))}
//                                                 </ul>
//                                             ) : (
//                                                 <span>No chat history available</span>
//                                             )}
//                                         </td>
//                                     </tr>
//                                 </React.Fragment>
//                             ))}
//                     </tbody>
//                 </table>
//             </div>

//             <div>
//                 <h1>Organization List</h1>
//                 <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
//                     <thead>
//                         <tr>
//                             <th>Name</th>
//                             <th>Email</th>
//                             <th>Organization Name</th>
//                             <th>Image Data</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {users
//                             .filter((user) => user.role === "medicalStaff") // Only display medical staff/organizations
//                             .map((user, index) => (
//                                 <React.Fragment key={index}>
//                                     <tr>
//                                         <td>{user.name}</td>
//                                         <td>{user.email}</td>
//                                         <td>{user.organizationName || "N/A"}</td>
//                                         <td>
//                                             {/* Render image data */}
//                                             {user.imageData && user.imageData.length > 0 ? (
//                                                 <ul>
//                                                     {user.imageData.map((image, i) => (
//                                                         <li key={i}>
//                                                             <strong>Image Name:</strong> {image.imageName} <br />
//                                                             <strong>Upload Date:</strong> {new Date(image.uploadDate).toLocaleString()} <br />
//                                                             <strong>Organization Name:</strong> {image.organizationName} <br />
//                                                             <strong>Image Path:</strong> <a href={`http://localhost:5001/${image.imagePath}`} target="_blank" rel="noopener noreferrer">View Image</a>
//                                                         </li>
//                                                     ))}
//                                                 </ul>
//                                             ) : (
//                                                 <span>No images uploaded</span>
//                                             )}
//                                         </td>
//                                     </tr>
//                                 </React.Fragment>
//                             ))}
//                     </tbody>
//                 </table>
//             </div>
//         </>
//     );
// };

// export default Admin;




import React, { useEffect, useState } from "react";
import axios from "axios";
import './Admin.css'

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null); // State for the user being edited
  const [updatedUserData, setUpdatedUserData] = useState({
    name: '',
    email: '',
    patientId: '',
    organizationName: '',
    imageData: [],
    chatHistory: [],
  }); // State for updated user data

  // Fetching users from the server
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/patients");
        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching data");
        console.error(err);
      }
    };

    fetchUsers();
  }, []);

  // Handle form input change for updating user details
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission to update user
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedUser = await axios.put(`http://localhost:5001/api/users/${editingUser._id}`, updatedUserData);
      // After updating, refresh the user list
      const updatedUsers = users.map((user) =>
        user._id === updatedUser.data._id ? updatedUser.data : user
      );
      setUsers(updatedUsers);
      setEditingUser(null); // Close the edit form
      setUpdatedUserData({});
    } catch (err) {
      console.error("Error updating user", err);
      setError("Error updating user");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      {/* User List */}
      <div>
        <h1>Patients List</h1>
        <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Patient ID</th>
              <th>Image Data</th>
              <th>Chat History</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users
              .filter((user) => user.role === "patient")
              .map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.patientId}</td>
                  <td>
                    {user.imageData && user.imageData.length > 0 ? (
                      <ul>
                        {user.imageData.map((image, i) => (
                          <li key={i}>
                            <strong>Image Name:</strong> {image.imageName} <br />
                            <strong>Upload Date:</strong> {new Date(image.uploadDate).toLocaleString()} <br />
                            <strong>Organization Name:</strong> {image.organizationName} <br />
                            <strong>Image Path:</strong> <a href={`http://localhost:5001/${image.imagePath}`} target="_blank" rel="noopener noreferrer">View Image</a>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span>No images uploaded</span>
                    )}
                  </td>
                  <td>
                    {user.chatHistory && user.chatHistory.length > 0 ? (
                      <ul>
                        {user.chatHistory.map((chat, i) => (
                          <li key={i}>
                            <strong>Image Name:</strong> {chat.imageName} <br />
                            <strong>Upload Date:</strong> {new Date(chat.uploadDate).toLocaleString()} <br />
                            <strong>Chat Prompts:</strong>
                            <ul>
                              {chat.allChat.map((msg, j) => (
                                <li key={j}>
                                  <strong>Prompt:</strong> {msg.prompt}
                                </li>
                              ))}
                            </ul>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span>No chat history available</span>
                    )}
                  </td>
                  <td>
                    <button onClick={() => setEditingUser(user)}>Update</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Edit Form for Updating User */}
      {editingUser && (
        <div>
          <h2>Edit User Details</h2>
          <form onSubmit={handleUpdateSubmit}>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={updatedUserData.name || editingUser.name}
              onChange={handleInputChange}
            />
            <br />
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={updatedUserData.email || editingUser.email}
              onChange={handleInputChange}
            />
            <br />
            <label>Patient ID:</label>
            <input
              type="text"
              name="patientId"
              value={updatedUserData.patientId || editingUser.patientId}
              onChange={handleInputChange}
            />
            <br />
            <label>Organization Name:</label>
            <input
              type="text"
              name="organizationName"
              value={updatedUserData.organizationName || editingUser.organizationName}
              onChange={handleInputChange}
            />
            <br />
            {/* Add fields for imageData or chatHistory if needed */}
            <button type="submit">Update</button>
            <button type="button" onClick={() => setEditingUser(null)}>Cancel</button>
          </form>
        </div>
      )}
    </>
  );
};

export default Admin;
