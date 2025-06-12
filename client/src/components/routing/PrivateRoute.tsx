import React from 'react';
import { Navigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded: any = jwt_decode(token);
    const currentTime = Date.now() / 1000;

    if (decoded.exp < currentTime) {
      localStorage.removeItem('token');
      return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
  } catch (error) {
    localStorage.removeItem('token');
    return <Navigate to="/login" replace />;
  }
};

export default PrivateRoute; 