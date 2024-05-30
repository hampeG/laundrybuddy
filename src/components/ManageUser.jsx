import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  ListGroup,
} from "react-bootstrap";
import CustomAlert from "../CustomAlert";
import { useAuth } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faEnvelope,
  faKey,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";
import "./ManageUser.css";

const ManageUser = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [userInfo, setUserInfo] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    apartment_number: "",
  });
  const [password, setPassword] = useState("");
  const [feedback, setFeedback] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`/api/users/${user._id}`);
        setUserInfo({
          first_name: response.data.first_name || "",
          last_name: response.data.last_name || "",
          email: response.data.email || "",
          phone_number: response.data.phone_number || "",
          apartment_number: response.data.apartment_number || "",
        });
      } catch (error) {
        console.error("Error fetching user info:", error);
        setError("Failed to fetch user info");
      }
    };

    const fetchUserBookings = async () => {
      try {
        const response = await axios.get(`/api/bookings/user/${user._id}`);
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setError("Failed to fetch bookings");
      }
    };

    if (user) {
      fetchUserInfo();
      fetchUserBookings();
    }
  }, [user]);

  const handleCancelBooking = async (bookingId) => {
    try {
      await axios.delete(`/api/bookings/${bookingId}`);
      setBookings(bookings.filter((booking) => booking._id !== bookingId));
      setMessage("Booking canceled successfully.");
      setError(null);
    } catch (error) {
      console.error("Error canceling booking:", error);
      setError("Error canceling booking. Please try again later.");
    }
  };

  const handleUserInfoChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleUpdateUserInfo = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/api/users/${user._id}`, userInfo);
      setUserInfo({
        first_name: response.data.first_name || "",
        last_name: response.data.last_name || "",
        email: response.data.email || "",
        phone_number: response.data.phone_number || "",
        apartment_number: response.data.apartment_number || "",
      });
      setMessage("User information updated successfully.");
      setError(null);
    } catch (error) {
      console.error("Error updating user info:", error);
      setError("Failed to update user info");
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/users/${user._id}`, { password });
      setMessage("Password changed successfully.");
      setError(null);
      setPassword(""); // Clear the password input field
    } catch (error) {
      console.error("Error changing password:", error);
      setError("Failed to change password");
    }
  };

  const handleSendFeedback = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/contactForms", { ...userInfo, message: feedback });
      setFeedback("");
      setMessage("Feedback sent successfully.");
      setError(null);
    } catch (error) {
      console.error("Error sending feedback:", error);
      setError("Failed to send feedback");
    }
  };

  return (
    <Container className="manage-user">
      <h2>Manage User</h2>
      {message && <CustomAlert variant="success" message={message} />}
      {error && <CustomAlert variant="danger" message={error} />}
      <Row>
        <Col md={6}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>
                <FontAwesomeIcon icon={faCalendarAlt} /> My Bookings
              </Card.Title>
              {bookings.length > 0 ? (
                <ListGroup>
                  {bookings.map((booking) => (
                    <ListGroup.Item key={booking._id}>
                      {booking.slot_id ? (
                        <>
                          <div>
                            <strong>Date:</strong>{" "}
                            {new Date(
                              booking.slot_id.date
                            ).toLocaleDateString()}
                          </div>
                          <div>
                            <strong>Time:</strong> {booking.slot_id.time}
                          </div>
                          <Button
                            variant="danger"
                            onClick={() => handleCancelBooking(booking._id)}
                          >
                            Cancel Booking
                          </Button>
                        </>
                      ) : (
                        <div>
                          <strong>This slot is no longer available.</strong>
                          <Button
                            variant="danger"
                            onClick={() => handleCancelBooking(booking._id)}
                          >
                            Remove Booking
                          </Button>
                        </div>
                      )}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              ) : (
                <p>No bookings available.</p>
              )}
            </Card.Body>
          </Card>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>
                <FontAwesomeIcon icon={faKey} /> Change Password
              </Card.Title>
              <Form onSubmit={handleChangePassword}>
                <Form.Group controlId="formPassword">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Change Password
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>
                <FontAwesomeIcon icon={faEnvelope} /> Send Feedback
              </Card.Title>
              <Form onSubmit={handleSendFeedback}>
                <Form.Group controlId="formFeedback">
                  <Form.Label>Feedback</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Send Feedback
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>
                <FontAwesomeIcon icon={faEdit} /> Edit User Information
              </Card.Title>
              <Form onSubmit={handleUpdateUserInfo}>
                <Form.Group controlId="formFirstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="first_name"
                    value={userInfo.first_name}
                    onChange={handleUserInfoChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formLastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="last_name"
                    value={userInfo.last_name}
                    onChange={handleUserInfoChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={userInfo.email}
                    onChange={handleUserInfoChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formPhoneNumber">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="phone_number"
                    value={userInfo.phone_number}
                    onChange={handleUserInfoChange}
                  />
                </Form.Group>
                <Form.Group controlId="formApartmentNumber">
                  <Form.Label>Apartment Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="apartment_number"
                    value={userInfo.apartment_number}
                    onChange={handleUserInfoChange}
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Update Information
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ManageUser;
