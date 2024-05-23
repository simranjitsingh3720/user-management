import { Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

function SearchComponenet() {
  const navigate = useNavigate();

  const handleCreateNewForm = () => {
    navigate("/roles/role-form");
  };
  return (
    <div>
      <div className={styles.Container}>
        <div className={styles.dateContainer}>
          <div className={styles.startDateStyle}>
            <div className={styles.labelText}>
              Start Date <span className={styles.styledRequired}>*</span>
            </div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                className={styles.dateStyle}
                slotProps={{ textField: { size: "small" } }}
                onChange={(date) => {
                  const formattedDate = dayjs(date).format("DD-MM-YYYY");
                  // setValue("startDate", formattedDate);
                }}
              />
            </LocalizationProvider>
          </div>
          <div>
            <div className={styles.labelText}>
              End Date <span className={styles.styledRequired}>*</span>
            </div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                className={styles.dateStyle}
                onChange={(date) => {
                  const formattedDate = dayjs(date).format("DD-MM-YYYY");
                  //   setValue("endDate", formattedDate);
                }}
                slotProps={{ textField: { size: "small" } }}
              />
            </LocalizationProvider>
          </div>
        </div>
        <div>
          <Button
            variant="contained"
            onClick={handleCreateNewForm}
            sx={{ textTransform: "none" }}
          >
            <Typography noWrap className={styles.buttonTextStyle}>
              Create New Proposal Exception
            </Typography>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SearchComponenet;
