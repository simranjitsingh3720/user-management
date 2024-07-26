import React, { useEffect, useState } from 'react';
import useGetOTPException from './hooks/useGetOTPException';
import { BUTTON_TEXT, PAGECOUNT } from '../../utils/globalConstants';
import SearchComponent from '../../components/SearchComponent';
import { BitlyLink } from './constants';
import usePermissions from '../../hooks/usePermission';
import CustomTable from '../../components/CustomTable';
import generateTableHeaders from './utils/generateTableHeaders';
import CustomDialog from '../../components/CustomDialog';
import { COMMON_WORDS } from '../../utils/constants';
import { useDispatch } from 'react-redux';
import { showDialog } from '../../stores/slices/dialogSlice';
import Content from '../../components/CustomDialogContent';
import Actions from './Dialog/Action';
import { setTableName } from '../../stores/slices/exportSlice';

function OTPException() {
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const [searched, setSearched] = useState('type');
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(PAGECOUNT);
  const [order, setOrder] = useState(COMMON_WORDS.ASC);
  const [orderBy, setOrderBy] = useState(COMMON_WORDS.CREATED_AT);
  const { data, loading, fetchData, count } = useGetOTPException(page, pageSize, order, orderBy);

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

  const handleGo = () => {
    fetchData(searched, query);
  };

  useEffect(() => {
    if (data && data.length > 0) {
      dispatch(setTableName(data[0]?.label));
    }
  }, [data]);

  return (
    <div>
      <SearchComponent
        selectOptions={BitlyLink}
        textField
        searched={searched}
        setSearched={setSearched}
        textFieldPlaceholder="Search"
        setQuery={setQuery}
        buttonText={BUTTON_TEXT.SET_OTP_EXCEPTION}
        navigateRoute={'/otpexception/form'}
        handleGo={handleGo}
        showButton
        canCreate={canCreate}
        showBulkUploadButton={true}
      />
      <div className="mt-4">
        <CustomTable
          columns={HEADER_COLUMNS}
          rows={data || []}
          loading={loading}
          totalCount={count || 0}
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
