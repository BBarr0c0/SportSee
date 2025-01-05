import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import {
  fetchUserMainData,
  fetchUserActivity,
  fetchUserAverageSessions,
  fetchUserPerformance,
} from "../services/dataService";
import NotFound from "../pages/NotFound";
import "../styles/components/_UserDataHandler.scss";

const UserDataHandler = () => {
  const { userId } = useParams();
  const location = useLocation();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let result = null;

        switch (location.pathname) {
          case `/user/${userId}`: {
            const mainData = await fetchUserMainData(Number(userId));
            if (!mainData) throw new Error("Utilisateur introuvable");

            result = {
              general: mainData.userInfos,
              completion: mainData.todayScore || mainData.score,
            };
            break;
          }

          case `/user/${userId}/activity`: {
            const [activityData, mainData] = await Promise.all([
                fetchUserActivity(Number(userId)),
                fetchUserMainData(Number(userId)),
              ]);
  
              if (!activityData || !mainData) throw new Error("Données introuvables");
  
              result = {
                activity: activityData,
                keyFigures: mainData.keyData,
              };
              break;
            }

          case `/user/${userId}/average-sessions`: {
            const averageSessionsData = await fetchUserAverageSessions(Number(userId));
            if (!averageSessionsData) throw new Error("Données de sessions moyennes introuvables");

            result = averageSessionsData;
            break;
          }

          case `/user/${userId}/performance`: {
            const performanceData = await fetchUserPerformance(Number(userId));
            if (!performanceData) throw new Error("Données de performance introuvables");

            result = performanceData;
            break;
          }

          default:
            throw new Error("Route non prise en charge");
        }

        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userId, location.pathname]);

  if (isLoading) {
    return <div className="loadingContainer">Chargement des données...</div>;
  }

  if (error) {
    return <NotFound />;
  }

  return (
    <div className="dataContainer">
      <h1>Données pour l&apos;utilisateur ayant l&apos;ID : {userId}</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default UserDataHandler;