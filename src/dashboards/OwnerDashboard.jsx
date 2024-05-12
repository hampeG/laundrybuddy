import React from 'react';
import ManageSlots from './components/ManageSlots';
import UserManagement from './components/UserManagement';
import ViewAnalytics from './components/ViewAnalytics';

const OwnerDashboard = () => {
  return (
    <div>
      <h1>Owner Dashboard</h1>
      <ManageSlots />
      <UserManagement />
      <ViewAnalytics />
    </div>
  );
};

export default OwnerDashboard;
