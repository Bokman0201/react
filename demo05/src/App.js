
import { NavLink, Route, Routes } from 'react-router-dom';
import Pocketmon from './component/pocketmon';
import Book from './component/book';
import Home from './component/home';
import Menu from './component/menu';

function App() {
  return (
    <div className='container-fluid my-5 py-5'>
      {/* 상단 메뉴영역 */}
      <Menu />


      {/* 본문영역 */}
      <div className='row'>
        <div className='col-md-8 offset-md-2 col-sm-10 offset-sm-1'></div>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path='/pocketmon' element={<Pocketmon />}></Route>
          <Route path='/book' element={<Book />}></Route>

        </Routes>
      </div>

    </div>
  );
}

export default App;
