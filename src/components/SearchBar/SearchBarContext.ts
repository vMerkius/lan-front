import { createContext } from "react";

const SearchBarContext = createContext({
  searchValue: "",
  setSearchValue: (value: string) => {
    return;
  },
});

export default SearchBarContext;
