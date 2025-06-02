import React, { useState } from 'react';
import './PersonalInfo.css';

const PersonalInformation = () => {
  const [idFile, setIdFile] = useState(null);
  const [name, setName] = useState('John Doe');
  const [gender, setGender] = useState('Male');
  const [verified, setVerified] = useState(false);
  const [manualOverride, setManualOverride] = useState(false);

  const handleUpload = (e) => {
    setIdFile(e.target.files[0]);
    // Mock verification
    setVerified(true);
  };

  const toggleOverride = () => setManualOverride(!manualOverride);

  return (
    <div className="personal-info-container">
      <h2>Step 2: Personal Information</h2>

      <div className="form-group">
        <label>Upload ID Document</label>
        <input type="file" accept="image/*,application/pdf" onChange={handleUpload} />
        {idFile && <p className="file-name">Uploaded: {idFile.name}</p>}
      </div>

      <div className="form-group">
        <label>Full Name</label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          disabled={!manualOverride}
        />
      </div>

      <div className="form-group">
        <label>Gender</label>
        <select 
          value={gender} 
          onChange={(e) => setGender(e.target.value)} 
          disabled={!manualOverride}
        >
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
      </div>

      <div className="form-group checkbox">
        <label>
          <input 
            type="checkbox" 
            checked={manualOverride} 
            onChange={toggleOverride} 
          />
          Enable Manual Override
        </label>
      </div>

      <div className={`status ${verified ? 'verified' : 'not-verified'}`}>
        {verified ? '✅ Verified Automatically' : '❌ Not Verified'}
      </div>
    </div>
  );
};

export default PersonalInformation;
