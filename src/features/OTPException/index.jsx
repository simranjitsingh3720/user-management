import React, { useCallback, useEffect, useState } from 'react';
import useGetOTPException from './hooks/useGetOTPException';
import { BUTTON_TEXT, PAGECOUNT } from '../../utils/globalConstants';
import SearchComponent from '../../components/SearchComponent';
import usePermissions from '../../hooks/usePermission';
import CustomTable from '../../components/CustomTable';
import generateTableHeaders from './utils/generateTableHeaders';
import CustomDialog from '../../components/CustomDialog';
import { COMMON_WORDS } from '../../utils/constants';
import { useDispatch } from 'react-redux';
import { showDialog } from '../../stores/slices/dialogSlice';
import Content from '../../components/CustomDialogContent';
import Actions from './Dialog/Action';
import { removeExtraColumns, setTableName } from '../../stores/slices/exportSlice';

function OTPException() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(PAGECOUNT);
  const [order, setOrder] = useState(COMMON_WORDS.ASC);
  const [orderBy, setOrderBy] = useState(COMMON_WORDS.CREATED_AT);
  const { otpExceptionList, loading, fetchData, totalCount } = useGetOTPException();

  const handleClicked = (data, row) => {
    dispatch(
      showDialog({
        title: COMMON_WORDS.CHANGE_STATUS,
        content: <Content label={COMMON_WORDS.OTP_EXCEPTION} />,
        actions: <Actions row={row} fetchData={fetchData} />,
      })
    );
  };

  const HEADER_COLUMNS = generateTableHeaders(handleClicked);

  const { canCreate, canUpdate } = usePermissions();

  useEffect(() => {
    if (otpExceptionList?.length === 0) return;
    
    dispatch(setTableName(otpExceptionList?.[0]?.label));

  }, [otpExceptionList, dispatch]);

  const getList = useCallback(() => {
    fetchData({
      page,
      pageSize,
      order,
      orderBy,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize, order, orderBy]);

  useEffect(() => {
    dispatch(setTableName);
    dispatch(removeExtraColumns());
    getList();
  }, [getList]);

  return (
    <div>
      <SearchComponent
        buttonText={BUTTON_TEXT.SET_OTP_EXCEPTION}
        navigateRoute={'/otpexception/form'}
        showButton
        canCreate={canCreate}
        hideSearch={true}
        tableHeader={HEADER_COLUMNS}
      />
      <div className="mt-4">
        <CustomTable
          columns={HEADER_COLUMNS}
          rows={otpExceptionList}
          loading={loading}
          totalCount={totalCount}
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

export default OTPException;
