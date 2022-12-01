import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import App from './App';
import { HashRouter } from 'react-router-dom';

// const root = ReactDOM.createRoot(document.getElementById('root'));
ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
, document.getElementById('root'));
