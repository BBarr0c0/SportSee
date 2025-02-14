import { useEffect, useState } from "react";
import {
  fetchUserMainData,
  fetchUserActivity,
  fetchUserAverageSessions,
  fetchUserPerformance,
} from "../services/dataService";
import { useParams } from "react-router-dom";
import NotFound from "./NotFound";
import '../styles/pages/_Profil.scss';

import KeyDataCard from "../components/KeyDataCard";
import ActivityBarChart from "../components/ActivityBarChart";
import AverageSessionsChart from "../components/AverageSessionsChart";
import PerformanceRadarChart from "../components/PerformanceRadarChart";
import ScorePieChart from "../components/ScorePieChart";
import calorieIcon from '../assets/calories-icon.svg';
import proteinIcon from '../assets/protein-icon.svg';
import carbIcon from '../assets/carbs-icon.svg';
import lipidIcon from '../assets/fat-icon.svg';

const Profil = () => {
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

  if (!userData || !activityData || !averageSessionsData || !performanceData) {
    return null;
  }



  return (
    <main>
      <div className="profil-header">
        <h1>
          Bonjour <span className="name">{userData.userInfos.firstName}</span>
        </h1>
        <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
      </div>

      <div className="containerProfil">

        <div className="charts">

          <ActivityBarChart data={activityData.sessions} />

          <div className="charts-line-radar-pie">

            <AverageSessionsChart data={averageSessionsData.sessions} />
            <PerformanceRadarChart data={performanceData.data} />
            <ScorePieChart score={userData.todayScore} />
            
          </div>
        </div>

        {/* Key Data Cards */}
        <div className="key-data">
          <KeyDataCard
            icon={calorieIcon}
            value={userData.keyData.calorieCount}
            unit="kCal"
            label="Calories"
          />
          <KeyDataCard
            icon={proteinIcon}
            value={userData.keyData.proteinCount}
            unit="g"
            label="Protéines"
          />
          <KeyDataCard
            icon={carbIcon}
            value={userData.keyData.carbohydrateCount}
            unit="g"
            label="Glucides"
          />
          <KeyDataCard
            icon={lipidIcon}
            value={userData.keyData.lipidCount}
            unit="g"
            label="Lipides"
          />
        </div>
      </div>
    </main>
  );
};

export default Profil;
