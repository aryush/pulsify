import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import routes from './routes';
import './stylesheet/App.css';


ReactDOM.render(
  <BrowserRouter>{routes}</BrowserRouter>, document.querySelector('#root')
);
