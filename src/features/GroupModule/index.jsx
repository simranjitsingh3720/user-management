import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from './utils/Header';
import CustomTable from './../../components/CustomTable';
import { getGroup, getGroupById } from './../../stores/slices/groupSlice';
import { COMMON_WORDS } from '../../utils/constants';
import { BUTTON_TEXT } from '../../utils/globalConstants';
import { showDialog } from '../../stores/slices/dialogSlice';
import ConfirmContent from './Dialog/ConfirmContent';
import ConfirmAction from './Dialog/ConfirmAction';
import CustomDialog from '../../components/CustomDialog';
import CustomButton from '../../components/CustomButton';
import { useNavigate } from 'react-router-dom';
import PermissionContent from './Dialog/PermissionContent';

function GroupModule() {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [order, setOrder] = useState(null);
  const [orderBy, setOrderBy] = useState(null);

  const [groupData, setGroupData] = useState([]);
  const { group, groupLoading } = useSelector((state) => state.group);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getGroup({ isAll: true }));
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      getGroup({
        page,
        pageSize,
        order,
        orderBy,
      })
    );
  }, [dispatch, page, pageSize, order, orderBy]);

  useEffect(() => {
    if (group?.data?.length === 0) return;

    const transformedData =
      group?.data?.map((item) => {
        return {
          id: item.id,
          groupName: item.groupName,
          label: item.label,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
          checked: item.status,
          status: item.status,
        };
      }) || [];

    setGroupData(transformedData);
  }, [group]);

  const handleGroupStatus = useCallback(
    (data) => {
      dispatch(
        showDialog({
          title: COMMON_WORDS.CHANGE_STATUS,
          content: <ConfirmContent />,
          actions: <ConfirmAction row={data} />,
        })
      );
    },
    [dispatch]
  );

  const showGroupPermission = useCallback(
    (data) => {
      dispatch(
        showDialog({
          title: COMMON_WORDS.CHANGE_STATUS,
          content: <PermissionContent data={data} />,
        })
      );
    },
    [dispatch]
  );


  const handleGroupEdit = useCallback(
    (data) => {
      dispatch(getGroupById({ id: data.id }));
      navigate(`/group/group-form/${data.id}`);
    },
    [dispatch, navigate]
  );

  const header = useMemo(() => Header(handleGroupStatus, showGroupPermission, handleGroupEdit), [handleGroupStatus, showGroupPermission, handleGroupEdit]);

  return (
    <>
      <div className="mb-4 flex justify-end">
        <CustomButton onClick={() => navigate('/group/group-form')} text="Go">
          {BUTTON_TEXT.GROUP}
        </CustomButton>
      </div>
      <div>
        <CustomTable
          rows={groupData || []}
          columns={header}
          loading={groupLoading}
          totalCount={group?.totalCount || 0}
          page={page}
          setPage={setPage}
          rowsPerPage={pageSize}
          setRowsPerPage={setPageSize}
          order={order}
          setOrder={setOrder}
          orderBy={orderBy}
          setOrderBy={setOrderBy}
        />

        <CustomDialog />
      </div>
    </>
  );
}

export default GroupModule;
