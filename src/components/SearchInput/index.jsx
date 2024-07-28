import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Styles from "./styles.module.scss";

function SearchInput({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    onSearch(searchTerm);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  return (
    <div className={Styles.styledSearch}>
      <SearchIcon className={Styles.styleColor} />
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleChange}
        className={Styles.styledInput}
      />
    </div>
  );
}

export default SearchInput;
