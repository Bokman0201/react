import { useEffect, useRef, useState } from "react";
import { Modal } from "bootstrap";
import {MdCancel} from "react-icons/md";

const Exam01 = () => {


    const bsModal = useRef();

    const [todoList, setTodoList] = useState([
        { no: 1, title: "학원가기", type: "공부", edit: false },
        { no: 2, title: "영어단어외우기", type: "공부", edit: false },
        { no: 3, title: "헬스장가기", type: "운동", edit: false },
        { no: 4, title: "친구만나기", type: "일상", edit: false }
    ]);

    const [data, setData] = useState({

        title: "",
        type: "",
        edit: false

    });

    //백업 1회 시작시 복제
    const [backup, setBackup] = useState([]);

    //복제해서 backup에 넣기
    useEffect(() => {
        setBackup(todoList.map(todo => {
            const newTodo = { ...todo };
            return newTodo;
        }))
    }, []);



    //입력창
    const dataChange = e => {
        const newData = {
            ...data,
            [e.target.name]: e.target.value
        }
        setData(newData);

    };
    //수정버튼누르면 true로
    const changeStatus = (target) => {

        const newTodoList = todoList.map(todo => {

            if (todo.no === target.no) {
                return {
                    ...todo,
                    edit: true

                };
            };
            return todo;
        })
        setTodoList(newTodoList)
    };
    //취소 버튼을 누르면 backup으로
    const cancelTodo = (target) => {

        const findResult = backup.filter(todo => todo.no === target.no);


        const newTodoList = todoList.map(todo => {
            if (todo.no === target.no) {
                return {
                    ...findResult[0],
                    edit: false
                }
            }
            return todo;
        })
        setTodoList(newTodoList)
    };
    // 완료 버튼을 누르면 backup에 저장하고 불러오기

    const saveTodo = (target) => {

        const newBackup = backup.map(todo => {
            if (todo.no === target.no) {
                return {
                    ...target,
                    edit: false
                }
            }
            return todo;

        })
        setBackup(newBackup);

        const newTodoList = todoList.map(todo => {
            if (todo.no === target.no) {

                return {
                    ...todo,
                    edit: false
                }
            }
            return todo;
        })

        setTodoList(newTodoList);

    };

    const changeTodo = (target, e) => {
        const newTodoList = todoList.map(todo => {

            if (todo.no === target.no) {
                return {
                    ...todo,
                    [e.target.name]: e.target.value

                };
            }
            return todo;
        })
        setTodoList(newTodoList);
    }

    //일정 추가

    const addTodo = e =>{

        const todoNo = todoList.length==0? 1: todoList[todoList.length-1].no+1;

        //일정 추가

        const newTodoList=[
            ...todoList,
            {
                ...data,
                edit:false,
                no : todoNo
            }
        ];
        setTodoList(newTodoList);


        const newBackup = [
            ...backup,
            {
                ...data,
                edit:false,
                no: todoNo
            }
        ]
        setBackup(newBackup);


        setData({
            title:"",
            type:"",
        })

        closeModal();

    }

    const openModal = () => {
        var modal = new Modal(bsModal.current);//current 지금선택된 대상
        modal.show();
    };
    //모달 닫는 함수
    const closeModal = () => {
        //var modal = Modal.getInstance(document.querySelector("#exampleModal"));//js style
        var modal = Modal.getInstance(bsModal.current);//react style
        modal.hide();
    };


    //삭제
    const deleteTodo = (target) =>{
        const newTodoList = todoList.filter(todo=> todo.no !==target.no);
        setTodoList(newTodoList);

        const newBackup = todoList.filter(todo=> todo.no !==target.no);
        setBackup(newBackup)
    };






    //input만들기

    return (
        <>

            <div className="container-fluid">
                <div className="row mt-4">
                    <div className="col-10 offset-1">




                        <div className="text-end">
                       
                            <button type="button" onClick={openModal} class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            <MdCancel className="text-danger" size="40" color="#555"/>
                            </button>
                        </div>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>번호</th>
                                    <th>title</th>
                                    <th>type</th>
                                    <th>수정</th>
                                </tr>
                            </thead>
                            <tbody>
                                {todoList.map((todo, index) => (


                                    todo.edit ? (
                                        <tr className="text-center">
                                            <td>{todo.no}</td>
                                            <td><input type="text" name="title" value={todo.title} onChange={e => changeTodo(todo, e)} placeholder={todo.title} /></td>
                                            <td><input type="text" name="type" value={todo.type} onChange={e => changeTodo(todo, e)} placeholder={todo.type} /></td>
                                            <td><button onClick={e => saveTodo(todo)} className="btn btn-outline-primary me-1">완료</button>
                                                <button onClick={e => cancelTodo(todo)} className="btn btn-outline-primary">취소</button></td>
                                        </tr>
                                    ) : (
                                        <tr className="text-center">
                                            <td>{todo.no}</td>
                                            <td>{todo.title}</td>
                                            <td>{todo.type}</td>
                                            <td><button className="btn btn-outline-primary me-2" onClick={e => changeStatus(todo)}>수정</button>
                                            <button className="btn btn-outline-primary" onClick={e => deleteTodo(todo)}><MdCancel className="text-danger" size="20" color="#555"/></button>
                                            </td>
                                        </tr>
                                    )


                                ))}

                            </tbody>



                        </table>





                        <div class="modal fade"  ref={bsModal} id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h1 class="modal-title fs-5" id="exampleModalLabel">일정등록</h1>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <div className="row mt-4">
                                            <div className="col">
                                                <label className="form-label">title</label>
                                                <input type="text" name="title" value={data.title} onChange={dataChange} className="form-control" />
                                            </div>
                                        </div>
                                        <div className="row mt-4">
                                            <div className="col">
                                                <label className="form-label">type</label>
                                                <input type="text" name="type" value={data.type} onChange={dataChange} className="form-control" />
                                            </div>
                                        </div>

                                    </div>
                                    <div class="modal-footer">
                                        <div className="row mt-4">
                                            <div className="col text-end">
                                                <button className="btn btn-outline-primary" onClick={addTodo}>등록</button>
                                            </div>
                                            <div className="col text-end">
                                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
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

};

export default Exam01;