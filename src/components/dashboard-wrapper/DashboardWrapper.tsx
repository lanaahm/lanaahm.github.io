import React from 'react';
import './dashboard-wrapper.scss';

interface WrapperProps {
  children: React.ReactNode;
}

const DashboardWrapper: React.FC<WrapperProps> = ({ children }) => (
  <div className="dashboard-wrapper">{children}</div>
);

export default DashboardWrapper;

export const DashboardWrapperMain: React.FC<WrapperProps> = ({ children }) => (
  <div className="dashboard-wrapper__main">{children}</div>
);

export const DashboardWrapperRight: React.FC<WrapperProps> = ({ children }) => (
  <div className="dashboard-wrapper__right">{children}</div>
);
