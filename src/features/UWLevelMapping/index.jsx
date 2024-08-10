import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { Box } from '@mui/material';
import CustomTable from '../../components/CustomTable';
import { tableHeaders } from './utils/tableHeaders';
import useGetProductLocationLevel from './hooks/useGetProductLocationLevel';
import { CHANGE_STATUS_LABEL, COMMON_WORDS } from '../../utils/constants';
import { useDispatch } from 'react-redux';
import { showDialog } from '../../stores/slices/dialogSlice';
import Actions from './Dialog/Action';
import Content from '../../components/CustomDialogContent';
import usePermissions from '../../hooks/usePermission';
import LevelMappingForm from './LevelMappingForm';
import { useNavigate, useParams } from 'react-router-dom';
import { PAGECOUNT } from '../../utils/globalConstants';
import useCreateProductLevel from './hooks/useCreateProductLevel';
import CustomButton from '../../components/CustomButton';
import BulkUpload from '../../assets/BulkUpload';
import { removeExtraColumns, setTableName } from '../../stores/slices/exportSlice';

function UWLevelMapping() {
  const dispatch = useDispatch();
  const params = useParams();
  const { employeeId } = params;

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(PAGECOUNT);
  const [order, setOrder] = useState(COMMON_WORDS.DESC);
  const [orderBy, setOrderBy] = useState(COMMON_WORDS.CREATED_AT);
  const { canCreate, canUpdate } = usePermissions();
  const { fetchDataById, data: dataById } = useCreateProductLevel();
  const navigate = useNavigate();

  const handleEditClick = (row) => {
    fetchDataById(row?.id);
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

  const handleBulkUpload = () => {
    navigate('bulk-upload');
  };

  useEffect(()=> {
    if(data && data.length > 0){
      dispatch(removeExtraColumns());
     dispatch(setTableName(data[0]?.label));
    }
  }, [data]);

  return (
    <Box>
      {canCreate && <LevelMappingForm dataById={dataById} fetchData={fetchData} />}
      <Grid item xs={12} sm={6} lg={4} alignItems="flex-end" display="flex" justifyContent="end">
        {<CustomButton variant="outlined" onClick={handleBulkUpload} startIcon={<BulkUpload />} />}
      </Grid>
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
    </Box>
  );
}

export default UWLevelMapping;
