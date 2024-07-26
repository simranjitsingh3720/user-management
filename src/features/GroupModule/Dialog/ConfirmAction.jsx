import React from "react";
import { useDispatch } from "react-redux";
import { hideDialog } from "../../../stores/slices/dialogSlice";
import CustomButton from "../../../components/CustomButton";
import { updateGroup } from "../../../stores/slices/groupSlice";

const ConfirmAction = ({ row, groupData, handleGroupStatus }) => {
  const dispatch = useDispatch();

  const confirmAction = () => {
    const payload = {
      id: row.id,
      properties: {
        status: !row.checked,
      },
    }
    dispatch(updateGroup({ data: payload, groupData, handleGroupStatus }));
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

export default ConfirmAction;
