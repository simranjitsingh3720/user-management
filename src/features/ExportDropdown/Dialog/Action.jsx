import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideDialog } from "../../../stores/slices/dialogSlice";
import CustomButton from "../../../components/CustomButton";

const Actions = () => {
  const dispatch = useDispatch();
  const selectedFilter = useSelector((state) => state.export);

  const confirmAction = () => {
    dispatch(hideDialog());
  };

  return (
    <div>
      <CustomButton variant="outlined" onClick={() => dispatch(hideDialog())}>Cancel</CustomButton>
      <CustomButton onClick={confirmAction}>Confirm</CustomButton>
    </div>
  );
};

export default Actions;
