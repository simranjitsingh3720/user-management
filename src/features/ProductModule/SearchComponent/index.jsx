import { Autocomplete,  TextField, Typography } from "@mui/material";
import React from "react";
import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../../components/CustomButton";

const fetchIdsAndConvert = (inputData) => {
  const ids = inputData.map((permission) => permission.id);
  return ids.join();
};

function SearchComponent({ lobListData, value, setValue, fetchData }) {
  const navigate = useNavigate();

  const handleCreateNewForm = () => {
    navigate("/product/product-form");
  };

  const handleGo = () => {
    const resultIds = fetchIdsAndConvert(value);
    fetchData(resultIds);
  };

  return (
    <div>
      <div className={styles.selectContainer}>
        <div className={styles.flexSearchContainer}>
          <Autocomplete
            id="lobSelect"
            options={lobListData?.data || []}
            getOptionLabel={(option) => option?.lob?.toUpperCase()}
            className={styles.customizeLobSelect}
            disableCloseOnSelect
            multiple
            limitTags={2}
            size="small"
            renderInput={(params) => (
              <TextField {...params} placeholder="Search by LOB Name" />
            )}
            onChange={(event, newValue) => {
              if (!newValue.length) {
                fetchData();
              }
              setValue(newValue);
            }}
            ListboxProps={{
              style: {
                maxHeight: "200px",
              },
            }}
          />

          <CustomButton
            variant="outlined"
            onClick={() => handleGo()}
            disabled={!value.length}
          >
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
              Create New Product
            </Typography>
          </CustomButton>
        </div>
      </div>
    </div>
  );
}

export default SearchComponent;
