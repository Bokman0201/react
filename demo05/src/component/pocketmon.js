import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { MdCancel } from "react-icons/md";
import { BiEditAlt } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import { Modal } from "bootstrap";


const Pocketmon = (props) => {
    const [pocketmonList, setPocketmonList] = useState([]);

    const loadPocketmon = () => {
        axios({
            url: "http://localhost:8080/pocketmon/",
            method: "get"
        })
            .then(response => {
                // console.log(response);
                setPocketmonList(response.data);
            })
            .catch(err => { });
    }

    useEffect(() => {
        //서버에서 pocketmon list를 불러와서 state에 설정하는 코드

        axios({
            url: "http://localhost:8080/pocketmon/",
            method: "get"
        })
            .then(response => {
                // console.log(response);
                setPocketmonList(response.data);
            })
            .catch(err => { });
    }, []);

    //포켓몬스터 삭제
    // - 이제는 state에서 삭제하는 것이 아니라 서버에 통신을 보낸 뒤 목록을 갱신하면 된다
    const deletePocketmon = (pocketmon) => {
        //axios({옵션}).then(성공시 실행할 함수).catch(실패시 실행할 함수);
        axios({
            url: `http://localhost:8080/pocketmon/${pocketmon.no}`,
            method: "delete"
        })
            .then(response => {
                loadPocketmon();
            })
            .catch(err => { });
    };

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
    };

    const bookEdit = () => {
        openModal();
    }

    //등록과 관련된 state
    const [pocketmon,setPocketmon]= useState({
        name:"",
        type:""
    });

    const changePocketmon=(e)=>{
        setPocketmon({
            ...pocketmon,
            [e.target.name] :e.target.value
        });
    };



    return (

        <div className="container-fluid">
            <div className="row">
                <div className="col-md-10 offset-md-1">
                    <h1>포켓몬 관리</h1>
                    <p>React CRUD 연습예제</p>

                    <div className="row mt-4">
                        <div className="col">
                            <button onClick={openModal}>
                                <AiOutlinePlus />
                            </button>
                        </div>
                    </div>

                    <div className="row mt-4"><div className="col">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>번호</th>
                                    <th>이름</th>
                                    <th>속성</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {pocketmonList.map(pocketmon => (
                                    <tr key={pocketmon.no}>
                                        <td>{pocketmon.no}</td>
                                        <td>{pocketmon.name}</td>
                                        <td>{pocketmon.type}</td>
                                        <td>
                                            <BiEditAlt className="text-warning ms-2" size="20" onClick={e => bookEdit()} />
                                            <MdCancel className="text-danger ms-2"
                                                onClick={e => deletePocketmon(pocketmon)} />
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div></div>

                    <div class="modal fade" ref={bsModal} id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="exampleModalLabel">등록</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div className="row mt-2">
                                        <div className="col">
                                            <label className="form-label">이름</label>
                                            <input onChange={changePocketmon} value={pocketmon.name} type="text" name="name" className="form-control" autoComplete="off" />

                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col">
                                            <label className="form-label">타입</label>
                                            <input onChange={changePocketmon} value={pocketmon.type} type="text" name="type" className="form-control"  autoComplete="off"/>

                                        </div>
                                    </div>
                                




                                </div>
                                <div class="modal-footer">
                                    <div className="row mt-4">
                                        <div className="col text-end">
                                            <button className="btn btn-outline-primary"  >등록</button>
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
    );
};
export default Pocketmon;