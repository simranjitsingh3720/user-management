import React from 'react';
import { useDispatch } from 'react-redux';
import { hideDialog } from '../../../stores/slices/dialogSlice';
import CustomButton from '../../../components/CustomButton';
import { updateProductData } from '../../../stores/slices/productSlice';

const Action = ({ row, productData, updateProductStatus }) => {
  const dispatch = useDispatch();

  const confirmAction = () => {
    const payload = {
      id: row.id,
      properties: {
        status: !row.checked,
      },
    }
    dispatch(updateProductData({ data: payload, productData, updateProductStatus }));
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
