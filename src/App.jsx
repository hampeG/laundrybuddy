import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home.jsx";
import Booking from "./Booking.jsx";
import ContactForm from './ContactForm';
import NavBar from "./NavBar.jsx";
import RegistrationForm from "./RegistrationForm.jsx";
import MainPage from "./MainPage.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book/:slotId" element={<Booking />} />
      </Routes>
      <ContactForm />
      <RegistrationForm />
      <NavBar/>
      <MainPage/>
    </Router>
  );
}

export default App;
