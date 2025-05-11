// main.jsx
import React from 'react';                          // ← React import
import ReactDOM from 'react-dom/client';             // ← ReactDOM import
import { BrowserRouter } from 'react-router-dom';    // ← 라우터
import './index.css';
import App from './App.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);