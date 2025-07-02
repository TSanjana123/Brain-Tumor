



import React from 'react';
import './About.css';

const About = () => {
    return (
        <>
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

            
        </>
    );
};

export default About;
