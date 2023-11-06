import { useEffect, useState } from "react";
import axios from "axios";
const Pocketmon = (props) => {
    const [pocketmonList, setPocketmonList] = useState([]);

    useEffect(() => {
        //서버에서 pocketmon list를 불러와서 state에 설정하는 코드
        axios({
            url: "http://localhost:8080/pocketmon/",
            method: "get"

        })
            .then(response => {
                console.log(response);
                setPocketmonList(response.data);
            })
            .catch(err => { });
    }, []);

    return (
        <>
                <div className="row mt-4">
                        <div className="p-4 text-light bg-dark rounded"><h1>포켓몬 관리화면</h1></div>
                    <div className="col">
                        <div>
                            <table  className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>번호</th>
                                        <th>이름</th>
                                        <th>속성</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {pocketmonList.map(pocketmon=>(

                                    <tr key={pocketmon.no}>
                                        <td>{pocketmon.no}</td>
                                        <td>{pocketmon.name}</td>
                                        <td>{pocketmon.type}</td>
                                        <td></td>
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
export default Pocketmon;