import { useDispatch } from 'react-redux';
import { hideDialog } from '../../../stores/slices/dialogSlice';
import CustomButton from '../../../components/CustomButton';
import useRevalidationList from '../hooks/useRevalidationList';

const Action = ({ row, data, updateList, bulkUpdate = false, userId }) => {
  const dispatch = useDispatch();
  const { revalidationListUpdateData, revalidationListLoading } = useRevalidationList();

  const confirmAction = () => {
    let payload = [];

    if (bulkUpdate) {
      payload = {
        fields: {
          status: row,
        }
      };
    } else {
      payload = {
        fields: {
          roleName: row.roleName,
          status: !row.checked,
        },
      };
    }

    revalidationListUpdateData({ payload, data, row, updateList, bulkUpdate, userId });
    dispatch(hideDialog());
  };

  return (
    <div>
      <CustomButton variant="outlined" onClick={() => dispatch(hideDialog())}>
        Cancel
      </CustomButton>
      <CustomButton onClick={confirmAction} loading={revalidationListLoading}>Confirm</CustomButton>
    </div>
  );
};

export default Action;
