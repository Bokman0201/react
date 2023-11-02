import { useState } from "react";

const Exam08 = ()=>{
const [names,setNames] = useState(["피카츄", "라이츄" ,"꼬부기"]);


//배열 형태의 데이터를 출력할 때는 es6의 map함수를 사용한다
//-map 함수는 배열의 데치터를 변화시키면서 새로운 배열을 생성하는 명령
//-map 함수로 화면을 반복적으로 출력할때는 반드시 반복되는 영역에 key속성이 있어야 한다.
//-key 속성은 반드시 유일해야 한다(back-end 데이터는 pk)
//-도저히 사용할 값이 없다면 map에 두번째 매개변수인index를 사용
return (
    <>
        <h1>배열형태의 상태변수</h1>
        {names.map((name,index)=>(<div key={index}> {name}</div>))}
    </>
);

};
export default Exam08;