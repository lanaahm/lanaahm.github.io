import React, { useEffect, useState } from 'react';
import { FiImage } from 'react-icons/fi';
import './image-skeleton.scss';

export interface ImageSkeletonProps {
  src?: string | null;
  alt: string;
  height?: number | string;
  borderRadius?: string;
  className?: string;
}

const ImageSkeleton: React.FC<ImageSkeletonProps> = ({
  src,
  alt,
  height = 180,
  borderRadius = '1.5rem',
  className = ''
}) => {
  const [loaded, setLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setLoaded(false);
    setHasError(false);
  }, [src]);

  const showPlaceholder = !src || hasError;
  const containerStyle: React.CSSProperties = {
    height: typeof height === 'number' ? `${height}px` : height,
    borderRadius
  };

  return (
    <div
      className={`image-skeleton ${className}`.trim()}
      style={containerStyle}
      data-testid="image-skeleton-container"
    >
      {(showPlaceholder || !loaded) && (
        <div
          className={`image-skeleton__shimmer ${showPlaceholder ? 'is-empty' : ''}`.trim()}
          role="status"
          aria-label={showPlaceholder ? 'No image available' : 'Loading image'}
        >
          <FiImage className="image-skeleton__icon" aria-hidden="true" />
        </div>
      )}
      {!showPlaceholder && (
        <img
          src={src}
          alt={alt}
          className={`image-skeleton__img ${loaded ? 'is-loaded' : ''}`.trim()}
          onLoad={() => setLoaded(true)}
          onError={() => setHasError(true)}
        />
      )}
    </div>
  );
};

export default ImageSkeleton;
