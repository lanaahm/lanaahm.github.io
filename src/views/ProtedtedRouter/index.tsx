import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import type { AppDispatch, RootState } from '../../config/store';
import { setLoginStatus } from '../../config/store/action';
import { getActiveSession, onAuthChange } from '../../services/authService';

interface ProtedtedRouterProps {
  children: React.ReactElement;
}

export const ProtedtedRouter: React.FC<ProtedtedRouterProps> = ({ children }) => {
  const isLogin = useSelector((state: RootState) => state.isLogin);
  const dispatch = useDispatch<AppDispatch>();
  const [checking, setChecking] = useState(!isLogin);

  useEffect(() => {
    let mounted = true;
    getActiveSession()
      .then((session) => {
        if (!mounted) return;
        dispatch(setLoginStatus(Boolean(session)));
        setChecking(false);
      })
      .catch(() => {
        if (mounted) setChecking(false);
      });

    const unsubscribe = onAuthChange((authenticated) => {
      dispatch(setLoginStatus(authenticated));
    });

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, [dispatch]);

  if (checking) return null;
  if (!isLogin) return <Navigate to="/login" />;

  return children;
};

export default ProtedtedRouter;
