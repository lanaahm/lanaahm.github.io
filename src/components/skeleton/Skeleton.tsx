import React from 'react';
import './skeleton.scss';

export interface SkeletonProps {
  width?: number | string;
  height?: number | string;
  borderRadius?: string;
  theme?: 'dark' | 'light';
  className?: string;
}

const toCssUnit = (val?: number | string): string | undefined => {
  if (val === undefined) return undefined;
  return typeof val === 'number' ? `${val}px` : val;
};

const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = 16,
  borderRadius = '0.6rem',
  theme = 'dark',
  className = ''
}) => (
  <span
    className={`ui-skeleton ui-skeleton--${theme} ${className}`.trim()}
    style={{
      width: toCssUnit(width),
      height: toCssUnit(height),
      borderRadius
    }}
    role="status"
    aria-label="Loading content"
  />
);

export default Skeleton;
