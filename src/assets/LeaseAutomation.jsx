import React from 'react';
import './BookingPage.css'; // Optional: Add this only if you want to extract styles

const BookingPage = () => {
  const steps = [
    {
      title: '1. Applicant Profile Registration',
      details: [
        'Applicant enters basic info (registration page)',
        'System verifies email and WhatsApp',
        'System auto-fetches personal info from Home Affairs (via Beeswax API)',
      ],
    },
    {
      title: '2. Personal Information',
      details: [
        'Applicant uploads ID',
        'System cross-checks all personal information',
        'Option to change name and gender is included',
        'System extracts and verifies information (manual override if needed)',
      ],
    },
    {
      title: '3. Institution Information',
      details: [
        'Applicant uploads proof of registration',
        'System extracts region, institution, and study details (manual override if needed)',
      ],
    },
    {
      title: '4. Guarantor Info & Affordability',
      details: [
        'Uploads required documents: ID, payslips, bank statements',
        'Process ID',
        'Use Amazon Textract for data extraction of Payslips and Bank Statements',
        'System model to categorise transactions – use Discovery Bank financial analyser as reference',
        'System runs affordability check based on results',
        'Experian credit check is conducted on guarantor',
        'System verifies data (manual override if needed)',
      ],
    },
    {
      title: '5. Next of Kin & Emergency Info',
      details: [
        'Applicant inputs details',
        'System validates the information (Manual review if verification fails)',
      ],
    },
    {
      title: '6. Application Period & Room Selection',
      details: [
        'Applicant selects building and lease period',
        'All room types are displayed',
        'Rooms are clearly tagged as "within affordability range" or "outside affordability range"',
        'If a room outside the affordability range is selected, the case is escalated to an agent',
      ],
    },
    {
      title: '7. FIC Screening via Beeswax API',
      details: [
        'System runs ID check via Beeswax API',
        'System performs PEP and sanctions check',
        'Ongoing or CDD screening for flagged or returning applicants',
        'Application proceeds if passed; escalates if failed or unclear',
      ],
    },
    {
      title: '8. Lease Generation & Booking Fee',
      details: [
        'System generates lease',
        'Applicant pays booking fee',
        'Manual trigger and agent notification if lease generation fails',
      ],
    },
    {
      title: '9. Lease Signing & Move-in Date Selection',
      details: [
        'Applicant signs lease',
        'System prompts selection of move-in date',
        'System confirms move-in date',
      ],
    },
  ];

  return (
    <div className="booking-wrapper">
      <h1 className="booking-title">Lease Automation Process</h1>
      <div className="booking-timeline">
        {steps.map((step, index) => (
          <div key={index} className="booking-step">
            <h3 className="step-title">⬇ {step.title}</h3>
            <ul>
              {step.details.map((item, idx) => (
                <li key={idx}>• {item}</li>
              ))}
            </ul>
          </div>
        ))}
        <div className="booking-complete">✔ Process Complete</div>
      </div>
    </div>
  );
};

export default BookingPage;
