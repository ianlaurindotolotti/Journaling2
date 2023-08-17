import React from 'react';
import { Navigate } from 'react-router-dom';

const isTokenValid = () => {
  const token = localStorage.getItem('token'); 

  if (token) {
    return true;
  }

  return false;
};

interface ProtectedRouteProps {
  element: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  if (isTokenValid()) {
    return <>{element}</>
  }

  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;
