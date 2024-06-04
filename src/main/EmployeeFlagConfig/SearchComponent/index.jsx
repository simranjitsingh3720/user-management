import {
  Autocomplete,
  Button,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React from "react";
import styles from "./styles.module.css";
import { searchOption } from "../constants";

import useGetUserData from "../../BANCALogin/hooks/useGetUserData";

const fetchIdsAndConvert = (inputData) => {
  const ids = (inputData || []).map((producer) => producer.id);
  return ids.join();
};

function SearchComponenet({
  producers,
  fetchData,
  setPageChange,
  setQuery,
  searched,
  setSearched,
  setProducers,
}) {
  const handleChange = (event) => {
    setSearched(event.target.value);
  };

  const handleGo = () => {
    const resultProducersId = fetchIdsAndConvert(producers);
    fetchData(resultProducersId);
  };

  const { userData } = useGetUserData();

  return (
    <div className={styles.flexSearchContainer}>
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
          {searchOption.map((item) => (
            <MenuItem value={item.value} className={styles.styledOptionText}>
              {item.label}
            </MenuItem>
          ))}
        </Select>

        {searched === "producers" ? (
          <Autocomplete
            multiple
            id="groupMultiSelect"
            options={userData || []}
            getOptionLabel={(option) => {
              return `${option?.firstName?.toUpperCase()} ${option?.lastName?.toUpperCase()}`;
            }}
            className={styles.customizeGroupSelect}
            limitTags={2}
            disableCloseOnSelect
            size="small"
            renderInput={(params) => (
              <TextField {...params} placeholder="Select" />
            )}
            onChange={(event, newValue) => {
              setProducers(newValue);
            }}
            ListboxProps={{
              style: {
                maxHeight: "200px",
              },
            }}
          />
        ) : (
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
        )}
        <Button variant="outlined" onClick={handleGo}>
          Go
        </Button>
      </div>
    </div>
  );
}

export default SearchComponenet;
