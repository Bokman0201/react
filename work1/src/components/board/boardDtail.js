import axios from "axios";
import { useRecoilState } from "recoil";
import { boardDetailNoState, boardEdtiState } from "../recoil";
import React, { useEffect, useState } from "react";

const BoardDtail = (props) => {
    const [boardNo, setBoardNo] = useRecoilState(boardDetailNoState);
    const [boardInfo, setBoardInfo] = useState({});
    const [edit, setEdit] = useRecoilState(boardEdtiState);
    const boardDetail = async () => {
        try {
            if (boardNo === '') { return }

            console.log("try", boardNo)
            const res = await axios.get(`http://localhost:8080/board/detail/${boardNo}`)

            console.log(res)

            setBoardInfo(res.data);
        } catch {
        }
    };
    const [image, setImage] = useState();
    const getImages = async () => {
        try {
            const res =await axios.get(`http://localhost:8080/image/member/${boardInfo.boardWriter}`)
            console.log(`http://localhost:8080/image/member/${boardInfo.boardWriter}`);
            setImage(`http://localhost:8080/image/member/${boardInfo.boardWriter}`);
        }

        catch { }
    }
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchData = async () => {
            if(image===undefined){
                try {
                  setLoading(true);
                  console.log("실행?", boardNo);
                  await boardDetail(); // 예시: 비동기 함수 호출
                  await getImages(); // 예시: 비동기 함수 호출
                } catch (error) {
                  console.error("Error fetching data:", error);
                } finally {
                  setLoading(false);
                }
            }
        };
        setLoading(false)
      
        fetchData();
      }, [boardNo , loading===true]);
    
    const [boardChange, setBoardChange] = useState({});

    const handleChange = (e) => {
        setBoardInfo({
            ...boardInfo,
            [e.target.name]: e.target.value
        })
        console.log(props.modal); // modal 함수가 정의되어 있는지 확인

        console.log(boardInfo)
    }

    const putUpdate = () => {
        if (window.confirm("게시물을 업데이트하시겠습니까?")) {
            axios({
                url: `http://localhost:8080/board/update/${boardNo}`,
                method: 'put',
                data: {
                    boardContent: boardInfo.boardContent,
                },
            })
                .then((res) => {
                    console.log(res.data.length)
                    // 성공 시 수행할 작업
                    setBoardInfo({});
                    props.modal();
                })
                .catch((error) => {
                    // 실패 시 수행할 작업
                    console.error('Error updating board:', error);
                });
        } else {
            alert("취소");
        }
    };




    return (
        <div className="container">
            {!edit ? (<div className="row">
                <div className="col-1">
                    <div
                        style={{
                            width: "40px", // 적절한 너비로 조절
                            height: "40px", // 적절한 높이로 조절
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
                            src={image}
                            alt="프로필 이미지"
                        />
                    </div>
                </div>
                <div className="col ms-4 mt-1">
                    <div ><h4>{boardInfo.boardWriter}</h4></div>
                </div>
                <div className="mt-4">

                    <span style={{ fontWeight: 'bold' }}>{boardInfo.boardWriter} :</span>
                    {boardInfo.boardContent && (
                        <>
                            {' '}
                            {boardInfo.boardContent.split('\r\n').map((line, index) => (
                                <React.Fragment key={index}>
                                    {line}
                                    <br />
                                </React.Fragment>
                            ))}
                        </>
                    )}

                </div>
                <div>태그</div>
            </div>

            ) : (<>
                <div >{boardInfo.boardWriter}</div>
                <div ><textarea className="form-control" value={boardInfo.boardContent} name="boardContent" onChange={handleChange} /></div>
                <div style={{ textAlign: 'right' }}>
                    <button className="btn btn-danger mt-3" onClick={putUpdate}>수정</button>
                </div>                <div>태그</div>

            </>)}

        </div >
    );
}
export default BoardDtail;