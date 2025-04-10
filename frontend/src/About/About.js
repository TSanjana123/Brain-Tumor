// import React from "react";
// import "./About.css";  // Import the CSS file for styling

// function About() {
//   return (
//     <div className="container">
//       <h1 className="title">About Model</h1>
      
//       <h2 className="subtitle">Model Overview</h2>
//       <p className="description">
//         DenseNet is a type of convolutional neural network that connects each layer to every other layer in a feed-forward fashion. This allows for improved gradient flow and more efficient parameter usage.
//       </p>
      
//       <h2 className="subtitle">Architecture</h2>
      
//       <div className="section">
//         <h3 className="section-title">1. Initial Convolution Block</h3>
//         <ul className="list">
//           <li><b>Conv2d:</b> Input channels: 3, Output channels: 64, Kernel size: 7x7, Stride: 2</li>
//           <li><b>BatchNorm2d:</b> Normalizes the output</li>
//           <li><b>ReLU:</b> Activation function</li>
//           <li><b>MaxPool2d:</b> Kernel size: 3, Stride: 2</li>
//         </ul>
//       </div>
      
//       <div className="section">
//         <h3 className="section-title">2. Dense Blocks</h3>
//         <p>Each dense block contains multiple dense layers. Each layer is structured as follows:</p>
//         <ul className="list">
//           <li><b>BatchNorm2d:</b> Normalizes the input</li>
//           <li><b>ReLU:</b> Activation function</li>
//           <li><b>Conv2d (1x1):</b> Reduces the number of channels</li>
//           <li><b>BatchNorm2d:</b> Normalizes the output</li>
//           <li><b>ReLU:</b> Activation function again</li>
//           <li><b>Conv2d (3x3):</b> Main convolutional layer</li>
//         </ul>
//       </div>

//       <div className="grid-container">
//         <div className="grid-item">
//           <h4>Dense Block 1:</h4>
//           <p>Dense layers: 6, Output channels: 256</p>
//         </div>
//         <div className="grid-item">
//           <h4>Transition Layer 1:</h4>
//           <p>Output channels: 128</p>
//         </div>
//         <div className="grid-item">
//           <h4>Dense Block 2:</h4>
//           <p>Dense layers: 12, Output channels: 512</p>
//         </div>
//         <div className="grid-item">
//           <h4>Transition Layer 2:</h4>
//           <p>Output channels: 256</p>
//         </div>
//         <div className="grid-item">
//           <h4>Dense Block 3:</h4>
//           <p>Dense layers: 24, Output channels: 1024</p>
//         </div>
//         <div className="grid-item">
//           <h4>Transition Layer 3:</h4>
//           <p>Output channels: 512</p>
//         </div>
//         <div className="grid-item">
//           <h4>Dense Block 4:</h4>
//           <p>Dense layers: 16, Output channels: 1024</p>
//         </div>
//       </div>
      
//       <div className="section">
//         <h3 className="section-title">3. Final Layers</h3>
//         <ul className="list">
//           <li><b>BatchNorm2d:</b> Normalizes the output</li>
//           <li><b>Linear:</b> Fully connected layer, Input features: 1920, Output features: 40</li>
//         </ul>
//       </div>
      
//       <h2 className="subtitle">Key Benefits</h2>
//       <ul className="list">
//         <li>Improved gradient flow through dense connections</li>
//         <li>Efficient use of parameters</li>
//         <li>Ability to combine features from multiple layers</li>
//       </ul>
//     </div>
//   );
// }

// export default About;







// import React from "react";
// import "./About.css";  // Import the CSS file for styling

// function About() {
//   return (
//     <div className="container">
//       <h1 className="title">About Brain Tumor Prediction</h1>
     
//       <p>Explore our website for more information about our services and tools.</p>
      
//       <div className="card-container">
//         <div className="card">
//           <img src="https://d2jx2rerrg6sh3.cloudfront.net/image-handler/ts/20200107063435/ri/1000/picture/2020/1/shutterstock_565415560.jpg" alt="Card Image 1" className="card-image" />
//           <div className="card-body">
//             <h3 className="card-title">AI-based Prediction</h3>
//             <p className="card-description">Our AI tool helps in predicting brain tumor severity with high accuracy.Our AI tool helps in</p>
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
//             <h3 className="card-title">Research Development</h3>
//             <p className="card-description">We focus on continuous research to improve prediction accuracy and treatment options.</p>
//           </div>
//         </div>

       
//       </div>


      
      // {/* <h2 className="subtitle">Model Overview</h2>
      // <p className="description">
      //   DenseNet is a type of convolutional neural network that connects each layer to every other layer in a feed-forward fashion. This allows for improved gradient flow and more efficient parameter usage.
      // </p>
      
      // <h2 className="subtitle">Architecture</h2> */}
      
      // {/* <div className="section">
      //   <h3 className="section-title">1. Initial Convolution Block</h3>
      //   <ul className="list">
      //     <li><b>Conv2d:</b> Input channels: 3, Output channels: 64, Kernel size: 7x7, Stride: 2</li>
      //     <li><b>BatchNorm2d:</b> Normalizes the output</li>
      //     <li><b>ReLU:</b> Activation function</li>
      //     <li><b>MaxPool2d:</b> Kernel size: 3, Stride: 2</li>
      //   </ul>
      // </div> */}
      
      // {/* <div className="section">
      //   <h3 className="section-title">2. Dense Blocks</h3>
      //   <p>Each dense block contains multiple dense layers. Each layer is structured as follows:</p>
      //   <ul className="list">
      //     <li><b>BatchNorm2d:</b> Normalizes the input</li>
      //     <li><b>ReLU:</b> Activation function</li>
      //     <li><b>Conv2d (1x1):</b> Reduces the number of channels</li>
      //     <li><b>BatchNorm2d:</b> Normalizes the output</li>
      //     <li><b>ReLU:</b> Activation function again</li>
      //     <li><b>Conv2d (3x3):</b> Main convolutional layer</li>
      //   </ul>
      // </div> */}

      // {/* <div className="grid-container">
      //   <div className="grid-item">
      //     <h4>Dense Block 1:</h4>
      //     <p>Dense layers: 6, Output channels: 256</p>
      //   </div>
      //   <div className="grid-item">
      //     <h4>Transition Layer 1:</h4>
      //     <p>Output channels: 128</p>
      //   </div>
      //   <div className="grid-item">
      //     <h4>Dense Block 2:</h4>
      //     <p>Dense layers: 12, Output channels: 512</p>
      //   </div>
      //   <div className="grid-item">
      //     <h4>Transition Layer 2:</h4>
      //     <p>Output channels: 256</p>
      //   </div>
      //   <div className="grid-item">
      //     <h4>Dense Block 3:</h4>
      //     <p>Dense layers: 24, Output channels: 1024</p>
      //   </div>
      //   <div className="grid-item">
      //     <h4>Transition Layer 3:</h4>
      //     <p>Output channels: 512</p>
      //   </div>
      //   <div className="grid-item">
      //     <h4>Dense Block 4:</h4>
      //     <p>Dense layers: 16, Output channels: 1024</p>
      //   </div>
      // </div> */}
      
      // {/* <div className="section">
      //   <h3 className="section-title">3. Final Layers</h3>
      //   <ul className="list">
      //     <li><b>BatchNorm2d:</b> Normalizes the output</li>
      //     <li><b>Linear:</b> Fully connected layer, Input features: 1920, Output features: 40</li>
      //   </ul>
      // </div> */}
      
      // {/* <h2 className="subtitle">Key Benefits</h2>
      // <ul className="list">
      //   <li>Improved gradient flow through dense connections</li>
      //   <li>Efficient use of parameters</li>
      //   <li>Ability to combine features from multiple layers</li>
      // </ul> */}



      import React from 'react';
      import './About.css';
      
      const About = () => {
          return (
              <div className="home">
                  <div className="hero">
                      <div className="hero-content">
                          <h1>Empowering Early Detection with AI Precision</h1>
                          <p>Detect brain tumors early with our fast, secure, and AI-powered solution. Your health matters, and we're here to help.</p>
                         
                      </div>
                  </div>
      
                  <div className="container">
                      <h2>Why Choose Our System?</h2>
                      <div className="features">
                          <div className="feature-box">
                              <h3>🧠 Accurate Detection</h3>
                              <p>Our AI model ensures precise detection for better diagnosis and treatment planning.</p>
                          </div>
                          <div className="feature-box">
                              <h3>⚡ Instant Results</h3>
                              <p>Upload your MRI scan and receive insights in minutes, saving valuable time.</p>
                          </div>
                          <div className="feature-box">
                              <h3>🔒 Secure & Private</h3>
                              <p>Your medical data is encrypted and confidential, ensuring your privacy is protected.</p>
                          </div>
                          <div className="feature-box">
                              <h3>🤖 AI Chatbot Support</h3>
                              <p>Our chatbot guides you through the process and answers your questions instantly.</p>
                          </div>
                      </div>
                  </div>
      
                  
              </div>
          );
      };
      
      export default About;
      