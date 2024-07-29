import React from "react";
import { useDispatch } from "react-redux";
import CustomButton from "../../../../components/CustomButton";
import { hideDialog } from "../../../../stores/slices/dialogSlice";
import useUpdateUser from "../hooks/useUpdateUser";

const Actions = ({ row, fetchData }) => {
  const dispatch = useDispatch();

  const { updateData } = useUpdateUser(fetchData);

  const confirmAction = () => {
    updateData(row?.id, row?.roleId, row?.roleName, {status: !row?.status}, fetchData);
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
