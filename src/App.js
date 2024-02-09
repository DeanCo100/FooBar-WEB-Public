import './App.css';
import HeaderMenu from './Menus/HeaderMenu';
import LeftMenu from './Menus/LeftMenu';
import RightMenu from './Menus/RightMenu';
import MidSection from './MiddleSection/MidSection';
import { Route,Routes } from 'react-router-dom';
import LoginPage from './pages/login/login';
// import RightMenu from './Menus/RightMenu';

function App() {
  return (
    <Routes>
      <Route path='/' element={<LoginPage/>}/>
    </Routes>

    // <div className="App">
    //  < HeaderMenu />
    //  < LeftMenu/>
    //  < RightMenu/>
    //  < MidSection />
    // </div>
  );
}

export default App;
