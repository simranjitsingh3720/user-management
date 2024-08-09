import React from 'react';
import { useDispatch } from 'react-redux';
import CustomButton from '../../../components/CustomButton';
import { hideDialog } from '../../../stores/slices/dialogSlice';
import useUpdateBitlyLink from '../hooks/useUpdateBitlyLink';

const Action = ({ row, fetchData }) => {
  const dispatch = useDispatch();

  const { UpdateDataFun, updateLoading } = useUpdateBitlyLink(fetchData);

  const confirmAction = () => {
    const payload = {
      id: row.id,
      properties: {
        status: !row.checked,
      },
    };

    UpdateDataFun(payload);
  };

  return (
    <div>
      <CustomButton variant="outlined" onClick={() => dispatch(hideDialog())}>
        Cancel
      </CustomButton>
      <CustomButton onClick={confirmAction} disabled={updateLoading}>
        {updateLoading ? 'Confirming...' : 'Confirm'}
      </CustomButton>
    </div>
  );
};

export default Action;
