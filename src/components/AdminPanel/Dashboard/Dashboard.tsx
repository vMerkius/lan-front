import { useEffect, useState } from "react";
import { IUser } from "../../../interfaces/IUser";
import { getUsersAPI } from "../../../server/server";
import GenderPieChart from "./GenderPieChart";

const Dashboard = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [women, setWomen] = useState<number>(0);
  const [men, setMen] = useState<number>(0);
  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await getUsersAPI();
      const womenCount = fetchedUsers.filter(
        (user: IUser) => user.gender === "W"
      ).length;
      const menCount = fetchedUsers.length - womenCount;

      setWomen(womenCount);
      setMen(menCount);
      setUsers(fetchedUsers);
    };
    fetchUsers();
  }, []);
  const pieChartData = [
    { x: "Men", y: men },
    { x: "Women", y: women },
  ];

  return (
    <div style={{ display: "flex" }}>
      <h1>Dashboard</h1>
      <GenderPieChart data={pieChartData} />
      <GenderPieChart data={pieChartData} />
    </div>
  );
};

export default Dashboard;
