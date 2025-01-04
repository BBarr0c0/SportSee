import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <h1>Page non trouvée</h1>
      <Link to="/">Retour à la sélection des utilisateurs</Link>
    </div>
  );
};

export default NotFound;