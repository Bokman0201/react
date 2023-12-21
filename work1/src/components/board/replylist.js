import axios from "axios";
import { useEffect, useState } from "react";
import moment from 'moment';
import { useRecoilState } from "recoil";
import { boardDetailNoState, reLoadState, userState } from "../recoil";


const ReplyList = (props) => {
    const [replyList, setReplyList] = useState([]);
    const [selectedBoardNo,setSelectedBoardNo] = useRecoilState(boardDetailNoState);
    const [boardNo, setBoardNo] = useState();
    const [reLoad,setReLoad] = useRecoilState(reLoadState);
    const [user,setSetUser] = useRecoilState(userState);


    
    const getReplyList = async () => {
    
        console.log("boardNo",props.boardNo)
        if(props.boardNo === undefined){
            setBoardNo(selectedBoardNo);
        }
        else{
            setBoardNo(props.boardNo);
        }

        try {
            if(boardNo===undefined){
                return;
            }
            const res = await axios.get(`http://localhost:8080/reply/list/${boardNo}`)
            console.log("data", res.data)
            setReplyList(res.data)
        }
        catch {

        }
    }

    const check = () => {
    }

    useEffect(() => {
        console.log(props.boardNo)
        console.log(formattedDate);
        getReplyList();

    }, [props.check,boardNo,reLoad]);


    const nowTime = moment();
    const formattedDate = nowTime.format('YYYY-MM-DD HH:mm:ss');

    const calculateTimeDifference = (replyTime) => {
        const diffInMinutes = nowTime.diff(replyTime, 'minutes');
        if (diffInMinutes < 60) {
            return `${diffInMinutes}분 전`;
        } else if (diffInMinutes < 24 * 60) {
            return `${Math.floor(diffInMinutes / 60)}시간 전`;
        } else if (diffInMinutes < 7 * 24 * 60) {
            return `${Math.floor(diffInMinutes / (24 * 60))}일 전`;
        } else {
            return replyTime.format('YYYY년 MM월 DD일');
        }
    };

    return (
        <div className="mt-3  row">
            {replyList.length > 0 ? (


                <div>
                    {replyList.map((reply, index) => (
                    <div className="border col mt-1" key={index}>
                        <div className="row">
                        <div className="col-11">{reply.replyWriter} {reply.replyContent} </div>
                        <div className="col-1">♥ </div>
                        </div>
                        <div className="col-12">{calculateTimeDifference(reply.replyTime)} <span oncoli>답글 작성</span>
                        {reply.replyWriter === user&&(     
                            <>
                        <span oncoli>수정</span> 
                        <span oncoli> 삭제</span>
                            </> 
                        )}
                 
                        </div>
                    </div>
                ))}
                </div>
            ) : (<h5>아직 댓글이 없습니다</h5>)}
        </div>
    );
}
export default ReplyList;