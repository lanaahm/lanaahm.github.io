import React from 'react';
import './topnav.scss';
import { Link } from 'react-router-dom';
import UserInfo from '../user-info/UserInfo';
import { data } from '../../../../config/constants';
import Dropdown from '../../../../components/dropdown/Dropdown';

const TopNav = () => {
  const openSidebar = () => {
    document.body.classList.add('sidebar-open');
  };

  const renderUserToggle = (user) => <UserInfo user={user} />;
  const renderUserMenu = (item, index) => (
    <Link to="/" key={index}>
      <div className="notification-item">
        <i className={item.icon} />
        <span>{item.content}</span>
      </div>
    </Link>
  );

  return (
    <div className="topnav">
      <Dropdown
        customToggle={() => renderUserToggle(data.user)}
        contentData={[
          {
            icon: 'bx bx-log-out-circle bx-rotate-180',
            content: 'Logout'
          }
        ]}
        renderItems={(item, index) => renderUserMenu(item, index)}
      />
      <div className="sidebar-toggle" onClick={openSidebar} aria-hidden="true">
        <i className="bx bx-menu-alt-right" />
      </div>
    </div>
  );
};

export default TopNav;
