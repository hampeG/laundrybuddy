import { useState } from "react";

function RegistrationForm() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    });

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

      // Check if all required fields are provided
  if (!formData.first_name || !formData.last_name || !formData.email || !formData.password) {
    console.error("All required fields must be provided.");
    return;
  }
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
        console.log(formData);
      if (!response.ok) {
        throw new Error("Failed to submit form")
      }

      const data = await response.json();
      console.log(data);

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
      });
    } catch (error) {
      console.error(`Error submitting form: ${error}`);
    }
  }

  return (
    <div>
      <h2>LaundryBuddy logo goes here</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="First name"
            id="firstName"
            name="first_name"
            autoComplete="off"
            value={formData.firstName}
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
            value={formData.lastName}
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
  );
}

export default RegistrationForm;