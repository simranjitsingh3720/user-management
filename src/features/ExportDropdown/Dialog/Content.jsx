import React from "react";
import { Checkbox, Grid, FormControlLabel } from "@mui/material";
import DateRangePicker from "./DateRangePicker";
import { useSelector, useDispatch } from "react-redux";
import { toggleColumn } from "../../../stores/slices/exportSlice";

const Content = () => {
  const dispatch = useDispatch();
  const { columns } = useSelector((state) => state.export);

  const handleCheckUncheck = (id) => {
    dispatch(toggleColumn(id));
  };

  return (
    <Grid container spacing={2} className="pt-4">
      <Grid item xs={12}>
        <DateRangePicker />
      </Grid>
      {columns.length > 0 && (
        <Grid item xs={12}>
          {columns.map((item, index) => (
            <FormControlLabel
              key={index}
              control={
                <Checkbox
                  checked={item.checked || false}
                  onChange={() => handleCheckUncheck(item.id)}
                />
              }
              label={item.name}
            />
          ))}
        </Grid>
      )}
    </Grid>
  );
};

export default Content;
