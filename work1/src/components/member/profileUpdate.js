import { useRecoilState } from "recoil";
import { userState } from "../recoil";
import React, { useEffect, useState } from "react";
import axios from "axios";

export const ProfileUpdate = () => {
    const [user, setUser] = useRecoilState(userState);
    const [info, setInfo] = useState({});

    const [files, setFiles] = useState([]);

    //프로필 정보 불러오기
    const getInfo = async()=>{
        try{
            const res = await axios.get(`http://localhost:8080/member/findProfile/${user}`)
            console.log(res.data)
            setInfo(res.data)
        }catch{}
    }


    useEffect(()=>{
        getInfo();
    },[])


    const selectedFiles = (e) => {

        setFiles([null]);

        const newFiles = e.target.files;
        console.log("???", files)

        // 이미 선택한 이미지를 포함하여 새로 선택한 이미지 추가
        setFiles([...newFiles]);
        setInfo({...info,
        attach:files
        });
    }


    const handleChange = (e) => {
        setInfo({
            ...info,
            [e.target.name]: e.target.value
        })
        console.log(info)
        const sexElement = document.querySelector('#sex');
        if (sexElement.value !== 'mail' && sexElement.value !== 'femail' &&sexElement.value !== null) {
            setInput(true);
        }
        else {
            setInput(false)
        }
        console.log(info)
        console.log(input)
    
    }

    const preview = () => {
        if (files.length === 0) return
        return (

            <React.Fragment>
                <div
                    style={{
                        width: "100px", // 이미지의 적절한 크기로 조절
                        height: "100px", // 이미지의 적절한 크기로 조절
                        borderRadius: "50%",
                        overflow: "hidden",
                        position: "relative",
                    }}
                >
                    <img
                        style={{
                            width: "100%", // 이미지의 적절한 크기로 조절
                            height: "100%", // 이미지의 적절한 크기로 조절
                            objectFit: "cover", // 중앙 부분을 잘라서 적합하게 표시
                            objectPosition: "center center", // 중앙을 기준으로 정렬
                        }}
                        src={URL.createObjectURL(files[0])}
                        alt="프로필 이미지"
                    />
                </div>


            </React.Fragment>
        );

    };


    const [input, setInput] = useState(false);


    //update처리
    const sendForUpdateData =()=>{
        axios({
            url:`http://localhost:8080/member/profileUpdate/${user}`,
            method:'put',
            data:{...info,
            attach:files},
            headers:{
                "Content-Type": "multipart/form-data",
            }
        }).then(res=>{
            console.log(info)
        }).catch();
    };



    return (
        <div className="row">
            <div className="col-8 offset-4">

                <div className="contailner mt-4">
                    <div className="row">
                        <div className="col-4 ">
                            {preview()}
                        </div>
                        <div className="col mt-4">
                            <input type="file" name="attach" onChange={selectedFiles} />
                        </div>
                    </div>
                    <div className="row mt-4">
                        <span>소개</span>
                        <div className="col ㅡㅅ-2">
                            <textarea
                                className="form-control"
                                name="profileContent"
                                value={info.profileContent || ""}
                                onChange={handleChange}
                                style={{ height: '136px', width: '100%', resize: 'none' }}
                            />
                        </div>
                    </div>
                    <div className="row mt-4">
                        <span>성별</span>
                        <div className="col mt-2">
                            {!input ? (
                                <select className="form-select" id="sex" name="memberGender" value={info.memberGender} onChange={handleChange}>
                                    <option value={undefined}>비공개</option>
                                    <option value={"mail"}>남</option>
                                    <option value={"femail"}>여</option>
                                    <option value={"직접입력"}>직접입력</option>
                                </select>
                            ) : (
                                <div className="input-group mb-3">
                                    <select className="input-group-text form=select" id="sex" name="memberGender" value={info.memberGender} onChange={handleChange} >
                                        <option value={undefined}>비공개</option>
                                        <option value={"mail"}>남</option>
                                        <option value={"femail"}>여</option>
                                        <option value={"직접입력"}>직접입력</option>
                                    </select>
                                    <input type="text" name="memberGender" maxLength={10} onChange={handleChange} className="form-control"  />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="row mt-4">
                        <span>성별</span>
                        <div className="col mt-2">
                            계정상태 변경<select className="form-select" name="privateStatus" value={info.privateStatus} onChange={handleChange}>
                                <option value={"Y"}>비공개</option>
                                <option value={"N"}>공개</option>
                                <option value={"R"}>친구에게만 공개</option>
                            </select>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col mt-2">
                            <button type="button" onClick={sendForUpdateData} className="btn btn-primary w-100">등록하기</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};
