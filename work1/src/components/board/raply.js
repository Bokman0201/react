import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { boardDetailNoState, reLoadState, userState } from "../recoil";
import axios from "axios";

const Reply = (props) => {
  const [user, setUser] = useRecoilState(userState)
  const [text, setText] = useState('');
  const [selectedBoardNo, setSelectedBoardNo] = useRecoilState(boardDetailNoState);
  const [boardNo, setBoardNo] = useState();
  const [reLoad, setReLoad] = useRecoilState(reLoadState);



useEffect(()=>{
  if (props.boardNo === undefined) {
    setBoardNo(selectedBoardNo);
  }
  else {
    setBoardNo(props.boardNo);

  }
},[])

  const handleChange = (e) => {
    setText(e.target.value)
    console.log(props.boardNo, text)
  }



  const handleClick = () => {
    setReLoad(false)
    if (props.boardNo === undefined) {
      setBoardNo(selectedBoardNo);
    }
    else {
      setBoardNo(props.boardNo);

    }
    const data = {
      boardNo: boardNo,
      replyWriter: user,
      replyContent: text,
    }

    axios({
      url: `http://localhost:8080/reply/write`,
      method: 'post',
      data: data
    }).then(res => {
      if (res.request.status === 200) {
        setReLoad(true)
        alert("등록되었습니다")

      }
    }).catch()
    console.log("send", data);
    setText('')
  }



  return (<>

    <div className="input-group mb-3">
      <input type="text" className="form-control" value={text} placeholder="댓글입력" aria-label="Recipient's username" aria-describedby="button-addon2"
        onChange={handleChange}
      />
      <button className="btn btn-primary" type="button" id="button-addon2" onClick={handleClick}>작성</button>
    </div>
  </>);


}
export default Reply;