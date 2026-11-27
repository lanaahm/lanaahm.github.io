import React from 'react';

export interface SidebarNavItem {
  id: number;
  link: string;
  section: string;
  icon: React.ReactNode;
  text: string;
}

const sidebarNav: SidebarNavItem[] = [
  {
    id: 0,
    link: '/dashboard',
    section: 'home',
    icon: <i className="bx bx-home-alt" />,
    text: 'Home'
  },
  {
    id: 1,
    link: '/dashboard/experience',
    section: 'experience',
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
    link: '/dashboard/settings',
    section: 'settings',
    icon: <i className="bx bx-cog" />,
    text: 'Settings'
  }
];

export default sidebarNav;
