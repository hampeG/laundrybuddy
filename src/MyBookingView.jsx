import React, { useState } from "react";
import axios from "axios";
import { Button, ListGroup } from "react-bootstrap";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "./MyBookingView.css";
import CustomAlert from "./CustomAlert"; 

const MyBookingView = ({ bookings, handleCancelBooking }) => {
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  const handleCancel = async (bookingId) => {
    try {
      await axios.delete(`/api/bookings/${bookingId}`);
      setSuccessMessage("Booking canceled successfully.");
      setError(null);
      handleCancelBooking(); // Refresh bookings

      // Navigate to SlotManager (Month View) after 2 seconds
      setTimeout(() => {
        navigate("/book?view=month"); // Navigate to the SlotManager component with Month view
      }, 2000);
    } catch (error) {
      console.error("Error canceling booking:", error);
      setError("Error canceling booking. Please try again later.");
    }
  };

  return (
    <div className="mybs">
      <h2>My Bookings</h2>
      {error && <CustomAlert variant="danger" message={error} />}
      {successMessage && <CustomAlert variant="success" message={successMessage} />}
      {bookings.length > 0 ? (
        <ListGroup className="mybookwidth">
          {bookings.map((booking) => (
            <ListGroup.Item key={booking._id}>
              {booking.slot_id ? (
                <>
                  <div>
                    <strong>Date:</strong>{" "}
                    {new Date(booking.slot_id.date).toLocaleDateString()}
                  </div>
                  <div>
                    <strong>Time:</strong> {booking.slot_id.time}
                  </div>
                  <Button
                    variant="danger"
                    onClick={() => handleCancel(booking._id)}
                  >
                    Cancel Booking
                  </Button>
                </>
              ) : (
                <div>
                  <strong>This slot is no longer available.</strong>
                  <Button
                    variant="danger"
                    onClick={() => handleCancel(booking._id)}
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
    </div>
  );
};

MyBookingView.propTypes = {
  bookings: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      slot_id: PropTypes.shape({
        date: PropTypes.string.isRequired,
        time: PropTypes.string.isRequired,
      }),
    })
  ).isRequired,
  handleCancelBooking: PropTypes.func.isRequired,
};

export default MyBookingView;
