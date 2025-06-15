import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../utils/authContext';

const ProtectedRoute = ({ children, roles }) => {
  const { user } = useAuth();

  // Not logged in
  if (!user) {
    return <Navigate to="/auth/signin" replace />;
  }

  // Extract roles from nested structure
  const userRoles = user.user?.userRoles?.map(r => r.role?.name?.toLowerCase()) || [];

  // Check role access
  if (roles && !roles.some(role => userRoles.includes(role.toLowerCase()))) {
    return <Navigate to="/notfound" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
