import axios from "axios";
import { useEffect, useState } from "react";
import { MdCancel } from "react-icons/md";
import { AiOutlinePlus, AiFillEdit } from "react-icons/ai";
import "./Book.css";


const Book = (props) => {
    const [bookList, setBookList] = useState([]);
    const loadBook =()=>{

        axios({
            url: "http://localhost:8080/book/",
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
    const deletebook=(book)=>{

        const choice = window.confirm("삭제할거임?");
        if(choice===false) return; 
        
        //axios({}).then().catch();
        axios({
            url:`http://localhost:8080/book/book/${book.bookId}`,
            method:"delete"

        }).then(response=>{
            loadBook();
        }).catch();

    };


    return (

        <>
            <div className="row">
                <div className="p-4 text-light bg-dark rounded"><h1>도서 관리화면</h1></div>
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
                                            <AiFillEdit className="text-secondary" size="20" color="#555"/>
                                          <MdCancel className="text-danger" size="20" color="#555"
                                          onClick={e=>deletebook(book)}/>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>

        </>
    );

}
export default Book;