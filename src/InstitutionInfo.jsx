import React, { useState } from 'react';
import './InstitutionInfo.css';

export default function InstitutionInfo() {
  const [fileName, setFileName] = useState('');
  const [manualOverride, setManualOverride] = useState(false);
  const [region, setRegion] = useState('');
  const [institution, setInstitution] = useState('');
  const [studyDetails, setStudyDetails] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      // You'd trigger OCR / extraction logic here.
    }
  };

  const regionOptions = ['Johannesburg', 'Cape Town', 'Pretoria'];
  const institutionOptions = {
    Johannesburg: ['Wits University', 'UJ', 'Boston College'],
    'Cape Town': ['UCT', 'CPUT', 'Stellenbosch University'],
    Pretoria: ['UP', 'TUT', 'UNISA']
  };

  return (
    <div className="institution-info-container">
      <h2>3. Institution Information</h2>
      <div className="form-group">
        <label>Upload Proof of Registration*</label>
        <input type="file" onChange={handleFileChange} accept="application/pdf,image/*" />
        {fileName && <p className="file-name">Uploaded: {fileName}</p>}
      </div>

      <div className="form-group checkbox">
        <label>
          <input
            type="checkbox"
            checked={manualOverride}
            onChange={(e) => setManualOverride(e.target.checked)}
          />
          Enable Manual Override
        </label>
      </div>

      {manualOverride && (
        <>
          <div className="form-group">
            <label>Select Region</label>
            <select value={region} onChange={(e) => setRegion(e.target.value)}>
              <option value="">-- Select Region --</option>
              {regionOptions.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Select Institution</label>
            <select
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
              disabled={!region}
            >
              <option value="">-- Select Institution --</option>
              {(institutionOptions[region] || []).map((inst) => (
                <option key={inst} value={inst}>{inst}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Field of Study / Degree</label>
            <input
              type="text"
              value={studyDetails}
              onChange={(e) => setStudyDetails(e.target.value)}
              placeholder="e.g., BSc Computer Science"
            />
          </div>
        </>
      )}
    </div>
  );
}
