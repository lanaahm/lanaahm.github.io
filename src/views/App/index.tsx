import React from 'react';
import { Routes, Route, Navigate, BrowserRouter as Routers } from 'react-router-dom';
import { Provider } from 'react-redux';
import './globalStyles.scss';
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

const App: React.FC = () => (
  <Provider store={store}>
    <Routers future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
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
          <Route path="experience" element={<Experien />}>
            <Route path=":experienceId" element={<Experien />} />
          </Route>
          <Route path="experien/*" element={<Navigate to="/dashboard/experience" replace />} />
          <Route path="portfolio" element={<Portfolio />}>
            <Route path=":portfolioId" element={<Portfolio />} />
          </Route>
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="error/:code" element={<NotFound />} />
        <Route path="*" element={<NotFound code={404} />} />
      </Routes>
    </Routers>
  </Provider>
);

export default App;
