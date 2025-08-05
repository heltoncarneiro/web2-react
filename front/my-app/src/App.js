
import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import RoutesApp from './routesapp';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import GlobalStyle from './styles/GlobalStyle';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <GlobalStyle />
        <Toaster position="top-right" />
        <RoutesApp />
      </AuthProvider>
    </ThemeProvider>
  );
}


export default App;
