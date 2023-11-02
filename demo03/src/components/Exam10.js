import { useEffect, useState } from "react";
import  {Modal}  from "bootstrap";

const Exam10 = () => {
    const [items, setItems] = useState([
        { itemNo: 1, itemName: "포켓몬스터빵", itemPrice: 500, itemType: "식품", edit: false },
        { itemNo: 2, itemName: "허니버터칩", itemPrice: 1300, itemType: "식품", edit: false },
        { itemNo: 3, itemName: "참이슬후레시", itemPrice: 2200, itemType: "주류", edit: false },
        { itemNo: 4, itemName: "카스", itemPrice: 2500, itemType: "주류", edit: false },
        { itemNo: 5, itemName: "테라", itemPrice: 1300, itemType: "주류", edit: false },
        { itemNo: 6, itemName: "켈리", itemPrice: 1400, itemType: "주류", edit: false },
        { itemNo: 7, itemName: "처음처럼", itemPrice: 2000, itemType: "주류", edit: false },
        { itemNo: 8, itemName: "오징어땅콩", itemPrice: 3500, itemType: "식품", edit: false },
        { itemNo: 9, itemName: "신라면", itemPrice: 1500, itemType: "식품", edit: false },
        { itemNo: 10, itemName: "하리보젤리", itemPrice: 5500, itemType: "식품", edit: false }
    ]);

    const [backup, setBackup] = useState([]);

    const [data, setData] = useState({
        itemName: "",
        itemPrice: "",
        itemType: ""
    });

    const changeData = e => {
        const newData = {
            ...data,
            [e.target.name]: e.target.value
        };
        setData(newData);
    };

    //(중요) "시작하자마자" items의 내용을 backup으로 복제(1회) 
    useEffect(() => {
        setBackup(items.map(item => {
            const newItem = { ...item };
            return newItem;
        }));
    }, []);

    //줄을 수정상태로 변경하는 함수
    //- 이 함수를 실행하려면 최소한 itemNo는 알아야 한다
    //- 함수를 호출할 때 이벤트 정보(e) 대신 아이템 정보(item)을 전달하여 처리하도록 처리
    const changeToEdit = (target) => {//넘겨받은 item으로 수정
        // console.log(item);    


        //아이템 변경
        const newItems = items.map(item => {
            if (item.itemNo === target.itemNo) {//target과 같은 번호의 상품만큼은
                return {
                    ...item,//다른건 그대로 둬라 (item을 펼쳐라)
                    edit: true
                };
            }
            return item;
        });

        setItems(newItems);//items를 변경해서 새로 만든 배열
    };

    //줄의 데이터를 변경하는 함수
    //- 어떤 아이템인지(target)와 뭐라고 했는지(e)를 알아야 한다
    const changeItem = (target, e) => {
        const newItems = items.map(item => {
            if (item.itemNo === target.itemNo) {//같은 번호를 발견한다면
                return {
                    ...item,//나머지 정보는 그대로 두고
                    [e.target.name]: [e.target.value]//입력창의 이름에 해당하는 필드값을 입력값으로 바꿔라
                }
            }
            return item;
        });
        setItems(newItems);
    };

    //취소버튼을 누른 경우 실행할 함수
    //- backup에 들어있는 target과 번호가 같은 데이터를 items의 target과 같은 번호에 덮어쓰기
    const cancelItem = (target) => {

        //backup에서 target의 번호에 해당하는 객체를 찾는다(filter)
        const findResult = backup.filter(item => item.itemNo === target.itemNo);
        console.log(findResult);

        //아이템 변경
        const newItems = items.map(item => {
            if (item.itemNo === target.itemNo) {//target과 같은 번호의 상품만큼은
                return {
                    ...findResult[0],//다른건 백업데이터로 두고
                    edit: false//edit를 false로바꿔라
                };
            }
            return item;
        });
        setItems(newItems);//items를 변경해서 새로 만든 배열

    };

    const saveItem = (target) => {

        //백업 데이터 중 target과 번호가 같은 데이터를 갱신
        const newBackup = backup.map(
            item => {
                if (item.itemNo === target.itemNo) {//target과 같은 번호의 상품만큼은
                    return {
                        ...target,//변경된 데이터로 저장하고 
                        edit: false
                    };
                }
                return item;
            }
        );
        setBackup(newBackup);

        const newItems = items.map(item => {
            if (item.itemNo === target.itemNo) {//target과 같은 번호의 상품만큼은
                return {
                    ...item,//다른건 그대로 둬라 (item을 펼쳐라)
                    edit: false
                };
            }
            return item;
        });
        setItems(newItems);//items를 변경해서 새로 만든 배열

    };

    //아이템 삭제 
    //- 배열에서 항목을 삭제할 때도 filter를 사용한다
    const deleteItem = (target) => {
        //아이템 삭제
        const newItems = items.filter(item => item.itemNo !== target.itemNo);
        setItems(newItems);

        //백업 삭제 
        const backupItems = backup.filter(item => item.itemNo !== target.itemNo);
        setBackup(backupItems);
    };

    //아이템 추가
    //- data에 들어있는 객체를 복사해서 items에 추가
    //- data는 깨끗하게 정리
    const addItem = e => {

        const itemNo = items.length == 0 ? 1 : items[items.length - 1].itemNo + 1;
        //아이템 추가 
        // const newItems = items.concat(...data);
        const newItems = [
            ...items,
            {
                ...data,
                edit: false,
                itemNo: itemNo
            }
        ];
        setItems(newItems);

        //backup추가
        const newBackup = [
            ...backup,
            {
                ...data,
                edit: false,
                itemNo: itemNo
            }
        ];
        setBackup(newBackup);

        //입력창 초기화
        setData({
            itemName: "",
            itemPrice: "",
            itemType: ""
        })
        var modal = new Modal(document.querySelector("#exampleModal"));
      modal.hide();

    };

    const openModal = e=>{
        var modal = new Modal(document.querySelector("#exampleModal"));
        modal.show();


    };

    





    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-10 offset-md-1">
                    <h1>상품 목록</h1>

                    <div className="row mt-4">
                        <div className="col">
                        <button type="button" className="btn btn-primary"
                                onClick={openModal}>신규등록</button>

                        </div>
                    </div>
                    <div>
                        <table className="table table-bordered mt-4">
                            <thead>
                                <tr>
                                    <th width="10%">번호</th>
                                    <th width="10%">종류</th>
                                    <th width="40%">상품이름</th>
                                    <th width="10%">가격</th>
                                    <th width="30%">관리</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item, index) => (//조건? T : F
                                    item.edit ? (
                                        <tr key={item.itemNo}>
                                            <td>{item.itemNo}</td>
                                            <td>
                                                <input className="form-control" type="text" value={item.itemType}
                                                    onChange={e => changeItem(item, e)} name="itemType" />
                                            </td>
                                            <td>
                                                <input className="form-control" type="text" value={item.itemName}
                                                    onChange={e => changeItem(item, e)} name="itemName" />
                                            </td>
                                            <td>
                                                <input className="form-control" type="text" value={item.itemPrice}
                                                    onChange={e => changeItem(item, e)} name="itemPrice" />
                                            </td>
                                            <td>
                                                <button type="button" className="btn btn-secondary ms-2"
                                                    onClick={e => cancelItem(item)}>취소</button>
                                                <button type="button" className="btn btn-success ms-2"
                                                    onClick={e => saveItem(item)}>완료</button>
                                            </td>
                                        </tr>
                                    ) : (
                                        <tr>
                                            <td>{item.itemNo}</td>
                                            <td>{item.itemType}</td>
                                            <td> {item.itemName}</td>
                                            <td> {item.itemPrice}
                                            </td>
                                            <td>
                                                <button type="button" className="btn btn-warning ms-2"
                                                    onClick={e => changeToEdit(item)}>수정</button>
                                                <button type="button" className="btn btn-danger ms-2"
                                                    onClick={e => deleteItem(item)}>삭제</button>
                                            </td>
                                        </tr>
                                    )
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                               이름 :  <input name="itemName" className="form-control"
                                value={data.itemName} onChange={changeData} />
                           가격 :  <input name="itemPrice" className="form-control"
                                value={data.itemPrice} onChange={changeData} />
                           분류 :  <input name="itemType" className="form-control"
                                value={data.itemType} onChange={changeData} />
                       
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-primary"
                                onClick={addItem}>추가</button>                                </div>
                            </div>
                        </div>
                    </div>

                </div></div></div>

    );
};

export default Exam10;