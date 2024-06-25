import React from "react";
import { Autocomplete, Box, Grid, MenuItem, Select, TextField } from "@mui/material";
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
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item xs={12} md={8}>
          <Grid container spacing={2} alignItems="center">
            {selectOptions && (
              <Grid item xs={12} sm={4} md={3}>
                <Select
                  labelId="search-select"
                  id="search-select"
                  value={searched}
                  onChange={(event) => setSearched(event.target.value)}
                  fullWidth
                  displayEmpty
                  size="small"
                  renderValue={
                    searched !== "" ? undefined : () => (
                      <span>Select</span>
                    )
                  }
                >
                  {selectOptions.map((item) => (
                    <MenuItem
                      key={item.value}
                      value={item.value}
                    >
                      {item.label}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
            )}
            <Grid item xs={12} sm={6} md={6}>
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
                onChange={(event, newValue) => setOption(newValue)}
                renderOption={renderOptionFunction}
                ListboxProps={{
                  style: { maxHeight: "200px" },
                }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={2} md={2}>
              <CustomButton variant="outlined" onClick={handleGo} fullWidth>
                Go
              </CustomButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={4} container justifyContent="flex-end">
          <CustomButton
            variant="contained"
            onClick={handleCreateNewForm}
          >
              {buttonText}
          </CustomButton>
        </Grid>
      </Grid>
    </Box>
  );
}

export default SearchComponent;
