import React, { useEffect, useState } from "react";
import axios from "axios";
import './Admin.css';
const Admin = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/patients");
        setUsers(response.data); // Set users data in state
        setLoading(false);
      } catch (err) {
        setError("Error fetching data");
        console.error(err);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
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
            </tr>
          </thead>
          <tbody>
            {users
              .filter((user) => user.role === "patient")
              .map((user, index) => (
                <tr key={index}>
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
                            <strong>Image Path:</strong>{" "}
                            <a href={`http://localhost:5001/${image.imagePath}`} target="_blank" rel="noopener noreferrer">
                              View Image
                            </a>
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
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Admin;
