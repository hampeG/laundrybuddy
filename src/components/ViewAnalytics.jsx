import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewAnalytics = () => {
  const [analytics, setAnalytics] = useState({ bookings: 0, feedbackPositiveRate: 0 });

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await axios.get('/api/analytics');
        setAnalytics(response.data);
      } catch (error) {
        console.error('Error fetching analytics:', error);
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <div>
      <h2>View Analytics</h2>
      <p>Total Bookings: {analytics.bookings}</p>
      <p>Positive Feedback: {analytics.feedbackPositiveRate}%</p>
    </div>
  );
};

export default ViewAnalytics;
