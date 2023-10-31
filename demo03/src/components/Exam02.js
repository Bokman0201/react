import { useState } from 'react';
import bokman from '../assets/images/bokman.jpg'

function Exam02() {

    const [size,setSize] = useState(200);

    // function samll () {
    //     setSize(100)
    // }

    // function medium (){
    //     setSize(200)

    // }
    // function large (){

    //     setSize(300)

    // }
    
    return (
            <>
            <h1>두 번째 예제</h1>

            <button onClick={()=>setSize(100)}>작게</button>
            <button onClick={()=>setSize(200)}>보통</button>
            <button onClick={()=>setSize(300)}>크게</button>

            <br/>

            <img width={size} height={size} src={bokman}/>
            </>
    );
}

export default Exam02;