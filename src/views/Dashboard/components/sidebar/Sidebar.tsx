import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { SiAseprite } from 'react-icons/si';
import { sidebarNav } from '../../../../config/constants';
import type { AppDispatch } from '../../../../config/store';
import { logoutUserAPI } from '../../../../config/store/action';
import './sidebar.scss';

const Sidebar: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const segment = location.pathname.split('/')[2] || 'home';
    const found = sidebarNav.findIndex((item) => item.section === segment);
    setActiveIndex(found >= 0 ? found : 0);
  }, [location.pathname]);

  const closeSidebar = useCallback(() => {
    const mainContent = document.querySelector<HTMLElement>('.main__content');
    if (mainContent) mainContent.style.transform = 'scale(1) translateX(0)';
    setTimeout(() => {
      document.body.classList.remove('sidebar-open');
      if (mainContent) mainContent.removeAttribute('style');
    }, 500);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) closeSidebar();
    };
    window.addEventListener('resize', handleResize, false);
    return () => window.removeEventListener('resize', handleResize);
  }, [closeSidebar]);

  const handleLogout = async () => {
    await dispatch(logoutUserAPI()).catch(() => {});
    localStorage.removeItem('userData');
    navigate('/login');
  };

  return (
    <div className="sidebar">
      <div className="sidebar__logo">
        <SiAseprite />
        <div className="sidebar-close" onClick={closeSidebar} aria-hidden="true">
          <i className="bx bx-x" />
        </div>
      </div>
      <div className="sidebar__menu">
        {sidebarNav.map((nav, index) => (
          <Link
            key={nav.id}
            to={nav.link}
            className={`sidebar__menu__item ${activeIndex === index ? 'active' : ''}`}
            onClick={closeSidebar}
          >
            <div className="sidebar__menu__item__icon">{nav.icon}</div>
            <div className="sidebar__menu__item__txt">{nav.text}</div>
          </Link>
        ))}
        <button type="button" className="sidebar__menu__item" onClick={handleLogout}>
          <div className="sidebar__menu__item__icon">
            <i className="bx bx-log-out" />
          </div>
          <div className="sidebar__menu__item__txt">Logout</div>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
