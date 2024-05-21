import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faCalendarCheck,
  faUserTag,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";

const AnalyticsHub = () => {
  const [totalBookings, setTotalBookings] = useState(0);
  const [bookingsByUserType, setBookingsByUserType] = useState([]);
  const [utilizationRate, setUtilizationRate] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [userDistribution, setUserDistribution] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const totalBookingsResponse = await axios.get(
        "/api/analytics/total-bookings"
      );
      setTotalBookings(totalBookingsResponse.data.totalBookings);

      const bookingsByUserTypeResponse = await axios.get(
        "/api/analytics/bookings-by-user-type"
      );
      setBookingsByUserType(bookingsByUserTypeResponse.data.bookingsByUserType);

      const utilizationRateResponse = await axios.get(
        "/api/analytics/slot-utilization-rate"
      );
      setUtilizationRate(utilizationRateResponse.data.utilizationRate);

      const totalUsersResponse = await axios.get("/api/analytics/total-users");
      setTotalUsers(totalUsersResponse.data.totalUsers);

      const userDistributionResponse = await axios.get(
        "/api/analytics/user-distribution-by-role"
      );
      setUserDistribution(userDistributionResponse.data.userDistribution);
    } catch (error) {
      console.error("Error fetching analytics:", error);
      setError("Failed to fetch analytics data. Please try again later.");
    }
  };

  return (
    <Container>
      <h2>Analytics Hub</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Row className="mb-4">
        <Col>
          <Card
            className="text-center shadow-sm"
            style={{ backgroundColor: "#f8f9fa" }}
          >
            <Card.Body>
              <Card.Title className="text-primary">
                <FontAwesomeIcon icon={faUsers} /> Total Users
              </Card.Title>
              <Card.Text className="text-center display-4">
                {totalUsers}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card
            className="text-center shadow-sm"
            style={{ backgroundColor: "#f8f9fa" }}
          >
            <Card.Body>
              <Card.Title className="text-success">
                <FontAwesomeIcon icon={faCalendarCheck} /> Active Bookings
              </Card.Title>
              <Card.Text className="text-center display-4">
                {totalBookings}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <Card
            className="text-center shadow-sm"
            style={{ backgroundColor: "#f8f9fa" }}
          >
            <Card.Body>
              <Card.Title className="text-info">
                <FontAwesomeIcon icon={faUserTag} /> Distribution by Role
              </Card.Title>
              {userDistribution.map((item) => (
                <Card.Text className="text-center" key={item._id}>
                  {item._id}: {item.count}
                </Card.Text>
              ))}
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card
            className="text-center shadow-sm"
            style={{ backgroundColor: "#f8f9fa" }}
          >
            <Card.Body>
              <Card.Title className="text-warning">
                <FontAwesomeIcon icon={faUserTag} /> Bookings by Role
              </Card.Title>
              {bookingsByUserType.map((item) => (
                <Card.Text className="text-center" key={item._id}>
                  {item._id}: {item.count}
                </Card.Text>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card
            className="text-center shadow-sm"
            style={{ backgroundColor: "#f8f9fa" }}
          >
            <Card.Body>
              <Card.Title className="text-danger">
                <FontAwesomeIcon icon={faChartLine} /> Slot Utilization Rate
              </Card.Title>
              <Card.Text className="text-center display-4">
                {utilizationRate}%
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AnalyticsHub;
