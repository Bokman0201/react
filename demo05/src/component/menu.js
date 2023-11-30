import { NavLink, useLocation } from "react-router-dom";

const Menu = props =>{
    const location = useLocation();
    console.log(location.pathname);


    return (
        <>
            <nav className="navbar navbar-expand-lg bg-primary fixed-top" data-bs-theme="dark">
  <div className="container-fluid">
    <NavLink to="/" className="navbar-brand">logo</NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarColor01">
      <ul className="navbar-nav me-auto">
        <li className="nav-item">
          <NavLink to="/" className="nav-link ">Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/pocketmon" className={`nav-link ${location.pathname==='/pocketmon'?'active':''}`} >포켓몬</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/book" className={`nav-link ${location.pathname==='/book'? 'active' : ''}`}>도서</NavLink>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Dropdown</a>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="#">Action</a>
            <a class="dropdown-item" href="#">Another action</a>
            <a class="dropdown-item" href="#">Something else here</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">Separated link</a>
          </div>
        </li>
 
      </ul>
      <form className="d-flex">
        <input className="form-control me-sm-2" type="search" placeholder="Search"/>
        <button className="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>
        </>
    );


}
export default Menu;