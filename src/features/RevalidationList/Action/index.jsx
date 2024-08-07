import React from 'react';
import { useDispatch } from 'react-redux';
import { hideDialog } from '../../../stores/slices/dialogSlice';
import CustomButton from '../../../components/CustomButton';
import useRevalidationList from '../hooks/useRevalidationList';

const Action = ({ row, data, updateList  }) => {
  const dispatch = useDispatch();
  const { revalidationListUpdateData } = useRevalidationList();

  const confirmAction = () => {
    const payload = [{
      id: row.id,
      properties: {
        status: !row.checked,
      },
    }]
    revalidationListUpdateData({ payload, data, row, updateList });
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
