import { useEffect, useState } from "react";

const Exam04 = ()=>{
const [text,setText] = useState(0);
const [length,setLength] =useState(0);

//state끼리 의존성이 생기는 경우
//- content가 변하면 length 가 변해야 한다
//- 수동이 아니라 자동으로 설정 가능
//- useEffect 훅 사용

useEffect(()=>{
    setLength(text.length);
},[text]);


    return (
        <>
        <h2>(Q)주말에 뭐하세요?</h2>
        <div>
        <textarea value={text} onChange={e=>{
            setText(e.target.value)
            //setLength(e.target.value.length)
            }}>

        </textarea>
        <br></br>
        {length}/1000
        </div>
        </>

    );


};
export default Exam04;