// import { useEffect, useState } from "react";

// <<<<<<< HEAD
// const Exam07 = () => {

//     const [member, setMember] = useState({//입력데이터
//         memberId: "",
//         memberPw: "",
//         memberPwCHeck: ""
//     })

//     const [result, setResult] =useState({//검사결과
//         memberId:null,
//         memberPw:null,
//         memberPwCHeck:null
//     })

//     //입력데이터가 변하면 검사결과가 자동으로 계간되도록 처리


//     useEffect(()=>{
//         //console.log("변경")
//         //아이디검사
//         const idRegex= /^[a-z][a-z0-9]{7,19}$/;
//         const idMatch =member.memberId.length===0?null: idRegex.test(member.memberId);
//         //pw검사
//         const pwRegex=/^[A-Z][A-Za-z0-9!@#$]{8,16}$/;
//         const pwMatch=member.memberPw.length===0? null : pwRegex.test(member.memberPw);
//         //check검사
//         const checkMatch =member.memberPwCHeck.length===0? null: member.memberPw.length>0&&member.memberPw === member.memberPwCHeck;

//         setResult({
//             ...result,
//             memberId:idMatch,
//             memberPw:pwMatch,
//             memberPwCHeck:checkMatch

//         })
//     },[member]);

//     const info = e => {
//         console.log(e.target);

//         setMember({
//             ...member,
//             [e.target.name]: e.target.value
//         })

//     };


//     return (

//         <div className="container text-center ">
//             <div className="rew">
//                 <div className="col-sm-5 offset-1">
//                     <div className="p-4 text-light bg-primary rounded">
//                     <h1>객체상태의 변수 문제</h1>
//                     </div>

//                     <form autoComplete="off">
//                     <div className="row mt-4">
//                         <div className="col">

//                             아이디<br /> <input type="text" className={`
//                             form-control 
//                             ${result.memberId===true ? 'is-valid':''}
//                             ${result.memberId===false ? 'is-invalid':''}
//                             `}
//                              name="memberId" value={member.memberId} onChange={info}  placeholder="아이디"/>
//                             <div className="valid-feedback"  >사용가능한 아이디</div>
//                             <div className="invalid-feedback"  >불가능한 아이디</div>
//                         </div>
//                     </div>
//                     <div className="row mt-4">
//                         <div className="col">

//                             비밀번호<br /><input type="password"  className={`
//                             form-control 
//                             ${result.memberPw===true ? 'is-valid':''}
//                             ${result.memberPw===false ? 'is-invalid':''}
//                             `} name="memberPw" value={member.memberPw} onChange={info} placeholder="비밀번호"/>
//                             <div className="valid-feedback"  >사용가능한 비밀번호</div>
//                             <div className="invalid-feedback"  >불가능한 비밀번호</div>
//                         </div>
//                     </div>
//                     <div className="row mt-4">
//                         <div className="col">

//                             비밀번호확인<br /> <input  className={`
//                             form-control 
//                             ${result.memberPwCHeck===true ? 'is-valid':''}
//                             ${result.memberPwCHeck===false ? 'is-invalid':''}
//                             `} type="password" name="memberPwCHeck" value={member.memberPwCHeck} onChange={info} placeholder="비밀번호 확인" />
//                             <div className="valid-feedback"  >일치합니다</div>
//                             <div className="invalid-feedback"  >불일치 합니다</div>
//                         </div>
//                     </div>
//                     <div className="row mt-4">
//                         <div className="col">

//                             <button className="btn btn-outline-primary w-100" disabled={!(result.memberId&&result.memberPw&&result.memberPwCHeck)}>가입하기</button>

//                         </div>
//                     </div>
//                     </form>


// =======
// const Exam07 = ()=>{

//     //객체로 상태 변수를 정의
//     const [member, setMember] = useState({//입력데이터
//         memberId:"",
//         memberPw:"",
//         memberPwRe:""
//     });
//     const [result, setResult] = useState({//검사결과
//         memberId:null,
//         memberPw:null,
//         memberPwRe:null
//     });
//     //입력데이터가 변하면 검사결과가 자동으로 계산되도록 처리
//     const checkMember = ()=>{
//         //console.log("member가 변했습니다");
//         //ID검사
//         const idRegex = /^[a-z][a-z0-9]{7,19}$/;
//         const idMatch = member.memberId.length === 0 ? null : idRegex.test(member.memberId);

//         //PW검사
//         const pwRegex = /^[A-Za-z0-9!@#$]{8,16}$/;
//         const pwMatch = member.memberPw.length === 0 ? null : pwRegex.test(member.memberPw);

//         //PW-RE검사
//         const pwReMatch = member.memberPwRe.length === 0 ? null : 
//                                         member.memberPw.length > 0 && member.memberPw === member.memberPwRe;

//         setResult({
//             memberId : idMatch,
//             memberPw : pwMatch,
//             memberPwRe : pwReMatch
//         });
//     };

//     //useEffect(checkMember, [member]);

//     //객체의 상태를 한 번에 변경하는 함수를 구현
//     const changeMember = (e)=>{
//         setMember({
//             ...member,
//             [e.target.name] : e.target.value
//         });
//     };

//     return (
//         <div className="container-fluid">
//             <div className="row">
//                 <div className="col-md-10 offset-md-1">
                    
//                     {/* 점보트론 */}
//                     <div className="p-4 text-light bg-dark rounded">
//                         <h1>객체 상태 변수 문제</h1>
//                     </div>

//                     <form autoComplete="off">

//                     <div className="row mt-4">
//                         <div className="col">
//                             <label className="form-label">아이디</label>
//                             <input type="text" name="memberId" 
//                                     className={`
//                                         form-control 
//                                         ${result.memberId === true ? 'is-valid' : ''}
//                                         ${result.memberId === false ? 'is-invalid' : ''}
//                                     `}
//                                     value={member.memberId} onChange={changeMember}
//                                             onBlur={checkMember}/>
//                             <div className="valid-feedback">멋진 아이디입니다!</div>
//                             <div className="invalid-feedback">사용할 수 없는 아이디입니다</div>
//                         </div>
//                     </div>

//                     <div className="row mt-4">
//                         <div className="col">
//                             <label className="form-label">비밀번호</label>
//                             <input type="password" name="memberPw" 
//                                     className={`
//                                         form-control
//                                         ${result.memberPw === true ? 'is-valid' : ''}
//                                         ${result.memberPw === false ? 'is-invalid' : ''}
//                                     `}
//                                     value={member.memberPw} onChange={changeMember}
//                                         onBlur={checkMember}/>
//                             <div className="valid-feedback">올바른 형식의 비밀번호입니다</div>
//                             <div className="invalid-feedback">비밀번호 형식이 올바르지 않습니다</div>
//                         </div>
//                     </div>

//                     <div className="row mt-4">
//                         <div className="col">
//                             <label className="form-label">비밀번호 확인</label>
//                             <input type="password" name="memberPwRe" 
//                                     className={`
//                                         form-control
//                                         ${result.memberPwRe === true ? 'is-valid' : ''}
//                                         ${result.memberPwRe === false ? 'is-invalid' : ''}
//                                     `}
//                                     value={member.memberPwRe} onChange={changeMember}
//                                     onBlur={checkMember}/>
//                             <div className="valid-feedback">비밀번호가 일치합니다</div>
//                             <div className="invalid-feedback">비밀번호가 일치하지 않습니다</div>
//                         </div>
//                     </div>

//                     </form>

//                     <div className="row mt-4">
//                         <div className="col">
//                             <button type="button" className="btn btn-primary w-100"
//                                 disabled={!(result.memberId === true && result.memberPw === true
//                                                     && result.memberPwRe === true)}>
//                                 회원가입
//                             </button>
//                         </div>
//                     </div>
// >>>>>>> 4a664a7403bc3c702515e920f43db888e8dbd230

//                 </div>
//             </div>
//         </div>
// <<<<<<< HEAD

//     );

// };
// export default Exam07;
// =======
//     );    
// };

// export default Exam07;
// >>>>>>> 4a664a7403bc3c702515e920f43db888e8dbd230
