import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from 'react-modal'
import { useLocation, useNavigate, useParams } from "react-router";
import { useRecoilState } from "recoil";
import { boardDetailNoState, userState } from "../recoil";
import "./profile.css"
import { addFollow, deleteFollow, followingList, getFollowerList, getFollowingList } from "../helper";

const Detail = (props) => {
    const { selectedUser, setSelectedUser } = props.selecteduser;
    const [selecteduserData, setSelecteduserData] = useState({});
    const [boardNos, setBoardNos] = useState([]);
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const [boardNo, setBoardNo] = useRecoilState(boardDetailNoState);
    const [imageList, setImageList] = useState({})
    const navigator = useNavigate();
    const [info, setInfo] = useState({});
    const [profileSrc, setProfileSrc] = useState();
    const [user, setUser] = useRecoilState(userState);
    const [followingList, setFollowingList] = useState([]);
    const [followerList, setFollowerList] = useState([]);
    const [selectUser, setSelectuser] = useState('')

    //정보 가져오기
    const memberDetailPage = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/member/mypage/${params.selectedUser}`)
            const res2 = await axios.get(`http://localhost:8080/image/member/${params.selectedUser}`)

            setProfileSrc(`http://localhost:8080/image/member/${params.selectedUser}`)

            // console.log(res.data)
            setInfo(res.data)
            setBoardNos(info.boardDto.map(board => board.boardNo))
        }
        catch { }
    }







    const getImages = async () => {
        //console.log("start")
        try {
            const promises = boardNos.map(async (boardNo) => {
                const res = await fetch(`http://localhost:8080/image/board/${boardNo}`);

                console.log("실행");


                const images = await res.json();
                return images;
            });
            // 모든 비동기 작업이 완료될 때까지 기다림
            const allImages = await Promise.all(promises);

            const image = allImages.map((value, index) => {

                const decodedImages = Object.keys(value).map(key => {
                    const base64Image = value[key];
                    const binaryString = atob(base64Image);
                    const bytes = new Uint8Array(binaryString.length);

                    for (let i = 0; i < binaryString.length; i++) {
                        bytes[i] = binaryString.charCodeAt(i);
                    }
                    const blob = new Blob([bytes], { type: 'image/png' });
                    return {
                        attachNo: key,
                        image: URL.createObjectURL(blob),
                    }
                })
                return decodedImages;
            })

            setImageList(image)

            // 이미지 리스트를 상태에 추가



        } catch (error) {
            //  console.log("튕김")
            //console.error('Error fetching images:', error);
        }

    };






    const location = useLocation();
    useEffect(() => {
        const fetchDataAndSetLoading = async () => {
            try {
                await memberDetailPage();
                // 이미지 로딩이 완료되면 setLoading(true)를 호출
                await getImages();
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(true);
            }
        };

        fetchDataAndSetLoading();

    }, [selectUser, location, boardNos.length, boardNos.length === 0, loading]);


    useEffect(() => {
        setBoardNos([])
        setLoading(false)
    }, [params.selectedUser, followingList])



    const toUpdate = () => {
        navigator(`/profileUpdate`)
    };






    const handleClick = (e, boardNo) => {
        setBoardNo(boardNo);
    }




    const handleAddFollow = (followId) => {
        if (followId === undefined) {
            return
        };
        addFollow(followId, user);
        setUserFollowingList([...userFollowingList, { myId: user, followId: followId }]);

        if (params.selectedUser === followId &&
            params.selectedUser === followerList[1].followId &&
            followerList.length > 0 &&
            !followerList.some(item => item.myId === user && item.followId === params.selectedUser)
        ) {
            setFollowerList([...followerList, { myId: user, followId: params.selectedUser }]);
            console.log(followerList);
        }
        console.log("실행")
    }

    const handleUnFollow = (followId) => {
        console.log("unfollow")
        if (followId === undefined) {
            return;
        }
        deleteFollow(followId, user)
        const updatedFollowingList = userFollowingList.filter(follow => follow.followId !== followId);
        setUserFollowingList(updatedFollowingList);

        console.log(followerList);
        const updateFollowerList = followerList.filter(follower => follower.myId !== user);
        setFollowerList(updateFollowerList);

        console.log("ing", followingList)


        //내아이디 내 페이지 에서만 제거







    }



    const [userFollowingList, setUserFollowingList] = useState([]);

    useEffect(() => {
        const userList = async () => {
            const userRes = await getFollowingList(user);
            setUserFollowingList(userRes);
            console.log("user", userRes)
        }

        const list = async () => {
            const res = await getFollowingList(params.selectedUser);
            setFollowingList(res)
        }
        const follower = async () => {
            const res2 = await getFollowerList(params.selectedUser);
            setFollowerList(res2)
        }
        userList();
        follower();
        list();

    }, [params.selectedUser, selectUser])


    //모달
    const [isModalOpen, setModalOpen] = useState(false);

    // 모달 열기
    const openModal = (e) => {
        console.log(isFollow)
        setModalOpen(true);
    };

    // 모달 닫기
    const closeModal = () => {
        setModalOpen(false);
    };

    const [isFollow, setIsFollw] = useState(false);


    const idMatch = () => {
        const commonIds = followerList.some(follower => followingList.map(following => following.followId).includes(follower.myId));

        if (commonIds) {
            console.log('있다');
        } else {
            console.log('없다');
        }
    }






    return (

        <>
            {loading ? (
                <>
                    <div className="row">
                        <div className="col-3">
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
                                    src={profileSrc}
                                    alt="프로필 이미지"
                                />
                            </div>
                        </div>
                        <div className="col-2"><h2>{info.memberDto.memberId}</h2></div>

                        {user === params.selectedUser && (
                            <div className="col-3"><button onClick={toUpdate}>프로필 수정</button></div>
                        )}
                        <div className="row">
                            <div className="col-12">
                                {info.memberProfileDto.profileContent === null ? (
                                    <></>
                                ) : (
                                    <>{info.memberProfileDto.profileContent}</>
                                )}
                            </div>
                            <div className="col-4">
                                <span>게시물{info.boardDto.length}</span>
                            </div>
                            {params.selectedUser !== user && (
                                userFollowingList.some(follow => follow.followId === params.selectedUser) ? (
                                    <div>
                                        <button className="btn btn-warning" onClick={e => handleUnFollow(params.selectedUser)}>unfollow</button>
                                    </div>
                                ) : (
                                    <div>
                                        <button className="btn btn-primary" onClick={e => handleAddFollow(params.selectedUser)}>팔로우</button>
                                    </div>
                                )
                            )}

                            <div className="col-4"> <span onClick={e => openModal(setIsFollw(true))} value={"true"}>팔로잉{followingList.length}</span></div>
                            <div className="col-4"><span onClick={e => openModal(setIsFollw(false))} value={false}>팔로워{followerList.length}</span></div>

                        </div>
                    </div>

                    <div className="row">
                        <div className="row mt-4">
                            <div className="col">
                                <button className="w-100 text-overflow-ellipsis">게시물</button>
                            </div>
                            <div className="col">
                                <button className="w-100 text-overflow-ellipsis">동영상</button>
                            </div>
                            <div className="col">
                                <button className="w-100 text-overflow-ellipsis">즐겨찾기</button>
                            </div>
                            <div className="col">
                                <button className="w-100 text-overflow-ellipsis">나를테그</button>
                            </div>
                        </div>
                        {info.boardDto.map((board) => (
                            <div className="col-3" key={board.boardNo}>
                                {info.boardImageDto
                                    .filter((attach) => attach.boardNo == board.boardNo)
                                    .map((image, index, array) => (
                                        <React.Fragment key={index}>
                                            {index === 0 && (
                                                <>
                                                    <br />
                                                    {imageList.map((img, imgIndex) => (
                                                        <React.Fragment key={`${board.boardNo}-${imgIndex}`}>
                                                            {img
                                                                .filter((src) => src.attachNo == image.attachNo)
                                                                .map((src, imgIndex2) => (
                                                                    <React.Fragment key={`${board.boardNo}-${imgIndex}-${imgIndex2}`}>
                                                                        {info.attachDto
                                                                            .filter((att) => att.attachNo == src.attachNo)
                                                                            .map((type, typeIndex) => {
                                                                                const isImage = type.attachType.split("/")[0] === "image";

                                                                                return (
                                                                                    <div
                                                                                        key={typeIndex}
                                                                                        style={{
                                                                                            width: '100%',
                                                                                            paddingBottom: '100%',
                                                                                            position: 'relative',
                                                                                        }}
                                                                                    >
                                                                                        <img
                                                                                            onClick={(e) => handleClick(e, board.boardNo)}
                                                                                            style={{
                                                                                                position: 'absolute',
                                                                                                width: '100%',
                                                                                                height: '100%',
                                                                                                objectFit: 'cover',
                                                                                            }}
                                                                                            src={src.image}
                                                                                            alt={`게시물 이미지 ${typeIndex + 1}`}
                                                                                            className={isImage ? 'image-style' : ''}
                                                                                        />
                                                                                        {isImage || (
                                                                                            <video
                                                                                                onClick={(e) => handleClick(e, board.boardNo)}
                                                                                                style={{
                                                                                                    position: 'absolute',
                                                                                                    width: '100%',
                                                                                                    height: '100%',
                                                                                                    objectFit: 'cover',
                                                                                                }}
                                                                                                src={src.image}
                                                                                                alt={`게시물 이미지 ${typeIndex + 1}`}
                                                                                                className={!isImage ? 'image-style' : ''}
                                                                                            />
                                                                                        )}
                                                                                    </div>
                                                                                );
                                                                            })}
                                                                    </React.Fragment>
                                                                ))}
                                                        </React.Fragment>
                                                    ))}
                                                </>
                                            )}
                                        </React.Fragment>
                                    ))}
                            </div>
                        ))}
                    </div>

                </>
            ) : (
                <>로딩중로딩중로딩중로딩중로딩중로딩중로딩중로딩중로딩중</>
            )}

            <div>

                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    contentLabel="Example Modal"
                >
                    {/* 모달 내용 */}
                    <button onClick={closeModal}>Close Modal</button>
                    {isFollow ? (
                        <div className="container">
                            <h2>팔로잉</h2>
                            <div className="mt-4">
                                {followingList.map((following, index) => (
                                    <div className="row" key={index}>
                                        <div className="col-6">
                                            <h4>{following.followId}</h4>
                                        </div>
                                        <div className="col-6" >
                                            {(
                                                userFollowingList.some(follow => follow.followId === following.followId) ? (
                                                    <div>
                                                        <button className="btn btn-warning" onClick={e => handleUnFollow(following.followId)}>unfollow</button>
                                                    </div>
                                                ) : (
                                                    <div>
                                                        <button className="btn btn-primary" onClick={e => handleAddFollow(following.followId)}>팔로우</button>
                                                    </div>
                                                )
                                            )}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="container">
                            <h2>팔로워</h2>
                            <div className="mt-4">
                                {followerList.map((follower, index) => (
                                    <div className="row" key={index}>
                                        <div className="col-6">
                                            <h4>{follower.myId}</h4>
                                        </div>
                                        <div className="col-6" ><button onClick={() => handleAddFollow(follower.myId)} className={`btn btn-primary ${followingList.some(following => following.followId === follower.myId) ? 'disabled' : '없다'}`}>
                                            follow
                                        </button></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </Modal>
            </div>

        </>
    );


};
export default Detail;