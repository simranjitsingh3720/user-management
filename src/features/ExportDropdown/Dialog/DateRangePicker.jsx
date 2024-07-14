import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Grid } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { setFromDate, setToDate } from "../../../stores/slices/exportSlice";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";
import { EXPORT_CONSTANTS } from "../utils/constants";
import { DATE_FORMAT } from "../../../utils/globalConstants";

const DateRangePicker = () => {
  const dispatch = useDispatch();
  const { fromDate, toDate, selectedValue } = useSelector((state) => state.export);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <FormControl className="w-full">
            <FormLabel id="fromDate">From</FormLabel>
            <DatePicker
              value={fromDate ? dayjs(fromDate, DATE_FORMAT) : null}
              onChange={(newValue) => dispatch(setFromDate(newValue))}
              slotProps={{ textField: { size: "medium" } }}
              disabled={selectedValue !== EXPORT_CONSTANTS.custom}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl className="w-full">
            <FormLabel id="toDate">To</FormLabel>
            <DatePicker
              value={toDate ? dayjs(toDate, DATE_FORMAT) : null}
              onChange={(newValue) => dispatch(setToDate(newValue))}
              slotProps={{ textField: { size: "medium" } }}
              disabled={selectedValue !== EXPORT_CONSTANTS.custom}
            />
          </FormControl>
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
};

export default DateRangePicker;
