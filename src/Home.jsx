import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchSlots } from "./services/api";
import { Container, Row, Col, ListGroup, Button, Alert } from "react-bootstrap";

function Home() {
  const [slots, setSlots] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSlots()
      .then((response) => {
        const data = response.data;
        if (Array.isArray(data)) {
          setSlots(data);
        } else {
          console.error("Expected an array but got:", data);
          setError("Data format error");
          setSlots([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching slots:", error);
        setError("Error fetching slots");
        setSlots([]);
      });
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          <h1 className="mt-4 mb-4">Available Slots</h1>
          {error && <Alert variant="danger">{error}</Alert>}
          {slots.length > 0 ? (
            <ListGroup>
              {slots.map((slot) => (
                <ListGroup.Item key={slot._id} className="d-flex justify-content-between align-items-center">
                  <span>
                    {slot.date} {slot.time} -{" "}
                    {slot.availability ? "Available" : "Booked"}
                  </span>
                  {slot.availability && (
                    <Link to={`/book/${slot._id}`}>
                      <Button variant="primary">Book Now</Button>
                    </Link>
                  )}
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <p>No slots available right now.</p>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
