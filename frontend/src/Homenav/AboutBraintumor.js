import React from 'react';
import './AboutBraintumor.css'; // You can create a CSS file for this page

function AboutBraintumor() {
  return (
    <div className="about-brain-tumors-page">
      <h1 className="page-title">About Brain Tumors</h1>

      <section className="what-is-brain-tumor">
        <h2>What is a Brain Tumor?</h2>
        <p>
          A brain tumor is an abnormal growth of cells within the brain or the central spinal canal. These tumors can disrupt normal brain function, causing a range of symptoms and health problems. It's important to understand that not all brain tumors are cancerous (malignant); some are benign (non-cancerous).
        </p>
      </section>

      <section className="types-of-brain-tumors">
        <h2>Types of Brain Tumors</h2>
        <p>
          Brain tumors are classified based on the type of cells involved, their location in the brain, and their growth rate. There are many different types, but some of the most common include:
        </p>
        <ul>
          <li>
            <h3>Gliomas</h3>
            <p>
              Gliomas begin in the glial cells, which are the supportive tissue of the brain. Types of gliomas include:
            </p>
            <ul>
              <li>
                <strong>Astrocytomas:</strong> Arise from astrocytes.
              </li>
              <li>
                <strong>Oligodendrogliomas:</strong> Develop from oligodendrocytes.
              </li>
              <li>
                <strong>Glioblastomas:</strong> A fast-growing and aggressive type of astrocytoma.
              </li>
            </ul>
          </li>
          <li>
            <h3>Meningiomas</h3>
            <p>
              Meningiomas develop from the meninges, the membranes that surround the brain and spinal cord. They are usually benign but can cause problems due to their location.
            </p>
          </li>
          <li>
            <h3>Pituitary Tumors</h3>
            <p>
              These tumors occur in the pituitary gland, a small gland at the base of the brain that controls hormones.
            </p>
          </li>
          <li>
            <h3>Acoustic Neuromas (Schwannomas)</h3>
            <p>
              These tumors develop on the vestibulocochlear nerve, which leads from the inner ear to the brain. They can affect hearing and balance.
            </p>
          </li>
          <li>
            <h3>Medulloblastomas</h3>
            <p>
              These are cancerous tumors that occur most often in children and develop in the cerebellum at the back of the brain.
            </p>
          </li>
        </ul>
        <p>
          It's crucial to note that this is not an exhaustive list. Each type of brain tumor has its own characteristics, treatment options, and prognosis. Accurate diagnosis and classification are essential for effective management.
        </p>
      </section>

      <section className="important-note">
        <h2>Important Note</h2>
        <p>
          The information provided here is intended for general knowledge and informational purposes only, and does not constitute medical advice. It is essential to consult with a qualified healthcare professional for any health concerns or before making any decisions related to your health or treatment.
        </p>
      </section>
    </div>
  );
}

export default AboutBraintumor;
