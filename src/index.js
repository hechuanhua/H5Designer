import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import App from './App';
import Home from './pages/home'
import './App.scss';
import 'antd/dist/antd.css';
import reportWebVitals from './reportWebVitals';
import { createGlobalStyle } from "styled-components";
import store from './store'

const GlobalStyle = createGlobalStyle`
*{
  margin: 0;
  padding: 0;
}
body{
  line-height: 1;
  font-size: 16px;
}
ul,li{
  list-style: none;
}
`


ReactDOM.render(
  <>
    <Provider store={store}>
      <Home></Home>
    </Provider>,
    <GlobalStyle/>
  </>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
