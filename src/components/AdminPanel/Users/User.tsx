import { useEffect, useState } from "react";
import {
  deleteUserAPI,
  getUserAgeAPI,
  getUsersAPI,
} from "../../../server/server";
import "./users.scss";
import { IUser } from "../../../interfaces/IUser";
import { useNavigate } from "react-router";
import ShowIcon from "../../../assets/icons/eye_show.svg";
import HideIcon from "../../../assets/icons/eye_hide.svg";
import Confirmation from "../../shared/confirmation";

const Users = () => {
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [reply, setReply] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<number | null>(null);
  const [deleteUsers, setDeleteUsers] = useState<number[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await getUsersAPI();
      setUsers(fetchedUsers);
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    handleDeleteChosen();
  }, [reply]);

  const handleClickMore = (id: number) => {
    navigate(`/users/${id}`);
  };
  const hidePassword = (password: string, userId: number) => {
    if (showPassword === userId) {
      return password;
    } else {
      return password.replace(/./g, "*");
    }
  };

  const getAge = (dateOfBirth: Date) => {
    const dateOfBirthStr = dateOfBirth.toString();
    const datePart = dateOfBirthStr.split("T")[0];
    const [year, month, day] = datePart.split("-").map(Number);
    const today = new Date();
    const birthDate = new Date(year, month - 1, day);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };
  const handleDeleteChosen = () => {
    console.log(deleteUsers);
    deleteUsers.forEach(async (id) => {
      try {
        await deleteUserAPI(id);
      } catch {
        alert("Unable to delete user");
      }
    });
    setUsers((users) => users.filter((user) => !deleteUsers.includes(user.id)));
    setDeleteUsers([]);
    setReply(false);
  };

  return (
    <div className="users-container">
      {showConfirmation && (
        <Confirmation
          setShowConfirmation={setShowConfirmation}
          setReply={setReply}
        />
      )}
      <div className="users-container__header">
        <h1>Users</h1>
        {deleteUsers.length > 0 && (
          <button
            className="users-container__header__button add-btn--big"
            onClick={() => {
              setShowConfirmation(true);
            }}
          >
            Delete Selected
          </button>
        )}
      </div>
      <table className="users-container__table">
        <thead className="users-container__table__header">
          <tr>
            <th></th>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Country</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="users-container__table__body">
          {users.map((user) => (
            <tr className="users-container__table__body__row" key={user.id}>
              <td>
                {" "}
                <input
                  type="checkbox"
                  onChange={() => {
                    setDeleteUsers([...deleteUsers, user.id]);
                  }}
                />
              </td>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td
                className="users-container__table__body__row__password"
                onClick={() => {
                  showPassword === user.id
                    ? setShowPassword(null)
                    : setShowPassword(user.id);
                  console.log(showPassword);
                }}
              >
                {showPassword !== user.id ? (
                  <>
                    {hidePassword(user.password, user.id)}
                    <img src={ShowIcon} width="22px" alt="Show Password Icon" />
                  </>
                ) : (
                  <>
                    {user.password}

                    <img src={HideIcon} width="22px" alt="Hide Password Icon" />
                  </>
                )}
              </td>
              <td>{getAge(user.dateOfBirth)}</td>
              <td>{user.gender}</td>

              <td>{user.country}</td>
              <td
                onClick={() => handleClickMore(user.id)}
                className="users-container__table__body__row__more"
              >
                more
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
