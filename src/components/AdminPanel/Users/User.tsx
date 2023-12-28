import { useEffect, useState } from "react";
import { deleteUserAPI, getUsersAPI } from "../../../server/server";
import "./users.scss";
import { IUser } from "../../../interfaces/IUser";
import Confirmation from "../../shared/confirmation";
import { useContext } from "react";
import SearchBarContext from "../../SearchBar/SearchBarContext";
import PagingPanel from "./PagingPanel";
import UserTable from "./UserTable";

const Users = () => {
  const { searchValue, setSearchValue } = useContext(SearchBarContext);

  const [hovered, setHovered] = useState<number | null>(null);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [reply, setReply] = useState<boolean>(false);
  const [deleteUsers, setDeleteUsers] = useState<number[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);
  const [displayedUsers, setDisplayedUsers] = useState<IUser[]>([]);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 15;

  const totalPages = Math.ceil(users.length / itemsPerPage);

  const onPageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    setSearchValue("");
    const fetchUsers = async () => {
      const fetchedUsers = await getUsersAPI();
      setUsers(fetchedUsers);
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    handleDeleteChosen();
  }, [reply]);
  useEffect(() => {
    const filteredUsers = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchValue.toLowerCase()) &&
        user.isAdmin === false
    );

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    setDisplayedUsers(filteredUsers.slice(startIndex, endIndex));
  }, [searchValue, currentPage, users]);

  const handleDeleteChosen = () => {
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

      <UserTable
        displayedUsers={displayedUsers}
        hovered={hovered}
        setHovered={setHovered}
        deleteUsers={deleteUsers}
        setDeleteUsers={setDeleteUsers}
      />
      <PagingPanel
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default Users;
