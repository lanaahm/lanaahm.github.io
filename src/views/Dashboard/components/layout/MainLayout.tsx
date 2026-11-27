import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';
import TopNav from '../topnav/TopNav';
import './main-layout.scss';

const MainLayout: React.FC = () => (
  <>
    <Sidebar />
    <div className="main">
      <div className="main__content">
        <TopNav />
        <Outlet />
      </div>
    </div>
  </>
);

export default MainLayout;
