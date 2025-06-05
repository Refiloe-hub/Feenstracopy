import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './GuarantorInfo.css';

export default function GuarantorInfo() {
  const [idFile, setIdFile] = useState(null);
  const [payslips, setPayslips] = useState([]);
  const [bankStatements, setBankStatements] = useState([]);
  const [manualOverride, setManualOverride] = useState(false);
  const [guarantorInfo, setGuarantorInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const navigate = useNavigate();

  const handleFileUpload = (e, setter, multiple = false) => {
    const files = multiple ? Array.from(e.target.files) : e.target.files[0];
    setter(files);

    if (setter === setIdFile && !multiple) {
      // Trigger the Beeswax API call when ID is uploaded
      fetchGuarantorInfo(files);
    }
  };

 const fetchGuarantorInfo = async (file) => {
  setLoading(true);
  setApiError(null);

  try {
    const formData = new FormData();
    formData.append('id_document', file);

    const response = await fetch('http://127.0.0.1:8000/verify-id', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to fetch info from server');
    }

    const data = await response.json();
    setGuarantorInfo(data);
  } catch (error) {
    console.error(error);
    setApiError(error.message);
  } finally {
    setLoading(false);
  }
};


  const handleSubmit = () => {
    console.log('Processing ID, Payslips, Bank Statements...');
    // Run affordability logic here
  };

  const handlePrevious = () => {
    navigate(-1);
  };

  const handleProceed = () => {
    
    console.log('Saving and moving to next step...');
    navigate('/application-period'); 
  };

  return (
    <div className="guarantor-info-container">
      <h2>Guarantor</h2>

      <div className="form-group">
        <label>Upload Guarantor ID*</label>
        <input type="file" onChange={(e) => handleFileUpload(e, setIdFile)} accept="application/pdf,image/*" />
        {loading && <p>Fetching details from Home Affairs...</p>}
        {apiError && <p className="error">Error: {apiError}</p>}
        {guarantorInfo && (
          <div className="info-preview">
            <p><strong>Full Name:</strong> {guarantorInfo.full_name}</p>
            <p><strong>ID Number:</strong> {guarantorInfo.id_number}</p>
            <p><strong>Date of Birth:</strong> {guarantorInfo.dob}</p>
            {/* Add more fields as needed */}
          </div>
        )}
      </div>

      <div className="form-group">
        <label>Upload Payslips*</label>
        <input type="file" multiple onChange={(e) => handleFileUpload(e, setPayslips, true)} accept="application/pdf,image/*" />
      </div>

      <div className="form-group">
        <label>Upload Bank Statements*</label>
        <input type="file" multiple onChange={(e) => handleFileUpload(e, setBankStatements, true)} accept="application/pdf,image/*" />
      </div>

      <div className="form-group checkbox">
        <label>
          <input
            type="checkbox"
            checked={manualOverride}
            onChange={() => setManualOverride(!manualOverride)}
          />
          Enable Manual Override
        </label>
      </div>

      <div className="form-actions">
        <button onClick={handlePrevious} className="prev-btn">Previous</button>
        <button onClick={handleSubmit} className="process-button">Run Affordability Check</button>
        <button onClick={handleProceed} className="next-btn">Save and Proceed</button>
      </div>
    </div>
  );
}
