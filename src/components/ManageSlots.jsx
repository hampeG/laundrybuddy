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
  const [displayCount, setDisplayCount] = useState(5);

  useEffect(() => {
    fetchSlots();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchSlots = async () => {
    try {
      const { data } = await axios.get("/api/slots");
      const allSlots = data;
      setSlots(sortSlots(allSlots));
    } catch (error) {
      console.error("Error fetching slots:", error);
      setError("Failed to fetch slots");
    }
  };

  const sortSlots = (slots) => {
    return slots.sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  const handleCreateSlot = async (e) => {
    e.preventDefault();

    const slotDate = new Date(date);
    const [hours, minutes] = time.split(":");
    slotDate.setHours(hours);
    slotDate.setMinutes(minutes);

    const expiryDate = new Date(slotDate); // Set expiry to slot time

    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axios.post("/api/slots", {
        date: slotDate.toISOString(),
        time,
        availability: true,
        expiryDate: expiryDate.toISOString(),
      });
      await fetchSlots();
      setMessage("Slot created successfully");
      setError(null);
      setDate("");
      setTime("");
    } catch (error) {
      console.error(
        "Error creating slot:",
        error.response ? error.response.data : error.message
      );
      setMessage(null);
      setError("Failed to create slot");
    }
  };

  const handleDeleteSlot = async (slotId) => {
    try {
      await axios.delete(`/api/slots/${slotId}`);
      await fetchSlots();
      setMessage("Slot deleted successfully");
      setError(null);
    } catch (error) {
      console.error("Error deleting slot:", error);
      setMessage(null);
      setError("Failed to delete slot");
    }
  };

  const formatDateTime = (dateString) => {
    const [datePart, timePart] = dateString.split("T");
    const [year, month, day] = datePart.split("-");
    const [hours, minutes] = timePart.split(":");

    const dateTime = new Date(year, month - 1, day, hours, minutes);

    let displayHours = dateTime.getHours();
    const displayMinutes = dateTime.getMinutes();
    const ampm = displayHours >= 12 ? "PM" : "AM";
    displayHours = displayHours % 12;
    displayHours = displayHours ? displayHours : 12;
    const minutesStr =
      displayMinutes < 10 ? "0" + displayMinutes : displayMinutes;

    const displayDay = dateTime.getDate();
    const displayMonth = dateTime.getMonth() + 1;
    const displayYear = dateTime.getFullYear();

    return `${displayMonth}/${displayDay}/${displayYear}, ${displayHours}:${minutesStr} ${ampm}`;
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
            <th>Date & Time (GMT)</th>
            <th>Availability</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {slots.slice(0, displayCount).map((slot) => (
            <tr key={slot._id}>
              <td>{formatDateTime(slot.date)}</td>
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
