import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiAlertOctagon, FiArrowLeft, FiHome, FiRefreshCw } from 'react-icons/fi';
import { getErrorMetadata } from './errorCatalog';
import './error-page.scss';

export interface ErrorPageProps {
  code?: number;
  title?: string;
  description?: string;
  actionLabel?: string;
  actionTo?: string;
  onRetry?: () => void;
}

const ErrorPage: React.FC<ErrorPageProps> = ({
  code = 404,
  title,
  description,
  actionLabel = 'Back to Home',
  actionTo = '/',
  onRetry
}) => {
  const navigate = useNavigate();
  const fallback = getErrorMetadata(code);

  return (
    <main className="error-page">
      <section className="error-page__card" role="alert">
        <div className="error-page__badge" aria-hidden="true">
          <FiAlertOctagon />
        </div>
        <p className="error-page__code">{code}</p>
        <h1 className="error-page__title">{title || fallback.title}</h1>
        <p className="error-page__description">{description || fallback.description}</p>

        <div className="error-page__actions">
          <Link to={actionTo} className="btn btn-primary error-page__btn">
            <FiHome />
            <span>{actionLabel}</span>
          </Link>
          <button
            type="button"
            className="btn error-page__btn"
            onClick={() => navigate(-1)}
          >
            <FiArrowLeft />
            <span>Go Back</span>
          </button>
          {onRetry && (
            <button type="button" className="btn error-page__btn" onClick={onRetry}>
              <FiRefreshCw />
              <span>Try Again</span>
            </button>
          )}
        </div>
      </section>
    </main>
  );
};

export default ErrorPage;
