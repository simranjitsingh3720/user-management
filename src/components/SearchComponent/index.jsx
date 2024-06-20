import {
  Autocomplete,
  Box,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";

import CustomButton from "../CustomButton";

function SearchComponent({
  option,
  setOption,
  fetchData,
  optionsData,
  optionLabel,
  placeholder,
  renderOptionFunction,
  buttonText,
  navigateRoute,
  searched,
  setSearched,
  selectOptions,
  handleGo,
}) {
  const navigate = useNavigate();

  const handleCreateNewForm = () => {
    navigate(navigateRoute);
  };

  return (
    <Box>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        {/* Autocomplete and Go Button */}

        <Grid item xs={12} sm={6} lg={8}>
          <Grid
            container
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            direction="row"
            alignItems="center"
          >
            <Grid item xs={12} sm={6} lg={6}>
              <Grid
                container
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                direction="row"
                alignItems="center"
              >
                {selectOptions && (
                  <Grid
                    item
                    xs={selectOptions ? 2 : 12}
                    sm={selectOptions ? 6 : 12}
                    lg={selectOptions ? 4 : 12}
                  >
                    <Select
                      labelId="search-select"
                      id="search-select"
                      value={searched}
                      onChange={(event) => {
                        setSearched(event.target.value);
                      }}
                      className="customize-select"
                      size="small"
                      displayEmpty
                      fullWidth
                      renderValue={
                        searched !== ""
                          ? undefined
                          : () => (
                              <div className={styles.placeholderStyle}>
                                Select
                              </div>
                            )
                      }
                    >
                      {selectOptions.map((item) => (
                        <MenuItem
                          value={item.value}
                          className={styles.styledOptionText}
                        >
                          {item.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                )}
                <Grid
                  item
                  xs={selectOptions ? 2 : 12}
                  sm={selectOptions ? 6 : 12}
                  lg={selectOptions ? 8 : 12}
                >
                  <Autocomplete
                    id="producer"
                    options={optionsData || []}
                    getOptionLabel={optionLabel}
                    multiple
                    size="small"
                    renderInput={(params) => (
                      <TextField {...params} placeholder={placeholder} />
                    )}
                    value={option}
                    className="customize-select"
                    onChange={(event, newValue) => {
                      setOption(newValue);
                    }}
                    renderOption={renderOptionFunction}
                    ListboxProps={{
                      style: {
                        maxHeight: "200px",
                      },
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={2} sm={6} lg={6}>
              <CustomButton variant="outlined" onClick={handleGo}>
                Go
              </CustomButton>
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <CustomButton
            variant="contained"
            onClick={handleCreateNewForm}
            sx={{ textTransform: "none", height: "100%" }}
          >
            <Typography className={styles.buttonTextStyle}>
              {buttonText}
            </Typography>
          </CustomButton>
        </Grid>
      </Grid>
    </Box>
  );
}

export default SearchComponent;
