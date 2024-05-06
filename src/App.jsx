import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from 'react';
import Home from "./Home.jsx";
import Booking from "./Booking.jsx";
import ContactForm from './ContactForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book/:slotId" element={<Booking />} />
      </Routes>
      <ContactForm />
    </Router>
  );
}

export default App;
