
import './index.css';
import logo from './logo.svg';
import 'antd/dist/antd.less'; // or 'antd/dist/antd.less'
import './theme/index.less';
import './App.css';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './redux/store';
import i18n from './i18n';
import { Provider } from 'react-redux';
import history from './router/config';
import { Router as HashRouter, Switch, Route, Link, Redirect, } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter history={history}>
        <App />
      </HashRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
