import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from 'react';
import Home from "./Home.jsx";
import Booking from "./Booking.jsx";
import ContactForm from './ContactForm';
import NavBar from "./NavBar.jsx";

function App() {
  return (
    <Router>
      {/* <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book/:slotId" element={<Booking />} />
      </Routes> */}
      {/* <ContactForm /> */}
      <NavBar/>
    </Router>
  );
}

export default App;
