import PropTypes from "prop-types";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import "../styles/components/_ScorePiehart.scss";

const ScorePieChart = ({ score }) => {
  const COLORS = ["#E60000", "#FBFBFB"];

  return (
    <div className="chart" id="chart--pie">
      <h2>Score</h2>
      <ResponsiveContainer width="100%" height={263}>
        <PieChart>
          <Pie
            data={[{ value: score }, { value: 1 - score }]}
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
      <p><span>{score * 100}%</span> de votre objectif</p>
    </div>
  );
};

ScorePieChart.propTypes = {
  score: PropTypes.number.isRequired,
};

export default ScorePieChart;