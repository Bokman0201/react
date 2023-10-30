import images from './images.png';
//jsx에서는 프로그래밍 변수를 속성에 넣기 위해{}를 사용
//-src="hel;o" 는 경로를 의미
//-src = {hello} 변수를 의미

//jsx에서는 모든 태그가 닫혀야 한다
function App() {
  var width = 300;
  return (
    <>
      <img src={images} width={width} className="" alt="" />
      <h1>kh정보교육원</h1>
    </>
  );
}

export default App;
