import { useEffect, useState } from "react";
import {
  fetchUserMainData,
  fetchUserActivity,
  fetchUserAverageSessions,
  fetchUserPerformance,
} from "./services/dataService";
import UserSelector from "./components/UserSelector";

const App = () => {
  const [users, setUsers] = useState([]); // Liste des utilisateurs
  const [selectedUserId, setSelectedUserId] = useState(null); // ID de l'utilisateur sélectionné
  const [userData, setUserData] = useState(null);
  const [activityData, setActivityData] = useState(null);
  const [averageSessionsData, setAverageSessionsData] = useState(null);
  const [performanceData, setPerformanceData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // État de chargement

  // Charger les données de tous les utilisateurs (mockés uniquement pour la sélection)
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

  // Charger les données de l'utilisateur sélectionné
  useEffect(() => {
    if (selectedUserId) {
      setIsLoading(true); // Activer l'indicateur de chargement
      Promise.all([
        fetchUserMainData(selectedUserId),
        fetchUserActivity(selectedUserId),
        fetchUserAverageSessions(selectedUserId),
        fetchUserPerformance(selectedUserId),
      ])
        .then(([mainData, activity, averageSessions, performance]) => {
          setUserData(mainData);
          setActivityData(activity);
          setAverageSessionsData(averageSessions);
          setPerformanceData(performance);
        })
        .catch((err) => setError(err.message))
        .finally(() => setIsLoading(false)); // Désactiver l'indicateur de chargement
    }
  }, [selectedUserId]);

  // Gestion des erreurs
  if (error) {
    return <div>Erreur : {error}</div>;
  }

  // Affichage principal
  return (
    <div>
      {!selectedUserId ? (
        <UserSelector users={users} onSelectUser={setSelectedUserId} />
      ) : isLoading ? (
        <div>Chargement des données...</div> // Indicateur de chargement
      ) : (
        userData &&
        activityData &&
        averageSessionsData &&
        performanceData && (
          <div>
            <button onClick={() => setSelectedUserId(null)}>Retour</button>
            <h1>
              Bonjour <span style={{ color: "red" }}>{userData.userInfos.firstName}</span>!
            </h1>
            <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>

            {/* Activité quotidienne */}
            <h2>Activité quotidienne</h2>
            <ul>
              {activityData.sessions.map((session, index) => (
                <li key={index}>
                  {session.day}: Poids {session.kilogram} kg, Calories brûlées{" "}
                  {session.calories} kcal
                </li>
              ))}
            </ul>

            {/* Données clés */}
            <h2>Données clés</h2>
            <ul>
              <li>Calories : {userData.keyData.calorieCount} kcal</li>
              <li>Protéines : {userData.keyData.proteinCount} g</li>
              <li>Glucides : {userData.keyData.carbohydrateCount} g</li>
              <li>Lipides : {userData.keyData.lipidCount} g</li>
            </ul>

            {/* Durée moyenne des sessions */}
            <h2>Durée moyenne des sessions</h2>
            <ul>
              {averageSessionsData.sessions.map((session, index) => (
                <li key={index}>
                  {session.day}: {session.sessionLength} minutes
                </li>
              ))}
            </ul>

            {/* Performances */}
            <h2>Performances</h2>
            <ul>
              {performanceData.data.map((performance, index) => (
                <li key={index}>
                  {performance.kindLabel}: {performance.value}
                </li>
              ))}
            </ul>

            {/* Score */}
            <h2>Score</h2>
            <p>{userData.todayScore * 100}% de votre objectif</p>
          </div>
        )
      )}
    </div>
  );
};

export default App;
