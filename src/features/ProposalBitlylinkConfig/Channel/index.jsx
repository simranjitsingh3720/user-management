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
import ProductListContent from '../Dialog/ProductListContent';
import ProductListAction from '../Dialog/ProductListAction';

function Channel() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(PAGECOUNT);
  const [order, setOrder] = useState(COMMON_WORDS.ASC);
  const [orderBy, setOrderBy] = useState(COMMON_WORDS.CREATED_AT);

  const { data, loading, fetchData, count } = useGetBitlyLink(page, pageSize, order, orderBy);

  useEffect(() => {
    dispatch(setTableName(''));
  }, [])

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
    dispatch(
      showDialog({
        title: COMMON_WORDS.BITLY_LINK,
        content: <ProductListContent row={row} />,
        actions: <ProductListAction />,
      })
    );
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
        navigateRoute={'/proposal-bitly-config/channel-form'}
        showButton
        showBulkUploadButton
        canCreate={canCreate}
        hideSearch={true}
        showExportButton={true}
        tableHeader={HEADER_COLUMNS}
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
