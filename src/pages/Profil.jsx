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
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import KeyDataCard from "../components/KeyDataCard";
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

  // Colors for pie chart
  const COLORS = ["#E60000", "#FBFBFB"];

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
          {/* BarChart: Activity */}
          <div className="chart chart--bar">
          <div className="chart-header">
            <h2>Activité quotidienne</h2>
            <div className="custom-legend">
              <span><span className="dot black"></span> Poids (Kg)</span>
              <span><span className="dot red"></span> Calories brûlées (Kcal)</span>
            </div>
          </div>
            <ResponsiveContainer width="100%" height={320}>
            <BarChart
              data={activityData.sessions}
              barGap={8}
              margin={{
                top: 100,
                right: 40,
                left: 80,
                bottom: 40,
              }}
            >

              <Tooltip 
              />
              <CartesianGrid 
                strokeDasharray="3 3" 
                vertical={false} 
                stroke="#DEDEDE"
              />
              <XAxis 
                dataKey="day" 
                axisLine={{ stroke: 'grey' }}
                tickLine={false} 
                tick={{ color: '9B9EAC', fontSize: '14px', fontWeight: '500' }} 
                dy={15}
                scale='point'
                padding={{ left: 10, right: 10 }}
              />
              <YAxis 
                yAxisId="kilogram" 
                orientation="right" 
                tickCount={3} 
                axisLine={false} 
                tickLine={false} 
                tickMargin={30} 
                tick={{ color: '9B9EAC', fontSize: '14px', fontWeight: '500' }} 
                domain={["dataMin - 1", "dataMax + 2"]} 
              />
              <YAxis 
                yAxisId="calories" 
                hide={true} 
              />
              <Bar 
                yAxisId="kilogram" 
                dataKey="kilogram" 
                fill="#282D30" 
                barSize={8} 
                radius={[20, 20, 0, 0]} 
              />
              <Bar 
                yAxisId="calories" 
                dataKey="calories" 
                fill="#E60000" 
                barSize={8} 
                unit="Kcal" 
                radius={[20, 20, 0, 0]} 
              />
            </BarChart>
            </ResponsiveContainer>
          </div>

          {/* LineChart: Average Sessions */}
          <div className="chart chart--line" style={{ 
            background: 'linear-gradient(to right, #E60000, #CE0000)', 
            borderRadius: '5px', 
            position: 'relative' 
          }}>

            <h2 style={{ color: 'rgba(255, 255, 255, 0.6)', marginBottom: '20px' }}>Durée moyenne des sessions</h2>

            {/* dark red on the right */}
            <div style={{
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              width: '30%',
              background: 'rgba(0, 0, 0, 0.1)'
            }}></div>

            {/* Chart */}
            <ResponsiveContainer width="100%" height={263}>
              <LineChart 
                data={averageSessionsData.sessions} 
              >
                {/* X axis without line, white ticks */}
                <XAxis 
                  dataKey="day" 
                  tickLine={false} 
                  axisLine={false} 
                  tick={{ fill: '#FFFFFF', opacity: 0.7 }} 
                />
                <YAxis 
                  dataKey="sessionLength" 
                  hide={true} 
                />
                
                <Tooltip 
                  cursor={false} 
                />
                
                {/* White line with opacity and active circle */}
                <Line
                  type="monotone"
                  dataKey="sessionLength"
                  stroke="#FFFFFF"
                  strokeWidth={2}
                  strokeOpacity={0.7}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>


          {/* RadarChart: Performance */}
          <div className="chart chart--radar">

            <ResponsiveContainer width="100%" height={263}>
              <RadarChart outerRadius="80%" data={performanceData.data}>
                <PolarGrid />
                <PolarAngleAxis dataKey="kindLabel" />
                <Radar dataKey="value" stroke="#E60000" fill="#E60000" fillOpacity={0.6} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* PieChart: Score */}
          <div className="chart chart--pie">
            <h2>Score</h2>
            <ResponsiveContainer width="100%" height={263}>
              <PieChart>
                <Pie
                  data={[{ value: userData.todayScore }, { value: 1 - userData.todayScore }]}
                  dataKey="value"
                  innerRadius="70%"
                  outerRadius="80%"
                  startAngle={90}
                  endAngle={450}
                  paddingAngle={5}
                >
                  {COLORS.map((color, index) => (
                    <Cell key={`cell-${index}`} fill={color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <p>{userData.todayScore * 100}% de votre objectif</p>
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
