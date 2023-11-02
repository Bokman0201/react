import { useEffect, useState } from "react";

const Exam07 = () => {

    const [member, setMember] = useState({//입력데이터
        memberId: "",
        memberPw: "",
        memberPwCHeck: ""
    })

    const [result, setResult] =useState({//검사결과
        memberId:null,
        memberPw:null,
        memberPwCHeck:null
    })

    //입력데이터가 변하면 검사결과가 자동으로 계간되도록 처리


    useEffect(()=>{
        //console.log("변경")
        //아이디검사
        const idRegex= /^[a-z][a-z0-9]{7,19}$/;
        const idMatch =member.memberId.length===0?null: idRegex.test(member.memberId);
        //pw검사
        const pwRegex=/^[A-Z][A-Za-z0-9!@#$]{8,16}$/;
        const pwMatch=member.memberPw.length===0? null : pwRegex.test(member.memberPw);
        //check검사
        const checkMatch =member.memberPwCHeck.length===0? null: member.memberPw.length>0&&member.memberPw === member.memberPwCHeck;

        setResult({
            ...result,
            memberId:idMatch,
            memberPw:pwMatch,
            memberPwCHeck:checkMatch

        })
    },[member]);

    const info = e => {
        console.log(e.target);

        setMember({
            ...member,
            [e.target.name]: e.target.value
        })

    };


    return (

        <div className="container text-center ">
            <div className="rew">
                <div className="col-sm-5 offset-1">
                    <div className="p-4 text-light bg-primary rounded">
                    <h1>객체상태의 변수 문제</h1>
                    </div>

                    <form autoComplete="off">
                    <div className="row mt-4">
                        <div className="col">

                            아이디<br /> <input type="text" className={`
                            form-control 
                            ${result.memberId===true ? 'is-valid':''}
                            ${result.memberId===false ? 'is-invalid':''}
                            `}
                             name="memberId" value={member.memberId} onChange={info}  placeholder="아이디"/>
                            <div className="valid-feedback"  >사용가능한 아이디</div>
                            <div className="invalid-feedback"  >불가능한 아이디</div>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col">

                            비밀번호<br /><input type="password"  className={`
                            form-control 
                            ${result.memberPw===true ? 'is-valid':''}
                            ${result.memberPw===false ? 'is-invalid':''}
                            `} name="memberPw" value={member.memberPw} onChange={info} placeholder="비밀번호"/>
                            <div className="valid-feedback"  >사용가능한 비밀번호</div>
                            <div className="invalid-feedback"  >불가능한 비밀번호</div>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col">

                            비밀번호확인<br /> <input  className={`
                            form-control 
                            ${result.memberPwCHeck===true ? 'is-valid':''}
                            ${result.memberPwCHeck===false ? 'is-invalid':''}
                            `} type="password" name="memberPwCHeck" value={member.memberPwCHeck} onChange={info} placeholder="비밀번호 확인" />
                            <div className="valid-feedback"  >일치합니다</div>
                            <div className="invalid-feedback"  >불일치 합니다</div>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col">

                            <button className="btn btn-outline-primary w-100" disabled={!(result.memberId&&result.memberPw&&result.memberPwCHeck)}>가입하기</button>

                        </div>
                    </div>
                    </form>



                </div>
            </div>
        </div>

    );

};
export default Exam07;