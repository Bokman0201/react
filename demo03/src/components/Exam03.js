import { useState } from "react";

const Exam03=()=>{
    const [total,setTotal] = useState(0);
    const format = total.toLocaleString('en-US')

    return(
        
        <>
        <h1>돈</h1>
        <h2>출금금액 :￦ {format} 원</h2>
        <input className="" type="text" value={format} />
        <br/>
        <button className="btn btn-outline-primary" onClick={()=>setTotal(total+100000)}>10만원</button>
        <button className="btn btn-outline-primary" onClick={()=>setTotal(total+50000)}>5만원</button>
        <button className="btn btn-outline-primary" onClick={()=>setTotal(total+10000)}>1만원</button>
        <button className="btn btn-outline-primary" onClick={()=>setTotal(0)}>초기화</button>
        <br/>
        <input type="range" max="1000000000" min="0" value={total}  step="10000" onChange={e=>setTotal(parseInt(e.target.value))}/>
        </>
    );

}
export default Exam03;