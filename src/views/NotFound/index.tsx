import React from 'react';
import { useParams } from 'react-router-dom';
import ErrorPage from '../../components/error-page/ErrorPage';

interface NotFoundProps {
  code?: number;
}

const NotFound: React.FC<NotFoundProps> = ({ code }) => {
  const params = useParams<{ code?: string }>();
  const parsedParam = params.code ? Number(params.code) : NaN;
  const resolvedCode =
    code ?? (Number.isInteger(parsedParam) && parsedParam >= 100 && parsedParam <= 599 ? parsedParam : 404);

  return <ErrorPage code={resolvedCode} />;
};

export default NotFound;
