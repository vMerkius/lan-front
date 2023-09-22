import { useEffect, useState } from "react";
import { getUsers } from "../../../server/server";
import "./users.scss";
import { User } from "../../../interfaces/IUser";

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await getUsers();
      setUsers(fetchedUsers);
    };
    fetchUsers();
    console.log(users);
  }, []);
  return (
    <div>
      <h1>Users</h1>
      <table className="table-users">
        <thead className="table-header">
          <tr>
            <th></th>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Age</th>
            <th>Country</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr className="row" key={user.id}>
              <td>
                {" "}
                <input type="checkbox" />
              </td>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>{user.age}</td>
              <td>{user.country}</td>
              <td>more</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
