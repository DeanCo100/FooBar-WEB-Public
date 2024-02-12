import HeaderMenu from '../Menus/HeaderMenu';
import LeftMenu from '../Menus/LeftMenu';
import RightMenu from '../Menus/RightMenu';
import MidSection from '../MiddleSection/MidSection';
// import '../styles/DarkMode.css';
// import RightMenu from './Menus/RightMenu';

function Feed() {
  return (
    <div className="App">
     < HeaderMenu />
     < LeftMenu/>
     < RightMenu/>
     < MidSection />
    </div>
  );
}

export default Feed;
