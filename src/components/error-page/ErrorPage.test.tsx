import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ErrorPage from './ErrorPage';

describe('ErrorPage', () => {
  test('renders 404 defaults when no props are passed', () => {
    render(
      <MemoryRouter>
        <ErrorPage />
      </MemoryRouter>
    );
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
  });

  test('renders dynamic catalog metadata for 500 and fallback for unknown codes', () => {
    const { rerender } = render(
      <MemoryRouter>
        <ErrorPage code={500} />
      </MemoryRouter>
    );
    expect(screen.getByText('500')).toBeInTheDocument();
    expect(screen.getByText('Internal Server Error')).toBeInTheDocument();

    rerender(
      <MemoryRouter>
        <ErrorPage code={418} />
      </MemoryRouter>
    );
    expect(screen.getByText('418')).toBeInTheDocument();
    expect(screen.getByText('Unexpected Error')).toBeInTheDocument();
  });

  test('supports custom overrides and retry handler', () => {
    const handleRetry = jest.fn();
    render(
      <MemoryRouter>
        <ErrorPage code={503} title="Maintenance" onRetry={handleRetry} />
      </MemoryRouter>
    );
    expect(screen.getByText('Maintenance')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Try Again/i }));
    expect(handleRetry).toHaveBeenCalledTimes(1);
  });
});
