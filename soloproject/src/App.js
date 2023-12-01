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
import axios from 'axios';



function App() {
  const navigate = useNavigate();
  const dragRef = useRef < HTMLDivElement > (null);

  useEffect(() => {
    navigate('/home');  // Corrected usage
  }, []);

  const [message, setMessage] = useState("");

  const [messageList, setMessageList] = useState([]);
  const [roomNo,setRoomNo] = useState('0');

  //웹소켓
  const [webSocket, setWebsocket] = useState();
  useEffect(() => {
    // 소켓 연결
    const socket = new SockJS('http://localhost:8080/ws/sockjs');
    setWebsocket(socket);
    // 소켓 이벤트 핸들링
    socket.sessionAttributes = {
      memberEmail: user,
      memberLevel: level
    };
    socket.onopen = () => {
      console.log('Socket 연결이 열렸습니다.');
      const data = {
        type: 'enterRoom',
        chatRoomNo: `${roomNo}`,
        memberEmail: user,
        memberLevel: level
      }
      socket.send(JSON.stringify(data));

    };
    socket.sessionAttributes = {
      memberEmail: user,
      memberLevel: level
    };

    socket.onmessage = (event) => {
      console.log("전송")
      const message = JSON.parse(event.data);
      console.log("메세지",message);
      setMessageList(prevMessageList => [...prevMessageList, message]);
    };

    socket.onclose = () => {
      console.log('Socket 연결이 닫혔습니다.');
    };


    return () => {
      socket.close();
    };
  }, []);


  const messageChange = (e) => {
    setMessage(e.target.value)

    console.log(e.target.value);
    console.log(messageList);

  }
  const enterRoom=(e)=>{
    const data = {
      type: 'enterRoom',
      chatRoomNo: `${e.target.value}`,
      memberEmail: user,
      memberLevel: level
    }
    webSocket.send(JSON.stringify(data));

    setRoomNo(e.target.value);
    
    setMessageList([]);

  };

  const sendMessage = () => {
    const data = {
      type: 'message',
      chatRoomNo: `${roomNo}`,
      memberEmail: user,
      memberLevel: level,
      content: message
    }
    webSocket.send(JSON.stringify(data));
  };

  const createChat = () => {
    axios({
      url: `http://localhost:8080/createRoom`,
      method: 'post',
      data: {
        chatGourpDto: {
          memberEmail:
            addUser
        },
        chatRoomDto: {
        }
      }
    }).then(res => {
      console.log(res.data);
    });
  }







  //회원 정보 불러오기
  const [memberList, setMemberList] = useState([]);

  const loadMember = async () => {

    await axios({
      url: `http://localhost:8080/member/list/`,
      method: 'get'
    }).then(res => {
      setMemberList(res.data);
    })
  };

  const [addUser, setAddUser] = useState([]);

  const selectUser = (e) => {
    const selectedUser = e.target.value;

    // 체크박스가 체크되었으면 추가, 해제되었으면 제거
    if (e.target.checked) {
      setAddUser([...addUser, selectedUser]);
    } else {
      setAddUser(addUser.filter(user => user !== selectedUser));
    }
  }

  //채팅방 정보 불러오기

  const [roomList, setRoomList] = useState([]);

  const loadRoomList = () => {
    axios({
      url: `http://localhost:8080/roomList/${user}`,
      method: 'get'
    }).then(res => {
      setRoomList(res.data);
    });
  }








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

  const userId = () => {
  }

  const userLogin = () => {
    sessionStorage.setItem('userLevel', '일반');
    sessionStorage.setItem("userId", 'jeonghs24@nate.com');
  };
  const userLogin2 = () => {
    sessionStorage.removeItem('userId');
    sessionStorage.setItem('userLevel', '일반');
    sessionStorage.setItem("userId", '94.jeonghs@gmail.com');
  };
  useEffect(() => {
    loadMember();
    loadRoomList();
  }, [user])
  return (
    <>


      <div className='container'>
        <button onClick={userLogin}>로그인</button>
        <button onClick={userLogin2}>로그인</button>

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
          <div className='row'>
            <div className='col-6'>
              <div className='row'>
                <div className='col-6'>
                  {memberList.map(member => (
                    <div key={member.memberEmail}>
                      {roomNo}
                      <input onClick={selectUser} type='checkbox' value={member.memberEmail} />{member.memberName}
                    </div>
                  ))}

                </div>
                <div className='col-6'>
                  {roomList.map(room => (
                    <div key={room.chatRoomNo}>
                      <button onClick={enterRoom} type='checkbox' value={room.chatRoomNo} >{room.chatRoomNo}</button>
                    </div>
                  ))}
                </div>

              </div>


              <button onClick={createChat}>+</button>

            </div>
            <div className='col-6'>
              <div style={{ border: '1px solid #218C74', padding: '15px', minHeight: '600px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.7)' }}>
                {messageList.map((message, index) => (
                  // user의 id와 메시지의 id가 같지 않으면 렌더링
                  user == message.memberEmail && (
                    <div key={index}>
                      {message.memberEmail}:{message.content}
                    </div>
                  )
                ))}
              </div>
            <input type="text"
              value={message}
              onChange={messageChange}
              className="form-control" aria-label="Recipient's username" aria-describedby="button-addon2" />
            <button className="btn btn-outline-primary" type="button" id="button-addon2" onClick={sendMessage}>Send</button>
            </div>

          </div>


          <div className="input-group mb-3 mt-3">
          </div>

          {/* Modal에 담을 컴포넌트 구성하기 */}
        </Modal>



      </div>
    </>
  );
}

export default App;
