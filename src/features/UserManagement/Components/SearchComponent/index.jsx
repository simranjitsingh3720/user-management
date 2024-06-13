import { MenuItem, Select, TextField } from "@mui/material";
import React from "react";
import DownloadIcon from "../../../../assets/DownloadLogo";
import styles from "./styles.module.scss";
import { selectData } from "../../constants";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useNavigate } from "react-router-dom";
import "dayjs/locale/en-gb";
import CustomButton from "../../../../components/CustomButton";

function SearchComponent({
  searched = "",
  setSearched = () => {},
  fromDate,
  setFromDate,
  toDate,
  setToDate,
  query,
  setQuery,
  fetchData,
}) {
  const handleChange = (event) => {
    setSearched(event.target.value);
  };

  const navigate = useNavigate();

  const handleCreateNewForm = () => {
    navigate("/user-management/user-management-form");
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
            onChange={(event) => handleChange(event)}
            size="small"
            displayEmpty
            className={styles.customizeSelect}
            renderValue={
              searched !== ""
                ? undefined
                : () => <div className={styles.placeholderStyle}>Select</div>
            }
          >
            {selectData.map((item) => (
              <MenuItem value={item.value} className={styles.styledOptionText}>
                {item.label}
              </MenuItem>
            ))}
          </Select>

          {searched === "dateCreation" ? (
            <div className={styles.dateContainer}>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale="en-gb"
              >
                <DatePicker
                  label="From Date"
                  value={fromDate}
                  onChange={(newValue) => setFromDate(newValue)}
                  className={styles.dateStyle}
                  slotProps={{ textField: { size: "small" } }}
                />
              </LocalizationProvider>

              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale="en-gb"
              >
                <DatePicker
                  label="To Date"
                  value={toDate}
                  onChange={(newValue) => setToDate(newValue)}
                  className={styles.dateStyle}
                  slotProps={{ textField: { size: "small" } }}
                />
              </LocalizationProvider>
            </div>
          ) : (
            <TextField
              id="search"
              variant="outlined"
              placeholder="Search"
              size="small"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
              className={styles.textFieldStyle}
            />
          )}
          <CustomButton variant="outlined" onClick={() => handleGo()}>
            Go
          </CustomButton>
        </div>
        <div>
          <CustomButton
            variant="outlined"
            startIcon={<DownloadIcon />}
          >
            Export Data
          </CustomButton>
          <CustomButton
            variant="contained"
            onClick={handleCreateNewForm}
            sx={{ textTransform: "none" }}
          >
            Create New User
          </CustomButton>
        </div>
      </div>
    </div>
  );
}

export default SearchComponent;
