import { MenuItem, Select, TextField } from "@mui/material";
import React from "react";
import styles from "./styles.module.scss";
import { BitlyLink } from "../constants";

function SearchComponent({ setQuery, setPageChange, searched, setSearched }) {
  const handleChange = (event) => {
    setSearched(event.target.value);
  };

  // const handleGo = () => {
  //   fetchData(query);
  // };

  return (
    <div>
      {/* <div className={styles.searchText}>Search By</div> */}
      <div className={styles.selectContainer}>
        <div className={styles.flexSearchContainer}>
          {/* <TextField
            id="search"
            variant="outlined"
            placeholder="Search by Name/Type..."
            size="small"
            className={styles.textFieldStyle}
            onChange={(e) => {
              setPageChange(1);
              setQuery(e.target.value);
            }}
          /> */}

          <div className={styles.flexSearchContainer}>
            <Select
              labelId="search-select"
              id="search-select"
              value={searched}
              onChange={handleChange}
              size="small"
              displayEmpty
              className={styles.customizeSelect}
              renderValue={
                searched !== ""
                  ? undefined
                  : () => <div className={styles.placeholderStyle}>Select</div>
              }
            >
              {BitlyLink.map((item) => (
                <MenuItem
                  value={item.value}
                  className={styles.styledOptionText}
                >
                  {item.label}
                </MenuItem>
              ))}
            </Select>
            <TextField
              id="search"
              variant="outlined"
              placeholder="Search"
              size="small"
              className={styles.textFieldSearch}
              onChange={(e) => {
                setQuery(e.target.value);
                setPageChange(1);
              }}
            />
          </div>

          {/* <CustomButton variant="outlined" onClick={handleGo}>
            Go
          </CustomButton> */}
        </div>
      </div>
    </div>
  );
}

export default SearchComponent;
