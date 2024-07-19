import React from 'react';
import { useDispatch } from 'react-redux';
import { hideDialog } from '../../../stores/slices/dialogSlice';
import CustomButton from '../../../components/CustomButton';
import useRole from '../hooks/useRole';

const Action = ({ row, data, updateRoleInState }) => {
  const dispatch = useDispatch();
  const { updateRole } = useRole(updateRoleInState);
  const { id, groupId, status } = row;

  const confirmAction = () => {
    const payload = {
        groupId: groupId,
        status: !status,
    }
    updateRole(id, payload, data);
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
