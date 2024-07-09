import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { hideDialog } from "../../../stores/slices/dialogSlice";
import CustomButton from "../../../components/CustomButton";
import { updateGroup } from "../../../stores/slices/groupSlice";

const ConfirmAction = ({ row }) => {
  const dispatch = useDispatch();

  const confirmAction = useCallback(
    () => {
      dispatch(
        updateGroup({data: row})
      );
      dispatch(hideDialog());
    },
    [dispatch, row]
  );

  return (
    <div>
      <CustomButton variant="outlined" onClick={() => dispatch(hideDialog())}>
        Cancel
      </CustomButton>
      <CustomButton onClick={confirmAction}>Confirm</CustomButton>
    </div>
  );
};

export default ConfirmAction;
