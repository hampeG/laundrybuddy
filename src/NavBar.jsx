import React, { useRef, useEffect } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faAddressBook,
  faCalendarAlt,
  faInfoCircle,
  faSignInAlt,
} from "@fortawesome/free-solid-svg-icons";
import "./NavBar.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import logo from "./images/lb-logo.png";

const NavBar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const navRef = useRef(null);

  useEffect(() => {
    // Function to handle clicks outside the navbar
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        const navbarToggler = document.querySelector(".navbar-toggler");
        if (navbarToggler && !navbarToggler.classList.contains("collapsed")) {
          navbarToggler.click();
        }
      }
    };

    // Add event listener when the component mounts
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navRef]);

  // Function to handle logout
  const handleLogout = () => {
    logout();
    navigate("/"); // Redirect to the login page after logout
  };

  const handleBookClick = () => {
    const redirectPath = "/book";
    if (user) {
      navigate(redirectPath);
    } else {
      navigate("/login", { state: { redirectPath } });
    }
  };

  const handleSignInClick = () => {
    const sendToDashboard = true;
    navigate("/login", { state: { sendToDashboard } });
  };

  const handleHomeClick = () => {
    if (user) {
      // Redirect to the appropriate dashboard based on user role
      if (user.role === "Owner") {
        navigate("/owner");
      } else if (user.role === "Admin") {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    } else {
      navigate("/");
    }
  };

  return (
    <Navbar ref={navRef} expand="lg" fixed="top" className="custom-navbar">
      <Navbar.Brand href="#">
        <Link to="/" className="link">
          <img
            src={logo}
            alt="logo"
            style={{ width: "160px", height: "53px" }}
          />
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center">
        <Nav className="navbar-nav">
          <Nav.Link href="#" className="nav-link" onClick={handleHomeClick}>
            <Link to="/home" className="link">
              <FontAwesomeIcon icon={faHome} /> Home
            </Link>
          </Nav.Link>
          <Nav.Link href="#" className="nav-link" onClick={handleBookClick}>
            <Link to="/home" className="link">
              <FontAwesomeIcon icon={faCalendarAlt} /> Booking
            </Link>
          </Nav.Link>
          <Nav.Link href="#" className="link">
            <Link to="/about" className="link">
              <FontAwesomeIcon icon={faInfoCircle} /> About
            </Link>
          </Nav.Link>
          <Nav.Link href="#" className="link">
            <Link to="/contact" className="link">
              <FontAwesomeIcon icon={faAddressBook} /> Contact
            </Link>
          </Nav.Link>
        </Nav>
        <Nav className="ml-auto justify-content-end">
          {user ? (
            <Button
              variant="light"
              className="navbar-btn"
              onClick={handleLogout}
            >
              <FontAwesomeIcon icon={faSignInAlt} /> Logout
            </Button>
          ) : (
            <Button
              variant="light"
              className="navbar-btn"
              onClick={handleSignInClick}
            >
              <Link to="/login" className="link">
                <FontAwesomeIcon icon={faSignInAlt} /> Sign In
              </Link>
            </Button>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
