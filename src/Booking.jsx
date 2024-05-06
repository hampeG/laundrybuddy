import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSlotById, bookSlot } from "./services/api";
import { Container, Row, Col, Card, Button, Alert } from "react-bootstrap";

function Booking() {
  const { slotId } = useParams();
  const [slot, setSlot] = useState(null);
  const [error, setError] = useState(null);
  const [confirmation, setConfirmation] = useState(null);
  const navigate = useNavigate(); // Ensure `navigate` is used

  useEffect(() => {
    getSlotById(slotId)
      .then((response) => setSlot(response.data))
      .catch((error) => {
        console.error("Error fetching slot details:", error);
        setError("Error fetching slot details.");
      });
  }, [slotId]);

  const handleBooking = () => {
    if (slot) {
      const bookingData = {
        user_id: "66389fe8e6272fa50172a90f", // Replace with an actual user ID
        slot_id: slot._id,
        bookingDate: slot.date,
      };

      bookSlot(bookingData)
        .then((response) => {
          setConfirmation(response.data.message);
          setError(null);

          // Redirect to the home page after 2 seconds
          setTimeout(() => {
            navigate("/");
          }, 2000);
        })
        .catch((error) => {
          console.error("Error booking slot:", error);
          setConfirmation(null);
          setError("Booking failed!");
        });
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

export default Booking;
