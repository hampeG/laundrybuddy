import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./AboutContent.css";

const AboutContent = () => {
  return (
    <Container className="about-content">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>About Our Project</Card.Title>
              <Card.Text>
                We are the LaundryBuddy team, made up of Hampus Gunnarsson, Sam
                El Saati, and Zgjim Zhubaj. As students, we worked together on
                this project, rotating roles between backend, frontend, and
                database development. This collaborative approach ensured that
                each of us gained a comprehensive understanding of the entire
                project.
              </Card.Text>
              <Card.Text>
                Our project, LaundryBuddy, aims to streamline the process of
                booking laundry slots in shared facilities. Users can easily see
                available slots, make bookings, and manage their laundry
                schedules from their devices. By making laundry management more
                efficient and user-friendly, LaundryBuddy helps reduce the
                hassle of coordinating laundry times.
              </Card.Text>
              <Card.Text>
                Throughout the development, we focused on creating an intuitive
                user interface and robust backend system. We aimed to make
                LaundryBuddy accessible and helpful for everyone, ensuring a
                smooth experience for all users. We are proud of what we have
                achieved together and hope it makes a positive impact on those
                who use it.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutContent;
