import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home.jsx";
import Booking from "./Booking.jsx";
import ContactForm from './ContactForm';
import NavBar from "./NavBar.jsx";
import RegistrationForm from "./RegistrationForm.jsx";
import LoginForm from "./LoginForm.jsx"
import MainPage from "./MainPage.jsx";
import OwnerDashboard from "./dashboards/OwnerDashboard.jsx"
import Footer from "./footer.jsx";

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
      <LoginForm />
      <MainPage/>
      <OwnerDashboard/>
      <Footer/>
    </Router>
  );
}

export default App;
