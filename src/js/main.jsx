import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '../css/index.css'; // 修正: cssフォルダはsrcと同階層

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
