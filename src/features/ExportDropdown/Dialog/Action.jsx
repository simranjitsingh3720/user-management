import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideDialog } from '../../../stores/slices/dialogSlice';
import CustomButton from '../../../components/CustomButton';
import { EXPORT_CONSTANTS } from '../utils/constants';
import { downloadData } from '../../../stores/slices/exportSlice';
import { removeSpacesAndJoin } from '../../../utils/globalizationFunction';
import dayjs from 'dayjs';
import toastifyUtils from '../../../utils/toastify';
import { DATE_FORMAT } from '../../../utils/globalConstants';

const Actions = () => {
  const dispatch = useDispatch();
  const { columns, fromDate, toDate, selectedValue, tableName, extraColumns, downloadLoading } = useSelector((state) => state.export);

  const confirmAction = () => {
    if (downloadLoading) return;
  
    const is30Days = selectedValue !== EXPORT_CONSTANTS.custom;
  
    const parsedFromDate = dayjs(fromDate, DATE_FORMAT);
    const parsedToDate = dayjs(toDate, DATE_FORMAT);
  
    if (!parsedFromDate.isValid() || !parsedToDate.isValid()) {
      toastifyUtils.notifyError('Invalid date format.');
      return;
    }
  
    if (!is30Days && parsedFromDate.isAfter(parsedToDate)) {
      toastifyUtils.notifyError('Start date cannot be after the end date.');
      return;
    }
  
    let combinedData = {
      tableName: tableName,
    };
  
    let additionalColumns = [];
    let selectedColumns = [];
  
    if (columns.length !== 0) {
      selectedColumns = columns
        .filter((col) => col.checked)
        .map((col) => removeSpacesAndJoin(col.name))
        .join(',');
  
      combinedData = {
        ...combinedData,
        columns: selectedColumns,
      };
    }
  
    if (extraColumns.length !== 0) {
      additionalColumns = extraColumns
        .filter((col) => col.checked)
        .map((col) => removeSpacesAndJoin(col.name))
        .join(',');
  
      combinedData = {
        ...combinedData,
        additionalColumns: additionalColumns,
      };
    }
  
    if (!is30Days) {
      combinedData = {
        ...combinedData,
        isBulkDownload: !is30Days,
        startDate: fromDate,
        endDate: toDate,
      };
    } else {
      combinedData = {
        ...combinedData,
        past30Days: is30Days,
      };
    }
  
    dispatch(downloadData(combinedData));
    dispatch(hideDialog());
  };

  return (
    <div>
      <CustomButton
        variant="outlined"
        onClick={() => !downloadLoading && dispatch(hideDialog())}
        disabled={downloadLoading}
      >
        Cancel
      </CustomButton>
      <CustomButton onClick={confirmAction} loading={downloadLoading}>
        Confirm
      </CustomButton>
    </div>
  );
};

export default Actions;
