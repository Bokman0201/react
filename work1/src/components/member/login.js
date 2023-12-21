import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useRecoilState } from "recoil";
import { userState } from "../recoil";

const LogIn = () => {
    const [user,setUser] = useRecoilState(userState);
    const navigator = useNavigate();
    const [userInfo, setUserInfo] = useState({
        memberId:"",
        memberPw:""
    });

    const handleChange =(e)=>{
        setUserInfo({...userInfo,
        [e.target.name]:e.target.value
        });
    }


    const login=async()=>{
        await axios({
            url:`http://localhost:8080/member/login`,
            method:'post',
            data:userInfo
        }).then(res=>{
            if(res.data===true){
                sessionStorage.setItem("memberId",userInfo.memberId);
                setUser(sessionStorage.getItem("memberId"));
                navigator("/home");
            }
        }).catch(err=>{
            if(err.request.status===404){
                alert("통신오류")
            }
        });
    };

    return (<>
        <div className="container">
            <div className="row">
                <div className="col-6">
                    <div className="form-group">
                        <label className="form-label mt-4"></label>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" 
                            value={userInfo.memberId} name="memberId" id="floatingInput" onChange={handleChange}
                            placeholder="name@example.com" autoComplete="off"/>
                            <label htmlFor="floatingInput">Id</label>
                        </div>
                        <div className="form-floating">
                            <input type="password" className="form-control"  
                            value={userInfo.memberPw} name="memberPw" id="floatingPassword" onChange={handleChange}
                            placeholder="Password" autoComplete="off" />
                            <label htmlFor="floatingPassword">Password</label>
                        </div>
                        <button type="button" onClick={login} className="btn btn-primary w-100 mt-4">login</button>
                    </div>
                </div>
            </div>
        </div>
    </>);
};
export default LogIn;