import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageSlots = () => {
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const response = await axios.get('/api/slots');
        setSlots(response.data);
      } catch (error) {
        console.error('Error fetching slots:', error);
      }
    };

    fetchSlots();
  }, []);

  const handleDelete = async (slotId) => {
    try {
      await axios.delete(`/api/slots/${slotId}`);
      setSlots(slots.filter(slot => slot.id !== slotId));
    } catch (error) {
      console.error('Error deleting slot:', error);
    }
  };

  return (
    <div>
      <h2>Manage Slots</h2>
      <ul>
        {slots.map(slot => (
          <li key={slot.id}>
            {slot.time} - <button onClick={() => handleDelete(slot.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageSlots;
