import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import DataClient from './network/dataClient';

const dataClient = new DataClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App client={dataClient} />
  </React.StrictMode>
);
