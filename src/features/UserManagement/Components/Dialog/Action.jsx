import React from "react";
import { useDispatch } from "react-redux";
import CustomButton from "../../../../components/CustomButton";
import { hideDialog } from "../../../../stores/slices/dialogSlice";
import useUpdateUser from "../hooks/useUpdateUser";

const Actions = ({ row, fetchData }) => {
  console.log(row,"mit");
  const dispatch = useDispatch();

  const { updateData } = useUpdateUser(fetchData);

  const confirmAction = () => {
    console.log(row);
     updateData(row?.id, row?.status);
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
