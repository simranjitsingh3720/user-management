import { Button, MenuItem, Select, TextField, Typography } from "@mui/material";
import React from "react";
import styles from "./styles.module.scss";
import { ProductPayment } from "../constants";
import { useNavigate } from "react-router-dom";

function SearchComponenet({ setPageChange, setQuery, searched, setSearched }) {
  const handleChange = (event) => {
    setSearched(event.target.value);
  };

  const handleGo = () => {
    console.log("GO");
  };

  const navigate = useNavigate();

  const handleCreateNewForm = () => {
    navigate("/product-payment-config/form");
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
          {ProductPayment.map((item) => (
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

        <Button variant="outlined" onClick={handleGo}>
          Go
        </Button>
      </div>
      <Button
        variant="contained"
        onClick={handleCreateNewForm}
        sx={{ textTransform: "none" }}
      >
        <Typography noWrap className={styles.buttonTextStyle}>
          Create New Payment Configuration
        </Typography>
      </Button>
    </div>
  );
}

export default SearchComponenet;
