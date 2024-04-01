import { Button, TextField, Typography } from "@mui/material";
import React from "react";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";

function SearchComponent({ setQuery, setLoading }) {
  // const handleChange = (event) => {
  //   setSearched(event.target.value);
  // };

  const navigate = useNavigate();

  const handleCreateNewForm = () => {
    navigate("/permission/permission-form");
  };

  // const handleGo = () => {
  //   fetchData(query);
  // };

  return (
    <div>
      {/* <div className={styles.searchText}>Search By</div> */}
      <div className={styles.selectContainer}>
        <div className={styles.flexSearchContainer}>
          {/* <Select
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
            {PrivilegeSearch.map((item) => (
              <MenuItem value={item.value} className={styles.styledOptionText}>
                {item.label}
              </MenuItem>
            ))}
          </Select> */}

          <TextField
            id="search"
            variant="outlined"
            placeholder="Search by permission name..."
            size="small"
            className={styles.textFieldStyle}
            onChange={(e) => {
              setLoading(true);
              setQuery(e.target.value);
            }}
          />

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
              Create New permission
            </Typography>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SearchComponent;
