import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSlotById, bookSlot } from "./services/api";
import { Container, Row, Col, Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "./context/AuthContext";
import PropTypes from "prop-types";

function Booking() {
  const { slotId } = useParams();
  const [slot, setSlot] = useState(null);
  const [error, setError] = useState(null);
  const [confirmation, setConfirmation] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (slotId) {
      getSlotById(slotId)
        .then((data) => setSlot(data))
        .catch((error) => {
          console.error("Error fetching slot details:", error);
          setError(error.message);
        });
    }
  }, [slotId]);

  const handleBooking = async () => {
    if (!user || !user._id) {
      setError("User not authenticated. Please log in.");
      navigate("/login");
      return;
    }

    if (slot) {
      const bookingData = {
        userId: user._id,
        slotId: slot._id,
        bookingDate: slot.date,
      };

      console.log("Booking data being sent:", bookingData);

      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          throw new Error("No authentication token found. Please log in.");
        }

        // eslint-disable-next-line no-unused-vars
        const response = await bookSlot(bookingData, token);

        setConfirmation("Booking confirmed!");
        setError(null);

        setTimeout(() => {
          navigate("/");
        }, 2000);
      } catch (error) {
        console.error("Error booking slot:", error);
        setConfirmation(null);
        setError(error.message);
      }
    }
  };

  if (!slot) return <p>Loading...</p>;

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          <h1 className="mt-4 mb-4">Booking Slot</h1>
          {error && <Alert variant="danger">{error}</Alert>}
          {confirmation && <Alert variant="success">{confirmation}</Alert>}
          <Card>
            <Card.Body>
              <Card.Title>Date: {slot.date}</Card.Title>
              <Card.Text>
                <strong>Time:</strong> {slot.time}
                <br />
                <strong>Status:</strong>{" "}
                {slot.availability ? "Available" : "Not Available"}
              </Card.Text>
              {slot.availability && (
                <Button variant="primary" onClick={handleBooking}>
                  Confirm Booking
                </Button>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

Booking.propTypes = {
  slotId: PropTypes.string.isRequired,
};

export default Booking;
