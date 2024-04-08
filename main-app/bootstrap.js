import App from './App.jsx';
import ReactDOM from 'lib-app/react-dom';
import React from 'lib-app/react';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('app')
);
