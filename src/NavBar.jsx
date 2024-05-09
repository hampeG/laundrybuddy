import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import './App.css';

const NavBar = () => {
  return (
    <Navbar expand="lg" fixed="top" className="custom-navbar">
      <Navbar.Brand href="#home" className="navbar-brand" style={{ position: 'absolute', right: '1080px', top: '20px' }}>
        <img
          src="src/lb-logo.png"
          alt="logo"        
          style={{ width: '150px', height: '53px' }}
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center">
        <Nav className="navbar-nav">
          <Nav.Link href="#"style={{ color: 'white', marginRight: '20px', fontSize: '20px' }}>Main</Nav.Link>
          <Nav.Link href="#"style={{ color: 'white', marginRight: '20px', fontSize: '20px' }}>Booking</Nav.Link>
          <Nav.Link href="#"style={{ color: 'white', marginRight: '20px', fontSize: '20px' }}>About</Nav.Link>
          <Nav.Link href="#"style={{ color: 'white', marginRight: '20px', fontSize: '20px' }}>Contact</Nav.Link>
        </Nav>
        <Nav className="ml-auto" style={{ position: 'absolute', left: '940px', top: '22px' }}>
          <Button variant="light" style={{ width: '278px', height: '53px', borderRadius: '30px', backgroundColor: '#FFD02C', color: 'white', fontSize: '30px', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Login/Register</Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
