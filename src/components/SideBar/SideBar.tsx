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
    <aside className="side-bar">
      <h1>spiki</h1>
      <nav>
        <ul>
          {/* <li className={`${choice === "Dashboard" ? "active" : ""}`}>
            <Link to="/">
              <h2 onClick={() => handleClick("Dashboard")}>Dashboard</h2>
            </Link>
          </li> */}
          <li className={`${choice === "Dashboard" ? "active" : ""}`}>
            <Link to="/">
              <h2 onClick={() => handleClick("Dashboard")}>
                {t("sidebar.dashboard")}
              </h2>
            </Link>
          </li>
          <li className={`${choice === "Stats" ? "active" : ""}`}>
            <Link to="/stats">
              <h2 onClick={() => handleClick("Stats")}>Stats</h2>
            </Link>
          </li>
          <li className={`${choice === "Courses" ? "active" : ""}`}>
            <Link to="/courses">
              <h2 onClick={() => handleClick("Courses")}>Courses</h2>
            </Link>
          </li>
          <li className={`${choice === "Users" ? "active" : ""}`}>
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
        <h3 style={{ color: "green" }}>{choice}</h3>
      </nav>
    </aside>
  );
};

export default SideBar;
