import React from 'react';
import { useDispatch } from 'react-redux';
import { hideDialog } from '../../../stores/slices/dialogSlice';
import CustomButton from '../../../components/CustomButton';
import useUpdateProposal from '../../ProposalOTPException/hooks/useUpdateProposal';

const Action = ({ row, data, updateStatus }) => {
  const dispatch = useDispatch();

  const { UpdateDataFun } = useUpdateProposal()

  const confirmAction = () => {
    const payload = {
      id: row.id,
      properties: {
        status: !row.checked,
      },
    }

    UpdateDataFun(payload, data, updateStatus)
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
