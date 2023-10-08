import { Link } from "react-router-dom";
import "./sidebar.scss";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const SideBar = () => {
  const { t, i18n } = useTranslation();
  const [choice, setChoice] = useState("");

  const handleClick = (selected: string) => {
    setChoice(selected);
  };
  return (
    <aside className="sidebar-container">
      <h1>spiki</h1>
      <nav className="sidebar-container__navigation">
        <ul className="navigation-list">
          <li
            className={`navigation-list__item ${
              choice === "Dashboard" ? "navigation-list__item--active" : ""
            }`}
          >
            <Link to="/">
              <h2 onClick={() => handleClick("Dashboard")}>
                {t("sidebar.dashboard")}
              </h2>
            </Link>
          </li>
          <li
            className={`navigation-list__item ${
              choice === "Stats" ? "navigation-list__item--active" : ""
            }`}
          >
            <Link to="/stats">
              <h2 onClick={() => handleClick("Stats")}>Stats</h2>
            </Link>
          </li>
          <li
            className={`navigation-list__item ${
              choice === "Courses" ? "navigation-list__item--active" : ""
            }`}
          >
            <Link to="/courses">
              <h2 onClick={() => handleClick("Courses")}>Courses</h2>
            </Link>
          </li>
          <li
            className={`navigation-list__item ${
              choice === "Users" ? "navigation-list__item--active" : ""
            }`}
          >
            <Link to="/users">
              <h2 onClick={() => handleClick("Users")}>Users</h2>
            </Link>
          </li>
          <li>
            <h2 onClick={() => handleClick("Reports")}>Reports</h2>
          </li>
          <li>
            <h2 onClick={() => handleClick("Settings")}>Settings</h2>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;
