import {  useNavigate } from "react-router-dom";
import "./sidebar.scss";
import { useEffect, useState } from "react";
import logo from "../../assets/icons/logo.svg";

const SideBar = () => {
  const navigate = useNavigate();

  const [choice, setChoice] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      setIsLogged(true);
    }
  }, [token, navigate]);

  const handleClick = (selected: string) => {
    setChoice(selected);
  };
  return (
    <aside className="sidebar-container">
      <div className="sidebar-container__logo-container">
        <img
          onClick={() => {
            if (isLogged) {
              handleClick("Dashboard");
              navigate("/");
            }
          }}
          src={logo}
          alt="logo"
          width="30px"
        />
        <h2
          onClick={() => {
            if (isLogged) {
              handleClick("Dashboard");
              navigate("/");
            }
          }}
          className="sidebar-container__logo-container__logo"
        >
          Spiki
        </h2>
      </div>
      <nav className="sidebar-container__navigation">
        <ul className="navigation-list">
          <li
            onClick={() => {
              if (isLogged) {
                handleClick("Dashboard");
                navigate("/");
              }
            }}
            className={`navigation-list__item ${
              choice === "Dashboard" ? "navigation-list__item--active" : ""
            }`}
          >
            <h2>Dashboard</h2>
          </li>

          <li
            onClick={() => {
              if (isLogged) {
                handleClick("Courses");
                navigate("/courses");
              }
            }}
            className={`navigation-list__item ${
              choice === "Courses" ? "navigation-list__item--active" : ""
            }`}
          >
            <h2>Courses</h2>
          </li>
          <li
            onClick={() => {
              if (isLogged) {
                handleClick("Users");
                navigate("/users");
              }
            }}
            className={`navigation-list__item ${
              choice === "Users" ? "navigation-list__item--active" : ""
            }`}
          >
            <h2>Users</h2>
          </li>
          <li
            onClick={() => {
              if (isLogged) {
                handleClick("Reports");
                navigate("/reports");
              }
            }}
            className={`navigation-list__item ${
              choice === "Reports" ? "navigation-list__item--active" : ""
            }`}
          >
            <h2>Reports</h2>
          </li>
        </ul>
        {isLogged && (
          <button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
              setIsLogged(false);
            }}
            className="btn-logout"
          >
            Wyloguj
          </button>
        )}
      </nav>
    </aside>
  );
};

export default SideBar;
