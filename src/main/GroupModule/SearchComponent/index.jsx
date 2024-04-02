import {
  Autocomplete,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import { GroupSearchBy } from "../constants";

function SearchComponent({
  searched,
  setSearched,
  query,
  setQuery,
  fetchData,
  inputValue,
  setInputValue,
  permissionData,
  value,
  setValue,
}) {
  const handleChange = (event) => {
    setSearched(event.target.value);
  };

  const navigate = useNavigate();

  const handleCreateNewForm = () => {
    navigate("/roles/role-form");
  };

  const handleGo = () => {
    fetchData(searched, query);
  };

  console.log("searched", searched);

  console.log("value", value);

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
            {GroupSearchBy.map((item) => (
              <MenuItem value={item.value} className={styles.styledOptionText}>
                {item.label}
              </MenuItem>
            ))}
          </Select>

          {searched === "groupName" ? (
            <TextField
              id="search"
              variant="outlined"
              placeholder="Search"
              size="small"
              className={styles.textFieldStyle}
              onChange={(e) => setQuery(e.target.value)}
            />
          ) : (
            <Autocomplete
              multiple
              id="groupMultiSelect"
              options={permissionData?.data || []}
              getOptionLabel={(option) => option.permissionName.toUpperCase()}
              className={styles.customizeGroupSelect}
              size="small"
              renderInput={(params) => (
                <TextField {...params} placeholder="Select" />
              )}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              ListboxProps={{
                style: {
                  maxHeight: "200px",
                },
              }}
            />
          )}

          <Button
            variant="outlined"
            onClick={handleGo}
            disabled={!((searched && query) || (searched && inputValue))}
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
            <Typography noWrap className={styles.buttonTextStyle}>
              Create New Role
            </Typography>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SearchComponent;
