import { Button, MenuItem, Select, TextField, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { Controller, useForm } from "react-hook-form";
import { ProposalOTPSearch } from "../constants";

function SearchComponenet({
  fetchData,
  setPageChange,
  setQuery,
  searched,
  setSearched,
}) {
  const navigate = useNavigate();

  const handleCreateNewForm = () => {
    navigate("/proposalOtpException/form");
  };

  const { handleSubmit, control, setValue, formState } = useForm({
    defaultValues: {
      startDate: null,
      endDate: null,
    },
  });

  const { errors } = formState;

  const onSubmit = (data) => {
    fetchData(data);
  };

  const handleChange = (event) => {
    setSearched(event.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.dateSearchConatainer}>
          <div className={styles.upperContainerStyle}>
            <div className={styles.dateContainer}>
              <div className={styles.startDateStyle}>
                <div className={styles.labelText}>
                  Start Date <span className={styles.styledRequired}>*</span>
                </div>
                <Controller
                  name="startDate" // Name of the field in the form data
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        className={styles.dateStyle}
                        slotProps={{ textField: { size: "small" } }}
                        minDate={dayjs()}
                        onChange={(date) => {
                          const formattedDate =
                            dayjs(date).format("DD-MM-YYYY");
                          setValue("startDate", formattedDate);
                        }}
                      />
                    </LocalizationProvider>
                  )}
                />
                <div className={styles.styledError}>
                  {errors.startDate && <span>This field is required</span>}
                </div>
              </div>
              <div>
                <div className={styles.labelText}>
                  End Date <span className={styles.styledRequired}>*</span>
                </div>
                <Controller
                  name="endDate" // Name of the field in the form data
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        className={styles.dateStyle}
                        minDate={dayjs()}
                        onChange={(date) => {
                          const formattedDate =
                            dayjs(date).format("DD-MM-YYYY");
                          setValue("endDate", formattedDate);
                        }}
                        slotProps={{ textField: { size: "small" } }}
                      />
                    </LocalizationProvider>
                  )}
                />
                <div className={styles.styledError}>
                  {errors.endDate && <span>This field is required</span>}
                </div>
              </div>

              <Button
                variant="outlined"
                type="submit"
                className={styles.stylesButton}
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
                <Typography nowrap="true" className={styles.buttonTextStyle}>
                  Create New Proposal Exception
                </Typography>
              </Button>
            </div>
          </div>
          <div>
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
                    : () => (
                        <div className={styles.placeholderStyle}>Select</div>
                      )
                }
              >
                {ProposalOTPSearch.map((item) => (
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
          </div>
        </div>
      </form>
    </div>
  );
}

export default SearchComponenet;
