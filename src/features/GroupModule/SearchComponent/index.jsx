import {
  Autocomplete,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";
import { GroupSearchBy } from "../constants";

const fetchIdsAndConvert = (inputData) => {
  const ids = inputData.map((permission) => permission.id);
  return ids.join();
};

function SearchComponent({
  searched,
  setSearched,
  query,
  setQuery,
  fetchData,
  permissionData,
  value,
  setValue,
  setLoading,
}) {
  const handleChange = (event) => {
    setSearched(event.target.value);
  };

  const navigate = useNavigate();

  const handleCreateNewForm = () => {
    navigate("/group/group-form");
  };

  const handleGo = () => {
    const resultPermissionString = fetchIdsAndConvert(value);
    setLoading(true);
    fetchData(searched, query, resultPermissionString);
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
              options={permissionData || []}
              getOptionLabel={(option) => option.permissionName.toUpperCase()}
              className={styles.customizeGroupSelect}
              limitTags={2}
              disableCloseOnSelect
              size="small"
              renderInput={(params) => (
                <TextField {...params} placeholder="Select" />
              )}
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

          <Button variant="outlined" onClick={handleGo}>
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
              Create New Group
            </Typography>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SearchComponent;
