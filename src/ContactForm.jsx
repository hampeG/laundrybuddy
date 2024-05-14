import React, { useState } from 'react';
import axios from 'axios';
import './ContactForm.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    message: ''
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      // Save data to the database
    await axios.post('/api/contactForms', formData);

    // Send email
    await axios.post('/api/sendEmail', formData);
      alert('Contact form submitted successfully!');
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div className='body'>
      <img 
                src="src/images/lb-logo-sq 1.png"
                alt="Laundry Buddy Logo"
                className="Logo"
            />
      <form onSubmit={handleSubmit}>
        <div>
          <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} placeholder="First Name" required />
        </div>
        <div>
          
          <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} placeholder="Last Name" required />
        </div>
        <div>
          
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
        </div>
        <div>
          
          <input type="text" name="phone_number" value={formData.phone_number} onChange={handleChange} placeholder="Phone Number"  required />
        </div>
        <div>
        
          <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Message" required />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ContactForm;

