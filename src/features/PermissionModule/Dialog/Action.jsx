import React from "react";
import { useDispatch } from "react-redux";
import { hideDialog } from "../../../stores/slices/dialogSlice";
import CustomButton from "../../../components/CustomButton";
import useUpdatePrivilege from "../hooks/useUpdatePrivilege";

const Actions = ({ row, fetchData }) => {
  const dispatch = useDispatch();

  const { updateData } = useUpdatePrivilege(fetchData);

  const confirmAction = () => {
    updateData(row?.id, !row?.status);
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
