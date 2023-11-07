import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { MdCancel } from "react-icons/md";
import { AiOutlinePlus, AiFillEdit } from "react-icons/ai";
import { Modal } from "bootstrap";
import "./Book.css";


const Book = (props) => {
    const [bookList, setBookList] = useState([]);
    const loadBook = () => {

        axios({
            url: `${process.env.REACT_APP_REST_API_URL}/book/`,
            method: "get"
        })
            .then(response => {
                console.log(response);
                setBookList(response.data);
            })
            .catch(err => {
                window.alert("통신오류")

            });

    }

    useEffect(() => {
        loadBook();
    }, []);



    //포켓몬 삭제 
    //이제는 state에서 삭제하는 것이 아니라 통신을 보낸뒤 목록을 갱신한다
    const deletebook = (book) => {

        const choice = window.confirm("삭제할거임?");
        if (choice === false) return;

        //axios({}).then().catch();
        axios({
            url: `${process.env.REACT_APP_REST_API_URL}/book/${book.bookId}`,
            method: "delete"

        }).then(response => {
            loadBook();
        }).catch();

    };
    const clearBook = () => {
        setBook({
            bookTitle: "",
            bookAuthor: "",
            bookPublicationDate: "",
            bookPublisher: "",
            bookPageCount: "",
            bookGenre: "",
            bookPrice: ""

        })
    };

    const [book, setBook] = useState({
        bookTitle: "",
        bookAuthor: "",
        bookPublicationDate: "",
        bookPublisher: "",
        bookPageCount: "",
        bookGenre: "",
        bookPrice: ""
    });


    const bsModal = useRef();

    const openModal = () => {
        var modal = new Modal(bsModal.current);//current 지금선택된 대상
        modal.show();
    };
    //모달 닫는 함수
    const closeModal = () => {
        //var modal = Modal.getInstance(document.querySelector("#exampleModal"));//js style
        var modal = Modal.getInstance(bsModal.current);//react style
        modal.hide();
        clearBook();
    };


    const changeBook = (e) => {
        setBook({
            ...book,
            [e.target.name]: e.target.value
        })
    };

    const editBook = (target) => {
        setBook({ ...target });
        openModal();
    };

    const bookAdd=()=>{
        axios({
            url:`${process.env.REACT_APP_REST_API_URL}/book/`,
            method:"post",
            data:book
        })
        .then(response=>{
            loadBook();
            closeModal();
            

        });
    };
    const booksave=()=>{};

    const addBook=async ()=>{
        const response = await axios({
            url:`${process.env.REACT_APP_REST_API_URL}/book/`,
            method:"post",
            data:book
        });
        loadBook();
        closeModal();

    };



    const updateBook=()=>{
        const copyBook ={...book};
        delete copyBook.bookId;

        axios({
            url:`${process.env.REACT_APP_REST_API_URL}/book/${book.bookId}`,
            method:"put",
            data:copyBook,
        })
        .then(response=>{
            loadBook()
            closeModal();}
        );
    };

    return (

        <>
            <div className="row">
                <div className="p-4 text-light bg-dark rounded"><h1>도서 관리화면</h1></div>
            </div>
            <div className="row mt-4">
                <div className="col">
                    <button onClick={openModal}>
                        <AiOutlinePlus />
                    </button>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col">
                    <div>
                    </div>
                    <div>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th className="pc-only">번호</th>
                                    <th>제목</th>
                                    <th>저자</th>
                                    <th className="pc-only">페이지</th>
                                    <th>출판사</th>
                                    <th className="pc-only">출간일</th>
                                    <th className="pc-only">장르</th>
                                    <th>가격</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookList.map(book => (

                                    <tr key={book.bookId}>
                                        <td className="pc-only">{book.bookId}</td>
                                        <td>{book.bookTitle}</td>
                                        <td>{book.bookAuthor}</td>
                                        <td className="pc-only">{book.bookPageCount}</td>
                                        <td>{book.bookPublisher}</td>
                                        <td className="pc-only">{book.bookPublicationDate}</td>
                                        <td className="pc-only">{book.bookGenre}</td>
                                        <td>{book.bookPrice}원</td>
                                        <td>
                                            <AiFillEdit className="text-secondary" size="20" color="#555" onClick={e => editBook(book)} />
                                            <MdCancel className="text-danger" size="20" color="#555"
                                                onClick={e => deletebook(book)} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="modal fade" ref={bsModal} id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5" id="exampleModalLabel">
                                        {book.bookId === undefined ? '등록':'수정'}

                                        </h1>
                                        <button type="button" onChange={changeBook} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="row mt-2">
                                            <div className="col">
                                                <label className="form-label">타이틀</label>
                                                <input type="text" onChange={changeBook} value={book.bookTitle} className="form-control" name="bookTitle"></input>
                                            </div>
                                        </div>
                                        <div className="row mt-2">
                                            <div className="col">
                                                <label className="form-label">저자</label>
                                                <input type="text" onChange={changeBook} value={book.bookAuthor} className="form-control" name="bookAuthor"></input>
                                            </div>
                                        </div>                                        <div className="row mt-2">
                                            <div className="col">
                                                <label className="form-label">출판사</label>
                                                <input type="text" onChange={changeBook} value={book.bookPublisher} className="form-control" name="bookPublisher"></input>
                                            </div>
                                        </div>                                        <div className="row mt-2">
                                            <div className="col">
                                                <label className="form-label">출간일</label>
                                                <input type="date" onChange={changeBook} value={book.bookPublicationDate} className="form-control" name="bookPublicationDate"></input>
                                            </div>
                                        </div>                                        <div className="row mt-2">
                                            <div className="col">
                                                <label className="form-label">페이지</label>
                                                <input type="text" onChange={changeBook} value={book.bookPageCount} className="form-control" name="bookPageCount"></input>
                                            </div>
                                        </div>                                        <div className="row mt-2">
                                            <div className="col">
                                                <label className="form-label">장르</label>
                                                <input type="text" onChange={changeBook} value={book.bookGenre} className="form-control" name="bookGenre"></input>
                                            </div>
                                        </div>                                        <div className="row mt-2">
                                            <div className="col">
                                                <label className="form-label">가격</label>
                                                <input type="text" onChange={changeBook} value={book.bookPrice} className="form-control" name="bookPrice"></input>
                                            </div>
                                        </div>





                                    </div>
                                    <div className="modal-footer">
                                        <div className="row mt-4">
                                            <div className="col text-end">



                                            </div>
                                                
                                            <div className="col text-end">
                                                {book.bookId === undefined ?
                                                    <button type="button" className="btn btn-primary" onClick={addBook} data-bs-dismiss="modal">추가</button>
                                                    :
                                                    <button type="button" className="btn btn-primary" onClick={updateBook} data-bs-dismiss="modal">수정</button>
                                                }
                                            </div>

                                            <div className="col text-end">
                                                <button type="button" className="btn btn-secondary" onClick={closeModal} data-bs-dismiss="modal">Close</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </>
    );

}
export default Book;