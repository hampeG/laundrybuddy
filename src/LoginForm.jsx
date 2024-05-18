import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function LoginForm() {
  const location = useLocation();
  const redirectPath = location.state?.redirectPath || "/";

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [errorMessage, setErrorMessage] = useState("");

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
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const { token } = await response.json();
        // Stores token in the browser's local storage
        localStorage.setItem("token", token);
        // Redirect user to the specified path after successful login
        window.location.replace(redirectPath); 
      } else {
        const data = await response.json();
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error(`Error submitting form: ${error}`);
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
