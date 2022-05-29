import React from 'react';
import { BsReddit } from 'react-icons/bs';
import './user-info.scss';

const UserInfo = ({ user }) => (
  <div className="user-info">
    <div className="user-info__img">
      <BsReddit />
    </div>
    <div className="user-info__name">
      <span>{user.name}</span>
    </div>
  </div>
);
export default UserInfo;
