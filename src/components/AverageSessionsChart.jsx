import PropTypes from "prop-types";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import "../styles/components/_AverageSessionsChart.scss";

const CustomTooltipLine = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: "#FFFFFF",
          padding: "5px 10px",
          borderRadius: "5px",
        }}
      >
        <p style={{ color: "#000000" }}>{`${payload[0].value} min`}</p>
      </div>
    );
  }

  return null;
};

const CustomDot = (props) => {
  const { cx, cy } = props;
  return (
    <>
      <circle cx={cx} cy={cy} r={4} fill="#FFFFFF" />
      <circle cx={cx} cy={cy} r={10} fill="rgba(255, 255, 255, 0.3)" />
    </>
  );
};

CustomTooltipLine.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number.isRequired,
    })
  ),
};

CustomDot.propTypes = {
  cx: PropTypes.number,
  cy: PropTypes.number,
};

const AverageSessionsChart = ({ data }) => {
  return (
    <div
      className="chart chart--line"
      style={{
        background: "linear-gradient(to right, #E60000, #CE0000)",
        borderRadius: "5px",
        position: "relative",
      }}
    >
      <h2 style={{ color: "rgba(255, 255, 255, 0.6)", marginTop: "20px", marginBottom: "20px", marginLeft: "20px", marginRight: "80px" }}>
        Durée moyenne des sessions
      </h2>

      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          width: "30%",
          background: "rgba(0, 0, 0, 0.1)",
        }}
      ></div>

      <ResponsiveContainer width="100%" height={263}>
        <LineChart 
          data={data}
          margin={{
            top: 0,
            right: 20,
            left: 20,
            bottom: 20,
          }}
        >
          <XAxis
            dataKey="day"
            tickLine={false}
            axisLine={false}
            tick={{ fill: "#FFFFFF", opacity: 0.7 }}
          />
          <YAxis hide={true} />
          <Tooltip content={<CustomTooltipLine />} cursor={false} />
          <Line
            type="monotone"
            dataKey="sessionLength"
            stroke="#FFFFFF"
            strokeWidth={2}
            strokeOpacity={0.7}
            dot={false}
            activeDot={<CustomDot />}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

AverageSessionsChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      day: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      sessionLength: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default AverageSessionsChart;