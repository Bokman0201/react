import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const MemberJoin = () => {
    const [memberInfo, setMemberInfo] = useState({});
    const navigator = useNavigate();

    const textChange =(e)=>{
        setMemberInfo({...memberInfo , 
        [e.target.name]:e.target.value
    })
    }

    const [result,setResult] =useState({
        resultId:null,
        resultPw:null,
        resultEmail:null,
        resultName:null,
    });

    const join = async()=>{
        delete memberInfo.memberPwCheck;
        console.log("click")
        await axios({
            url:`http://localhost:8080/member/join`,
            method:'post',
            data:memberInfo
           
        }).then(res=>{
            console.log(res.data);
            navigator("/home");
            setMemberInfo({});

        }).catch(err=>{
            if(err.request.status===500){
                alert("사용중인 아이디");
            }
            else if(err.request.status===404){
                alert("통신오류");
            }
        });
    }

    return (<>

        <div className="container mt-4">
            <h1>회원가입</h1>
            <div className="row">
                <div className="col-6">
                    <div className="form-floating mt-4">
                        <input type="text" className="form-control" onChange={textChange} name='memberId' placeholder="Id" autoComplete="off" />
                        <label htmlFor="floatingPassword">Id</label>
                    </div>

                    <div className="form-floating mt-4">
                        <input type="password" className="form-control" onChange={textChange} name='memberPw'  placeholder="Password" autoComplete="off" />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>
                    <div className="form-floating mt-4">
                        <input type="password" className="form-control" onChange={textChange} name='memberPwCheck'  placeholder="Password" autoComplete="off" />
                        <label htmlFor="floatingPassword">PasswordCheck</label>
                    </div>
                    <div className="form-floating mt-4">
                        <input type="text" className="form-control" onChange={textChange} name='memberName'  placeholder="Password" autoComplete="off" />
                        <label htmlFor="floatingPassword">name</label>
                    </div>
                    <div className="form-floating mt-4">
                        <input type="email" className="form-control" onChange={textChange} name='memberEmail'  placeholder="Password" autoComplete="off" />
                        <label htmlFor="floatingPassword">EmailAdress</label>
                    </div>

                    <button type='button' className='btn btn-secondary w-100 mt-4' onClick={join}>가입</button>
                </div>
            </div>

        </div>

    </>);
};
export default MemberJoin;