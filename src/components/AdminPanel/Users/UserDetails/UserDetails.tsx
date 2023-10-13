import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getUserAPI } from "../../../../server/server";
import { IUser } from "../../../../interfaces/IUser";
import "./user-details.scss";

const UserDetails = () => {
  const [user, setUser] = useState<IUser>({
    id: 0,
    name: "",
    email: "",
    password: "",
    age: 0,
    country: "",
  });
  const value = useParams();
  const id = Number(value.id);

  useEffect(() => {
    const fetchUser = async () => {
      const fetchedUser = await getUserAPI(id);
      setUser(fetchedUser);
    };
    fetchUser();
  }, []);

  return (
    <div className="user-details-container">
      <div className="user-details-container__header">
        <h1>User:</h1>
        <h2>{user.name}</h2>
      </div>
    </div>
  );
};

export default UserDetails;
