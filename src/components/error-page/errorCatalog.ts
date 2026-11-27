export interface ErrorMetadata {
  title: string;
  description: string;
}

const ERROR_CATALOG: Record<number, ErrorMetadata> = {
  400: {
    title: 'Bad Request',
    description: 'The request could not be understood. Please check your input and try again.'
  },
  401: {
    title: 'Unauthorized',
    description: 'You need to sign in with valid credentials to access this page.'
  },
  403: {
    title: 'Access Forbidden',
    description: 'You do not have permission to view this resource.'
  },
  404: {
    title: 'Page Not Found',
    description: 'The page you are looking for might have been moved, deleted, or never existed.'
  },
  408: {
    title: 'Request Timeout',
    description: 'The server took too long to respond. Please retry in a moment.'
  },
  429: {
    title: 'Too Many Requests',
    description: 'You have made too many requests in a short period. Please wait a bit.'
  },
  500: {
    title: 'Internal Server Error',
    description: 'Something went wrong on our side. Please try again shortly.'
  },
  502: {
    title: 'Bad Gateway',
    description: 'Received an invalid response from an upstream service.'
  },
  503: {
    title: 'Service Unavailable',
    description: 'The service is temporarily unavailable or under maintenance.'
  },
  504: {
    title: 'Gateway Timeout',
    description: 'An upstream service did not respond in time. Please try again.'
  }
};

/**
 * Resolves default title and description for any HTTP error status code.
 */
export const getErrorMetadata = (code: number): ErrorMetadata =>
  ERROR_CATALOG[code] || {
    title: 'Unexpected Error',
    description: 'An unexpected error occurred while processing your request.'
  };
