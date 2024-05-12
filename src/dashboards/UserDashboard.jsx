import React from 'react';
import BookSlot from './components/BookSlot';
import ViewSlots from './components/ViewSlots';
import CancelBooking from './components/CancelBooking';

const UserDashboard = () => {
  return (
    <div>
      <h1>User Dashboard</h1>
      <ViewSlots />
      <BookSlot />
      <CancelBooking />
    </div>
  );
};

export default UserDashboard;
