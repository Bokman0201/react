import axios from 'axios';
import { useEffect, useLayoutEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";

import JSZip from 'jszip';
import { Carousel } from 'react-bootstrap';



const Home = (props) => {

    const [clickNo, setClickNo] = useState();
    const [imageList, setImageList] = useState([]);



    const [boardList, setBoardList] = useState([]);
    const [imgSrcList, setImgSrcList] = useState([]);
    const [boardNos, setBoardNos] = useState([]);

    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setImgSrcList([]);

        try {
            // 게시판 목록 및 이미지를 동시에 로딩
            const [boardResponse, imageResponses] = await Promise.all([
                axios.get('http://localhost:8080/board/list'),
                fetchImages(boardNos)
            ]);

            const { attachVO, boardDto } = boardResponse.data;
            setBoardList(boardDto);
            setBoardNos(boardDto.map(board => board.boardNo));

            // 이미지 목록을 새로운 이미지로 업데이트
            const currentImages = imageResponses.flatMap((value, index) => {
                // console.log(`이미지 ${index + 1} 값:`, value.imageList);

                // 이미지 객체들을 생성
                const decodedImages = Object.keys(value.imageList).map(key => {
                    const base64Image = value.imageList[key];
                    const binaryString = atob(base64Image);
                    const bytes = new Uint8Array(binaryString.length);
                    for (let i = 0; i < binaryString.length; i++) {
                        bytes[i] = binaryString.charCodeAt(i);
                    }
                    const blob = new Blob([bytes], { type: 'image/png' });
                    return {
                        attachNo: key,
                        image: URL.createObjectURL(blob),
                    };
                });

                return decodedImages;
            });

            // 새로운 이미지 목록으로 state 업데이트
            setImgSrcList(currentImages);
            setImageList(attachVO);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                alert('통신 오류');
            } else {
                console.error('Error loading data:', error);
            }
        }
    };

    const fetchImages = async (boardNos) => {
        const promises = boardNos.map(async (boardNo) => {
            try {
                const response = await fetch(`http://localhost:8080/image/board/${boardNo}`);
                const imageList = await response.json();
                console.log(imageList)
                return { boardNo, imageList };
            } catch (error) {
                console.error(`Error fetching images for board ${boardNo}:`, error);
                return { boardNo, imageList: [] };
            }
        });

        return Promise.all(promises);
    };
    useEffect(() => {
    }, [clickNo]);


    const [likeList, setLikeList] = useState([]);

    const handelLike = (e, boardNo) => {
        if (props.user === "") {
            console.log("blanc")
            return;
        }

        setClickNo(boardNo);
        axios({
            url: `http://localhost:8080/board/like`,
            method: 'post',
            data: {
                boardDto: {
                    boardNo: boardNo

                },
                likeContentDto: {
                    memberId: props.user,
                    boardNo: boardNo
                }
            }
        }).then(res => {
            setClickNo();
            if (likeList.includes(boardNo)) {
                const updatedBoardList = boardList.map(board => {
                    if (board.boardNo === boardNo) {
                        return { ...board, boardLike: board.boardLike - 1 };
                    }
                    return board;
                });

                // updatedBoardList를 사용하여 상태 업데이트
                setBoardList(updatedBoardList);
            } else {
                const updatedBoardList = boardList.map(board => {
                    if (board.boardNo === boardNo) {
                        return { ...board, boardLike: board.boardLike + 1 };
                    }
                    return board;
                });

                // updatedBoardList를 사용하여 상태 업데이트
                setBoardList(updatedBoardList);
            }
        }).catch();
    };





    useEffect(() => {
        // useEffect 안에서 비동기 함수 실행
        const loadLikeList = async () => {
            try {
                if (!props.user) {
                    console.error("User is not set. Cannot fetch like list.");
                    return;
                }

                const response = await axios.get(`http://localhost:8080/board/likeList/${props.user}`);

                const extractedBoardNos = response.data.map(item => item.boardNo);
                setLikeList(extractedBoardNos);
                //console.log("List", extractedBoardNos)
            } catch (error) {
                console.error("Error fetching like list:", error);
            }
        };

        // 유저가 세팅된 후에 loadLikeList 함수 호출
        if (props.user) {
            loadLikeList();
        }
    }, [props.user, clickNo]);




    // const renderImagesForBoard = (board) => {
    //     // 해당 게시물의 이미지 정보 찾기
    //     //const imagesForBoard = imageList.filter(image => image.boardNo === board);

    //     const zip = new JSZip();
    //     const imageZip = `http://localhost:8080/image/board/${board}`
    //     console.log(`http://localhost:8080/image/board/${board}`)

    //     zip.loadAsync(`http://localhost:8080/image/board/${board}`)
    //     // imagesForBoard를 이용하여 이미지 출력
    //     // return imagesForBoard.map((image, index) => (
    //     //   <div key={index}>
    //     //     {/* 이미지 출력 */}
    //     //     <img
    //     //       src={`http://localhost:8080/image/board/${board}`}
    //     //       alt={`게시물 이미지 ${index + 1}`}
    //     //       className="image-style"
    //     //     />
    //     //     {/* 이미지 정보 출력 (예: 파일 이름, 크기, 타입, 시간 등) */}
    //     //     <p>파일 이름: {image.attachName}</p>
    //     //     <p>크기: {image.attachSize} bytes</p>
    //     //     <p>타입: {image.attachType}</p>
    //     //     <p>시간: {image.attachTime}</p>
    //     //   </div>
    //     // ));
    //   };




    useEffect(() => {
        setImgSrcList([]);

        const fetchDataAndSetLoading = async () => {
            try {
                await fetchData(); // Promise가 완료될 때까지 기다림
            } finally {
                setLoading(false); // fetchData가 완료되면 로딩 상태를 false로 변경
            }
        };


        fetchDataAndSetLoading();
    }, [loading, props.user]); // dependency 배열이 비어있으므로 처음 한 번만 실행됨




    return (<>
        <div className='container'>
            <div className='row'>
                <div className='col'>

                    <NavLink to="/boardWrite">글작성</NavLink>


                    {loading ? (<p>Loading...</p>) : (
                        boardList.map((board) => (

                            <div key={board.boardNo} className="card border-dark mb-3" style={{ maxWidth: '100rem' }}>
                                <div className="card-header">{board.boardWriter} {board.boardNo} </div>
                                <div className="card-body">
                                    <div className="card-title">
                                        <div>
                                            <div className='row'>
                                                {/* 현재 처리 중인 board의 이미지 목록 출력 */}
                                                <Carousel interval={null} ride={false}>
                                                {imageList
                                                    .filter((attach) => attach.boardNo === board.boardNo)
                                                    .map((image, index) => (
                                                                <Carousel.Item key={index}>


                                                            {/* 이미지 출력 */}


                                                         
                                                                    {imgSrcList
                                                                .filter((att) => att.attachNo == image.attachNo)
                                                                .map((img, imgIndex) => (
                                                                    <img key={`${imgIndex}`}
                                                                    style={{
                                                                        objectFit: 'cover', // 이미지 크기를 고정하고 비율 유지
                                                                        width: '50%',       // 부모 요소에 맞게 가득 차도록
                                                                        height: '100%',      // 부모 요소에 맞게 가득 차도록
                                                                        margin: 'auto',      // 가운데 정렬을 위해
                                                                        display: 'block',    // 가운데 정렬을 위해
                                                                      }}
                                                                        src={img.image}
                                                                        alt={`게시물 이미지 ${imgIndex + 1}`}
                                                                        className="image-style"
                                                                    />
                                                                ))}
                                                                    <Carousel.Caption>
                                                
                                                                    </Carousel.Caption>
                                                      
                                                      
                                                      
                                                      
                                                      {/* 여기에 이미지 정보를 출력하는 코드를 추가하세요 */}
                                                      </Carousel.Item>
                                                      ))}
                                                      </Carousel>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                    <p>
                                        {likeList.includes(board.boardNo) ? (
                                            <FaHeart style={{ color: 'red' }} data-name='like'
                                                values={board.boardLike} onClick={(e) => handelLike(e, board.boardNo)} />

                                        ) : (

                                            <FaRegHeart values={board.boardNo} data-name='unlike' onClick={(e) => handelLike(e, board.boardNo)} />
                                        )}
                                    </p>
                                    <p>좋아요 {board.boardLike} 개</p>
                                    <p><NavLink to={"/detail"}>{board.boardWriter}</NavLink> {board.boardContent}</p>
                                    <p className="card-text">{board.boardWriteTime}</p>
                                </div>
                            </div>
                        ))

                    )}


                </div>
            </div>
        </div>
    </>);
};
export default Home;