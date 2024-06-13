import {  Typography } from "@mui/material";
import React from "react";
import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../../components/CustomButton";

function CreateLob() {
  const navigate = useNavigate();
  const handleCreateNewForm = () => {
    navigate("/lob/lob-form");
  };
  return (
    <div>
      <div className={styles.createContainer}>
        <CustomButton
          variant="contained"
          onClick={handleCreateNewForm}
          sx={{ textTransform: "none" }}
        >
          <Typography nowrap="true" className={styles.buttonTextStyle}>
            Create New LOB
          </Typography>
        </CustomButton>
      </div>
    </div>
  );
}

export default CreateLob;
