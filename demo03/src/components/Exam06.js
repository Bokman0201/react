// import { useState } from "react";

// <<<<<<< HEAD
// const Exam06 = () => {
//     //상태를 분리하여 관리할때
//     // const [alias,setAlias] = useState("");

//     // const [gender,setGender] = useState("남자")

//     //하나의 객체로 관리할떄

//     const [info, setInfo] = useState({
//         alias: "",
//         gender: "남자"
//     });

//     //function changeInfo(e){}
//     const changeInfo = e => {
//         console.log(e.target);
//         console.log(e.target.name, e.target.value);
//         //info에서 이벤트가 발생한 태그명레 해당하는 필드만 입력값으로 바꾸고 나머진 그대로 둬라
//         //-...info는 info의 나머지 항목을 의미(rest연산)
//         //- 객체에[] 표시를 쓰면 필드명을 변수로 지정할 수 있다
//         setInfo({
//             ...info,
//             [e.target.name]: e.target.value
//         });
//     };


//     return (
//         <>
//             <h1>상태변수가 객체인경우</h1>

//             이름<input type="text" name="alias" value={info.alias} onChange={changeInfo} />
//             성별<select name="gender" value={info.gender} onChange={changeInfo}>
// =======
// const Exam06 = ()=>{
//     //각각의 상태를 분리하여 관리할 때
//     //const [alias, setAlias] = useState("");
//     //const [gender, setGender] = useState("남자");

//     //상태를 하나의 객체로 관리할 때
//     const [info, setInfo] = useState({
//         alias : "",
//         gender : "남자"
//     });

//     //function changeInfo(e){}
//     const changeInfo = e=>{
//         //console.log(e.target);//이벤트 발생 태그 확인
//         //console.log(e.target.name, e.target.value);//이름,값 확인

//         //info에서 이벤트가 발생한 태그명에 해당하는 필드만 입력값으로 바꾸고 나머진 그대로 둬라!
//         //- ...info는 info의 나머지 항목을 의미(rest 연산)
//         //- 객체에 [] 표시를 쓰면 필드명을 변수로 지정할 수 있다
//         setInfo({
//             ...info,
//             [e.target.name] : e.target.value
//         });
//     };

//     return (
//         <>
//             <h1>상태변수가 객체인 경우</h1>

//             이름 <input type="text" name="alias" value={info.alias} onChange={changeInfo}/> <br/><br/>
//             성별 
//             <select name="gender" value={info.gender} onChange={changeInfo}>
// >>>>>>> 4a664a7403bc3c702515e920f43db888e8dbd230
//                 <option>남자</option>
//                 <option>여자</option>
//             </select>
//         </>
//     );
// };
// <<<<<<< HEAD
// =======

// >>>>>>> 4a664a7403bc3c702515e920f43db888e8dbd230
// export default Exam06;