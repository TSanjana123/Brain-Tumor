

// // export default Admin;




// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import './Admin.css'; // Make sure you have this CSS file or remove the import

// const Admin = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [editingImageData, setEditingImageData] = useState(null); // Stores { ...image, userId: user._id }
//   const [newImagePath, setNewImagePath] = useState(""); // New image path input

//   // Fetch users from server
//   useEffect(() => {
//     const fetchUsers = async () => {
//       setLoading(true); // Set loading true at the start
//       setError(null); // Clear previous errors
//       try {
//         const response = await axios.get("http://localhost:5001/api/patients");
//         setUsers(response.data);
//       } catch (err) {
//         console.error("Error fetching data:", err);
//         setError(err.response?.data?.message || "Error fetching patient data. Please check the console.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []); // Empty dependency array means run once on mount

//   // Handle the image path input change
//   const handleImagePathChange = (e) => {
//     setNewImagePath(e.target.value);
//   };

//   // --- UPDATED: Handle form submission to update only the image path ---
//   const handleUpdateImagePath = async (e) => {
//     e.preventDefault();

//     if (!newImagePath.trim()) { // Use trim() to avoid whitespace-only paths
//       return alert("Please provide a new image path.");
//     }
//     if (!editingImageData || !editingImageData.userId || !editingImageData._id) {
//       console.error("Editing image data is missing required IDs:", editingImageData);
//       setError("Cannot update image path: Missing required information.");
//       return;
//     }

//     const { userId, _id: imageId } = editingImageData; // Extract IDs

//     try {
//       // Call the new dedicated backend endpoint
//       const response = await axios.put(
//         `http://localhost:5001/api/patients/${userId}/images/${imageId}/path`, // <<< CHANGED ENDPOINT
//         { newImagePath: newImagePath.trim() } // <<< CHANGED PAYLOAD: Send only the new path
//       );

//       // Assuming the backend returns the fully updated user document
//       const updatedUserFromServer = response.data;

//       // Update the local state: replace the old user data with the updated one
//       setUsers(prevUsers =>
//         prevUsers.map(user =>
//           user._id === updatedUserFromServer._id ? updatedUserFromServer : user
//         )
//       );

//       // Reset form and state
//       setEditingImageData(null);
//       setNewImagePath("");
//       setError(null); // Clear any previous errors
//       alert("Image path updated successfully!"); // Feedback

//     } catch (err) {
//       console.error("Error updating image path:", err);
//       setError(err.response?.data?.message || "Error updating image path. Please check the console.");
//     }
//   };
//   // --- END OF UPDATE ---

//   if (loading) {
//     return (
//       <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
//         <div className="spinner-border text-primary" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//      // Display error prominently, maybe allow retrying or show details
//      return (
//         <div className="alert alert-danger m-3" role="alert">
//             <h4>Error</h4>
//             <p>{error}</p>
//             {/* Optionally add a retry button */}
//             {/* <button onClick={fetchUsers} className="btn btn-warning btn-sm">Retry Fetch</button> */}
//         </div>
//      );
//   }

//   // Filter patients only after loading is complete and no error
//   const patientUsers = users.filter((user) => user.role === "patient");

//   return (
//     <div className="container mt-4"> {/* Use a container for better layout */}
//       {/* User List */}
//       <div>
//         <h1>Patients List</h1>
//         {patientUsers.length === 0 ? (
//              <p>No patient users found.</p>
//         ) : (
//         <div className="table-responsive"> {/* Make table responsive */}
//           <table className="table table-striped table-bordered table-hover"> {/* Bootstrap table classes */}
//             <thead className="table-dark"> {/* Darker header */}
//               <tr>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Patient ID</th>
//                 <th>Image Data</th>
//                 {/* <th>Actions</th> */}
//               </tr>
//             </thead>
//             <tbody>
//               {patientUsers.map((user) => (
//                 <tr key={user._id}>
//                   <td>{user.name}</td>
//                   <td>{user.email}</td>
//                   <td>{user.patientId}</td>
//                   <td>
//                     {user.imageData && user.imageData.length > 0 ? (
//                       <ul className="list-unstyled"> {/* Use list-unstyled for less default styling */}
//                         {user.imageData.map((image) => ( // Changed index `i` to `image._id` for key if available and unique
//                           <li key={image._id || image.imagePath} className="mb-3 p-2 border rounded"> {/* Add some spacing and border */}
//                             <strong>Image Name:</strong> {image.imageName} <br />
//                             <strong>Upload Date:</strong> {new Date(image.uploadDate).toLocaleString()} <br />
//                             <strong>Organization Name:</strong> {image.organizationName || 'N/A'} <br />
//                             <strong>Image Path:</strong> {image.imagePath} <br/>
//                             <a href={`http://localhost:5001/${image.imagePath.replace(/\\/g, '/')}`} // Ensure forward slashes for URL
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="btn btn-sm btn-info me-2 mt-1"> {/* Button styling */}
//                               View Image
//                             </a>
//                             {/* Ensure image._id exists before showing button */}
//                             {image._id && (
//                                 <button
//                                     onClick={() => setEditingImageData({ ...image, userId: user._id })}
//                                     className="btn btn-sm btn-warning mt-1"> {/* Button styling */}
//                                 Update Image Path
//                                 </button>
//                             )}
//                           </li>
//                         ))}
//                       </ul>
//                     ) : (
//                       <span>No images uploaded</span>
//                     )}
//                   </td>
//                   {/* <td></td> */}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//         )}
//       </div>

//       {/* Edit Form for Updating Image Path - Using Modal or separate component might be cleaner */}
//       {editingImageData && (
//         <div className="mt-4 p-3 border rounded bg-light"> {/* Style the form container */}
//           <h2>Update Image Path</h2>
//           <form onSubmit={handleUpdateImagePath}>
//             <div className="mb-3">
//               <label htmlFor="newImagePathInput" className="form-label">New Image Path:</label>
//               <input
//                 id="newImagePathInput"
//                 type="text"
//                 className="form-control" // Bootstrap form control class
//                 value={newImagePath}
//                 onChange={handleImagePathChange}
//                 placeholder="e.g., uploads/new_image_name.jpg"
//                 required // Make input required
//               />
//                <div className="form-text">
//                    Enter the new path relative to the server's static serving directory (e.g., 'uploads/filename.jpg').
//                </div>
//             </div>
//              {/* Optionally display the image being edited */}
//              {editingImageData.imageName && <p><small>Updating path for: {editingImageData.imageName}</small></p>}

//             <button type="submit" className="btn btn-primary me-2">Update Image Path</button>
//             <button type="button" className="btn btn-secondary" onClick={() => { setEditingImageData(null); setNewImagePath(""); setError(null); }}>
//               Cancel
//             </button>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Admin;



// Admin.js
import React, { useEffect, useState, useCallback } from "react"; // Added useCallback
import axios from "axios";
import './Admin.css'; // Make sure you have this CSS file or remove the import

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingImageData, setEditingImageData] = useState(null); // Stores { ...image, userId: user._id }
  const [newImagePath, setNewImagePath] = useState(""); // New image path input

  // --- Fetch users function ---
  const fetchUsers = useCallback(async () => { // Wrapped in useCallback
    setLoading(true); // Set loading true at the start
    setError(null); // Clear previous errors
    try {
      const response = await axios.get("http://localhost:5001/api/patients");
      setUsers(response.data);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err.response?.data?.message || "Error fetching patient data. Please check the console.");
    } finally {
      setLoading(false);
    }
  }, []); // No dependencies needed for fetchUsers itself

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]); // Add fetchUsers as dependency

  // Handle the image path input change
  const handleImagePathChange = (e) => {
    setNewImagePath(e.target.value);
  };

  // Handle form submission to update the image path
  const handleUpdateImagePath = async (e) => {
    e.preventDefault();

    if (!newImagePath.trim()) {
      alert("Please provide a new image path.");
      return;
    }
    if (!editingImageData || !editingImageData.userId || !editingImageData._id) {
      console.error("Editing image data is missing required IDs:", editingImageData);
      setError("Cannot update image path: Missing required information.");
      return;
    }

    const { userId, _id: imageId } = editingImageData;

    setLoading(true); // Indicate loading
    setError(null);

    try {
      const response = await axios.put(
        `http://localhost:5001/api/patients/${userId}/images/${imageId}/path`,
        { newImagePath: newImagePath.trim() }
      );

      const updatedUserFromServer = response.data;

      setUsers(prevUsers =>
        prevUsers.map(user =>
          user._id === updatedUserFromServer._id ? updatedUserFromServer : user
        )
      );

      setEditingImageData(null);
      setNewImagePath("");
      alert("Image path updated successfully!");

    } catch (err) {
      console.error("Error updating image path:", err);
      setError(err.response?.data?.message || "Error updating image path. Please check the console.");
       alert("Failed to update image path. See error message or console."); // User feedback on error
    } finally {
        setLoading(false); // Stop loading indicator
    }
  };

  // --- NEW: Handle image deletion ---
  const handleDeleteImage = async (userId, imageId) => {
    // Confirmation dialog
    if (!window.confirm("Are you sure you want to delete this image and its record? This action cannot be undone.")) {
        return; // Stop if user cancels
    }

    if (!userId || !imageId) {
        console.error("Missing userId or imageId for deletion.");
        setError("Cannot delete image: Missing required information.");
        return;
    }

    setLoading(true); // Indicate activity
    setError(null);

    try {
        // Call the new DELETE endpoint
        await axios.delete(`http://localhost:5001/api/patients/${userId}/images/${imageId}`);

        // Update the local state to remove the deleted image visually
        setUsers(prevUsers =>
            prevUsers.map(user => {
                if (user._id === userId) {
                    // Create a new user object with the imageData array filtered
                    const updatedImageData = user.imageData.filter(img => img._id !== imageId);
                    return { ...user, imageData: updatedImageData };
                }
                return user; // Return other users unchanged
            })
        );

        alert("Image deleted successfully!"); // Success feedback

        // If the deleted image was being edited, close the edit form
        if (editingImageData && editingImageData.userId === userId && editingImageData._id === imageId) {
            setEditingImageData(null);
            setNewImagePath("");
        }

    } catch (err) {
        console.error("Error deleting image:", err);
        setError(err.response?.data?.message || "Error deleting image. Please check the console.");
        alert("Failed to delete image. See error message or console."); // User feedback on error
    } finally {
        setLoading(false); // Stop loading indicator
    }
  };
  // --- END OF DELETE HANDLER ---


  // --- Render Logic ---

  if (loading && users.length === 0) { // Show initial loading spinner only
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error && users.length === 0) { // Show error prominently if initial fetch failed
     return (
        <div className="alert alert-danger m-3" role="alert">
            <h4>Error Loading Patient Data</h4>
            <p>{error}</p>
            <button onClick={fetchUsers} className="btn btn-warning btn-sm">Retry Fetch</button>
        </div>
     );
  }

  // Filter patients only after loading is complete and no fatal initial error
  const patientUsers = users.filter((user) => user.role === "patient");

  return (
    <div className="container mt-4">
      {/* Display general error messages (e.g., from update/delete failures) */}
      {error && (
         <div className="alert alert-danger alert-dismissible fade show m-3" role="alert">
             <strong>Error:</strong> {error}
             <button type="button" className="btn-close" onClick={() => setError(null)} aria-label="Close"></button>
         </div>
      )}

      {/* Loading indicator for updates/deletions */}
      {loading && users.length > 0 && (
        <div className="text-center my-2">
            <div className="spinner-border spinner-border-sm text-primary" role="status">
                 <span className="visually-hidden">Processing...</span>
            </div>
            <span className="ms-2">Processing...</span>
        </div>
      )}

      {/* User List */}
      <div>
        <h1>Patients List</h1>
        {patientUsers.length === 0 && !loading ? ( // Show only if not loading and no patients
             <p>No patient users found.</p>
        ) : (
        <div className="table-responsive">
          <table className="table table-striped table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Patient ID</th>
                <th>Image Data</th>
              </tr>
            </thead>
            <tbody>
              {patientUsers.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.patientId}</td>
                  <td>
                    {user.imageData && user.imageData.length > 0 ? (
                      <ul className="list-unstyled">
                        {user.imageData.map((image) => (
                          <li key={image._id || image.imagePath} className="mb-3 p-2 border rounded">
                            <strong>Image Name:</strong> {image.imageName} <br />
                            <strong>Upload Date:</strong> {new Date(image.uploadDate).toLocaleString()} <br />
                            <strong>Organization Name:</strong> {image.organizationName || 'N/A'} <br />
                            <strong>Image Path:</strong> {image.imagePath} <br/>
                            <a href={`http://localhost:5001/${image.imagePath.replace(/\\/g, '/')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-sm btn-info me-2 mt-1">
                              View Image
                            </a>
                            {/* Ensure image._id exists before showing action buttons */}
                            {image._id && (
                                <> {/* Use Fragment to group buttons */}
                                    <button
                                        onClick={() => setEditingImageData({ ...image, userId: user._id })}
                                        className="btn btn-sm btn-warning mt-1 me-2" // Added me-2 for spacing
                                        disabled={loading}> {/* Disable while processing */}
                                        Update Path
                                    </button>
                                    {/* --- DELETE BUTTON --- */}
                                    <button
                                        onClick={() => handleDeleteImage(user._id, image._id)}
                                        className="btn btn-sm btn-danger mt-1"
                                        disabled={loading}> {/* Disable while processing */}
                                        Delete Image
                                    </button>
                                    {/* --- END DELETE BUTTON --- */}
                                </>
                            )}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span>No images uploaded</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        )}
      </div>

      {/* Edit Form for Updating Image Path */}
      {editingImageData && (
        <div className="mt-4 p-3 border rounded bg-light">
          <h2>Update Image Path</h2>
          <form onSubmit={handleUpdateImagePath}>
            <div className="mb-3">
              <label htmlFor="newImagePathInput" className="form-label">New Image Path:</label>
              <input
                id="newImagePathInput"
                type="text"
                className="form-control"
                value={newImagePath}
                onChange={handleImagePathChange}
                placeholder="e.g., uploads/new_image_name.jpg"
                required
              />
               <div className="form-text">
                   Enter the new path relative to the server's static serving directory (e.g., 'uploads/filename.jpg').
               </div>
            </div>
             {editingImageData.imageName && <p><small>Updating path for: {editingImageData.imageName} (ID: {editingImageData._id})</small></p>}

            <button type="submit" className="btn btn-primary me-2" disabled={loading}>Update Image Path</button>
            <button type="button" className="btn btn-secondary" onClick={() => { setEditingImageData(null); setNewImagePath(""); setError(null); }} disabled={loading}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Admin;