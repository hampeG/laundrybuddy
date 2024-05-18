import { useState } from "react";
<<<<<<< HEAD
import { Link, useLocation } from "react-router-dom";
=======
import { useAuth } from "./context/AuthContext";
import { Link } from "react-router-dom";
>>>>>>> main

function LoginForm() {
  const location = useLocation();
  const redirectPath = location.state?.redirectPath || "/";

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [errorMessage, setErrorMessage] = useState("");
  const { login } = useAuth();

  // Event handler for input changes
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  }

  // Event handler for form submission
  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMessage("");

    try {
      await login(formData.email, formData.password);
    } catch (error) {
      setErrorMessage("Login failed. Please check your credentials and try again.");
    }
  }

  return (
    <div> 
      {errorMessage && <div className="error">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <h2>LaundryBuddy logo goes here</h2>
        <div>
          <input type="email" placeholder="Email" id="loginEmail" name="email" autoComplete="off" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <input type="password" placeholder="Password" id="loginPassword" name="password" autoComplete="off" value={formData.password} onChange={handleChange} required />
        </div>
        <button type="submit">Login</button>
        <p><Link to="/register">Not a member? Create account here</Link></p>
      </form>
    </div>
  );
}

export default LoginForm;
