import React from 'react';
import { useDispatch } from 'react-redux';
import CustomButton from '../../../components/CustomButton';
import { hideDialog } from '../../../stores/slices/dialogSlice';

const ProductListAction = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <CustomButton variant="outlined" onClick={() => dispatch(hideDialog())}>
        Cancel
      </CustomButton>
    </div>
  );
};

export default ProductListAction;
