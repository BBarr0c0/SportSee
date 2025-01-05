import logo from "../assets/logo.png";
import "../styles/components/_Header.scss";

const Header = () => {
  return (
    <header className="header">
      <div className="headerLogo">
        <img src={logo} alt="logo sportsee"></img>
        <h1>SportSee</h1>
      </div>
      <nav className="headerNav">
        <ul className="navContainer">
          <li>Accueil</li>
          <li>Profil</li>
          <li>Réglage</li>
          <li>Communauté</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;