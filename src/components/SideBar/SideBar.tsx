import { Link, useNavigate } from "react-router-dom";
import "./sidebar.scss";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const SideBar = () => {
  const navigate = useNavigate();

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
            onClick={() => {
              handleClick("Dashboard");
              navigate("/");
            }}
            className={`navigation-list__item ${
              choice === "Dashboard" ? "navigation-list__item--active" : ""
            }`}
          >
            <h2>{t("sidebar.dashboard")}</h2>
          </li>

          <li
            onClick={() => {
              handleClick("Courses");
              navigate("/courses");
            }}
            className={`navigation-list__item ${
              choice === "Courses" ? "navigation-list__item--active" : ""
            }`}
          >
            <h2>Courses</h2>
          </li>
          <li
            onClick={() => {
              handleClick("Users");
              navigate("/users");
            }}
            className={`navigation-list__item ${
              choice === "Users" ? "navigation-list__item--active" : ""
            }`}
          >
            <h2>Users</h2>
          </li>
          <li
            onClick={() => {
              handleClick("Reports");
              navigate("/reports");
            }}
            className={`navigation-list__item ${
              choice === "Reports" ? "navigation-list__item--active" : ""
            }`}
          >
            <h2>Reports</h2>
          </li>
          <li
            onClick={() => {
              handleClick("Settings");
              navigate("/settings");
            }}
            className={`navigation-list__item ${
              choice === "Settings" ? "navigation-list__item--active" : ""
            }`}
          >
            <h2>Settings</h2>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;
