import { useEffect, useState } from "react";
import {
  fetchUserMainData,
  fetchUserActivity,
  fetchUserAverageSessions,
  fetchUserPerformance,
} from "../services/dataService";
import { useParams } from "react-router-dom";
import NotFound from "./NotFound";

const Home = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [activityData, setActivityData] = useState(null);
  const [averageSessionsData, setAverageSessionsData] = useState(null);
  const [performanceData, setPerformanceData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userNotFound, setUserNotFound] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [mainData, activity, averageSessions, performance] = await Promise.all([
          fetchUserMainData(Number(userId)),
          fetchUserActivity(Number(userId)),
          fetchUserAverageSessions(Number(userId)),
          fetchUserPerformance(Number(userId)),
        ]);

        if (!mainData) {
          setUserNotFound(true);
          return;
        }

        setUserData(mainData);
        setActivityData(activity);
        setAverageSessionsData(averageSessions);
        setPerformanceData(performance);
      } catch (err) {
        setError(err.message);
        setUserNotFound(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  if (userNotFound) {
    return <NotFound />;
  }

  if (error) {
    return <div>Erreur : {error}</div>;
  }

  if (isLoading) {
    return <div className="loadingContainer">Chargement des données...</div>;
  }

  return (
    userData &&
    activityData &&
    averageSessionsData &&
    performanceData && (
      <div>
        <h1>
          Bonjour <span>{userData.userInfos.firstName}</span>
        </h1>
        <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>

        <h2>Activité quotidienne</h2>
        <ul>
          {activityData.sessions.map((session, index) => (
            <li key={index}>
              Jour {session.day} : Poids {session.kilogram} kg, Calories brûlées {session.calories} kcal
            </li>
          ))}
        </ul>

        <h2>Données clés</h2>
        <ul>
          <li>Calories : {userData.keyData.calorieCount} kcal</li>
          <li>Protéines : {userData.keyData.proteinCount} g</li>
          <li>Glucides : {userData.keyData.carbohydrateCount} g</li>
          <li>Lipides : {userData.keyData.lipidCount} g</li>
        </ul>

        <h2>Durée moyenne des sessions</h2>
        <ul>
          {averageSessionsData.sessions.map((session, index) => (
            <li key={index}>
              Jour {session.day} : {session.sessionLength} minutes
            </li>
          ))}
        </ul>

        <h2>Performances</h2>
        <ul>
          {performanceData.data.map((performance, index) => (
            <li key={index}>
              {performance.kindLabel}: {performance.value}
            </li>
          ))}
        </ul>

        <h2>Score</h2>
        <p>{userData.todayScore * 100}% de votre objectif</p>
      </div>
    )
  );
};

export default Home;