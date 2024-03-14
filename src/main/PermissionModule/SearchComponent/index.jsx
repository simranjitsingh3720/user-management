import { Button, MenuItem, Select, TextField, Typography } from "@mui/material";
import React from "react";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import { PrivilegeSearch } from "../constants";

function SearchComponent({
  searched,
  setSearched,
  query,
  setQuery,
  fetchData,
}) {
  const handleChange = (event) => {
    setSearched(event.target.value);
  };

  const navigate = useNavigate();

  const handleCreateNewForm = () => {
    navigate(`/permission/privilege-form`);
  };

  const handleGo = () => {
    fetchData(searched, query);
  };

  return (
    <div>
      <div className={styles.searchText}>Search By</div>
      <div className={styles.selectContainer}>
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
            {PrivilegeSearch.map((item) => (
              <MenuItem value={item.value} className={styles.styledOptionText}>
                {item.label}
              </MenuItem>
            ))}
          </Select>

          <TextField
            id="search"
            variant="outlined"
            placeholder="Search"
            size="small"
            className={styles.textFieldStyle}
            onChange={(e) => setQuery(e.target.value)}
          />

          <Button
            variant="outlined"
            onClick={handleGo}
            disabled={!(searched && query)}
          >
            Go
          </Button>
        </div>
        <div>
          <Button
            variant="contained"
            onClick={handleCreateNewForm}
            sx={{ textTransform: "none" }}
          >
            <Typography noWrap>Create New privilege</Typography>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SearchComponent;
