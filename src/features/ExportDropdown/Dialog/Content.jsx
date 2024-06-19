import React from "react";
import { Grid } from "@mui/material";
import DateRangePicker from "./DateRangePicker";

const Content = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <DateRangePicker />
      </Grid>
    </Grid>
  );
};

export default Content;
