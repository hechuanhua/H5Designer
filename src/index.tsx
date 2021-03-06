import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import reportWebVitals from './reportWebVitals';
import store from './store/store'
import Routes from './pages/Routers'

import 'antd/dist/antd.css';
import './assets/style/gridLayout.scss';
import './assets/style/app.scss';
import './assets/style/antRest.scss';


ReactDOM.render(
  <>
    <Provider store={store}>
      <Routes></Routes>
    </Provider>
  </>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


