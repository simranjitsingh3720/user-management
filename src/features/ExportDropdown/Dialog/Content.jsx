import React, { useEffect } from "react";
import { Checkbox, Grid, FormControlLabel } from "@mui/material";
import DateRangePicker from "./DateRangePicker";
import { useSelector, useDispatch } from "react-redux";
import { fetchColumns, toggleColumn } from "../../../stores/slices/exportSlice";

const Content = () => {
  const dispatch = useDispatch();
  const { columns, tableName, columnLoading } = useSelector(
    (state) => state.export
  );

  useEffect(() => {
    dispatch(fetchColumns(tableName));
  }, [dispatch, tableName]);

  const handleCheckUncheck = (id) => {
    dispatch(toggleColumn(id));
  };

  return (
    <Grid container spacing={2} className="pt-4">
      <Grid item xs={12}>
        <DateRangePicker />
      </Grid>

      <Grid item xs={12}>
        <h2 className="text-lg font-semibold">
          Please select columns to download the data
        </h2>
      </Grid>
      {columnLoading && (
        <Grid item xs={12} className="flex items-center justify-center">
          Loading...
        </Grid>
      )}

      {!columnLoading &&
        columns.length > 0 &&
        columns.map((item, index) => (
          <Grid item xs={12} md={6} lg={4} key={index}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={item.checked || false}
                  onChange={() => handleCheckUncheck(item.id)}
                />
              }
              label={item.name}
            />
          </Grid>
        ))}
    </Grid>
  );
};

export default Content;
