import { Link } from "react-router-dom";
import '../styles/pages/_NotFound.scss';

const NotFound = () => {
  return (
    <main>
      <div className="notfoundContainer">
        <h1>Page non trouvée</h1>
        <Link to="/">Retour à la sélection des utilisateurs</Link>
      </div>
    </main>
  );
};

export default NotFound;