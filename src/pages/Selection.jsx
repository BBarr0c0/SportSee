import UserSelector from "../components/UserSelector";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import '../styles/pages/_Selection.scss';

const Selection = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const mockUsers = await Promise.resolve([
          { id: 12, userInfos: { firstName: "Karl", lastName: "Dovineau" } },
          { id: 18, userInfos: { firstName: "Cecilia", lastName: "Ratorez" } },
        ]);
        setUsers(mockUsers);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchAllUsers();
  }, []);

  const handleSelectUser = (userId) => {
    navigate(`/Profil/${userId}`);
  };

  if (error) {
    return <div>Erreur : {error}</div>;
  }

  return (
    <div>
      <h1 className="selectorTitle">Sélection d’un utilisateur</h1>
      <UserSelector users={users} onSelectUser={handleSelectUser} />
    </div>
  );
};

export default Selection;