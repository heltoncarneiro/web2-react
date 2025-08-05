import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import styled from 'styled-components';

const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border-left-color: ${({ theme }) => theme.primary};
  animation: spin 1s ease infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const FullPageSpinner = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

const ProtectedRoute = () => {
    const { token, loading } = useAuth();

    if (loading) {
        return <FullPageSpinner><Spinner /></FullPageSpinner>;
    }

    return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
