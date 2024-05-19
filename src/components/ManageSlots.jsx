import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Form,
  Button,
  Table,
  Alert,
  ButtonGroup,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faClock,
  faTrashAlt,
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import "../../src/styles.css";

const ManageSlots = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [slots, setSlots] = useState([]);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [displayCount, setDisplayCount] = useState(5); // State to manage number of slots displayed

  useEffect(() => {
    fetchSlots();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Adding an empty dependency array to ensure it runs only once on mount

  const fetchSlots = async () => {
    try {
      const response = await axios.get("/api/slots");
      setSlots(sortSlots(response.data));
    } catch (error) {
      console.error("Error fetching slots:", error);
      setError("Failed to fetch slots");
    }
  };

  const sortSlots = (slots) => {
    return slots.sort(
      (a, b) =>
        new Date(a.date) - new Date(b.date) || a.time.localeCompare(b.time)
    );
  };

  const handleCreateSlot = async (e) => {
    e.preventDefault();

    const slotDateTime = new Date(`${date}T${time}`);
    const now = new Date();
    const oneDayInMilliseconds = 24 * 60 * 60 * 1000;

    if (slotDateTime - now < oneDayInMilliseconds) {
      setError("Slot time must be at least 24 hours in the future.");
      setMessage(null);
      return;
    }

    try {
      const response = await axios.post("/api/slots", {
        date,
        time,
        availability: true,
      });
      setSlots(sortSlots([...slots, response.data]));
      setMessage("Slot created successfully");
      setError(null);
      setDate("");
      setTime("");
    } catch (error) {
      console.error("Error creating slot:", error);
      setMessage(null);
      setError("Failed to create slot");
    }
  };

  const handleDeleteSlot = async (slotId) => {
    try {
      await axios.delete(`/api/slots/${slotId}`);
      setSlots(slots.filter((slot) => slot._id !== slotId));
      setMessage("Slot deleted successfully");
      setError(null);
    } catch (error) {
      console.error("Error deleting slot:", error);
      setMessage(null);
      setError("Failed to delete slot");
    }
  };

  const formatDateTime = (date, time) => {
    const [hours, minutes] = time.split(":");
    const dateTime = new Date(date);
    dateTime.setHours(hours);
    dateTime.setMinutes(minutes);
    return dateTime.toLocaleString([], {
      dateStyle: "short",
      timeStyle: "short",
      hour12: true,
    });
  };

  return (
    <Container>
      <h2>Create Slots</h2>
      {message && (
        <Alert variant="success">
          <FontAwesomeIcon icon={faCheckCircle} /> {message}
        </Alert>
      )}
      {error && (
        <Alert variant="danger">
          <FontAwesomeIcon icon={faTimesCircle} /> {error}
        </Alert>
      )}
      <Form onSubmit={handleCreateSlot}>
        <Form.Group controlId="formDate" className="mb-3">
          <Form.Label>
            <FontAwesomeIcon icon={faCalendarAlt} /> Date
          </Form.Label>
          <Form.Control
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formTime" className="mb-3">
          <Form.Label>
            <FontAwesomeIcon icon={faClock} /> Time
          </Form.Label>
          <Form.Control
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          <FontAwesomeIcon icon={faCheckCircle} /> Create Slot
        </Button>
      </Form>
      <div className="d-flex justify-content-between align-items-center mt-4">
        <h2>Existing Slots</h2>
        <ButtonGroup className="bGroup">
          <Button variant="outline-primary" onClick={() => setDisplayCount(10)}>
            10
          </Button>
          <Button variant="outline-primary" onClick={() => setDisplayCount(20)}>
            20
          </Button>
          <Button
            variant="outline-primary"
            onClick={() => setDisplayCount(slots.length)}
          >
            All
          </Button>
        </ButtonGroup>
      </div>
      <Table striped bordered hover className="rounded mt-2">
        <thead>
          <tr>
            <th>Date & Time</th>
            <th>Availability</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {slots.slice(0, displayCount).map((slot) => (
            <tr key={slot._id}>
              <td>{formatDateTime(slot.date, slot.time)}</td>
              <td>{slot.availability ? "Available" : "Not Available"}</td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteSlot(slot._id)}
                >
                  <FontAwesomeIcon icon={faTrashAlt} /> Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ManageSlots;
