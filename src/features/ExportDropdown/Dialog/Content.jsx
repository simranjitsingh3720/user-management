import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { fetchColumns, toggleColumn } from "../../../stores/slices/exportSlice";
import CustomCheckbox from "../../../components/CustomCheckbox";

const Content = ({ tableHeader }) => {
  const dispatch = useDispatch();
  const { columns, tableName, loading, extraColumns } = useSelector(
    (state) => state.export
  );

  useEffect(() => {
    const headerValues = new Set(tableHeader.map(header => header.id));
    dispatch(fetchColumns({tableName, headerValues}));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableHeader, tableName]);

  const handleCheckUncheck = (id, isAdditional = false) => {
    dispatch(toggleColumn({ id, isAdditional }));
  };

  return (
    <Grid container spacing={2} className="pt-4">
      <Grid item xs={12}>
        <h2 className="text-sm font-semibold">
          Please select columns to download the data
        </h2>
      </Grid>
      {loading && (
        <Grid item xs={12} className="flex items-center justify-center">
          Loading...
        </Grid>
      )}

      {!loading &&
        columns.length > 0 &&
        columns.map((item, index) => (
          <Grid item xs={12} md={6} lg={4} key={index}>
            <CustomCheckbox 
                checked={item.checked}
                onChange={() => handleCheckUncheck(item.id, false)}
                label={item.name}
                indeterminate={false}
              />
          </Grid>
        ))}

      {!loading && extraColumns && extraColumns.length > 0 && (
        <>
          <Grid item xs={12}>
            <h2 className="text-sm font-semibold">Additional columns</h2>
          </Grid>
          {extraColumns.map((item, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <CustomCheckbox 
                checked={item.checked}
                onChange={() => handleCheckUncheck(item.id, true)}
                label={item.name}
                indeterminate={false}
              />
            </Grid>
          ))}
        </>
      )}
    </Grid>
  );
};

export default Content;
