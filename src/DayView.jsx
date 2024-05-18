import React from "react";
import PropTypes from "prop-types";
import { Button, Card, ListGroup, Alert } from "react-bootstrap";
import { filterAvailableSlots, formatDate } from "./utils";
import "./styles.css";

const DayView = ({ slots, selectedDate, handleBooking }) => {
  const filteredSlots = filterAvailableSlots(slots).filter(
    (slot) => formatDate(new Date(slot.date)) === formatDate(selectedDate)
  );

  return (
    <div className="booking-view">
      <h2>Day View</h2>
      {filteredSlots.length > 0 ? (
        <ListGroup>
          {filteredSlots.map((slot) => (
            <ListGroup.Item key={slot._id}>
              {slot.time} -{" "}
              <Button variant="primary" onClick={() => handleBooking(slot._id)}>
                Book Slot
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <Alert variant="info">No available slots for this day.</Alert>
      )}
    </div>
  );
};

DayView.propTypes = {
  slots: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
      availability: PropTypes.bool.isRequired,
    })
  ).isRequired,
  selectedDate: PropTypes.instanceOf(Date).isRequired,
  handleBooking: PropTypes.func.isRequired,
};

export default DayView;
