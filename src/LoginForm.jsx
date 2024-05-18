import { useState } from "react";
import { useAuth } from "./context/AuthContext";
import { Link } from "react-router-dom";
import './ContactForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';

function LoginForm() {
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
  const handleRatingChange = ratingValue => {
    setFormData({ ...formData, rating: ratingValue });
  };

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
      <div className="contact-form-container">
        <p className="contact-form-text">
        <FontAwesomeIcon icon={faSignInAlt} className="contact-icon" />
          Login Form
        </p>
      </div>
    <div className='body1'>
    <img 
                src="src/images/lb-logo-sq 1.png"
                alt="Laundry Buddy Logo"
                className="Logo"
            />
      {errorMessage && <div className="error">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <input type="email" placeholder="Email" id="loginEmail" name="email" autoComplete="off" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <input type="password" placeholder="Password" id="loginPassword" name="password" autoComplete="off" value={formData.password} onChange={handleChange} required />
        </div>
        <button type="submit">Login</button>
        <p className="register-link"><Link to="/register">Not a member? Create account here</Link></p>
      </form>
    </div>
    <div className="rating-container">
        <p className='rating-text'>Rate your experience:</p>
        <div className="stars">
            <input type="radio" id="star1" name="rating" value="1" checked={formData.rating === '1'} onChange={() => handleRatingChange('1')} />
            <label htmlFor="star1">&#9733;</label>
            <input type="radio" id="star2" name="rating" value="2" checked={formData.rating === '2'} onChange={() => handleRatingChange('2')} />
            <label htmlFor="star2">&#9733;</label>
            <input type="radio" id="star3" name="rating" value="3" checked={formData.rating === '3'} onChange={() => handleRatingChange('3')} />
            <label htmlFor="star3">&#9733;</label>
            <input type="radio" id="star4" name="rating" value="4" checked={formData.rating === '4'} onChange={() => handleRatingChange('4')} />
            <label htmlFor="star4">&#9733;</label>
            <input type="radio" id="star5" name="rating" value="5" checked={formData.rating === '5'} onChange={() => handleRatingChange('5')} />
            <label htmlFor="star5">&#9733;</label>
        </div>

      </div>
    </div>
  );
}

export default LoginForm;
