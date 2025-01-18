import PropTypes from 'prop-types';
import '../styles/components/_KeyDataCard.scss';

const KeyDataCard = ({ icon, value, unit, label }) => {
  return (
    <div className="key-data-card">
      <img src={icon} alt={label} className="cardIcon" />
      <div className="cardInfo">
        <span className="cardValue">
          {value}
          {unit}
        </span>
        <span className="cardLabel">{label}</span>
      </div>
    </div>
  );
};

KeyDataCard.propTypes = {
  icon: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  unit: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default KeyDataCard;