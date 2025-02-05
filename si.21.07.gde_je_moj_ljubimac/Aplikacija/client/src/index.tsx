import React from 'react';
import ReactDOM from 'react-dom';
import './app/layout/styles.css';
import {Router} from 'react-router-dom';
import App from './app/layout/App';
import reportWebVitals from './reportWebVitals';
import ScrollToTop from './app/layout/ScrollToTop';
import { createBrowserHistory } from 'history';

export const history=createBrowserHistory();

ReactDOM.render(
  <Router history={history}>
  <ScrollToTop>
    <App />
  </ScrollToTop>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
