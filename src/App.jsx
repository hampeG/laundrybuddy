import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SlotManager from "./SlotManager.jsx";
import ContactForm from "./ContactForm";
import NavBar from "./NavBar.jsx";
import RegistrationForm from "./RegistrationForm.jsx";
import LoginForm from "./LoginForm.jsx";
import MainPage from "./MainPage.jsx";
import { AuthProvider, useAuth } from "./context/AuthContext";
import AdminDashboard from "./dashboards/AdminDashboard.jsx";
import OwnerDashboard from "./dashboards/OwnerDashboard.jsx";
import UserDashboard from "./dashboards/UserDashboard.jsx";
import "./App.css";
import About from "./About.jsx";
import Footer from "./components/footer.jsx";
import PropTypes from "prop-types";

function PrivateRoute({ children, roles }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return children;
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
  roles: PropTypes.arrayOf(PropTypes.string),
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/book" element={<SlotManager />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/contact" element={<ContactForm />} />
          <Route
            path="/owner"
            element={
              <PrivateRoute roles={["Owner"]}>
                <OwnerDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <PrivateRoute roles={["Admin", "Owner"]}>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/user"
            element={
              <PrivateRoute roles={["Tenant", "Admin", "Owner"]}>
                <UserDashboard />
              </PrivateRoute>
            }
          />
        </Routes>
        <Footer/>
      </AuthProvider>
    </Router>
  );
}

export default App;
