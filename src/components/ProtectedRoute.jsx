import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStore from '../zustand/useAuthStore';

const ProtectedRoute = ({ children }) => {

  // Retrieve the current user from the auth Zustand store
  const user = useAuthStore(state => state.user);

  // If no user is currently connected, redirect the user to the SignIn page...
  if (!user) {
      return <Navigate to="/signin" replace={true} />;
  }

  // ...else, show the child page
  return children;
};

export default ProtectedRoute;