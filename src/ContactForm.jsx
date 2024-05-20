import React, { useState } from "react";
import axios from "axios";
import "./ContactForm.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressBook } from "@fortawesome/free-solid-svg-icons";
import logo from "./images/lb-logo-sq-1.png";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    message: "",
    rating: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRatingChange = (ratingValue) => {
    setFormData({ ...formData, rating: ratingValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Save data to the database
      await axios.post("/api/contactForms", formData);

      // Send email
      await axios.post("/api/sendEmail", formData);
      alert("Contact form submitted successfully!");
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        message: "",
        rating: null,
      });
    } catch (error) {
      console.error("Error submitting contact form:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div>
      <div className="contact-form-container">
        <div className="contact-form-text">
          <FontAwesomeIcon icon={faAddressBook} className="contact-icon" />
          Contact Form
        </div>
      </div>

      <div className="body">
        <img src={logo} alt="Laundry Buddy Logo" className="Logo" />
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              placeholder="First Name"
              required
            />
          </div>
          <div>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              placeholder="Last Name"
              required
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
          </div>
          <div>
            <input
              type="text"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              placeholder="Phone Number"
              required
            />
          </div>
          <div>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Message"
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className="rating-container">
        <p className="rating-text">Rate your experience:</p>
        <div className="stars">
          <input
            type="radio"
            id="star1"
            name="rating"
            value="1"
            checked={formData.rating === "1"}
            onChange={() => handleRatingChange("1")}
          />
          <label htmlFor="star1">&#9733;</label>
          <input
            type="radio"
            id="star2"
            name="rating"
            value="2"
            checked={formData.rating === "2"}
            onChange={() => handleRatingChange("2")}
          />
          <label htmlFor="star2">&#9733;</label>
          <input
            type="radio"
            id="star3"
            name="rating"
            value="3"
            checked={formData.rating === "3"}
            onChange={() => handleRatingChange("3")}
          />
          <label htmlFor="star3">&#9733;</label>
          <input
            type="radio"
            id="star4"
            name="rating"
            value="4"
            checked={formData.rating === "4"}
            onChange={() => handleRatingChange("4")}
          />
          <label htmlFor="star4">&#9733;</label>
          <input
            type="radio"
            id="star5"
            name="rating"
            value="5"
            checked={formData.rating === "5"}
            onChange={() => handleRatingChange("5")}
          />
          <label htmlFor="star5">&#9733;</label>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
