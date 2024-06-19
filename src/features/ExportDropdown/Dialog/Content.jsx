import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  setSelectedValue,
  setFromDate,
  setToDate,
} from "../../../stores/slices/filterSlice";
import { Grid } from "@mui/material";

const RadioOptions = () => {
  const dispatch = useDispatch();
  const selectedValue = useSelector((state) => state.filter.selectedValue);

  const handleRadioChange = (event) => {
    dispatch(setSelectedValue(event.target.value));
  };

  return (
    <FormControl>
      <FormLabel id="type">Select Type</FormLabel>
      <RadioGroup
        row
        aria-labelledby="type"
        name="row-radio-buttons-group"
        value={selectedValue}
        onChange={handleRadioChange}
      >
        <FormControlLabel value="bulk" control={<Radio />} label="Bulk" />
        <FormControlLabel value="custom" control={<Radio />} label="Custom" />
      </RadioGroup>
    </FormControl>
  );
};

const DatePickers = () => {
  const dispatch = useDispatch();
  const { fromDate, toDate } = useSelector((state) => state.filter);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <FormControl>
        <FormLabel id="fromDate">From</FormLabel>
        <DatePicker
          value={fromDate}
          onChange={(newValue) => dispatch(setFromDate(newValue))}
          renderInput={(params) => (
            <TextField {...params} fullWidth margin="normal" />
          )}
        />
      </FormControl>
      <FormControl>
        <FormLabel id="toDate">To</FormLabel>
        <DatePicker
          value={toDate}
          onChange={(newValue) => dispatch(setToDate(newValue))}
          renderInput={(params) => (
            <TextField {...params} fullWidth margin="normal" />
          )}
        />
      </FormControl>
    </LocalizationProvider>
  );
};

const DownloadFilter = () => {
  const selectedValue = useSelector((state) => state.filter.selectedValue);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <RadioOptions />
      </Grid>
      {selectedValue === "custom" && (
        <Grid item xs={12}>
          <DatePickers />
        </Grid>
      )}
    </Grid>
  );
};

export default DownloadFilter;
