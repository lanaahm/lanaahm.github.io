import React from 'react';
import './badge.scss';

export interface BadgeProps {
  type: string;
  content: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLSpanElement>;
}

const Badge: React.FC<BadgeProps> = ({ type, content, onClick }) => (
  <span className={`badge badge-${type}`} onClick={onClick} aria-hidden="true">
    {content}
  </span>
);

export default Badge;
