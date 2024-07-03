import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideDialog } from "../../../stores/slices/dialogSlice";
import CustomButton from "../../../components/CustomButton";

const Actions = () => {
  const dispatch = useDispatch();
  const { columns, fromDate, toDate } = useSelector((state) => state.export);

  const confirmAction = () => {
    const selectedColumns = columns
      .filter((col) => col.checked)
      .map((col) => col.name)
      .join(", ");

    let combinedData = {
      columns: selectedColumns,
      fromDate: fromDate,
      toDate: toDate
    }

    console.log(combinedData);

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
