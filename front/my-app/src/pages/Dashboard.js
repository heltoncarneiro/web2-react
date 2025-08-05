import React from 'react';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';

const DashboardContainer = styled.div`
  padding: 2rem;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.primary};
`;

const LogoutButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: ${({ theme }) => theme.secondary};
  color: white;
  border-radius: 4px;
  margin-top: 1rem;
`;

const Dashboard = () => {
    const { logout } = useAuth();

    return (
        <DashboardContainer>
            <Title>Dashboard</Title>
            <p>Bem-vindo ao EduSync!</p>
            <LogoutButton onClick={logout}>Sair</LogoutButton>
        </DashboardContainer>
    );
};

export default Dashboard;
