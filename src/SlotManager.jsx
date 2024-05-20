import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import DayView from "./DayView";
import WeekView from "./WeekView";
import MonthView from "./MonthView";
import MyBookingView from "./MyBookingView";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "./context/AuthContext";
import { Tabs, Tab, Container, Row, Col, Form } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import "./styles.css";
import CustomAlert from "./CustomAlert";

const SlotManager = () => {
  const [slots, setSlots] = useState([]);
  const [view, setView] = useState("month");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const { user } = useAuth();
  const [myBookings, setMyBookings] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const fetchSlots = useCallback(async () => {
    try {
      const response = await axios.get("/api/slots");
      setSlots(response.data);
    } catch (error) {
      console.error("Error fetching slots:", error);
      setError("Error fetching slots. Please try again later.");
    }
  }, []);

  const fetchMyBookings = useCallback(async () => {
    if (user && user._id) {
      try {
        const response = await axios.get(`/api/bookings/user/${user._id}`);
        setMyBookings(response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setError("Error fetching bookings. Please try again later.");
      }
    }
  }, [user]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const viewParam = params.get("view");
    if (viewParam) {
      setView(viewParam);
    }
  }, [location]);

  useEffect(() => {
    if (view === "my-bookings") {
      fetchMyBookings();
    } else {
      fetchSlots();
    }
    setSuccessMessage(null);
    setError(null);
  }, [view, fetchSlots, fetchMyBookings]);

  const handleSelect = (key) => {
    setView(key);
    setError(null);
    setSuccessMessage(null);
    navigate(`/book?view=${key}`);
  };

  const handleDateChange = (e) => {
    setSelectedDate(new Date(e.target.value));
  };

  const handleBooking = async (slotId) => {
    if (!user || !user._id) {
      setError("User not authenticated. Please log in.");
      return;
    }

    try {
      const bookingData = {
        userId: user._id,
        slotId: slotId,
        bookingDate: selectedDate.toISOString(),
      };

      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("No authentication token found. Please log in.");
      }

      await axios.post("/api/bookings", bookingData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setSuccessMessage("Booking confirmed!");
      setError(null);

      setView("my-bookings");
      fetchMyBookings();
    } catch (error) {
      console.error("Error booking slot:", error);
      setError(
        error.response?.data?.message ||
          "Error booking slot. Please try again later."
      );
      setSuccessMessage(null);
    }
  };

  return (
    <>
      <div className="white-band-container">
        <div className="white-band-text">
          <FontAwesomeIcon icon={faCalendar} className="white-band-icon" />
          Booking Manager
        </div>
      </div>
      <Container className="booking-view">
        <Row></Row>
        <Row>
          <Col>
            <Form.Group controlId="datePicker">
              <Form.Label className="selectDate">Select Date:</Form.Label>
              <Form.Control
                type="date"
                value={selectedDate.toISOString().substring(0, 10)}
                onChange={handleDateChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            {error && <CustomAlert variant="danger" message={error} />}
            {successMessage && (
              <CustomAlert variant="success" message={successMessage} />
            )}
            <Tabs
              activeKey={view}
              onSelect={handleSelect}
              className="mb-3 tabz"
            >
              <Tab eventKey="month" title="Month view">
                <MonthView
                  slots={slots}
                  selectedDate={selectedDate}
                  handleBooking={handleBooking}
                />
              </Tab>
              <Tab eventKey="week" title="Week view">
                <WeekView
                  slots={slots}
                  selectedDate={selectedDate}
                  handleBooking={handleBooking}
                />
              </Tab>
              <Tab eventKey="day" title="Day view">
                <DayView
                  slots={slots}
                  selectedDate={selectedDate}
                  handleBooking={handleBooking}
                />
              </Tab>
              {user && (
                <Tab eventKey="my-bookings" title="My Bookings">
                  <MyBookingView
                    bookings={myBookings}
                    handleCancelBooking={fetchMyBookings}
                  />
                </Tab>
              )}
            </Tabs>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SlotManager;
