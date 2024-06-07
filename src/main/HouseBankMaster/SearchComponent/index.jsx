import { Button, MenuItem, Select, TextField, Typography } from "@mui/material";
import React from "react";
import styles from "./styles.module.scss";
import { SearchKey } from "../constants";
import { useNavigate } from "react-router-dom";

function SearchComponenet({ setPageChange, setQuery, searched, setSearched }) {
  const handleChange = (event) => {
    setSearched(event.target.value);
  };

  const navigate = useNavigate();

  const handleCreateNewForm = () => {
    navigate("/house-bank-master/form");
  };

  return (
    <div className={styles.flexSearchContainer}>
      <div>
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
          {SearchKey.map((item) => (
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
          className={styles.textFieldSearch}
          onChange={(e) => {
            setQuery(e.target.value);
            setPageChange(1);
          }}
        />
      </div>
      <Button
        variant="contained"
        onClick={handleCreateNewForm}
        sx={{ textTransform: "none" }}
      >
        <Typography noWrap className={styles.buttonTextStyle}>
          Create House Master Configuration
        </Typography>
      </Button>
    </div>
  );
}

export default SearchComponenet;
