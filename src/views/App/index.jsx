/* eslint-disable react/jsx-wrap-multilines */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Routes, Route, HashRouter as Routers } from 'react-router-dom';
import { Provider } from 'react-redux';
import GlobalStyles from './GlobalStyles';
import Home from '../Home';
import Dashboard from '../Dashboard';
import Login from '../Dashboard/Login';
import NotFound from '../NotFound';
import { store } from '../../config/store';
import Main from '../Dashboard/Main';
import Experien from '../Dashboard/Experien';
import Portfolio from '../Dashboard/Portfolio';
import Settings from '../Dashboard/setting';
import ProtedtedRouter from '../ProtedtedRouter';

const theme = {
  colors: {
    header: '#fff'
  }
};

const App = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Routers>
        <GlobalStyles />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route
            path="dashboard"
            element={
              <ProtedtedRouter>
                <Dashboard />
              </ProtedtedRouter>
            }
          >
            <Route index element={<Main />} />
            <Route path="experien" element={<Experien />}>
              <Route path=":experienId" element={<Experien />} />
            </Route>
            <Route path="portfolio" element={<Portfolio />}>
              <Route path=":portfolioId" element={<Portfolio />} />
            </Route>
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Routers>
    </ThemeProvider>
  </Provider>
);

export default App;
