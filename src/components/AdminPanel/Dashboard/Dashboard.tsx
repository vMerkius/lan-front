import { useEffect, useState } from "react";
import { IUser } from "../../../interfaces/IUser";
import { getStatsAPI, getUsersAPI } from "../../../server/server";
import GenderPieChart from "./GenderPieChart";
import "./dashboard.scss";
import ArrowRightIcon from "../../../assets/icons/arrow-right-icon.svg";
import AgeBarChart from "./AgeBarChart";
import CountryBarChart from "./CountriesBarChart";
import Reports from "../Reports/Reports";
import { useNavigate } from "react-router";

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<any>({});
  const [genderData, setGenderData] = useState<any>([]);
  const [ageData, setAgeData] = useState<any>([]);
  const [countryData, setCountryData] = useState<any>([]);

  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedStats = await getStatsAPI();
      const fetchedUsers = await getUsersAPI();
      setUsers(fetchedUsers);
      setStats(fetchedStats);
      setGenderData([
        { x: "Men", y: fetchedStats.men },
        { x: "Women", y: fetchedStats.women },
      ]);
      setAgeData(fetchedStats.usersage);
      setCountryData(fetchedStats.countriesinfo);
    };
    fetchData();
  }, []);

  return (
    <div className="dashboard">
      <section className="dashboard__age-section">
        <h1 className="dashboard__age-section__avg-age">
          Average Age: {stats.averageage}
        </h1>
        <GenderPieChart data={genderData} />
        <AgeBarChart data={ageData} />
      </section>

      <section className="dashboard__info-section">
        <div className="dashboard__info-section__country">
          <CountryBarChart data={countryData} />
        </div>
        <div className="dashboard__info-section__report">
          <h1>Reports to reply: {stats.reports}</h1>
          <div
            onClick={() => {
              navigate("/reports");
            }}
            className="dashboard__info-section__report__mini-window"
          >
            <Reports></Reports>
          </div>
        </div>
      </section>

      <button
        className="dashboard__arrow-button"
        onClick={() => {
          console.log("sdd");
        }}
      >
        <img src={ArrowRightIcon} alt="arrow right icon" width="30px" />
      </button>
    </div>
  );
};

export default Dashboard;
