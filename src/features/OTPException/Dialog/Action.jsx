import React from 'react';
import { useDispatch } from 'react-redux';
import { hideDialog } from '../../../stores/slices/dialogSlice';
import CustomButton from '../../../components/CustomButton';
import useUpdateOTPException from '../hooks/useUpdateOTPException';

const Actions = ({ row, fetchData }) => {
  const dispatch = useDispatch();

  const { UpdateDataFun, updateLoading } = useUpdateOTPException(fetchData);

  const confirmAction = () => {
    const paylaod = {
      id: row?.id,
      properties: {
        status: !row?.status,
      },
    };
    UpdateDataFun(paylaod);
  };

  return (
    <div>
      <CustomButton variant="outlined" onClick={() => dispatch(hideDialog())}>
        Cancel
      </CustomButton>
      <CustomButton onClick={confirmAction} disabled={updateLoading}>
        Confirm
      </CustomButton>
    </div>
  );
};

export default Actions;
