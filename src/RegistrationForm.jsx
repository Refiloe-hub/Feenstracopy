import React from 'react';
import './RegistrationPage.css';

const RegisterPage = () => {
  return (
    <div className="register-container">
      <div className="register-left">
        <div className="register-image-placeholder">
          <p>The rest of your life starts here</p>
        </div>
      </div>

      <div className="register-right">
        <h2>Join the thrive community</h2>
        <p>Create an account to continue!</p>

        <form className="register-form">
          <input type="text" placeholder="Student Whatsapp Number*" />
          <input type="email" placeholder="Your Email" />
          <input type="text" placeholder="Your First Name" />
          <input type="password" placeholder="Your Password" />
          <input type="password" placeholder="Confirm your Password" />
          <input type="text" placeholder="Your Student Number" />

          <label>Student Nationality</label>
          <select>
            <option>South Africa</option>
          </select>

          <input type="text" placeholder="Student ID Number" />

          <label>Source of Funding</label>
          <select>
            <option>Choose an Option</option>
          </select>

          <p className="warning">
            Please make sure that you answer the below part of this form honestly and accurately.
          </p>

          <label>Where did you hear about us?</label>
          <div className="radio-options">
            <div className="radio-option">🌐 Website</div>
            <div className="radio-option">📄 Pamphlet</div>
          </div>

          <div className="checkbox-container">
            <input type="checkbox" id="terms" />
            <label htmlFor="terms">I agree to the Terms & Conditions</label>
          </div>

          <button type="submit" className="signup-btn">SIGN UP</button>

          <p className="login-text">Already have an account? <a href="/login">Login</a></p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
