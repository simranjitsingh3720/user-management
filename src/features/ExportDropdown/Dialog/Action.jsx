import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideDialog } from '../../../stores/slices/dialogSlice';
import CustomButton from '../../../components/CustomButton';
import { EXPORT_CONSTANTS } from '../utils/constants';
import { downloadData } from '../../../stores/slices/exportSlice';
import { removeSpacesAndJoin } from '../../../utils/globalizationFunction';
import dayjs from 'dayjs';
import toastifyUtils from '../../../utils/toastify';

const Actions = () => {
  const dispatch = useDispatch();
  const { columns, fromDate, toDate, selectedValue, tableName, extraColumns } = useSelector((state) => state.export);

  const confirmAction = () => {
    const is30Days = selectedValue !== EXPORT_CONSTANTS.custom;

    if (!is30Days && dayjs(fromDate).isAfter(dayjs(toDate))) {
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
      <CustomButton variant="outlined" onClick={() => dispatch(hideDialog())}>
        Cancel
      </CustomButton>
      <CustomButton onClick={confirmAction}>Confirm</CustomButton>
    </div>
  );
};

export default Actions;
