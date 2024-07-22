import React from 'react';
import { useDispatch } from 'react-redux';
import { hideDialog } from '../../../stores/slices/dialogSlice';
import CustomButton from '../../../components/CustomButton';
import { updateLobData } from '../../../stores/slices/lobSlice';

const Action = ({ row, lobData, updateLobStatus }) => {
  const dispatch = useDispatch();

  const confirmAction = () => {
    debugger
    const payload = {
      id: row.id,
      properties: {
        status: !row.checked,
      },
    }
    dispatch(updateLobData({ data: payload, lobData, updateLobStatus }));
    dispatch(hideDialog());
  };

  return (
    <div>
      <CustomButton variant="outlined" onClick={() => dispatch(hideDialog())}>
        Cancel
      </CustomButton>
      <CustomButton onClick={confirmAction}>
        Confirm
      </CustomButton>
    </div>
  );
};

export default Action;
