import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SlotManager from "./SlotManager.jsx";
import ContactForm from "./ContactForm";
import NavBar from "./NavBar.jsx";
import RegistrationForm from "./RegistrationForm.jsx";
import LoginForm from "./LoginForm.jsx";
import MainPage from "./MainPage.jsx";
import Footer from "./footer.jsx";
import { AuthProvider } from "./context/AuthContext";
import AdminDashboard from "./dashboards/AdminDashboard.jsx";
import OwnerDashboard from "./dashboards/OwnerDashboard.jsx";
import UserDashboard from "./dashboards/UserDashboard.jsx";
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/book" element={<SlotManager />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/owner" element={<OwnerDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/user" element={<UserDashboard />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </Router>
  );
}

export default App;
