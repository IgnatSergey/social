import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getMyUserId } from "../../redux/auth-selector";

const Nav = (props) => {
  const userId = useSelector(getMyUserId);

  return (
    <nav className="navigation">
      <ul className="navigation__list">
        <li className="navigation__list-item">
          <NavLink className="navigation__navlink" to={`/profile/${userId}`}>My Profile</NavLink>
        </li>
        <li className="navigation__list-item">
          <NavLink className="navigation__navlink" to="/users/">Users</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export { Nav };
