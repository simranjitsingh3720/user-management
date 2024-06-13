import {
  Autocomplete,
  
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";
import { GroupSearchBy } from "../constants";
import CustomButton from "../../../components/CustomButton";

function SearchComponent({
  searched,
  setSearched,
  query,
  setQuery,
  fetchData,
  groupData,
  value,
  setValue,
  setLoading,
}) {
  const handleChange = (event) => {
    setSearched(event.target.value);
  };

  const navigate = useNavigate();

  const handleCreateNewForm = () => {
    navigate("/roles/role-form");
  };

  const handleGo = () => {
    const resultGroupId = value.id;
    setLoading(true);
    fetchData(searched, query, resultGroupId);
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

          {searched === "roleName" ? (
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
              id="groupSelect"
              options={groupData || []}
              getOptionLabel={(option) => option?.groupName?.toUpperCase()}
              className={styles.customizeGroupSelect}
              limitTags={2}
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

          <CustomButton variant="outlined" onClick={handleGo}>
            Go
          </CustomButton>
        </div>
        <div>
          <CustomButton
            variant="contained"
            onClick={handleCreateNewForm}
            sx={{ textTransform: "none" }}
          >
            <Typography nowrap="true" className={styles.buttonTextStyle}>
              Create New Role
            </Typography>
          </CustomButton>
        </div>
      </div>
    </div>
  );
}

export default SearchComponent;
