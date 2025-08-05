import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';

const Nav = styled.nav`
  background: ${({ theme }) => theme.primary};
  padding: 1rem 2rem;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    align-items: flex-start;
    gap: 0.5rem;
  }
`;

const StyledNavLink = styled(NavLink)`
  color: white;
  text-decoration: none;
  font-weight: bold;

  &.active {
    text-decoration: underline;
  }
`;

const LogoutButton = styled.button`
  color: white;
  font-weight: bold;
  font-size: 1rem;
`;

const Navbar = () => {
    const { token, logout } = useAuth();

    return (
        <Nav>
            <StyledNavLink to="/">EduSync</StyledNavLink>
            <NavLinks>
                {token ? (
                    <>
                        <StyledNavLink to="/students">Alunos</StyledNavLink>
                        <StyledNavLink to="/disciplines">Disciplinas</StyledNavLink>
                        <StyledNavLink to="/enrollments">Matrículas</StyledNavLink>
                        <LogoutButton onClick={logout}>Sair</LogoutButton>
                    </>
                ) : (
                    <>
                        <StyledNavLink to="/login">Login</StyledNavLink>
                        <StyledNavLink to="/register">Register</StyledNavLink>
                    </>
                )}
            </NavLinks>
        </Nav>
    );
};

export default Navbar;
