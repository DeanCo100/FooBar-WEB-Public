import './App.css';
import HeaderMenu from './Menus/HeaderMenu';
import LeftMenu from './Menus/LeftMenu';
import RightMenu from './Menus/RightMenu';
import MidSection from './MiddleSection/MidSection';
// import RightMenu from './Menus/RightMenu';

function App() {
  return (
    <div className="App">
     < HeaderMenu />
     < LeftMenu/>
     < RightMenu/>
     < MidSection />
    </div>
  );
}

export default App;
