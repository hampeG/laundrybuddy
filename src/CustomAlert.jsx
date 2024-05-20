import React, { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import PropTypes from "prop-types";

const CustomAlert = ({ variant, message, duration = 5000, onClose }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      if (onClose) {
        onClose();
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!show) {
    return null;
  }

  return (
    <Alert variant={variant} onClose={() => setShow(false)} dismissible>
      {message}
    </Alert>
  );
};

CustomAlert.propTypes = {
  variant: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  duration: PropTypes.number,
  onClose: PropTypes.func,
};

export default CustomAlert;
