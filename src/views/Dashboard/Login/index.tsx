import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { SiAseprite } from 'react-icons/si';
import type { AppDispatch, RootState } from '../../../config/store';
import { loginUserAPI } from '../../../config/store/action';
import './login.scss';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const isStoreLoading = useSelector((state: RootState) => state.isLoading);

  const [credentials, setCredentials] = useState({ user: '', password: '' });
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const busy = submitting || isStoreLoading;

  const handleChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials((prev) => ({ ...prev, [event.target.id]: event.target.value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (busy) return;
    setErrorMessage('');
    setSubmitting(true);
    try {
      const profile = await dispatch(
        loginUserAPI({ email: credentials.user, password: credentials.password })
      );
      localStorage.setItem('userData', JSON.stringify(profile));
      setCredentials({ user: '', password: '' });
      navigate('/dashboard');
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Invalid email or password.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleSubmit}>
        <div className="auth-header">
          <div className="auth-logo">
            <SiAseprite />
          </div>
          <h2 className="auth-title">Admin Dashboard</h2>
          <p className="auth-subtitle">Sign in to manage your portfolio content</p>
        </div>

        {errorMessage && (
          <div className="auth-error" role="alert">
            {errorMessage}
          </div>
        )}

        <div className="auth-field">
          <label htmlFor="user">Email Address</label>
          <input
            id="user"
            className="auth-input"
            type="email"
            placeholder="you@example.com"
            onChange={handleChangeText}
            value={credentials.user}
            disabled={busy}
            required
          />
        </div>

        <div className="auth-field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            className="auth-input"
            type="password"
            placeholder="Enter your password"
            onChange={handleChangeText}
            value={credentials.password}
            disabled={busy}
            required
          />
        </div>

        <button type="submit" className="auth-submit" disabled={busy}>
          {busy ? (
            <>
              <span className="auth-spinner" aria-hidden="true" />
              <span>Signing in...</span>
            </>
          ) : (
            'Sign In'
          )}
        </button>

        <Link to="/" className="auth-back">
          &larr; Back to Portfolio
        </Link>
      </form>
    </div>
  );
};

export default Login;
