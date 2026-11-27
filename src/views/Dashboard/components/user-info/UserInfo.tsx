import React from 'react';
import { BsReddit } from 'react-icons/bs';
import './user-info.scss';

interface UserInfoProps {
  user: { name: string };
}

const UserInfo: React.FC<UserInfoProps> = ({ user }) => (
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
