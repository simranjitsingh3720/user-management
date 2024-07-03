import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideDialog } from "../../../stores/slices/dialogSlice";
import CustomButton from "../../../components/CustomButton";
import { EXPORT_CONSTANTS } from "../utils/constants";
import { downloadData } from "../../../stores/slices/exportSlice";

const Actions = () => {
  const dispatch = useDispatch();
  const { columns, fromDate, toDate, selectedValue } = useSelector((state) => state.export);

  const confirmAction = () => {
    const selectedColumns = columns
      .filter((col) => col.checked)
      .map((col) => col.name)
      .join(", ");

    let combinedData = {
      tableName: "cKYC",
      past30Days: selectedValue !== EXPORT_CONSTANTS.custom,
      isBulkDownload: selectedValue === EXPORT_CONSTANTS.custom,
      // email: email,
      columns: selectedColumns,
      startDate: fromDate,
      endDate: toDate,
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
