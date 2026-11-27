import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import ImageSkeleton from './ImageSkeleton';

describe('ImageSkeleton', () => {
  test('renders placeholder skeleton when src is empty', () => {
    render(<ImageSkeleton src="" alt="Empty project" />);
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'No image available');
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  test('renders image and hides skeleton after load', () => {
    render(<ImageSkeleton src="https://example.com/cover.png" alt="Demo" />);
    const img = screen.getByRole('img', { name: 'Demo' });
    expect(screen.getByRole('status')).toBeInTheDocument();

    fireEvent.load(img);
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    expect(img).toHaveClass('is-loaded');
  });

  test('falls back to skeleton when image fails to load', () => {
    render(<ImageSkeleton src="https://example.com/broken.png" alt="Broken" />);
    fireEvent.error(screen.getByRole('img', { name: 'Broken' }));
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'No image available');
  });
});
