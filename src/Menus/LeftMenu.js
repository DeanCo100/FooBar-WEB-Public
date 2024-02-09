import '../styles/MenusStyles/LeftMenu.css';
import GroupIcon from '../icons/left-side-icons/group.png';
import SideBarLink from './MenuComponents/SideBarLink';
import FriendsIcon from '../icons/left-side-icons/friends.png';
import SaveIcon from '../icons/left-side-icons/save.png'
import MemoriesIcon from '../icons/left-side-icons/memories.png';
import VideoIcon from '../icons/header-icons/computer-monitor-video-play-icon.png';
import ProfileIcon from '../icons/header-icons/male-icon.png'
import MarketPlaceIcom from '../icons/header-icons/shop-icon.png';



function LeftMenu() {
  return (
    <div className="left-menu">
      <nav className="left-side-navbar">
        <SideBarLink icon={ProfileIcon} text="Profile" />
        <SideBarLink icon={FriendsIcon} text="Friends" />
        <SideBarLink icon={MemoriesIcon} text="Memories" />
        <SideBarLink icon={SaveIcon} text="Saved" />
        <SideBarLink icon={GroupIcon} text="Groups" />
        <SideBarLink icon={VideoIcon} text="Video" />
        <SideBarLink icon={MarketPlaceIcom} text="Marketplace" />
        {/* Add more SideBarLink components as needed */}
      </nav>
    </div>
  );
}
export default LeftMenu;
