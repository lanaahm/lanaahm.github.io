import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './views/App';

const rootElement = document.querySelector('#root');
if (rootElement) {
  createRoot(rootElement).render(<App />);
}
