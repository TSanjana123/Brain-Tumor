import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import "./Symptoms.css"; // Import the CSS file

const Symptoms = () => {
  const symptoms = [
    {
      title: "Headaches",
      desc: "Frequent headaches that worsen over time, especially in the morning.",
      icon: "💥",
    },
    {
      title: "Nausea & Vomiting",
      desc: "Unexplained nausea, morning sickness, or persistent vomiting.",
      icon: "🤢",
    },
    {
      title: "Memory Loss",
      desc: "Difficulty remembering things, confusion, or cognitive impairment.",
      icon: "🧠",
    },
    {
      title: "Seizures",
      desc: "Involuntary movements, muscle spasms, or sudden loss of consciousness.",
      icon: "⚡",
    },
    {
      title: "Vision & Hearing Problems",
      desc: "Blurred vision, double vision, hearing impairment, or ringing in the ears.",
      icon: "👁️",
    },
    {
      title: "Personality Changes",
      desc: "Mood swings, confusion, or behavioral changes.",
      icon: "🤯",
    },
    {
      title: "Dizziness & Balance Issues",
      desc: "Trouble walking, loss of coordination, or feeling unsteady.",
      icon: "⚖️",
    },
    {
      title: "Weakness or Numbness",
      desc: "Weakness, numbness, or tingling, usually in one side of the body.",
      icon: "🦵",
    }
  ];

  return (
    <div className="signs-symptoms-page">
      <section className="hero-section">
        <h1>Signs & Symptoms of Brain Tumor</h1>
        <p>Recognizing symptoms early can be crucial for effective treatment.</p>
      </section>
      <main className="main-content">
        <Container>
          <section className="symptoms-list-section">
            <Row>
              {symptoms.map((symptom, index) => (
                <div key={index} className="col-md-4 symptom-card">
                  <span className="icon">{symptom.icon}</span>
                  <h3>{symptom.title}</h3>
                  <p>{symptom.desc}</p>
                </div>
              ))}
            </Row>
          </section>
        </Container>
      </main>
    </div>
  );
};

export default Symptoms;
