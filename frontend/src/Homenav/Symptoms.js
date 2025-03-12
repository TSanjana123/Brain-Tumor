import React from 'react';
import './Symptoms.css'; // Import CSS file

function Symptoms() {
  return (
    <div className="signs-symptoms-page">
      <header className="page-header">
        {/* Navigation menu is removed */}
      </header>

      <section className="hero-section">
        <h1 className="hero-title">Signs & Symptoms</h1>
        {/* Background image will be handled in CSS */}
      </section>

      <main className="main-content">
        <section className="intro-section">
          <p>
            When brain tumors are very small, some people may not experience
            any symptoms or the symptoms are so minimal they don't notice
            them.
          </p>
          <p>
            As brain tumors grow, signs and symptoms can vary and largely
            depend on the tumor's location within the brain, its size, and how
            quickly it grows.
          </p>
          <p>
            Some of the more common signs and symptoms caused by brain tumors
            include the following:
          </p>
        </section>

        <section className="symptoms-list-section">
          <ul className="symptoms-list">
            <li>Headaches</li>
            <li>Seizures</li>
            <li>Difficulty thinking, speaking, or finding words</li>
            <li>Changes in personality or behavior</li>
            <li>Weakness, numbness, or loss of movement in one part or one side of the body</li>
            <li>Difficulty with balance or dizziness</li>
            <li>Sensory changes like difficulty hearing, difficulty seeing, or loss of smell</li>
            <li>Memory loss</li>
            <li>Confusion in everyday matters or disorientation</li>
            <li>Unexplained nausea or vomiting</li>
            <li>Hearing, difficulty seeing, or loss of smell</li>
            <li>Memory loss</li>
            <li>Confusion in everyday matters or disorientation</li>
            <li>Unexplained nausea or vomiting</li>
            <li>Fatigue or muscle weakness</li>
            <li>Other possible signs and symptoms can include abnormal eye movements, trouble swallowing, trouble walking, weakness or drooping of one side of the face, loss of appetite or weight loss, and slurred speech.</li>
          </ul>
        </section>

        <section className="call-to-action-section">
          <p>
            If you are experiencing any new, persistent, or concerning symptoms
            or you suspect you may have a brain tumor, please talk to your
            healthcare provider as soon as possible.
          </p>
        </section>

        <section className="areas-of-the-brain-section">
          <h2>Areas of the Brain</h2>
          <p>
            Some people with brain tumors experience general symptoms like
            headaches, seizures, and fatigue. Other symptoms can be more specific
            to the location of the tumor in the brain.
          </p>
          <p>
            Brain tumors can damage healthy tissue, press on healthy brain
            tissue, or cause pressure in the brain and negatively impact certain
            functions.
          </p>
          <p>
            If you are diagnosed with a brain tumor, ask your provider where it
            is located in the brain to better prepare for possible symptoms and
            safety concerns.
          </p>
        </section>
      </main>
    </div>
  );
}

export default Symptoms;