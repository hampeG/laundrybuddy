import React from 'react';
import UserManagement from '../components/UserManagement';
import ViewAnalytics from '../components/ViewAnalytics';
import ManageFeedback from '../components/ManageFeedback';
import AdminBand from './AdminBand';

const AdminDashboard = () => {
  return (
    <div>
      <AdminBand />
      <UserManagement />
      <ViewAnalytics />
      <ManageFeedback />
    </div>
  );
};

export default AdminDashboard;
