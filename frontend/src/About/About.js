import React from "react";
import "./About.css";  // Import the CSS file for styling

function About() {
  return (
    <div className="container">
      <h1 className="title">About Model</h1>
      
      <h2 className="subtitle">Model Overview</h2>
      <p className="description">
        DenseNet is a type of convolutional neural network that connects each layer to every other layer in a feed-forward fashion. This allows for improved gradient flow and more efficient parameter usage.
      </p>
      
      <h2 className="subtitle">Architecture</h2>
      
      <div className="section">
        <h3 className="section-title">1. Initial Convolution Block</h3>
        <ul className="list">
          <li><b>Conv2d:</b> Input channels: 3, Output channels: 64, Kernel size: 7x7, Stride: 2</li>
          <li><b>BatchNorm2d:</b> Normalizes the output</li>
          <li><b>ReLU:</b> Activation function</li>
          <li><b>MaxPool2d:</b> Kernel size: 3, Stride: 2</li>
        </ul>
      </div>
      
      <div className="section">
        <h3 className="section-title">2. Dense Blocks</h3>
        <p>Each dense block contains multiple dense layers. Each layer is structured as follows:</p>
        <ul className="list">
          <li><b>BatchNorm2d:</b> Normalizes the input</li>
          <li><b>ReLU:</b> Activation function</li>
          <li><b>Conv2d (1x1):</b> Reduces the number of channels</li>
          <li><b>BatchNorm2d:</b> Normalizes the output</li>
          <li><b>ReLU:</b> Activation function again</li>
          <li><b>Conv2d (3x3):</b> Main convolutional layer</li>
        </ul>
      </div>

      <div className="grid-container">
        <div className="grid-item">
          <h4>Dense Block 1:</h4>
          <p>Dense layers: 6, Output channels: 256</p>
        </div>
        <div className="grid-item">
          <h4>Transition Layer 1:</h4>
          <p>Output channels: 128</p>
        </div>
        <div className="grid-item">
          <h4>Dense Block 2:</h4>
          <p>Dense layers: 12, Output channels: 512</p>
        </div>
        <div className="grid-item">
          <h4>Transition Layer 2:</h4>
          <p>Output channels: 256</p>
        </div>
        <div className="grid-item">
          <h4>Dense Block 3:</h4>
          <p>Dense layers: 24, Output channels: 1024</p>
        </div>
        <div className="grid-item">
          <h4>Transition Layer 3:</h4>
          <p>Output channels: 512</p>
        </div>
        <div className="grid-item">
          <h4>Dense Block 4:</h4>
          <p>Dense layers: 16, Output channels: 1024</p>
        </div>
      </div>
      
      <div className="section">
        <h3 className="section-title">3. Final Layers</h3>
        <ul className="list">
          <li><b>BatchNorm2d:</b> Normalizes the output</li>
          <li><b>Linear:</b> Fully connected layer, Input features: 1920, Output features: 40</li>
        </ul>
      </div>
      
      <h2 className="subtitle">Key Benefits</h2>
      <ul className="list">
        <li>Improved gradient flow through dense connections</li>
        <li>Efficient use of parameters</li>
        <li>Ability to combine features from multiple layers</li>
      </ul>
    </div>
  );
}

export default About;
