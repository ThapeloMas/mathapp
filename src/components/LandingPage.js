import React, { useState } from "react";
import "./LandingPage.css";
import { auth } from "../firebase/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LandingPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Successfully logged in!");
      setTimeout(() => navigate("/home"), 1000); // Delay navigation to show toast
    } catch (err) {
      toast.error(err.message || "Login failed. Please try again.");
      setError(err.message);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!termsAccepted) {
      toast.error("Please accept the Terms and Conditions to sign up.");
      setError("Please accept the Terms and Conditions to sign up.");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("Account created successfully!");
      setTimeout(() => navigate("/home"), 1000); // Delay navigation to show toast
    } catch (err) {
      toast.error(err.message || "Sign up failed. Please try again.");
      setError(err.message);
    }
  };

  const handleGuestPlay = () => {
    toast.info("Continuing as guest");
    setTimeout(() => navigate("/home"), 1000); // Delay navigation to show toast
  };

  return (
    <div className="StyledWrapper">
      <div id="Container">
        <form className="form" onSubmit={isSignUp ? handleSignUp : handleLogin}>
          <div id="login-label">{isSignUp ? "Sign Up" : "Login"}</div>
          <input
            className="form-content"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="form-content"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {isSignUp && (
            <div className="terms-section">
              <p className="terms-link" onClick={() => navigate("/terms")}>
                Read Terms and Conditions
              </p>
              <div className="terms-checkbox">
                <input
                  type="checkbox"
                  id="terms-accept"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                />
                <label htmlFor="terms-accept">
                  I have read and agree to the Terms and Conditions
                </label>
              </div>
            </div>
          )}
          <button type="submit" disabled={isSignUp && !termsAccepted}>
            {isSignUp ? "Sign Up" : "Continue"}
          </button>
          {error && <p className="error">{error}</p>}
          <p className="toggle-auth" onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp
              ? "Already have an account? Login"
              : "Need an account? Sign Up"}
          </p>
          <button
            type="button"
            className="guest-button"
            onClick={handleGuestPlay}
          >
            Play as Guest
          </button>
        </form>
        <div id="rays">
          <svg
            fill="none"
            viewBox="0 0 299 152"
            height="9em"
            width="18em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="url(#paint0_linear_8_3)"
              d="M149.5 152H133.42L9.53674e-07 4.70132e-06H149.5L299 4.70132e-06L165.58 152H149.5Z"
            />
            <defs>
              <linearGradient
                gradientUnits="userSpaceOnUse"
                y2="12.1981"
                x2="150.12"
                y1={152}
                x1="149.5"
                id="paint0_linear_8_3"
              >
                <stop stopColor="#00E0FF" />
                <stop stopOpacity={0} stopColor="#65EDFF" offset={1} />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div id="emiter">{/* Your existing emitter SVG code */}</div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default LandingPage;
