import React, { useEffect, useState } from 'react';
import useGetBitlyLink from '../hooks/useGetBitlyLink';
import { BUTTON_TEXT, PAGECOUNT } from '../../../utils/globalConstants';
import { useDispatch } from 'react-redux';
import { removeExtraColumns, setTableName } from '../../../stores/slices/exportSlice';
import usePermissions from '../../../hooks/usePermission';
import SearchComponent from '../../../components/SearchComponent';
import CustomTable from '../../../components/CustomTable';
import { COMMON_WORDS } from '../../../utils/constants';
import { showDialog } from '../../../stores/slices/dialogSlice';
import Content from '../../../components/CustomDialogContent';
import { Header } from '../utils/Header';
import CustomDialog from '../../../components/CustomDialog';
import Actions from '../Action';

function Channel() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(PAGECOUNT);
  const [order, setOrder] = useState(COMMON_WORDS.ASC);
  const [orderBy, setOrderBy] = useState(COMMON_WORDS.CREATED_AT);

  const { data, loading, fetchData, count } = useGetBitlyLink(page, pageSize, order, orderBy);

  const handleStatusUpdate = (data, row) => {
    dispatch(
      showDialog({
        title: COMMON_WORDS.CHANGE_STATUS,
        content: <Content label={COMMON_WORDS.OTP_EXCEPTION} />,
        actions: <Actions row={row} fetchData={fetchData} />,
      })
    );
  };

  const handleClicked = (row) => {
    console.log('row', row);
  };

  const HEADER_COLUMNS = Header(handleClicked, handleStatusUpdate);

  const { canCreate, canUpdate } = usePermissions();

  useEffect(() => {
    dispatch(setTableName(data?.[0]?.label));
    dispatch(removeExtraColumns());
  }, [dispatch, data]);

  return (
    <div>
      <SearchComponent
        buttonText={BUTTON_TEXT.CREATE_CONFIG}
        navigateRoute={'/proposal-bitly-config/channel-form'}
        showButton
        showBulkUploadButton
        canCreate={canCreate}
        hideSearch={true}
        showExportButton={true}
      />
      <div className="mt-4">
        <CustomTable
          columns={HEADER_COLUMNS}
          rows={data}
          loading={loading}
          totalCount={count}
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
    </div>
  );
}

export default Channel;
