import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home.jsx";
import Booking from "./Booking.jsx";
import ContactForm from './ContactForm';
import NavBar from "./NavBar.jsx";
import RegistrationForm from "./RegistrationForm.jsx";
import LoginForm from "./LoginForm.jsx"
import MainPage from "./MainPage.jsx";
import Footer from "./footer.jsx";
import OwnerDashboard from "./dashboards/OwnerDashboard.jsx";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <Router>
      <AuthProvider>
      <NavBar/>
      <Routes>
        <Route path="/" element={<MainPage/>} />
        <Route path="/book" element={<Home />} />
        <Route path="/book/:slotId" element={<Booking />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/register" element={<RegistrationForm />} />
      </Routes>
      <Footer/>
      </AuthProvider>
    </Router>
  );
}

export default App;
