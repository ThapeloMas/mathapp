
import React from "react";
import { useNavigate } from "react-router-dom";
import "./TermsAndConditions.css";

const TermsAndConditions = () => {
  const navigate = useNavigate();

  return (
    <div className="terms-wrapper">
      <div className="terms-container">
        <h2>Terms and Conditions</h2>
        <div className="terms-content">
          <p>
            <strong>Effective Date: 22/02/2025</strong>
          </p>
          <p>
            Welcome to QuizApp! These Terms and Conditions govern your use of
            our quiz application designed to help children learn mathematics in
            an engaging and educational way. By using this app, you agree to
            comply with these terms.
          </p>

          <h3>1. Acceptance of Terms</h3>
          <p>
            By accessing or using QuizApp, you agree to abide by these Terms and
            Conditions.
          </p>

          <h3>2. Eligibility</h3>
          <p>
            This app is designed for children, but parents or legal guardians
            must provide consent for users under 13.
          </p>

          <h3>3. Educational Purpose</h3>
          <p>
            QuizApp is designed solely for educational purposes to enhance
            children's math skills.
          </p>

          <h3>4. User Accounts</h3>
          <p>
            Users may need to create an account to track progress.
            Parents/guardians are responsible for monitoring their child's use.
          </p>

          <h3>5. Privacy and Data Protection</h3>
          <p>
            We prioritize child safety and data privacy. See our Privacy Policy
            for details.
          </p>

          <h3>6. Prohibited Activities</h3>
          <p>
            Users must not misuse the app, use offensive language, or violate
            laws.
          </p>

          <h3>7. Intellectual Property</h3>
          <p>
            All content is the property of QuizApp and may not be copied without
            permission.
          </p>

          <h3>8. Limitation of Liability</h3>
          <p>
            We are not responsible for technical errors, data loss, or misuse of
            the app.
          </p>

          <h3>9. Modifications to Terms</h3>
          <p>
            We may update these terms, and continued use constitutes acceptance.
          </p>

          <h3>10. Contact Information</h3>
          <p>Contact us at Thapelo0744@gmail.com with any questions.</p>
        </div>
        <button onClick={() => navigate("/")} className="back-button">
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default TermsAndConditions;
