import logo from './logo.svg';
import './App.css';
//리액트의 함수형 컴포넌트 
//-리액트에서는 화면의 조각을 컴포넌트라고 부름
//-리액트에서는 화면이 무수히 많은 컴포넌트의 조합
//-컴포넌트를 클래스로 만들수 있고 함수로 만들 수 있다.(함수로 만드는걸 권장)
//-컴포넌트 하수에서는 반드시 화면 코드를 반환해야 한다 
//-이 화면 코드를 jsx라고 부른다 (java script xml)
//-jsx의 규칙대로 만들어랴 함
function App() {
  return (
    <>
      <h1> hello react</h1>
      <p>
        첫 번째 리액트 앱
      </p>
    </>
  );
}
//모듈형 자바스크립트에서 export 키워드틑 import가 가능하도록 만드는 요소
export default App;
