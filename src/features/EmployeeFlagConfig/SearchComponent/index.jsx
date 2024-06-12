import {
  Autocomplete,
  Button,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React from "react";
import styles from "./styles.module.scss";
import { searchOption } from "../constants";

import useGetUserData from "../../BANCALogin/hooks/useGetUserData";

const fetchIdsAndConvert = (inputData) => {
  const ids = (inputData || []).map((producer) => producer.id);
  return ids.join();
};

function SearchComponenet({ producers, fetchData, setProducers }) {
  const handleGo = () => {
    const resultProducersId = fetchIdsAndConvert(producers);
    fetchData(resultProducersId);
  };

  const { userData } = useGetUserData();

  return (
    <div className={styles.flexSearchContainer}>
      <div className={styles.flexSearchContainer}>
        <Autocomplete
          id="producer"
          options={userData || []}
          getOptionLabel={(option) => {
            return `${option?.firstName?.toUpperCase()} ${option?.lastName?.toUpperCase()}`;
          }}
          multiple
          className={styles.customizeGroupSelect}
          size="small"
          isOptionEqualToValue={(option, value) => option.id === value.id}
          renderInput={(params) => (
            <TextField {...params} placeholder="Search by Producer Name" />
          )}
          onChange={(event, newValue) => {
            setProducers(newValue);
          }}
          renderOption={(props, option) => (
            <li {...props} key={option.id}>
              {option?.firstName?.toUpperCase()}{" "}
              {option?.lastName?.toUpperCase()}
            </li>
          )}
          ListboxProps={{
            style: {
              maxHeight: "200px",
            },
          }}
        />

        <Button variant="outlined" onClick={handleGo}>
          Go
        </Button>
      </div>
    </div>
  );
}

export default SearchComponenet;
