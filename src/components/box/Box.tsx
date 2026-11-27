import React from 'react';
import './box.scss';

export interface BoxProps {
  purple?: boolean;
  fullheight?: boolean;
  children: React.ReactNode;
}

const Box: React.FC<BoxProps> = ({ purple, fullheight, children }) => {
  const classes = ['box', purple ? 'box-purple' : '', fullheight ? 'box-fullheight' : '']
    .filter(Boolean)
    .join(' ');

  return <div className={classes}>{children}</div>;
};

export default Box;
