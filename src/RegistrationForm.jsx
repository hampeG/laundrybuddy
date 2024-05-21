import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import logo from "./images/lb-logo-sq-1.png";

function RegistrationForm() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

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

    setErrorMessage("");
    setSuccessMessage("");
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccessMessage(
          "Account was successfully registered! Please wait while we redirect you to login."
        );
        setFormData({
          first_name: "",
          last_name: "",
          email: "",
          password: "",
        });

        // Wait for a few seconds before redirecting
        setTimeout(() => {
          navigate("/login");
        }, 3000); // 3 seconds delay
      } else if (response.status === 409) {
        const data = await response.json();
        setErrorMessage(data.message);
      } else {
        setErrorMessage("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error(`Error submitting form: ${error}`);
      setErrorMessage("An error occurred. Please try again.");
    }
  }

  return (
    <div>
      <div className="contact-form-container">
        <p className="contact-form-text">
          <FontAwesomeIcon icon={faSignInAlt} className="contact-icon" />
          Register Form
        </p>
      </div>
      <div className="body2">
        <img src={logo} alt="Laundry Buddy Logo" className="Logo" />
        {errorMessage && <div className="error">{errorMessage}</div>}
        {successMessage && <div className="success">{successMessage}</div>}
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="First name"
              id="firstName"
              name="first_name"
              autoComplete="off"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Last name"
              id="lastName"
              name="last_name"
              autoComplete="off"
              value={formData.last_name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              id="email"
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
              id="password"
              name="password"
              autoComplete="off"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default RegistrationForm;
