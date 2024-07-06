import React from "react";
import { useDispatch } from "react-redux";
import { hideDialog } from "../../../stores/slices/dialogSlice";
import CustomButton from "../../../components/CustomButton";

const Actions = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <CustomButton variant="outlined" onClick={() => dispatch(hideDialog())}>
        Cancel
      </CustomButton>
    </div>
  );
};

export default Actions;
