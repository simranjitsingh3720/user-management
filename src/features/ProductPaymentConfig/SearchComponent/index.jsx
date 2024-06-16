import {
  Autocomplete,
  
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import styles from "./styles.module.scss";
import { ProductPayment } from "../constants";
import { useNavigate } from "react-router-dom";
import useGetAllProduct from "../hooks/useGetAllProduct";
import useGetLobListData from "../../ProductModule/hooks/useGetLobListData";
import CustomButton from "../../../components/CustomButton";

const fetchIdsAndConvert = (inputData) => {
  const ids = inputData.map((permission) => permission.id);
  return ids.join();
};

function SearchComponenet({
  fetchData,
  searched,
  setSearched,
  productValue,
  setProductValue,
  lobValue,
  setLobValue,
}) {
  const handleChange = (event) => {
    setSearched(event.target.value);
  };

  const handleGo = () => {
    if (searched === "product") {
      const resultProductString = fetchIdsAndConvert(productValue);
      fetchData(searched, resultProductString);
    } else {
      const resultLobString = fetchIdsAndConvert(lobValue);
      fetchData(searched, resultLobString);
    }
  };

  const navigate = useNavigate();

  const handleCreateNewForm = () => {
    navigate("/product-payment-config/form");
  };

  const { data } = useGetAllProduct();

  const { data: allLobData } = useGetLobListData();

  return (
    <div className={styles.flexSearchContainer}>
      <div className={styles.selectContainer}>
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
          {ProductPayment.map((item) => (
            <MenuItem value={item.value} className={styles.styledOptionText}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
        {searched === "product" && (
          <Autocomplete
            multiple
            id="groupMultiSelect"
            options={data?.data || []}
            getOptionLabel={(option) => option?.product?.toUpperCase()}
            className={styles.customizeGroupSelect}
            limitTags={2}
            disableCloseOnSelect
            size="small"
            renderInput={(params) => (
              <TextField {...params} placeholder="Select" />
            )}
            onChange={(event, newValue) => {
              setProductValue(newValue);
            }}
            ListboxProps={{
              style: {
                maxHeight: "200px",
              },
            }}
          />
        )}
        {searched === "lob" && (
          <Autocomplete
            multiple
            id="groupMultiSelect"
            options={allLobData.data || []}
            getOptionLabel={(option) => option?.lob?.toUpperCase()}
            className={styles.customizeGroupSelect}
            limitTags={2}
            disableCloseOnSelect
            size="small"
            renderInput={(params) => (
              <TextField {...params} placeholder="Select" />
            )}
            onChange={(event, newValue) => {
              setLobValue(newValue);
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
      <CustomButton
        variant="contained"
        onClick={handleCreateNewForm}
        sx={{ textTransform: "none" }}
      >
        <Typography nowrap="true" className={styles.buttonTextStyle}>
          Create New Payment Configuration
        </Typography>
      </CustomButton>
    </div>
  );
}

export default SearchComponenet;
