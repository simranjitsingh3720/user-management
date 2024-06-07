import { Button, MenuItem, Select, TextField, Typography } from "@mui/material";
import React from "react";
import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";
import { BitlyLink } from "../../constants";

function SearchComponent({ setQuery, setPageChange, searched, setSearched }) {
  const handleChange = (event) => {
    setSearched(event.target.value);
  };

  const navigate = useNavigate();

  const handleCreateNewForm = () => {
    navigate("/proposal-bitly-config/channel-form");
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

          {/* <Button variant="outlined" onClick={handleGo}>
            Go
          </Button> */}
        </div>
        <div>
          <Button
            variant="contained"
            onClick={handleCreateNewForm}
            sx={{ textTransform: "none" }}
          >
            <Typography noWrap className={styles.buttonTextStyle}>
              Create Config
            </Typography>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SearchComponent;
