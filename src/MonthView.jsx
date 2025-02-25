import React from "react";
import PropTypes from "prop-types";
import { addDays, startOfMonth, endOfMonth, isSameDay } from "date-fns";
import {
  Button,
  Card,
  ListGroup,
  Alert,
  Col,
  Row,
  Container,
} from "react-bootstrap";
// eslint-disable-next-line no-unused-vars
import { filterAvailableSlots, formatDate } from "./utils";
import "./styles.css";

const MonthView = ({ slots, selectedDate, handleBooking }) => {
  const startOfMonthDate = startOfMonth(selectedDate);
  const endOfMonthDate = endOfMonth(selectedDate);

  const filteredSlots = filterAvailableSlots(slots).filter((slot) => {
    const slotDate = new Date(slot.date);
    return slotDate >= startOfMonthDate && slotDate <= endOfMonthDate;
  });

  const daysInMonth = [];
  for (
    let day = startOfMonthDate;
    day <= endOfMonthDate;
    day = addDays(day, 1)
  ) {
    daysInMonth.push(day);
  }

  const renderDays = () => {
    return daysInMonth.map((day, index) => (
      <Col key={index} xs={12} sm={6} md={4} lg={2} xl={2} className="mb-3">
        <Card>
          <Card.Header>{day.toDateString()}</Card.Header>
          <Card.Body className="cardPad">
            {filteredSlots.filter((slot) => isSameDay(new Date(slot.date), day))
              .length > 0 ? (
              <ListGroup>
                {filteredSlots
                  .filter((slot) => isSameDay(new Date(slot.date), day))
                  .map((slot) => (
                    <ListGroup.Item className="listPad" key={slot._id}>
                      
                      <Button
                        variant="success"
                        onClick={() => handleBooking(slot._id)}
                      >
                        {slot.time} - Book Slot
                      </Button>
                    </ListGroup.Item>
                  ))}
              </ListGroup>
            ) : (
              <Alert variant="danger">No slots.</Alert>
            )}
          </Card.Body>
        </Card>
      </Col>
    ));
  };

  return (
    <Container className="booking-view">
      <h2>Month View</h2>
      <Row>{renderDays()}</Row>
    </Container>
  );
};

MonthView.propTypes = {
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

export default MonthView;
