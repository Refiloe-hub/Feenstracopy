import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PersonalInfo.css';

const PersonalInformation = () => {
  const navigate = useNavigate();

  const [idFront, setIdFront] = useState(null);
  const [idBack, setIdBack] = useState(null);
  const [name, setName] = useState('John Doe');
  const [gender, setGender] = useState('Male');
  const [verified, setVerified] = useState(false);
  const [manualOverride, setManualOverride] = useState(false);

  const handleFrontUpload = (e) => {
    const file = e.target.files[0];
    setIdFront(file);
    if (file && idBack) {
      setVerified(true); // mock verification
    }
  };

  const handleBackUpload = (e) => {
    const file = e.target.files[0];
    setIdBack(file);
    if (idFront && file) {
      setVerified(true); // mock verification
    }
  };

  const toggleOverride = () => setManualOverride(!manualOverride);

  const handleNext = () => {
    navigate('/institution-info');
  };

  const handlePrevious = () => {
    navigate(-1);
  };

  return (
    <div className="personal-info-container">
      <h2>Personal Information</h2>

      <div className="form-group">
        <label>Upload ID Document (Front)</label>
        <input type="file" accept="image/*,application/pdf" onChange={handleFrontUpload} />
        {idFront && <p className="file-name">Front Uploaded: {idFront.name}</p>}
      </div>

      <div className="form-group">
        <label>Upload ID Document (Back)</label>
        <input type="file" accept="image/*,application/pdf" onChange={handleBackUpload} />
        {idBack && <p className="file-name">Back Uploaded: {idBack.name}</p>}
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

      <div className="form-buttons">
        <button className="prev-btn" onClick={handlePrevious}>Previous</button>
        <button className="next-btn" onClick={handleNext}>Save & Proceed</button>
      </div>
    </div>
  );
};

export default PersonalInformation;
