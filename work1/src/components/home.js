import axios from 'axios';
import { useEffect, useLayoutEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";

import { Carousel, NavDropdown } from 'react-bootstrap';
import Modal from 'react-modal'
import { FaReply } from "react-icons/fa";
import Reply from './board/raply';
import Detail from './member/detail';
import { boardDetailNoState, boardEdtiState, modalState } from './recoil';
import { useRecoilState } from 'recoil';
import { deleteBoard } from './helper';
import ReplyList from './board/replylist';




const Home = (props) => {
    const { selectedUser, setSelectedUser } = props.selecteduser;

    const [clickNo, setClickNo] = useState();
    const [imageList, setImageList] = useState([]);
    const navigator = useNavigate();
    const [boardList, setBoardList] = useState([]);
    const [imgSrcList, setImgSrcList] = useState([]);
    const [boardNos, setBoardNos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [boardNo, setBoardNo] = useRecoilState(boardDetailNoState);
    const [memberList, setMembetList] = useState([]);
    const [deleteNo, setDeleteNo] = useState();
    const [modal, setModal] = useRecoilState(modalState)
    const [isView, setIsView] = useState(false)


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
            const uniqueWriters = [...new Set(boardDto.map(board => board.boardWriter))];
            setMembetList(uniqueWriters);
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


                if (!response.ok) {

                }

                if (imageList.length === 0) {
                    console.log('게시글에 이미지가 없습니다.');
                    // 또는 다른 작업 수행
                }
                return { boardNo, imageList };
            } catch (error) {
                console.error(`Error fetching images for board ${boardNo}:`, error);


                return { boardNo, imageList: [] };
            }
        });

        return Promise.all(promises);
    };

    useEffect(() => {
    }, [clickNo, deleteNo, modal]);


    const [likeList, setLikeList] = useState([]);

    const handelLike = (e, boardNo) => {
        console.log(memberList)
        if (props.user === "") {
            // console.log("blanc")
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




    useEffect(() => {
        setImgSrcList([]);

        const fetchDataAndSetLoading = async () => {
            try {
                await fetchData(); // Promise가 완료될 때까지 기다림
                setMemberImages([]);
                getMemberProfile();
            } finally {
                setLoading(false); // fetchData가 완료되면 로딩 상태를 false로 변경
            }

        };


        fetchDataAndSetLoading();
    }, [loading, props.user, deleteNo, modal]); // dependency 배열이 비어있으므로 처음 한 번만 실행됨



    const [isModal, setIsModal] = useState(false);
    const [selectedBoardNo, setSelectedBoardNo] = useState();


    const clickBoardNo = (e, boardNo) => {
        setSelectedBoardNo(boardNo)
        setBoardNo(boardNo);
        console.log(boardNo)

        setIsModal(true);
    }
    const closeModal = () => {
        setIsModal(false);
    }

    //detail Page에 관한 처리
    useEffect(() => {
        if (selectedUser === undefined) return;
        navigator(`/mypage/${selectedUser}`)
        // console.log(selectedUser)


        setSelectedUser(undefined)

    }, [selectedUser])

    const handleSelectedUser = (e, writer) => {
        setSelectedUser(writer)

    }
    const [memberImages, setMemberImages] = useState([]);
    //회원 이미지 처리
    const getMemberProfile = async () => {
        try {
            const profiles = await Promise.all(
                memberList.map(async (member, index) => {
                    try {
                        const res = await axios.get(`http://localhost:8080/image/member/${member}`);
                        setMemberImages(prevImages => [...prevImages, `http://localhost:8080/image/member/${member}`]);
                        return res.data; // 또는 필요한 데이터로 수정
                    } catch (error) {
                        console.error(`Error fetching profile for member ${member}:`, error);
                        return null;
                    }
                })
            );



            //console.log(memberImages);
            // profiles를 사용하여 필요한 작업 수행


        } catch (error) {
            console.error('Error fetching member profiles:', error);
        }
    };


    //게시물 수정페이지 모달로 이동
    const [edit, setEdit] = useRecoilState(boardEdtiState);

    const updateBoard = (e, board) => {
        setBoardNo(board);
        setEdit(true);
        setIsModal(true);
    }
    //삭제
    const handleDelete = (e, boardNo) => {
        setDeleteNo(boardNo);
        if (window.confirm('게시글을 지우겠습니까?')) {
            deleteBoard(boardNo)
            setDeleteNo("")

        } else {
            alert("취소되었습니다.")
        }
    };

    const [replyBoardNo, setReplyBoardNo] = useState([]);
    const handleIsView = (boardNo) => {
        if (isView) {
            setReplyBoardNo(boardNo);

        }
        else{
            setIsView(!isView);
        }
    }
    const closeReply=()=>{
        setIsView(false)
    }
    const [check, setCheck] = useState(0);
    const trigger = (data) => {
        console.log(data)
        setCheck(check + 1)
    }

    return (<>
        <div className='container mt-4'>
            <div className='row'>
                <div className='col-10 offset-1'>



                    {loading ? (<p>Loading...</p>) : (
                        boardList.map((board) => (

                            <div key={board.boardNo} className="card border-dark mb-3" style={{ maxWidth: '100rem' }}>
                                <div className="card-header" >
                                    <div className='row'>
                                        <div className='col'><span onClick={(e) => handleSelectedUser(e, board.boardWriter)} value={board.boardWriter}>{board.boardWriter}</span> {board.boardNo}</div>
                                        <div className='col-1 '>
                                            {board.boardWriter === props.user ? (
                                                <NavDropdown>
                                                    <NavDropdown.Item value={board.boardNo} onClick={(e) => updateBoard(e, board.boardNo)}>수정</NavDropdown.Item>
                                                    <NavDropdown.Item value={board.boardNo} onClick={(e) => handleDelete(e, board.boardNo)}>삭제</NavDropdown.Item>
                                                </NavDropdown>
                                            ) : (<></>)}

                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="card-title">
                                        <div>
                                            <div className='row'>
                                                {/* 현재 처리 중인 board의 이미지 목록 출력 */}
                                                <Carousel interval={null} prevIcon={<span></span>}>
                                                    {imageList
                                                        .filter((attach) => attach.boardNo === board.boardNo)
                                                        .map((image, index, arrays) => (
                                                            <Carousel.Item key={index}>


                                                                {/* 이미지 출력 */}



                                                                {imgSrcList
                                                                    .filter((att) => att.attachNo == image.attachNo)
                                                                    .map((img, imgIndex, array) => (
                                                                        <div key={`${imgIndex}`} style={{ width: '100%', height: '100%' }}>
                                                                            {image.attachType.split('/')[0] === "image" ? (
                                                                                <img
                                                                                    style={{
                                                                                        objectFit: 'cover',
                                                                                        width: '60%',
                                                                                        height: '100%',
                                                                                        margin: 'auto',
                                                                                        display: 'block',
                                                                                    }}
                                                                                    src={img.image}
                                                                                    alt={`게시물 이미지 ${imgIndex + 1}`}
                                                                                    className="image-style"
                                                                                />
                                                                            ) : (
                                                                                <>
                                                                                    <video
                                                                                        id="myVideo"
                                                                                        controls
                                                                                        width="40%"
                                                                                        height="30%"
                                                                                        style={{
                                                                                            objectFit: 'cover',
                                                                                            margin: 'auto',
                                                                                            display: 'block',
                                                                                        }}
                                                                                    >
                                                                                        <source src={img.image} type={image.attachType} />
                                                                                        Your browser does not support the video tag.
                                                                                    </video>


                                                                                </>
                                                                            )}


                                                                            {/* 이미지 위에 텍스트 */}
                                                                        </div>
                                                                    ))}
                                                                <Carousel.Caption>
                                                                </Carousel.Caption>




                                                                {/* 여기에 이미지 정보를 출력하는 코드를 추가하세요 */}
                                                                <div style={{ position: 'absolute', top: '4%', left: '90%', color: 'gray', fontSize: '16px' }}>
                                                                    {arrays.length === 1 ? "" : (index + 1 + "/" + arrays.length)}

                                                                </div>
                                                            </Carousel.Item>
                                                        ))}
                                                </Carousel>
                                            </div>
                                        </div>
                                    </div>
                                    <hr className='mt-4' />
                                    <div className='row'>
                                        <div className='col-1'>

                                            {likeList.includes(board.boardNo) ? (
                                                <FaHeart style={{ color: 'red' }} data-name='like'
                                                    values={board.boardLike} onClick={(e) => handelLike(e, board.boardNo)} />

                                            ) : (

                                                <FaRegHeart values={board.boardNo} data-name='unlike' onClick={(e) => handelLike(e, board.boardNo)} />
                                            )}

                                        </div>
                                        <div className='col-1'>
                                            <FaReply value={board.boardNo} data-name='unlike' onClick={(e) => clickBoardNo(e, board.boardNo)} />
                                        </div>
                                    </div>
                                    <p>좋아요 {board.boardLike} 개</p>
                                    <NavLink onClick={(e) => handleSelectedUser(e, board.boardWriter)} value={board.boardWriter}>{board.boardWriter}</NavLink> {board.boardContent}
                                    <div className="card-text mt-1">
                                        {board.boardWriteTime}
                                    </div>
                                    <div className=' row mt-2'>
                                      <div> <span onClick={() => handleIsView(board.boardNo)}>댓글보기</span> <span onClick={closeReply}>x</span></div>

                                        {isView && replyBoardNo === board.boardNo && (
                                            <div><ReplyList boardNo={board.boardNo} check={check} /></div>)}

                                    </div>
                                    <div className='mt-2'>
                                        <Reply boardNo={board.boardNo} trigger={trigger}></Reply>
                                    </div>
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