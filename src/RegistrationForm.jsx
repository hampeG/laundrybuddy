import { useState } from "react";
import './ContactForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';


function RegistrationForm() {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: ""
    });
    
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    // Event handler for input changes
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
    console.log("formData:", formData);
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
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSuccessMessage("Account was successfully registered!");
        setFormData({
          first_name: "",
          last_name: "",
          email: "",
          password: "",
        });
      } else if (response.status === 409) {
        const data = await response.json();
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error(`Error submitting form: ${error}`);
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
      <img 
                src="src/images/lb-logo-sq 1.png"
                alt="Laundry Buddy Logo"
                className="Logo"
            />
        {errorMessage && <div className="error">{errorMessage}</div>}
        {successMessage && <div className="success">{successMessage}</div>}
        <form onSubmit={handleSubmit}>
          <div>
            <input type="text" placeholder="First name" id="firstName" name="first_name" autoComplete="off" value={formData.first_name} onChange={handleChange} required />
          </div>
          <div>
            <input
              type="text" placeholder="Last name" id="lastName" name="last_name" autoComplete="off" value={formData.last_name} onChange={handleChange} required />
          </div>
          <div>
            <input type="email" placeholder="Email" id="email" name="email" autoComplete="off" value={formData.email} onChange={handleChange} required />
          </div>
          <div>
            <input type="password" placeholder="Password" id="password" name="password" autoComplete="off" value={formData.password} onChange={handleChange} required />
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default RegistrationForm;