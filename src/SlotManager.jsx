import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import DayView from "./DayView";
import WeekView from "./WeekView";
import MonthView from "./MonthView";
import MyBookingView from "./MyBookingView";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "./context/AuthContext";
import {
  Tabs,
  Tab,
  Container,
  Row,
  Col,
  Form,
  Button,
  InputGroup,
} from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import "./styles.css";
import CustomAlert from "./CustomAlert";

const SlotManager = () => {
  const { user } = useAuth();
  const [slots, setSlots] = useState([]);
  const [view, setView] = useState("month");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [myBookings, setMyBookings] = useState([]);
  const [filteredSlots, setFilteredSlots] = useState([]);
  const [inputDate, setInputDate] = useState(new Date());
  const location = useLocation();
  const navigate = useNavigate();

  const fetchSlots = useCallback(async () => {
    try {
      const response = await axios.get("/api/slots");
      const allSlots = response.data;
      const now = new Date();



      // Step 2: Identify expired slots and log them
      const expiredSlotIds = allSlots
        .filter((slot) => new Date(slot.expiryDate) < now)
        .map((slot) => slot._id);



      // Step 3: Update expired slots in the backend
      if (expiredSlotIds.length > 0) {
        const updateResponse = await axios.put("/api/slots/expire", {
          ids: expiredSlotIds,
        });
        console.log("Update response for expired slots:", updateResponse.data);
      }

      // Step 4: Filter out non-expired slots and update state
      const nonExpiredSlots = allSlots.filter(
        (slot) => new Date(slot.expiryDate) >= now
      );
      setSlots(nonExpiredSlots);
      setFilteredSlots(nonExpiredSlots);
      console.log("Non-expired slots:", nonExpiredSlots);
    } catch (error) {
      console.error("Error fetching slots:", error);
      setError("Error fetching slots. Please try again later.");
    }
  }, []);

  useEffect(() => {
    fetchSlots();
  }, [fetchSlots]);

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
    const value = e.target.value;
    if (value) {
      setInputDate(new Date(value));
    } else {
      setInputDate(null);
    }
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
        bookingDate: selectedDate ? selectedDate.toISOString() : null,
      };

      console.log("Booking data:", bookingData);

      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("No authentication token found. Please log in.");
      }

      console.log("Authentication token found:", token);

      const response = await axios.post(
        `/api/slots/${slotId}/book`,
        bookingData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Slot booked successfully:", response.data);

      // Refetch slots to update state
      fetchSlots();
    } catch (error) {
      console.error(
        "Error booking slot:",
        error.response ? error.response.data : error.message
      );
      setError(error.message);
    }

    setSuccessMessage(
      "Slot booked successfully. Redirecting to My Bookings..."
    );

    // Redirect to My Bookings after 2 seconds
    setTimeout(() => {
      navigate("/book?view=my-bookings");
    }, 2000);
  };

  const handleGoToDate = () => {
    if (!inputDate || isNaN(inputDate)) {
      setError("Invalid date. Please select a valid date.");
      return;
    }
    setError(null);
    setSuccessMessage(`Showing slots for ${inputDate.toDateString()}`);
    setSelectedDate(inputDate);

    // Filter slots by selected date
    const filtered = slots.filter((slot) => {
      const slotDate = new Date(slot.date);
      return (
        slotDate.getFullYear() === inputDate.getFullYear() &&
        slotDate.getMonth() === inputDate.getMonth() &&
        slotDate.getDate() === inputDate.getDate()
      );
    });
    setFilteredSlots(filtered);
  };

  const formatDateString = (date) => {
    return date ? date.toISOString().substring(0, 10) : "";
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
              <InputGroup>
                <Button onClick={handleGoToDate} className="btn-date">
                  Go to date
                </Button>
                <Form.Control
                  type="date"
                  value={formatDateString(inputDate)}
                  onChange={handleDateChange}
                />
              </InputGroup>
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
                  slots={filteredSlots}
                  selectedDate={selectedDate}
                  handleBooking={handleBooking}
                />
              </Tab>
              <Tab eventKey="week" title="Week view">
                <WeekView
                  slots={filteredSlots}
                  selectedDate={selectedDate}
                  handleBooking={handleBooking}
                />
              </Tab>
              <Tab eventKey="day" title="Day view">
                <DayView
                  slots={filteredSlots}
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
