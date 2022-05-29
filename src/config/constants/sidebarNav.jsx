import React from 'react';

const sidebarNav = [
  {
    id: 0,
    link: '/dashboard',
    section: 'home',
    icon: <i className="bx bx-home-alt" />,
    text: 'Home'
  },
  {
    id: 1,
    link: '/dashboard/experien',
    section: 'experien',
    icon: <i className="bx bx-receipt" />,
    text: 'Experience'
  },
  {
    id: 2,
    link: '/dashboard/portfolio',
    section: 'portfolio',
    icon: <i className="bx bx-cube" />,
    text: 'Portfolio'
  },
  {
    id: 3,
    link: '/stats',
    section: 'stats',
    icon: <i className="bx bx-line-chart" />,
    text: 'Stats'
  },
  {
    id: 4,
    link: '/dashboard/settings',
    section: 'settings',
    icon: <i className="bx bx-cog" />,
    text: 'Settings'
  }
];

export default sidebarNav;
