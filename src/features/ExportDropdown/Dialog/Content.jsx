import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { fetchColumns, toggleColumn } from '../../../stores/slices/exportSlice';
import CustomCheckbox from '../../../components/CustomCheckbox';
import DateRangePicker from './DateRangePicker';

const Content = ({ tableHeader }) => {
  const dispatch = useDispatch();
  const { columns, tableName, loading, extraColumns } = useSelector((state) => state.export);

  useEffect(() => {
    let headerValues = new Set();

    if (tableHeader && tableHeader?.length !== 0) {
      headerValues = new Set(tableHeader.map((header) => header.id));
    }

    dispatch(fetchColumns({ tableName, headerValues }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableHeader, tableName]);

  const handleCheckUncheck = (event, id, isAdditional = false) => {
    event.stopPropagation();
    const checkedValue = event.target.checked;
    dispatch(toggleColumn({ id, isAdditional, checkedValue }));
  };

  return (
    <Grid container spacing={2} className="pt-4">
      <Grid item xs={12}>
        <DateRangePicker />
      </Grid>
      <Grid item xs={12}>
        <h2 className="text-sm font-semibold">Please select columns to download the data</h2>
      </Grid>
      {loading && (
        <Grid item xs={12} className="flex items-center justify-center">
          Loading...
        </Grid>
      )}

      {!loading &&
        columns.length > 0 &&
        columns.map((item, index) => (
          <>
            {!item.hide && (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <CustomCheckbox
                  checked={item.checked}
                  onChange={(event) => handleCheckUncheck(event, item.id, false)}
                  label={item.name}
                  indeterminate={false}
                />
              </Grid>
            )}
          </>
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
                onChange={(event) => handleCheckUncheck(event, item.id, true)}
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
