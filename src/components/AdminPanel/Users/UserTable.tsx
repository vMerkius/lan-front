import ShowIcon from "../../../assets/icons/eye_show.svg";
import HideIcon from "../../../assets/icons/eye_hide.svg";
import MoreIcon from "../../../assets/icons/more-icon.svg";

import { useState } from "react";
import { useNavigate } from "react-router";
import { IUser } from "../../../interfaces/IUser";

type UserTableProps = {
  displayedUsers: IUser[];
  setHovered: React.Dispatch<React.SetStateAction<number | null>>;
  hovered: number | null;
  setDeleteUsers: React.Dispatch<React.SetStateAction<number[]>>;
  deleteUsers: number[];
};

const UserTable: React.FC<UserTableProps> = ({
  displayedUsers,
  setHovered,
  hovered,
  setDeleteUsers,
  deleteUsers,
}) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<number | null>(null);

  const shorterWord = (word: string, quantity: number) => {
    if (word.length > quantity) {
      return word.slice(0, quantity) + "...";
    } else {
      return word;
    }
  };
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
  return (
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
        {displayedUsers.map((user) => (
          <tr
            className="users-container__table__body__row"
            key={user.id}
            onMouseEnter={() => setHovered(user.id)}
            onMouseLeave={() => setHovered(null)}
          >
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
            {hovered !== user.id ? (
              <>
                <td>{shorterWord(user.name, 20)}</td>
                <td>{shorterWord(user.email, 20)}</td>
              </>
            ) : (
              <>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </>
            )}

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
              <img src={MoreIcon} alt="more icon" width="22px" title="more" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
