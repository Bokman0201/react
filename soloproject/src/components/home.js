import { NavLink } from "react-router-dom";

const Home = () => {

    return (<>
    <div>hello world!!</div>

    <NavLink to={"/memberJoin"}> 회원가입</NavLink>
    </>)
};
export default Home;