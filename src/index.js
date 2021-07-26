import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { CharliesChecklist } from './components/CharliesChecklist';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <CharliesChecklist />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
