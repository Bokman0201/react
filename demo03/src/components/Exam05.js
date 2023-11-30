import { useEffect, useState } from "react";

const Exam05 = () => {
    const [java,setJava] = useState(0);
    const [db,setDb] = useState(0);
    const [spring,setSpring] = useState(0);
    const [total,setTotal] =useState(0);
    const [avg,setAvg] =useState(0);


    useEffect(()=>{
       setTotal(Math.floor(java)+Math.floor(db)+Math.floor(spring));
    },[java,db,spring]);

    useEffect(()=>{
        setAvg(Math.floor(total/3) );
    },[total]);


    return (
        <>
            <div className="container">
                {total} : {avg}
                <div className="row">
                <div className="col">
                    자바  <input type="number" onChange={e=>{setJava(e.target.value)}}/>
                    </div>
                </div>
                <div className="row">
                <div className="col">
                    DB  <input type="number" onChange={e=>{setDb(e.target.value)}}/>
                    </div>
                </div>
                <div className="row">
                <div className="col">
                    spring  <input  type="number" onChange={e=>{setSpring(e.target.value)}}/>
                    </div>
                </div>
            </div>
              

        </>


    );

};

export default Exam05;