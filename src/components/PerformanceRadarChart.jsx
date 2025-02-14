import PropTypes from "prop-types";
import {
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
} from "recharts";
import "../styles/components/_PerformanceRadarChart.scss";

const PerformanceRadarChart = ({ data }) => {
  return (
    <div className="chart" id="chart--radar">
      <ResponsiveContainer width="100%" height={263}>
        <RadarChart outerRadius="70%" data={data} margin={{ top: 0, right: 30, bottom: 0, left: 30 }} startAngle={30} endAngle={-330}>
          <PolarGrid radialLines={false} />
          <PolarAngleAxis 
            dataKey="kindLabel" 
            axisLine={false} 
            tickLine={false} 
            tick={{
              dy: 4,
              fill: '#fff',
              fontSize: 10,
            }}
          />
          <Radar
            dataKey="value"
            stroke="#E60000"
            fill="#E60000"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

PerformanceRadarChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number.isRequired,
      kindLabel: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default PerformanceRadarChart;