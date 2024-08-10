import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import CustomTable from '../../components/CustomTable';
import { Header } from './utils/header';
import { fetchLobData } from '../../stores/slices/lobSlice';
import CustomButton from '../../components/CustomButton';
import { useNavigate } from 'react-router-dom';
import usePermissions from '../../hooks/usePermission';
import { PAGECOUNT } from '../../utils/globalConstants';
import { showDialog } from '../../stores/slices/dialogSlice';
import { COMMON_WORDS } from '../../utils/constants';
import Content from '../../components/CustomDialogContent';
import Action from './Action';
import { formatDate } from '../../utils/globalizationFunction';

const Lob = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { lob, lobLoading } = useSelector((state) => state.lob);

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(PAGECOUNT);
  const [order, setOrder] = useState(COMMON_WORDS.DESC);
  const [orderBy, setOrderBy] = useState(COMMON_WORDS.CREATED_AT);
  const [lobData, setLobData] = useState([]);

  // Check Permission 
  const { canCreate, canUpdate } = usePermissions();

  const createNewLob = () => {
    navigate('/lob/lob-form');
  };

  useEffect(() => {
    dispatch(
      fetchLobData({
        page,
        pageSize,
        order,
        orderBy,
      })
    );
  }, [dispatch, page, pageSize, order, orderBy]);

  const updateLobStatus = useCallback(
    (id, data) => {
      const updatedData = data.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            checked: !item.checked,
            status: !item.status,
          };
        }
        return item;
      });
      
      setLobData(updatedData);
    },
    []
  );

  const handleStatusUpdate = useCallback(
    (data, row) => {
      dispatch(
        showDialog({
          title: COMMON_WORDS.CHANGE_STATUS,
          content: <Content label={COMMON_WORDS.LOB} />,
          actions: <Action row={row} lobData={data} updateLobStatus={updateLobStatus} />,
        })
      );
    },
    [dispatch, updateLobStatus]
  );

  useEffect(() => {
    if (lob.length === 0) return;

    const transformedData =
      lob?.data?.map((item) => ({
        ...item,
        checked: item.status,
        disabled: !canUpdate,
        createdAt: formatDate(item.createdAt),
        updatedAt: formatDate(item.updatedAt),
      })) || [];
    setLobData(transformedData);
  }, [lob, canUpdate]);

  const header = useMemo(() => Header(handleStatusUpdate), [handleStatusUpdate]);

  return (
    <Box>
      <div className="flex justify-end">
        {canCreate && (
          <CustomButton variant="contained" onClick={createNewLob} sx={{ textTransform: 'none' }}>
            Create
          </CustomButton>
        )}
      </div>
      <div className="mt-4">
        <CustomTable
          rows={lobData || []}
          columns={header}
          loading={lobLoading}
          totalCount={lob?.totalCount || 0}
          page={page}
          setPage={setPage}
          rowsPerPage={pageSize}
          setRowsPerPage={setPageSize}
          order={order}
          setOrder={setOrder}
          orderBy={orderBy}
          setOrderBy={setOrderBy}
          canUpdate={canUpdate}
        />
      </div>
    </Box>
  );
};

export default Lob;
