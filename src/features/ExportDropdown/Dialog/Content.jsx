import React, { useEffect } from "react";
import { Checkbox, Grid, FormControlLabel } from "@mui/material";
import DateRangePicker from "./DateRangePicker";
import { useSelector, useDispatch } from "react-redux";
import { fetchColumns, toggleColumn } from "../../../stores/slices/exportSlice";

const Content = () => {
  const dispatch = useDispatch();
  const { columns } = useSelector((state) => state.export);
  
  useEffect(() => {
    dispatch(fetchColumns('gc_office'));
  }, [dispatch]);

  const handleCheckUncheck = (id) => {
    dispatch(toggleColumn(id));
  };

  return (
    <Grid container spacing={2} className="pt-4">
      <Grid item xs={12}>
        <DateRangePicker />
      </Grid>

      {columns.length > 0 && columns.map((item, index) => (
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
