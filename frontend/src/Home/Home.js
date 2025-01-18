// // // pages/Home.js
// // import React from 'react';

// // function Home() {
// //   return (
// //     <div>
// //       <h1>Brain Tumor Prediction</h1>
// //       <p>Explore our website for more information.</p>
// //     </div>
// //   );
// // }

// // export default Home;











// // pages/Home.js
// import React from 'react';
// import './Home.css'; // Create and import the new CSS file for the Home page

// function Home() {
//   return (
//     <div className="home-container">
//       <h1>Brain Tumor Prediction</h1>
//       <p>Explore our website for more information about our services and tools.</p>
      
//       <div className="card-container" >
//         <div className="card">
//           <img src="https://d2jx2rerrg6sh3.cloudfront.net/image-handler/ts/20200107063435/ri/1000/picture/2020/1/shutterstock_565415560.jpg" alt="Card Image 1" className="card-image" />
//           <div className="card-body">
//             <h3 className="card-title">AI-based Prediction</h3>
//             <p className="card-description">Our AI tool helps in predicting brain tumor severity with high accuracy.</p>
//           </div>
//         </div>

//         <div className="card">
//           <img src="https://d2jx2rerrg6sh3.cloudfront.net/image-handler/ts/20200107063435/ri/1000/picture/2020/1/shutterstock_565415560.jpg" alt="Card Image 2" className="card-image" />
//           <div className="card-body">
//             <h3 className="card-title">Early Diagnosis</h3>
//             <p className="card-description">Learn how early diagnosis can improve patient outcomes significantly.</p>
//           </div>
//         </div>

//         <div className="card">
//           <img src="https://d2jx2rerrg6sh3.cloudfront.net/image-handler/ts/20200107063435/ri/1000/picture/2020/1/shutterstock_565415560.jpg" alt="Card Image 3" className="card-image" />
//           <div className="card-body">
//             <h3 className="card-title">Research and Development</h3>
//             <p className="card-description">We focus on continuous research to improve prediction accuracy and treatment options.</p>
//           </div>
//         </div>

//         <div className="card">
//           <img src="https://d2jx2rerrg6sh3.cloudfront.net/image-handler/ts/20200107063435/ri/1000/picture/2020/1/shutterstock_565415560.jpg" alt="Card Image 3" className="card-image" />
//           <div className="card-body">
//             <h3 className="card-title">Research and Development</h3>
//             <p className="card-description">We focus on continuous research to improve prediction accuracy and treatment options.</p>
//           </div>
//         </div>

        
        
//       </div>
//       <hr/>
//       <h1>Brain Tumor Prediction</h1>
//       <div className="image-container">
//         <img 
//           src="https://www.mdpi.com/sensors/sensors-21-02222/article_deploy/html/images/sensors-21-02222-g002.png" 
//           alt="Brain Tumor Research" 
//           className="home-image" 
//         />
//       </div>
      
      
//     </div>
//   );
// }

// export default Home;


import React from 'react';
import './Home.css'; // Create and import the new CSS file for the Home page

function Home() {
  return (
    <div className="home-container">
      <h1>Brain Tumor Prediction</h1>
      <p>Explore our website for more information about our services and tools.</p>
      
      <div className="card-container">
        <div className="card">
          <img src="https://d2jx2rerrg6sh3.cloudfront.net/image-handler/ts/20200107063435/ri/1000/picture/2020/1/shutterstock_565415560.jpg" alt="Card Image 1" className="card-image" />
          <div className="card-body">
            <h3 className="card-title">AI-based Prediction</h3>
            <p className="card-description">Our AI tool helps in predicting brain tumor severity with high accuracy.</p>
          </div>
        </div>

        <div className="card">
          <img src="https://d2jx2rerrg6sh3.cloudfront.net/image-handler/ts/20200107063435/ri/1000/picture/2020/1/shutterstock_565415560.jpg" alt="Card Image 2" className="card-image" />
          <div className="card-body">
            <h3 className="card-title">Early Diagnosis</h3>
            <p className="card-description">Learn how early diagnosis can improve patient outcomes significantly.</p>
          </div>
        </div>

        <div className="card">
          <img src="https://d2jx2rerrg6sh3.cloudfront.net/image-handler/ts/20200107063435/ri/1000/picture/2020/1/shutterstock_565415560.jpg" alt="Card Image 3" className="card-image" />
          <div className="card-body">
            <h3 className="card-title">Research and Development</h3>
            <p className="card-description">We focus on continuous research to improve prediction accuracy and treatment options.</p>
          </div>
        </div>

        <div className="card">
          <img src="https://d2jx2rerrg6sh3.cloudfront.net/image-handler/ts/20200107063435/ri/1000/picture/2020/1/shutterstock_565415560.jpg" alt="Card Image 4" className="card-image" />
          <div className="card-body">
            <h3 className="card-title">Research and Development</h3>
            <p className="card-description">We focus on continuous research to improve prediction accuracy and treatment options.</p>
          </div>
        </div>
      </div>

      <hr />
      
      <h1>Brain Tumor Prediction</h1>
      <div className="image-container">
        <img 
          src="https://www.mdpi.com/sensors/sensors-21-02222/article_deploy/html/images/sensors-21-02222-g002.png" 
          alt="Brain Tumor Research" 
          className="home-image" 
        />
      </div>

      {/* Contact Details and Useful Links Section */}
      <div className="contact-section">
        <div className="contact-details">
          <h2>Contact Us</h2>
          <p><strong>Email:</strong> meenakshibende@gmail.com</p>
          <p><strong>Phone:</strong> +19 812 80 1234</p>
          <p><strong>Address:</strong>9/898/9097 pune </p>
        </div>

        <div className="useful-links">
          <h3>Useful Links</h3>
          <ul>
          
            <li><a href="/services">Our Services</a></li>
            <li><a href="/research">Research and Development</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;
