import React from 'react';

import './badge.scss';

const Badge = ({ type, content, onClick = () => null }) => (
  <span className={`badge badge-${type}`} onClick={onClick} aria-hidden="true">
    {content}
  </span>
);

export default Badge;
