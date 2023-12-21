import axios from "axios";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { modalState, userState } from "../recoil";
import { useNavigate } from "react-router";
import { file } from "jszip";

const BoardWrite = () => {

    const [modal, setModal] = useRecoilState(modalState);

    const openModal = () => {
        setModal(true);
        console.log(modal)
    };

    const closeModal = () => {
        setModal(false);
    };

    const [files, setFiles] = useState([]);
    const selectedFiles = (e) => {

        setFiles([null]);

        const newFiles = e.target.files;
        console.log(files)

        // 이미 선택한 이미지를 포함하여 새로 선택한 이미지 추가
        setFiles([...newFiles]);
    }
    const preview = () => {
        return files.map((file, index) => (
          <React.Fragment key={index}>
            {file.type.split("/")[0] === "image" ? (
              <img
                src={URL.createObjectURL(file)}
                alt={`Preview ${index + 1}`}
                style={{ width: '100px', height: '100px', margin: '5px' }}
              />
            ) : (
              <>
              <video
               src={URL.createObjectURL(file)}
               alt={`Preview ${index + 1}`}
               style={{ width: '100px', height: '100px', margin: '5px' }}
              >
              </video>
              </>
            )}
          </React.Fragment>
        ));
      };




    const [user, setUser] = useRecoilState(userState);
    const navigator = useNavigate();
    const [boardInfo, setBoardInfo] = useState({
        boardContent: "",
        boardWriter: user,
    });



    const handleChange = (e) => {
        setBoardInfo({
            ...boardInfo,
            [e.target.name]: e.target.value
        })
    };

    // const write = async () => {
    //     console.log(user)
    //     const result = window.confirm("등록하시겠습니까?");
    //     if (result) {
    //         await axios({
    //             url: `http://localhost:8080/board/`,
    //             method: 'post',
    //             data: boardInfo
    //         }).then(res => {
    //             navigator("/home");
    //             alert("등록완료")
    //         }).catch(err => {
    //             if (err.request.status === 500) {
    //                 alert("모든 항목을 입력해주세요");
    //                 return;
    //             }
    //             else {
    //                 alert("통신오류");
    //             }

    //         });
    //     }
    // };

    const write = async () => {

        const changeImage = document.getElementById("changeImage");
        const attach = changeImage.files;

        const formData = new FormData();
        formData.append("boardContent", boardInfo.boardContent);
        formData.append("boardWriter", boardInfo.boardWriter);

        if (attach) {
            // 여러 파일을 FormData에 배열로 추가
            console.log("try")
            for (let i = 0; i < attach.length; i++) {
                formData.append("attach", attach[i]);
            }
        }


        try {
            await axios({
                url: `http://localhost:8080/board/`,
                method: 'post',
                data: formData,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }).then(
                (res=>{
                   if(res.request.status===200){
                        alert("등록완료");
                        setModal(false);
                    }
                })
            )

        }
        catch {

        }

    };
    return (<>
        <div className="container">
            <div className="row">
                <div className="col">
                    <div>
                        내용 <textarea type="text" value={boardInfo.boardContent} name="boardContent" className="form-control" onChange={handleChange} />
                    </div>
                    <div >
                        <input type="file" onChange={selectedFiles} id="changeImage" multiple accept="image/*" />
                    </div>
                    <div style={{ display: 'flex', marginTop: '10px' }}>
                        {preview()}
                    </div>

                    <div className="d-flex justify-content-end">
                        <button className="btn btn-danger mt-2" onClick={closeModal}>닫기</button>
                        <button className="btn btn-secondary mt-2" onClick={write}>등록</button>
                    </div>
                </div>
            </div>


        </div>







    </>);
};
export default BoardWrite;