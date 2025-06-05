import React, { useState } from 'react';
import './InstitutionInfo.css';
import { useNavigate } from 'react-router-dom';

export default function InstitutionInfo() {
  const [fileName, setFileName] = useState('');
  const [manualOverride, setManualOverride] = useState(false);
  const [region, setRegion] = useState('');
  const [institution, setInstitution] = useState('');
  const [studyDetails, setStudyDetails] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const regionOptions = ['Johannesburg', 'Cape Town', 'Pretoria'];
 const allInstitutions = [
  { name: 'ACADEMY OF SOUND ENGINEERING', region: 'Johannesburg' },
  { name: 'AFDA', region: 'Cape Town' },
  { name: 'AFDA', region: 'Johannesburg' },
  { name: 'BHC SCHOOL OF DESIGN', region: 'Cape Town' },
  { name: 'BOSTON CITY COLLEGE', region: 'Cape Town' },
  { name: 'BOSTON CITY COLLEGE', region: 'Pretoria' },
  { name: 'CARINUS NURSING COLLEGE', region: 'Cape Town' },
  { name: 'CENTRAL JOHANNESBURG TVET COLLEGE', region: 'Johannesburg' },
  { name: 'CENTRAL TECHNICAL COLLEGE', region: 'Johannesburg' },
  { name: 'CENTRAL TECHNICAL COLLEGE', region: 'Pretoria' },
  { name: 'COLLEGE OF MEDICINE OF SA', region: 'Johannesburg' },
  { name: 'DAM TECHNICAL COLLEGE', region: 'Johannesburg' },
  { name: 'DAMELIN', region: 'Johannesburg' },
  { name: 'DAMELIN', region: 'Pretoria' },
  { name: 'DESIGN ACADEMY OF FASHION', region: 'Cape Town' },
  { name: 'EDUSA COLLEGE', region: 'Pretoria' },
  { name: 'EDUVOS', region: 'Pretoria' },
  { name: 'EMENDY', region: 'Pretoria' },
  { name: 'ETA COLLEGE', region: 'Cape Town' },
  { name: 'GAUTENG CENTRAL COLLEGE', region: 'Pretoria' },
  { name: 'GETTING TO KNOW ENGLISH', region: 'Pretoria' },
  { name: 'INSCAPE EDUCATION CAPE TOWN CAMPUS', region: 'Cape Town' },
  { name: 'INTERNATIONAL HOTEL SCHOOL', region: 'Pretoria' },
  { name: 'JOHANNESBURG CITY COLLEGE', region: 'Johannesburg' },
  { name: 'LYCEUM THE CORRESPONDENCE COLLEGE FOR HIGHER EDUCATION', region: 'Pretoria' },
  { name: 'REGENT BUSINESS SCHOOL', region: 'Johannesburg' },
  { name: 'ROSEBANK COLLEGE', region: 'Pretoria' },
  { name: 'ROSEBANK COLLEGE', region: 'Johannesburg' },
  { name: 'ROSTEC COLLEGE', region: 'Pretoria' },
  { name: 'SACAP', region: 'Pretoria' },
  { name: 'STADIO', region: 'Pretoria' },
  { name: 'TSHWANE CITY COLLEGE', region: 'Pretoria' },
  { name: 'TSHWANE UNIVERSITY OF TECHNOLOGY', region: 'Pretoria' },
  { name: 'UNIVERSITY OF CAPE TOWN', region: 'Cape Town' },
  { name: 'UNIVERSITY OF JOHANNESBURG', region: 'Johannesburg' },
  { name: 'UNIVERSITY OF PRETORIA', region: 'Pretoria' },
  { name: 'UNIVERSITY OF WITWATERSRAND', region: 'Johannesburg' },
  { name: 'VARSITY COLLEGE', region: 'Pretoria' },
  { name: 'VARSITY COLLEGE', region: 'Johannesburg' },
  { name: 'WITS BUSINESS SCHOOL', region: 'Johannesburg' },
  { name: 'CITY VARSITY SCHOOL OF MEDIA AND CREATIVE ARTS', region: 'Johannesburg' },
  { name: 'SACAP', region: 'Johannesburg' },
  { name: 'RED AND YELLOW CREATIVE SCHOOL OF BUSINESS', region: 'Cape Town' },
  { name: 'INTERNATIONAL HOTEL SCHOOL', region: 'Cape Town' },
  { name: 'VARSITY COLLEGE', region: 'Cape Town' },
  { name: 'BOSTON CITY COLLEGE', region: 'Johannesburg' },
  { name: 'SACAP', region: 'Cape Town' },
  { name: 'CAPE PENINSULA UNIVERSITY OF TECHNOLOGY', region: 'Cape Town' },
  { name: 'CAPSICUM', region: 'Pretoria' },
  { name: 'CAPSICUM', region: 'Johannesburg' },
  { name: 'INSCAPE EDUCATION PRETORIA CAMPUS', region: 'Pretoria' },
  { name: 'ROSEBANK COLLEGE', region: 'Cape Town' },
  { name: 'EDUVOS', region: 'Cape Town' },
  { name: 'IIE VEGA SCHOOL CAPE TOWN', region: 'Cape Town' },
  { name: 'UNIVERSITY OF THE WESTERN CAPE', region: 'Cape Town' },
  { name: 'SAE INSTITUTION', region: 'Cape Town' },
  { name: 'IIE SCHOOL OF HOSPITALITY & SERVICEÂ MANAGEMENT', region: 'Cape Town' },
  { name: 'CAPE TOWN COLLEGE OF FASHION', region: 'Cape Town' },
  { name: 'UNISA', region: 'Pretoria' },
  { name: 'SKILL ACADEMY', region: 'Pretoria' },
  { name: 'VEGA', region: 'Pretoria' },
  { name: 'CTU TRAINING SOLUTIONS', region: 'Pretoria' },
  { name: 'ISA CARSTENS', region: 'Pretoria' },
  { name: 'TSIBA BUSINESS SCHOOL', region: 'Cape Town' },
  { name: 'REGENT BUSINESS SCHOOL', region: 'Cape Town' },
  { name: 'DAMELIN', region: 'Cape Town' },
  { name: 'CAPSICUM', region: 'Cape Town' },
  { name: 'CITY VARSITY', region: 'Cape Town' },
  { name: 'Moshal Program - University of Pretoria', region: 'Pretoria' },
  { name: 'NETCARE EDUCATION', region: 'Johannesburg' },
  { name: 'RICHFIELD', region: 'Pretoria' },
  { name: 'EASY ENGLISH CENTRE', region: 'Pretoria' },
  { name: 'REGENT BUSINESS SCHOOL', region: 'Pretoria' },
  { name: 'HFPA FITNESS ACADEMY', region: 'Pretoria' },
  { name: 'CAPSICUM CULINARY STUDIO', region: 'Cape Town' },
  { name: 'SEFAKO MAKGATO HEALTH SCIENCE UNIVERSITY', region: 'Pretoria' },
  { name: 'TSWANE SOUTH TVET', region: 'Pretoria' },
  { name: 'CAPE TOWN CREATIVE ACADEMY', region: 'Cape Town' },
  { name: 'UXI - EDUBOOST', region: 'Pretoria' },
  { name: 'PRETORIA TECHNICAL COLLEGE', region: 'Pretoria' },
  { name: 'TSHWANE TECHNICAL INSTITUTION', region: 'Pretoria' },
  { name: 'MILPARK EDUCATION', region: 'Pretoria' },
  { name: 'DENVER TECHNICAL COLLEGE', region: 'Pretoria' },
  { name: 'BEAUTIKO COLLEGE', region: 'Pretoria' },
  { name: 'BlueChip Flight School', region: 'Pretoria' },
  { name: 'CAPE PENINSULA UNIVERSITY OF TECHNOLOGY (REMOTELY)', region: 'Pretoria' },
  { name: 'JEPPE COLLEGE', region: 'Pretoria' },
  { name: 'INDEPENDENT INSTITUTION OF EDUCATION', region: 'Pretoria' },
  { name: 'UNISA - REMOTE', region: 'Johannesburg' },
  { name: 'MILPARK EDUCATION', region: 'Cape Town' },
  { name: 'MILPARK EDUCATION', region: 'Johannesburg' },
  { name: 'SOUTH AFRICAN COLLEGE OF APPLIED PHYCHOLOGY (SACAP)', region: 'Pretoria' },
  { name: 'BELGIUM CAMPUS', region: 'Johannesburg' },
  { name: 'UNIVERSITY OF JOHANNESBURG (REMOTE)', region: 'Pretoria' },
  { name: 'BROOKLYN CITY COLLEGE', region: 'Pretoria' },
  { name: 'BELLISSIMA BEAUTY ACADEMY', region: 'Cape Town' },
  { name: 'MANCOSA', region: 'Pretoria' },
  { name: 'IMM GRADUATE SCHOOL', region: 'Johannesburg' },
  { name: 'FACE TO FACE BEAUTY AND MAKE-UP DESIGN SCHOOL', region: 'Johannesburg' },
  { name: 'MAHARISHI INVINCIBILITY INSTITUTE', region: 'Johannesburg' },
  { name: 'CHARTERED INSTITUTE OF MANAGEMENT ACCOUNTING (CIMA)', region: 'Johannesburg' },
  { name: 'PRODUCTION TECHNOLOGIES ASSOCIATION OF SOUTH AFRICA', region: 'Pretoria' },
  { name: 'IMM GRADUATE SCHOOL', region: 'Pretoria' },
  { name: 'INSTITUTION OF ACCOUNTING SCIENCE', region: 'Johannesburg' },
  { name: 'RICHFIELD', region: 'Johannesburg' },
  { name: 'INTERNATIONAL HOTEL SCHOOL', region: 'Johannesburg' },
  { name: 'UNIVERSITY OF WITWATERSRAND (REMOTE)', region: 'Pretoria' },
  { name: 'GAUTENG CITY COLLEGE', region: 'Johannesburg' },
  { name: 'EDUVOS', region: 'Johannesburg' },
  { name: 'REVOLUTION MEDIA ACADEMY', region: 'Johannesburg' },
  { name: 'DENEL TECHNICAL ACADEMY', region: 'Pretoria' },
  { name: 'SAE INSTITUTION', region: 'Johannesburg' },
  { name: 'RISE ACADEMY OF ENTREPRENEURSHIP', region: 'Johannesburg' },
  { name: 'STAR SCHOOLS', region: 'Johannesburg' }
];


  const handleProceed = () => {
    // Optional: Add validation here if needed before proceeding

    // IMPORTANT: If manualOverride is false, you might want to set a default region or alert the user
    if (manualOverride && !region) {
      alert('Please select a region.');
      return;
    }

    // Navigate to next page, passing region in state
    navigate('/guarantor-info', { state: { region } });
  };

  const handlePrevious = () => {
    navigate(-1);
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
  {allInstitutions
    .filter((inst) => inst.region === region)
    .map((inst, index) => (
      <option key={`${inst.name}-${index}`} value={inst.name}>
        {inst.name}
      </option>
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

      <div className="form-actions">
        <button onClick={handlePrevious} className="prev-btn">Previous</button>
        <button onClick={handleProceed} className="next-btn">Save and Proceed</button>
      </div>
    </div>
  );
}
