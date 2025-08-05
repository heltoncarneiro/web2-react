import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from './Navbar';

const MainContent = styled.main`
  padding: 1.5rem;
`;

const Layout = () => {
    return (
        <div>
            <Navbar />
            <MainContent>
                <Outlet />
            </MainContent>
        </div>
    );
};

export default Layout;
