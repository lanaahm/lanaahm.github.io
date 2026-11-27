import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import UserInfo from '../user-info/UserInfo';
import { data } from '../../../../config/constants';
import type { AppDispatch } from '../../../../config/store';
import { logoutUserAPI } from '../../../../config/store/action';
import Dropdown from '../../../../components/dropdown/Dropdown';
import './topnav.scss';

interface MenuItem {
  icon: string;
  content: string;
}

const TopNav: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const openSidebar = () => {
    document.body.classList.add('sidebar-open');
  };

  const handleLogout = async () => {
    await dispatch(logoutUserAPI()).catch(() => {});
    localStorage.removeItem('userData');
    navigate('/login');
  };

  const renderUserMenu = (item: MenuItem, index: number) => (
    <button type="button" key={index} className="notification-item" onClick={handleLogout}>
      <i className={item.icon} />
      <span>{item.content}</span>
    </button>
  );

  return (
    <div className="topnav">
      <Dropdown
        customToggle={() => <UserInfo user={data.user} />}
        contentData={[{ icon: 'bx bx-log-out-circle bx-rotate-180', content: 'Logout' }]}
        renderItems={renderUserMenu}
      />
      <div className="sidebar-toggle" onClick={openSidebar} aria-hidden="true">
        <i className="bx bx-menu-alt-right" />
      </div>
    </div>
  );
};

export default TopNav;
