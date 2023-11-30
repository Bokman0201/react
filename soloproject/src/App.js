import logo from './logo.svg';
import './App.css';
import { Route, Routes, useNavigate } from 'react-router';
import Home from './components/home';
import MemberJoin from './components/member/memberJoin';
import { useEffect, useRef, useState } from 'react';
import Draggable from "react-draggable";
import { Modal } from 'react-bootstrap';
import { IoChatbubbles } from "react-icons/io5";
import SockJS from 'sockjs-client';



function App() {
  const navigate = useNavigate();
  const dragRef = useRef < HTMLDivElement > (null);

  useEffect(() => {
    navigate('/home');  // Corrected usage
  }, []);



  //웹소켓
const [webSocket,setWebsocket] =useState();
  useEffect(() => {
    // 소켓 연결
    const socket = new SockJS('http://localhost:8080/ws/sockjs');
    setWebsocket(socket);
    // 소켓 이벤트 핸들링
    socket.sessionAttributes = {
      memberEmail:user,
      memberLevel:level
          };
    socket.onopen = () => {
      console.log('Socket 연결이 열렸습니다.');
      const data = {
        type:'enterRoom',
        memberEmail:user,
        memberLevel:level
      }
      socket.send(JSON.stringify(data));

    };
    socket.sessionAttributes = {
      memberEmail: user,
      memberLevel: level
  };

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log('받은 메시지:', message);
    };

    socket.onclose = () => {
      console.log('Socket 연결이 닫혔습니다.');
    };

   
    return () => {
      socket.close();
    };
  }, []); 

  const [message,setMessage] =useState("");
  const [messageList, setMessageList] =useState([]);

  const messageChange=(e)=>{
    setMessage(e.target.value)
    console.log(message)
  }

  const sendMessage=()=>{
    const data = {
      type:'message',
      memberEmail:user,
      memberLevel:level,
      content:message
    }
    webSocket.send(JSON.stringify(data));
  };














  const [isDragging, setIsDragging] = useState(false);

  const [show, setShow] = useState(false);
  const openModal = () => {
    setShow(true);
  };
  const closeModal = () => {
    setShow(false)
  };

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragStop = () => {
    setIsDragging(false);
  };

  const handleModalClick = () => {
    if (!isDragging) {
      openModal();
    }
  };

  const user = sessionStorage.getItem('userId');
  const level = sessionStorage.getItem("userLevel")
  const userId = ()=>{
  }
  const userLogin=()=>{
    sessionStorage.setItem('userLevel','일반');
    sessionStorage.setItem("userId", 'jeonghs24@nate.com');
  };
  useEffect(()=>{},[user])
  return (
    <>


      <div className='container'>
        <button onClick={userLogin}>로그인</button>
        {user}{level}


        <Routes>
          <Route path='/home' element={<Home />} ></Route>
          <Route path='/memberJoin' element={<MemberJoin />} ></Route>
        </Routes>

        <Draggable bounds="body" onStart={handleDragStart} onStop={handleDragStop}>


          <div className='container' >
            <IoChatbubbles onClick={handleModalClick} />
          </div>
        </Draggable>
        <Modal
          show={show}
          onHide={closeModal}
          backdrop="static"
          keyboard={true}
          size="lg"
          aria-labelledby="approve-modal"
          centered>
          hi

          {/* Modal에 담을 컴포넌트 구성하기 */}
        </Modal>

          <div style={{ border: '1px solid #218C74', padding: '15px', minHeight: '600px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.7)' }}>
            {messageList.map((message, index) => (
              // user의 id와 메시지의 id가 같지 않으면 렌더링
              user.id !== message.id && (
                <div key={index}>
                </div>
              )
            ))}
          </div>
          <div className="input-group mb-3 mt-3">
            <input type="text"
              value={message}
              onChange={messageChange}
              className="form-control" aria-label="Recipient's username" aria-describedby="button-addon2" />
            <button className="btn btn-outline-primary" type="button" id="button-addon2" onClick={sendMessage}>Send</button>
          </div>

      </div>
    </>
  );
}

export default App;
