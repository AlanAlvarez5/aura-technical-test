// src/routes/PrivateRoute.tsx

import React, { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Auth } from '../../context/Auth';

const Private: React.FC = () => {
  const { isLoggedIn } = useContext(Auth);
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default Private;