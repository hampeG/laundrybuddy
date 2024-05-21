import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import "./LoginForm.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import logo from "./images/lb-logo-sq-1.png";

function LoginForm() {
  const location = useLocation();
  const redirectPath = location.state?.redirectPath || "/";
  const sendToDashboard = location.state?.sendToDashboard || false;

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, error, loading } = useAuth(); // Destructure loading and error from useAuth

  // Event handler for input changes
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  // Event handler for form submission
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await login(
        formData.email,
        formData.password,
        redirectPath,
        sendToDashboard
      );
    } catch (error) {
      // Error handling is managed in AuthContext
    }
  }

  return (
    <div>
      <div className="contact-form-container">
        <p className="contact-form-text">
          <FontAwesomeIcon icon={faSignInAlt} className="contact-icon" />
          Login Form
        </p>
      </div>
      <div className="body1">
        <img src={logo} alt="Laundry Buddy Logo" className="Logo" />
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              placeholder="Email"
              id="loginEmail"
              name="email"
              autoComplete="off"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              id="loginPassword"
              name="password"
              autoComplete="off"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
          <p className="register-link">
            <Link to="/register">Not a member? Create account here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
