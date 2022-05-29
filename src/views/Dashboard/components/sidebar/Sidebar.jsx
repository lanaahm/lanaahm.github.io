import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SiAseprite } from 'react-icons/si';
import { sidebarNav } from '../../../../config/constants';
import './sidebar.scss';

const Sidebar = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const curPath = window.location.pathname.split('/')[1];
    const activeItem = sidebarNav.findIndex((item) => item.section === curPath);
    setActiveIndex(curPath.length === 0 ? 0 : activeItem);
  }, [location]);

  const closeSidebar = () => {
    document.querySelector('.main__content').style.transform =
      'scale(1) translateX(0)';
    setTimeout(() => {
      document.body.classList.remove('sidebar-open');
      document.querySelector('.main__content').style = '';
    }, 500);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        closeSidebar();
      }
    };

    window.addEventListener('resize', handleResize, false);
    return () => window.removeEventListener('resize', handleResize);
  }, [closeSidebar]);

  return (
    <div className="sidebar">
      <div className="sidebar__logo">
        <SiAseprite />
        <div
          className="sidebar-close"
          onClick={closeSidebar}
          aria-hidden="true"
        >
          <i className="bx bx-x" />
        </div>
      </div>
      <div className="sidebar__menu">
        {sidebarNav.map((nav, index) => (
          <Link
            key={nav.id}
            to={nav.link}
            className={`sidebar__menu__item ${
              activeIndex === index && 'active'
            }`}
            onClick={closeSidebar}
          >
            <div className="sidebar__menu__item__icon">{nav.icon}</div>
            <div className="sidebar__menu__item__txt">{nav.text}</div>
          </Link>
        ))}
        <div className="sidebar__menu__item">
          <div className="sidebar__menu__item__icon">
            <i className="bx bx-log-out" />
          </div>
          <div className="sidebar__menu__item__txt">Logout</div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
