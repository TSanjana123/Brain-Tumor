// import React from "react";

// function Test() {
//     return (
//         <>
            
//         </>
//     );
// }

// export default Test;


import React, { useState } from "react";
import "./Test.css"; // Add this for custom styles

function Test() {
  const [selectedData, setSelectedData] = useState(null);

  const userData = {
    name: "John Doe",
    email: "johndoe@example.com",
    age: 29,
  };

  const userDetails = {
    address: "123 Main St, Springfield, USA",
    phone: "+1 (555) 123-4567",
    occupation: "Software Engineer",
  };

  const handleButtonClick = (type) => {
    if (type === "userData") {
      setSelectedData(userData);
    } else if (type === "userDetails") {
      setSelectedData(userDetails);
    }
  };

  return (
    <div className="main-content">
      <div className="side-navbar">
        <button onClick={() => handleButtonClick("userData")}>My data</button>
        <button onClick={() => handleButtonClick("userDetails")}>User Details</button>
      </div>

      <div className="content">
        {selectedData && (
          <div className="data-display">
            <h3>Selected Data:</h3>
            <pre>{JSON.stringify(selectedData, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default Test;
