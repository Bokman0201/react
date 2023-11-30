import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootswatch/dist/litera/bootstrap.min.css'
import "bootstrap";
import {BrowserRouter, HashRouter} from "react-router-dom";//reactapp 을 여러페이지로 분할하여 사용
//hash라우터는 주소에 hash(#)가 포함된다
//BrowseRouter는 주소에 Hash(#)가 생기지 않는다 - 서버사이드 랜더링

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HashRouter>
    <App />
  </HashRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
