import React from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './GlobalStyles';
import Index from './views/Index';

const theme = {
  colors: {
    header: '#fff',
  },
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Index />
    </ThemeProvider>
  );
}

export default App;
