import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faAddressBook, faCalendarAlt , faInfoCircle, faUser,faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import './App.css';

const NavBar = () => {
  return (
    <Navbar expand="lg" fixed="top" className="custom-navbar">
      <Navbar.Brand href="#">
        <img
          src="src/images/lb-logo.png"
          alt="logo"
          style={{ width: '160px', height: '53px' }}
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center">
        <Nav className="navbar-nav">
          <Nav.Link href="#" className="nav-link"> <FontAwesomeIcon icon={faHome} />   Main</Nav.Link>
          <Nav.Link href="#" className="nav-link"><FontAwesomeIcon icon={faCalendarAlt} />   Booking</Nav.Link>
          <Nav.Link href="#" className="nav-link"><FontAwesomeIcon icon={faInfoCircle} />   About</Nav.Link>
          <Nav.Link href="#" className="nav-link"><FontAwesomeIcon icon={faAddressBook} />   Contact</Nav.Link>
        </Nav>
        <Nav className="ml-auto justify-content-end">
            <Button variant="light" className="navbar-btn"><FontAwesomeIcon icon={faSignInAlt} /> Login/Register</Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
