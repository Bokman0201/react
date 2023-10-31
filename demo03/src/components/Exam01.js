import {useState} from "react";//react모듈 중에서 useState만 불러오겠다
//구조할당연산자

function Exam01() {
    //상수를 의미 변하지 않는 변수를 의미
    //-react 에서는 자동으로 갱신해 주기떄문에 불변값이 아니면 처리를 안해준다
    //변경은 setter method로 처리하도록 설정이 되어있다
    //변수를 선언할 때 setter메소드까지 만들도록 useState라는 명령을 제공한다
    const [number, setNumber] =useState(10);
    //-->number라는 상태변수를 10으로 만들고 변경은 setNumber 함수로만 가능하게 하겠다
    
    function plus(){
        setNumber(number+1);
    }

    function minus(){
        setNumber(number-1);
    }




    return (
        <>
            <h1>첫번째 페이지</h1>
           <p> 데이터를 출력 </p>
            {/* 데이터를 출력 */}
           <h2> number = {number}</h2>
           {/* bootstrap , class 를부여할 때는 class가 아니라 className이라 해야함 */}
           <button className="btn btn-primary" onClick={plus}>+</button>
           <button className="btn btn-primary" onClick={minus}>-</button>

           

        </>
        

        
    );


}

export default Exam01;