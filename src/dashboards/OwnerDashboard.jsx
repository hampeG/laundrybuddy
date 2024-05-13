import React from 'react';
import ManageSlots from '../components/ManageSlots.jsx';
import UserManagement from '../components/UserManagement.jsx';

const OwnerDashboard = () => {
  return (
    <div>
      <h1>Owner Dashboard</h1>
      <ManageSlots />
      <UserManagement />
    </div>
  );
};

export default OwnerDashboard;
