import React from 'react';
import ReactDOM from 'react-dom/client';
//이 파일에서 필요한 모듈들을 불러오는 코드
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
//프로그램 생성코드
//- 대상 html 에서 id=root 인 항목에서 찾아 리액트 앱으로 구성해라
const root = ReactDOM.createRoot(document.getElementById('root'));

//구성한 영역에 다음과 같이 태그를 작성하고 렌더링해라
//-<react.StrictMode> 개발에서 쓰느 엄격한 검사용 태그(빌드하면 사라짐)
//-<App/>
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
