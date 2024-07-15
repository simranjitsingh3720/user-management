import React, { useState } from 'react';

import { Box} from '@mui/material';
import CustomTable from '../../components/CustomTable';
import { tableHeaders } from './utils/tableHeaders';
import useGetProductLocationLevel from './hooks/useGetProductLocationLevel';
import { CHANGE_STATUS_LABEL, COMMON_WORDS } from '../../utils/constants';
import { useDispatch } from 'react-redux';
import { showDialog } from '../../stores/slices/dialogSlice';
import Actions from './Dialog/Action';
import CustomDialog from '../../components/CustomDialog';
import Content from '../../components/CustomDialogContent';
import usePermissions from '../../hooks/usePermission';
import LevelMappingForm from './LevelMappingForm';
import { useParams } from 'react-router-dom';
import { PAGECOUNT } from '../../utils/globalConstants';

function UWLevelMapping() {
  const dispatch = useDispatch();
  const params = useParams();
  const { employeeId } = params;

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(PAGECOUNT);
  const [order, setOrder] = useState(COMMON_WORDS.ASC);
  const [orderBy, setOrderBy] = useState(COMMON_WORDS.CREATED_AT);

  const { canCreate, canUpdate } = usePermissions();

  const handleEditClick = (row) => {
    
  };

  const handleStatusClicked = (data, row) => {
    dispatch(
      showDialog({
        title: COMMON_WORDS.CHANGE_STATUS,
        content: <Content label={CHANGE_STATUS_LABEL.UNDERWRITER_LEVEL} />,
        actions: <Actions row={row} fetchData={fetchData} />,
      })
    );
  };
  const HEADER_COLUMNS = tableHeaders(handleEditClick, handleStatusClicked);

  const { data, loading, fetchData, count } = useGetProductLocationLevel(page, pageSize, order, orderBy, employeeId);

  return (
    <Box>
      {canCreate && (<LevelMappingForm />)}
      
      <div className="mt-4">
        <CustomTable
          columns={HEADER_COLUMNS}
          rows={data || []}
          loading={loading}
          totalCount={count | 0}
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
      <CustomDialog />
    </Box>
  );
}

export default UWLevelMapping;
