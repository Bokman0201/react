import logo from './logo.svg';
import { Carousel, Container, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import "./App.css";
import { Route, Routes, useNavigate } from 'react-router-dom'
import Home from './components/home';
import MemberJoin from './components/member/memberJoin';
import { NavLink } from 'react-router-dom';
import BoardWrite from './components/board/boardWrite';
import LogIn from './components/member/login';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { boardDetailNoState, boardEdtiState, modalState, userState } from './components/recoil';
import Detail from './components/member/detail';
import Modal from 'react-modal'
import Reply from './components/board/raply';
import axios from 'axios';
import BoardImageDetail from './components/board/boardImageDtail';
import BoardDtail from './components/board/boardDtail';
import ReplyList from './components/board/replylist';
import { ProfileUpdate } from './components/member/profileUpdate';
import { searchMember } from './components/helper';
Modal.setAppElement('#root'); // App의 최상위 엘리먼트를 설정



function App() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const navigator = useNavigate();

  const [boardNo, setBoardNo] = useRecoilState(boardDetailNoState);
  const [edit, setEdit] = useRecoilState(boardEdtiState);


  const [isModal, setIsModal] = useState(false);
  const openModal2 = (e, boardNo) => {
    setIsModal(true);
  }
  const closeModal2 = () => {
    setEdit(false)
    setBoardNo("")
    setIsModal(false);
  }

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  const [user, setUser] = useRecoilState(userState);
  const memberId = sessionStorage.getItem("memberId");
  useEffect(() => {
    if (boardNo !== "") {
      openModal2();
    }

  }, [boardNo, edit]);


  useEffect(() => {
    if (memberId !== null && memberId !== "") {
      navigator("/home")
      setUser(memberId);
    }
    else {
      navigator("/login")
    }
  }, [user, memberId]);

  const logout = () => {

    const result = window.confirm("로그아웃 하실건가요");
    if (result) {
      alert("로그아웃 되었습니다.")
      sessionStorage.removeItem("memberId");
      setUser('');
      navigator("/login");
    }

  };

  //Modal 관련 처리

  const [modal, setModal] = useRecoilState(modalState);

  const openModal = () => {
    setModal(true);
    console.log(modal)
  };

  const closeModal = () => {
    setModal(false);

  };
  const afterOpenModal = () => {

  }

  const [selectedUser, setSelectedUser] = useState();






  const [text, setText] = useState({});
  const [searchResult, setSearchResult] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const searchChange = (e) => {
    setText({
      ...text,
      [e.target.name]: e.target.value
    })


  }

  const handleSearch = async () => {
    try {
      const searchResults = await searchMember(text);
      setSearchResult(searchResults)
      setShowDropdown(searchResults.length > 0);
    } catch (error) {
      // 검색 중 에러가 발생한 경우 여기에서 처리
      console.error('Error during search:', error);
    }
  }


  const handleClickuser=(memberId)=>{
    navigator(`/mypage/${memberId}`)
    setSearchResult([])
  }



  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand as={NavLink} to="/home">홈</Navbar.Brand>

          {user}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/home">Home</Nav.Link>
              <Nav.Link onClick={openModal}>글쓰기</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item as={NavLink} to="/memberJoin">회원가입</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
              {user !== '' ? (
                <Nav.Link onClick={logout}>logout</Nav.Link>
              ) : (
                <Nav.Link as={NavLink} to='/login'>login</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
        <div className="search-container">
          <input  name='memberId' onChange={searchChange} />
          <button onClick={handleSearch}>검색</button>
          {showDropdown && (
            <ul className="search-results">
              {searchResult.map((result) => (
                <li key={result.memberId} value={result.memberId} onClick={()=>handleClickuser(result.memberId)}>
                  {result.memberId}
                </li>
              ))}
            </ul>
          )}
        </div>
      </Navbar>


      <div>
        <Modal
          isOpen={modal}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div><h2 className="mb-2">새글 쓰기</h2 ></div>
          <BoardWrite></BoardWrite>
        </Modal>
      </div>


      <div className='container'>

        <NavLink to={"/memberJoin"}></NavLink>

        <Routes>
          <Route path="/memberJoin" element={<MemberJoin />}></Route>
          <Route path="/home" element={<Home user={user} selecteduser={{ selectedUser, setSelectedUser }} />}></Route>
          <Route path="/login" element={<LogIn />}></Route>
          <Route path="/boardWrite" element={<BoardWrite />} />
          <Route path='/reply' element={<Reply />}></Route>
          <Route path="/mypage/:selectedUser" element={<Detail selecteduser={{ selectedUser, setSelectedUser }} />} />
          <Route path='/profileUpdate' element={<ProfileUpdate />} />
        </Routes>
      </div>

      <Modal
        isOpen={isModal}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        style={{
          overlay: {
            zIndex: 9999,
            backgroundColor: 'gray',
          },
          content: {
            zIndex: 9999,
            width: '100%',
            maxWidth: '95%',
          },
        }}
        onAfterOpen={() => {
          document.body.style.overflow = 'hidden';
        }}
        onAfterClose={() => {
          document.body.style.overflow = 'auto';
        }}
      >
        <div className='modal-header'>
          <h2></h2>
          <button onClick={closeModal2}>close</button>
        </div>
        <div className='row'>
          {/*
        Use media queries to adjust the layout for screens with a width of 700px or less
      */}
          <div className='col-12 col-md-7' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh', overflow: 'hidden' }}>
            <div className='row' style={{ height: '100%', overflow: 'hidden' }}>
              <div className='col' style={{ height: '100%', overflow: 'hidden' }}>
                <BoardImageDetail />
              </div>
            </div>
          </div>
          {/*
        Adjust the layout for screens with a width of 700px or less
      */}
          <div className='col-12 col-md-5' style={{ overflow: 'auto' }}>
            <div>
              <BoardDtail modal={closeModal2} />
            </div>
            <div>
              {edit ? null : <ReplyList />}
            </div>
            <div className='col-4 ' style={{ position: 'absolute', bottom: 2 }}>
              {edit ? null : <Reply />}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default App;
