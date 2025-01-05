import "../styles/components/_Sidebar.scss";
import meditationIcon from "../assets/meditation.svg";
import swimmingIcon from "../assets/swimming.svg";
import cyclingIcon from "../assets/cycling.svg";
import weightliftingIcon from "../assets/weightlifting.svg";

const Sidebar = () => {
    return (
      <aside className="sidebar">
        <ul className="sidebarIcons">
          <li>
            <img src={meditationIcon} alt="Méditation" />
          </li>
          <li>
            <img src={swimmingIcon} alt="Natation" />
          </li>
          <li>
            <img src={cyclingIcon} alt="Cyclisme" />
          </li>
          <li>
            <img src={weightliftingIcon} alt="Haltérophilie" />
          </li>
        </ul>
        <p className="sidebarCopyright">Copyright SportSee 2020</p>
      </aside>
    );
  };
  
  export default Sidebar;