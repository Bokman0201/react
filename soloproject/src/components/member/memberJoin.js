import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router';


const MemberJoin = () => {
    const [sameInfo, setSameInfo] = useState({});
    const navigate =useNavigate();

    const [userInfo, setuserInfo] = useState({
        memberName: '',
        memberEmail: '',
        memberPw: '',
        memberBirth: '',
        memberConnect: ''
    });

    const userInfoChange = (e) => {
        setuserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
        })
    }

    const connectFormat = (e) => {
        if (e.target.value) {
            let tel = e.target.value;
            const formatNumber = tel.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
            setuserInfo({ ...userInfo, memberConnect: formatNumber });
        }
    };

    const [valid, setValid] = useState({
        memberName: null,
        memberEmail: null,
        memberPw: null,
        memberBirth: '',
        memberConnect: '',
        overlapEmail:''
    });
    const isVaild = () => {

        const isName = userInfo.memberName.length === 0 ? null : true;

        const emailCheck = /^[a-zA-Z0-9_\.]{1,10}@[a-zA-Z]+\.[a-z]+$/;
        const sameEmail = sameInfo.some(member => member.memberEmail ===userInfo.memberEmail);
        console.log("??",sameEmail);
        const isEmail = userInfo.memberEmail.length === 0 ? null : emailCheck.test(userInfo.memberEmail);

        const pwCheck = /^(?=.*[A-Z])[a-zA-Z0-9!@#$]{8,16}$/;
        const isPw = userInfo.memberPw.length === 0 ? null : pwCheck.test(userInfo.memberPw);


        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0]; // "yyyy-mm-dd" 형식으로 변환
        const birthCheck = userInfo.memberBirth <= formattedDate;
        const isBirth = userInfo.memberBirth.length === 0 ? null : birthCheck;

        const connectCheck = /^(010|011)-(?!0|1|2)\d{4}-\d{4}$/
        const isConnect = userInfo.memberConnect.length === 0 ? null : connectCheck.test(userInfo.memberConnect);

        setValid({
            memberName: isName,
            memberEmail: isEmail,
            memberPw: isPw,
            memberBirth: isBirth,
            memberConnect: isConnect,
            overlapEmail:sameEmail
        })

    };
    


    const memberJoin = async () => {
        try {
            const res = await axios({
                url:`http://localhost:8080/member/add/`,
                method:'post',
                data:userInfo
            })
            alert('가입 완료');
            console.log('회원 가입 성공:', res.data);
            navigate("/home")

        } catch (error) {
            // 오류가 발생한 경우 처리
            if(error.request.status===400){
                alert("모든 정보를 입력해 주세요")
            }

            console.log(userInfo)
            console.error('회원 가입 오류:', error.request.status);
        }
    };

    const overlapInfo = ()=>{
        axios({
            url:`http://localhost:8080/member`,
            method:'get'
        }).then(res=>{
            setSameInfo(res.data)
        })
    }
    useEffect(()=>{
        overlapInfo();
        console.log(sameInfo);
    },[userInfo.memberEmail])







    return (
        <div className="container mt-4 p-3">
            <div className='row'>
                <div className='col-7'>
                    <img src='img/main.jpg' style={{ maxWidth: '100%', height: '100%' }} />
                </div>
                <div className='col-5 '>

                    <div className="form-group">
                        <label className="form-label mt-4"><h2>회원가입</h2></label>
                        <div className="form-floating mb-3 mt-4">
                            <input type="text" className={`form-control 
                            ${valid.memberName === true ? 'is-valid' : ''}
                            ${valid.memberName === false ? 'is-invalid' : ''}
                            `} id="floatingInput" placeholder="name" name='memberName' value={userInfo.memberName} onChange={userInfoChange} onBlur={isVaild} />
                            <label for="floatingInput">name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="email" className={`form-control 
                            ${valid.memberEmail===true&&valid.overlapEmail === false ? 'is-valid' : ''}
                            ${valid.memberEmail===false||valid.overlapEmail === true ? 'is-invalid' : ''}`}
                                id="floatingInput" placeholder="name@example.com" name='memberEmail' value={userInfo.memberEmail} onChange={userInfoChange} onBlur={isVaild} />
                            <label for="floatingInput">Email address</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="password" className={`form-control 
                            ${valid.memberPw === true ? 'is-valid' : ''}
                            ${valid.memberPw === false ? 'is-invalid' : ''}
                            `} id="floatingPassword" placeholder="Password" name='memberPw' autocomplete="off" value={userInfo.memberPw} onChange={userInfoChange} onBlur={isVaild} />
                            <label for="floatingPassword">Password</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="date" className={`form-control 
                            ${valid.memberBirth === true ? 'is-valid' : ''}
                            ${valid.memberBirth === false ? 'is-invalid' : ''}
                            `} id="floatingDate" autocomplete="off" name='memberBirth' value={userInfo.memberBirth} onChange={userInfoChange} onBlur={isVaild} />
                            <label for="floatingDate">생년월일</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="tel" className={`form-control
                             ${valid.memberConnect === true ? 'is-valid' : ''}
                             ${valid.memberConnect === false ? 'is-invalid' : ''}
                             `} id="floatingTel" autocomplete="off" name='memberConnect' pattern="\d{3}-\d{4}-\d{4}"
                                required onChange={e => { userInfoChange(e); connectFormat(e); }} value={userInfo.memberConnect} onBlur={isVaild} />
                            <label for="floatingTel">전화번호</label>
                        </div>

                        <div>
                            <button className={`btn btn-primary w-100 ${valid.memberBirth===true&&valid.memberConnect===true&&valid.memberEmail===true&&valid.memberName===true&&valid.memberPw===true?'':'disabled'}`} onClick={memberJoin}>가입하기</button>
                        </div>
                    </div>

                </div>

            </div>
        </div>

    )
};
export default MemberJoin;