import { Button, Typography } from "@mui/material";
import React from "react";
import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";

function CreateLob() {
  const navigate = useNavigate();
  const handleCreateNewForm = () => {
    navigate("/lob/lob-form");
  };
  return (
    <div>
      <div className={styles.createContainer}>
        <Button
          variant="contained"
          onClick={handleCreateNewForm}
          sx={{ textTransform: "none" }}
        >
          <Typography noWrap className={styles.buttonTextStyle}>
            Create New LOB
          </Typography>
        </Button>
      </div>
    </div>
  );
}

export default CreateLob;
