import PropTypes from 'prop-types';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis
} from 'recharts';
import "../styles/components/_ActivityBarChart.scss";

const CustomTooltipBar = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const kilogram = payload[0].value;
    const calories = payload[1].value;

    return (
      <div className="custom-tooltip">
        <p>{`${kilogram}kg`}</p>
        <p>{`${calories}Kcal`}</p>
      </div>
    );
  }
  return null;
};

CustomTooltipBar.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number.isRequired,
    })
  ),
};

const ActivityBarChart = ({ data, width = "100%", height = 320 }) => {
  return (
    <div className="chart chart--bar">
      <div className="chart-header">
        <h2>Activité quotidienne</h2>
        <div className="custom-legend">
          <span><span className="dot black"></span> Poids (Kg)</span>
          <span><span className="dot red"></span> Calories brûlées (Kcal)</span>
        </div>
      </div>
      <ResponsiveContainer width={width} height={height}>
        <BarChart
          data={data}
          barGap={8}
          margin={{
            top: 100,
            right: 40,
            left: 40,
            bottom: 40,
          }}
        >
          
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#DEDEDE"
          />
          <XAxis
            dataKey="day"
            axisLine={{ stroke: 'grey' }}
            tickLine={false}
            tick={{ color: '#9B9EAC', fontSize: '14px', fontWeight: '500' }}
            dy={15}
            // scale="point"
            // padding={{ left: 10, right: 10 }}
          />
          <YAxis
            yAxisId="kilogram"
            orientation="right"
            tickCount={3}
            axisLine={false}
            tickLine={false}
            tickMargin={30}
            type="number" 
            tick={{ color: '#9B9EAC', fontSize: '14px', fontWeight: '500' }}
            domain={["dataMin - 1", "dataMax + 2"]}
          />
          <YAxis
            yAxisId="calories"
            hide={true}
          />
          <Tooltip 
            content={<CustomTooltipBar />} 
            cursor={{ fill: "rgba(0, 0, 0, 0.1)" }} 
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
  );
};

ActivityBarChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      day: PropTypes.string.isRequired,
      kilogram: PropTypes.number.isRequired,
      calories: PropTypes.number.isRequired,
    })
  ).isRequired,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.number,
};

// Valeurs par défaut des props
ActivityBarChart.defaultProps = {
  width: "100%",
  height: 320,
};

export default ActivityBarChart;