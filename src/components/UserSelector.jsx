import PropTypes from "prop-types";

const UserSelector = ({ users, onSelectUser }) => {
  return (
    <ul className="selectorContainer">
      {users.map((user) => (
        <li key={user.id}>
          <button onClick={() => onSelectUser(user.id)}>
            {user.userInfos.firstName} {user.userInfos.lastName}
          </button>
        </li>
      ))}
    </ul>
  );
};

UserSelector.propTypes = {
    users: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        userInfos: PropTypes.shape({
          firstName: PropTypes.string.isRequired,
          lastName: PropTypes.string.isRequired,
        }).isRequired,
      })
    ).isRequired,
    onSelectUser: PropTypes.func.isRequired,
};


export default UserSelector;