import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideDialog } from '../../../stores/slices/dialogSlice';
import CustomButton from '../../../components/CustomButton';
import { EXPORT_CONSTANTS } from '../utils/constants';
import { downloadData, setExtraColumns } from '../../../stores/slices/exportSlice';
import { removeSpacesAndJoin } from '../../../utils/globalizationFunction';
import dayjs from 'dayjs';
import toastifyUtils from '../../../utils/toastify';
import { DATE_FORMAT } from '../../../utils/globalConstants';
import { TABLE_LABEL } from '../../../utils/constants';
import { userMapping } from '../../../utils/ExtraColumnsEnum';

const Actions = () => {
  const dispatch = useDispatch();
  const { columns, fromDate, toDate, selectedValue, tableName, extraColumns, downloadLoading, extraColumnsArr } =
    useSelector((state) => state.export);

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
        columns: selectedColumns.length ? selectedColumns : null,
      };
    }

    if (extraColumns.length !== 0) {
      let newAdditionalColumn = '';
      additionalColumns = extraColumns
        .filter((col) => col.checked)
        .map((col) => removeSpacesAndJoin(col.name))
        .join(',');

      if (tableName === TABLE_LABEL.USER_MANAGEMENT) {
        const columnsArray = additionalColumns.split(',');
        const mappedValues = columnsArray.map((column) => userMapping[column]);
        newAdditionalColumn = mappedValues.join(',');
      }

      combinedData = {
        ...combinedData,
        additionalColumns: newAdditionalColumn.length
          ? newAdditionalColumn
          : additionalColumns.length
          ? additionalColumns
          : null,
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

    if (selectedColumns.length === 0) {
      toastifyUtils.notifyError('Please select at least one column');
      return;
    }

    dispatch(downloadData(combinedData));
    dispatch(hideDialog());
  };

  const cancelAction = () => {
    if (downloadLoading) return;

    dispatch(setExtraColumns(extraColumnsArr));
    dispatch(hideDialog());
  };

  return (
    <div>
      <CustomButton variant="outlined" onClick={cancelAction} disabled={downloadLoading}>
        Cancel
      </CustomButton>
      <CustomButton onClick={confirmAction} loading={downloadLoading}>
        Confirm
      </CustomButton>
    </div>
  );
};

export default Actions;
