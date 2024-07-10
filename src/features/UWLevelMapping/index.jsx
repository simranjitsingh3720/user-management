import React, { useState } from 'react';

import { Box, IconButton } from '@mui/material';
import CustomTable from '../../components/CustomTable';
import { tableHeaders } from './utils/tableHeaders';
import useGetProductLocationLevel from './hooks/useGetProductLocationLevel';
import { CHANGE_STATUS_LABEL, COMMON_WORDS } from '../../utils/constants';
import SearchComponent from '../../components/SearchComponent';
import { BUTTON_TEXT } from '../../utils/globalConstants';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showDialog } from '../../stores/slices/dialogSlice';
import Actions from './Dialog/Action';
import CustomDialog from '../../components/CustomDialog';
import LeftArrow from '../../assets/LeftArrow';
import Content from '../../components/CustomDialogContent';

function UWLevelMapping() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const { employeeId } = params;

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [order, setOrder] = useState(COMMON_WORDS.ASC);
  const [orderBy, setOrderBy] = useState(COMMON_WORDS.CREATED_AT);
  const handleEditClick = (row) => {
    navigate(`form/${row.id}`);
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
      <IconButton
        aria-label="back"
        onClick={() => {
          navigate('/UWLevelMappingEmployee');
        }}
      >
        <LeftArrow />
      </IconButton>
      <span>Go Back</span>
      <SearchComponent showButton hideSearch buttonText={BUTTON_TEXT.PRODUCT_LOCATION_LEVEL} navigateRoute={'form'} />
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
        />
      </div>
      <CustomDialog />
    </Box>
  );
}

export default UWLevelMapping;
