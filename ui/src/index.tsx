import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import StatApp from './StatApp';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <StatApp />
  </React.StrictMode>
);

