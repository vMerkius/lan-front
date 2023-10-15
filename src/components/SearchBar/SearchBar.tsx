import { useState } from "react";
import "./searchbar.scss";
import SearchBarContext from "./SearchBarContext";
import { useContext } from "react";
import SearchIcon from "../../assets/icons/search-icon.svg";

const SearchBar = () => {
  const { searchValue, setSearchValue } = useContext(SearchBarContext);

  return (
    <div className="search-bar-container">
      <div className="search-bar-container__input">
        <input
          className="search-bar-container__input__text"
          type="text"
          name="search"
          placeholder="Search..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <img
          className="search-bar-container__input__icon"
          src={SearchIcon}
          alt="search icon"
          width="20px"
        />
      </div>
    </div>
  );
};

export default SearchBar;
