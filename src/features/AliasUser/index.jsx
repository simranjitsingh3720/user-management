import React, { useState, useMemo, useCallback } from 'react';
import { Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import CustomTable from '../../components/CustomTable';
import { Header } from './utils/header';
import CustomButton from '../../components/CustomButton';
import usePermissions from '../../hooks/usePermission';
import { PAGECOUNT } from '../../utils/globalConstants';
import { showDialog } from '../../stores/slices/dialogSlice';
import { COMMON_WORDS } from '../../utils/constants';
import Content from '../../components/CustomDialogContent';
import Action from './Action';

const Lob = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(PAGECOUNT);
  const [order, setOrder] = useState(COMMON_WORDS.DESC);
  const [orderBy, setOrderBy] = useState(COMMON_WORDS.CREATED_AT);

  // Check Permission
  const { canCreate, canUpdate } = usePermissions();

  const handleStatusUpdate = useCallback(
    (data, row) => {
      dispatch(
        showDialog({
          title: COMMON_WORDS.CHANGE_STATUS,
          content: <Content label={COMMON_WORDS.ALIAS_USER} />,
          actions: <Action />,
        })
      );
    },
    [dispatch]
  );
  const header = useMemo(() => Header(handleStatusUpdate), [handleStatusUpdate]);

  return (
    <Box>
      <div className="flex justify-end">{canCreate && <CustomButton variant="contained">Create</CustomButton>}</div>
      <div className="mt-4">
        <CustomTable
          rows={[]}
          columns={header}
          loading={false}
          totalCount={0}
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
