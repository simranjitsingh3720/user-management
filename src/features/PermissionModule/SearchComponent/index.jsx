import {  TextField, Typography } from "@mui/material";
import React from "react";
import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../../components/CustomButton";

function SearchComponent({ setQuery, setLoading, setPageChange }) {
  const navigate = useNavigate();

  const handleCreateNewForm = () => {
    navigate("/permission/permission-form");
  };

  return (
    <div>
      <div className={styles.selectContainer}>
        <div className={styles.flexSearchContainer}>
          <TextField
            id="search"
            variant="outlined"
            placeholder="Search by Name/Type..."
            size="small"
            className={styles.textFieldStyle}
            onChange={(e) => {
              setPageChange(1);
              setLoading(true);
              setQuery(e.target.value);
            }}
          />
        </div>
        <div>
          <CustomButton
            variant="contained"
            onClick={handleCreateNewForm}
            sx={{ textTransform: "none" }}
          >
            <Typography nowrap="true" className={styles.buttonTextStyle}>
              Create New Permission
            </Typography>
          </CustomButton>
        </div>
      </div>
    </div>
  );
}

export default SearchComponent;
