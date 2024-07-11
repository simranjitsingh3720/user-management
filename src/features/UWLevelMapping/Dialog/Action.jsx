import React from 'react';
import { useDispatch } from 'react-redux';
import { hideDialog } from '../../../stores/slices/dialogSlice';
import CustomButton from '../../../components/CustomButton';
import useCreateProductLevel from '../hooks/useCreateProductLevel';

const Actions = ({ row, fetchData }) => {
  const dispatch = useDispatch();

  const { updateData } = useCreateProductLevel(fetchData);

  const confirmAction = () => {
    const payload = {
      id: row?.id,
      properties: {
        status: !row?.status,
      },
    };

    updateData(payload);
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
