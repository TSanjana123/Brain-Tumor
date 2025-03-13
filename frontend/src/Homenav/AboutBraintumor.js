import React from 'react';
import './AboutBraintumor.css';

function AboutBraintumor() {
  return (
    <div className="about-brain-tumors-page">
      <h1 className="page-title">About Brain Tumors</h1>

      <section className="tumor-categories">
        <h2>Brain Tumor Types by Imaging Categories</h2>
        <p>
          Brain tumors are often identified using MRI scans, specifically T1, T1C+, and T2 imaging. Below are descriptions of various tumor types and their characteristics:
        </p>
        <ul>
          <li>
            <h3>Glioblastoma</h3>
            <p>
              Glioblastoma is an aggressive brain tumor that forms from astrocytes. It often shows rapid growth and is usually diagnosed using T1 (tumor mass visibility), T1C+ (enhanced contrast imaging), and T2 (showing surrounding edema). Glioblastomas are the most common and aggressive primary brain tumors in adults, often requiring intensive treatment.
            </p>
          </li>
          <li>
            <h3>Granuloma</h3>
            <p>
              Granulomas are inflammatory masses often linked to infections like tuberculosis. They appear as well-defined masses in T1, T1C+, and T2 images, depending on inflammation levels. Granulomas are the body's defensive response to persistent infection or irritants, forming small nodules in affected tissues.
            </p>
          </li>
          <li>
            <h3>Medulloblastoma</h3>
            <p>
              A fast-growing cancerous tumor that commonly affects children. It originates in the cerebellum and is often detected in T1, T1C+, and T2 imaging with distinct patterns. Medulloblastomas tend to spread through cerebrospinal fluid pathways, making early diagnosis crucial for effective treatment.
            </p>
          </li>
          <li>
            <h3>Meningioma</h3>
            <p>
              Meningiomas develop in the membranes surrounding the brain and spinal cord. They are often benign and appear prominently in T1, T1C+, and T2 imaging. Although usually slow-growing, larger meningiomas can compress brain structures, causing neurological symptoms.
            </p>
          </li>
          <li>
            <h3>Neurocytoma</h3>
            <p>
              A rare tumor typically found near the brain's ventricles. Neurocytomas are often detected with clear mass visibility in T1, T1C+, and T2 scans. These tumors are generally benign but may occasionally recur after treatment, requiring ongoing monitoring.
            </p>
          </li>
          <li>
            <h3>Oligodendroglioma</h3>
            <p>
              These tumors arise from oligodendrocytes, appearing well-defined in T1, enhancing in T1C+, and showing edema patterns in T2 imaging. Oligodendrogliomas are known for their slow growth and better response to therapy compared to other gliomas.
            </p>
          </li>
          <li>
            <h3>Papilloma</h3>
            <p>
              Papillomas are rare tumors that develop in the choroid plexus, showing as soft tissue masses in T1, T1C+, and T2 imaging. These tumors are most common in children and infants, potentially causing excessive cerebrospinal fluid production.
            </p>
          </li>
          <li>
            <h3>Schwannoma</h3>
            <p>
              Schwannomas are benign tumors that develop on the nerves responsible for balance and hearing. These tumors appear in T1, T1C+, and T2 imaging based on their growth stage. Originating from Schwann cells, these tumors are typically slow-growing and treatable through surgery.
            </p>
          </li>
          <li>
            <h3>Tuberculoma</h3>
            <p>
              Tuberculomas are inflammatory lesions caused by tuberculosis infections. They are identified with enhanced clarity in T1, T1C+, and T2 imaging scans. Tuberculomas result from bacterial infection spreading to the brain, forming dense masses that may mimic tumors.
            </p>
          </li>
          <li>
            <h3>_NORMAL (T1 and T2)</h3>
            <p>
              Normal T1 and T2 images indicate healthy brain tissue with no abnormal growth, inflammation, or lesions. This ensures the absence of tumors or other neurological issues.
            </p>
          </li>
        </ul>
      </section>
    </div>
  );
}

export default AboutBraintumor;
