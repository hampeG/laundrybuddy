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
  }

  // Event handler for form submission
  function handleSubmit(e) {
    e.preventDefault();
    // Will add backend logic here
    console.log(formData);

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    });
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
            name="firstName"
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
            name="lastName"
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