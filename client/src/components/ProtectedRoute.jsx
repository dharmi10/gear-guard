import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  // If no user, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If allowedRoles is specified, check if user has permission
  if (allowedRoles && allowedRoles.length > 0) {
    const userRole = user.role?.toLowerCase();
    const hasPermission = allowedRoles.some(
      role => role.toLowerCase() === userRole
    );

    if (!hasPermission) {
      // Redirect to their appropriate dashboard
      switch(userRole) {
        case 'admin':
          return <Navigate to="/admin-dashboard" replace />;
        case 'technician':
          return <Navigate to="/dashboard" replace />;
        case 'manager':
          return <Navigate to="/manager-dashboard" replace />;
        case 'user':
        case 'requester':
          return <Navigate to="/requester-dashboard" replace />;
        default:
          return <Navigate to="/login" replace />;
      }
    }
  }

  // User is authenticated and has permission
  return children;
};

export default ProtectedRoute;