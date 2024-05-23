import React from "react";
import styles from "./styles.module.css";
import {
  Autocomplete,
  Button,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function SearchComponent() {
  const navigate = useNavigate();

  const handleCreateNewForm = () => {
    navigate("/banca/banca-form");
  };

  return (
    <div>
      {/* <div className={styles.searchText}>Search By</div> */}
      <div className={styles.selectContainer}>
        {/* <div className={styles.flexSearchContainer}>
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
        </div> */}
        <div>
          <Button
            variant="contained"
            onClick={handleCreateNewForm}
            sx={{ textTransform: "none" }}
          >
            <Typography noWrap className={styles.buttonTextStyle}>
              Create BANCA Field
            </Typography>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SearchComponent;
