import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Table, Button, Alert, Modal, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faReply } from "@fortawesome/free-solid-svg-icons";
import "./ManageFeedback.css";

const ManageFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentFeedback, setCurrentFeedback] = useState({});
  const [adminReply, setAdminReply] = useState({
    adminFirstName: "",
    adminLastName: "",
    adminEmail: "",
    replyMessage: "",
  });

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get("/api/contactForms");
      setFeedbacks(response.data);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
      setError("Failed to fetch feedbacks");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/contactForms/${id}`);
      setFeedbacks(feedbacks.filter((feedback) => feedback._id !== id));
      setMessage("Feedback deleted successfully");
      setError(null);
    } catch (error) {
      console.error("Error deleting feedback:", error);
      setMessage(null);
      setError("Failed to delete feedback");
    }
  };

  const handleReply = (feedback) => {
    setCurrentFeedback(feedback);
    setShowModal(true);
  };

  const handleSendReply = async () => {
    try {
      const response = await axios.post("/api/sendReply", {
        to: currentFeedback.email,
        from: adminReply.adminEmail,
        subject: "Reply to your feedback",
        text: adminReply.replyMessage,
        adminFirstName: adminReply.adminFirstName,
        adminLastName: adminReply.adminLastName,
      });

      if (response.status === 200) {
        setMessage("Reply sent successfully");
      } else {
        setError("Failed to send reply");
      }

      setShowModal(false);
    } catch (error) {
      console.error("Error sending reply:", error);
      setMessage(null);
      setError("Failed to send reply");
    }
  };

  return (
    <Container>
      <h2>Manage Feedback</h2>
      {message && <Alert variant="success">{message}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
      <Table striped bordered hover className="rounded">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Message</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.map((feedback) => (
            <tr key={feedback._id}>
              <td>{feedback.first_name}</td>
              <td>{feedback.last_name}</td>
              <td>{feedback.message}</td>
              <td>
                <Button
                  variant="warning"
                  className="me-2"
                  onClick={() => handleReply(feedback)}
                >
                  <FontAwesomeIcon icon={faReply} /> Reply
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(feedback._id)}
                >
                  <FontAwesomeIcon icon={faTrashAlt} /> Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Reply to Feedback</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formAdminFirstName">
              <Form.Label>Admin First Name</Form.Label>
              <Form.Control
                type="text"
                value={adminReply.adminFirstName}
                onChange={(e) =>
                  setAdminReply({
                    ...adminReply,
                    adminFirstName: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="formAdminLastName">
              <Form.Label>Admin Last Name</Form.Label>
              <Form.Control
                type="text"
                value={adminReply.adminLastName}
                onChange={(e) =>
                  setAdminReply({
                    ...adminReply,
                    adminLastName: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="formAdminEmail">
              <Form.Label>Admin Email</Form.Label>
              <Form.Control
                type="email"
                value={adminReply.adminEmail}
                onChange={(e) =>
                  setAdminReply({ ...adminReply, adminEmail: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formReplyMessage">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={adminReply.replyMessage}
                onChange={(e) =>
                  setAdminReply({ ...adminReply, replyMessage: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSendReply}>
            Send Reply
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ManageFeedback;
