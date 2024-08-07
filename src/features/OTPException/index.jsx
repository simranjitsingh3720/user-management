import React, { useCallback, useEffect, useState } from 'react';
import useGetOTPException from './hooks/useGetOTPException';
import { PAGECOUNT } from '../../utils/globalConstants';
import SearchComponent from '../../components/SearchComponent';
import usePermissions from '../../hooks/usePermission';
import CustomTable from '../../components/CustomTable';
import generateTableHeaders from './utils/generateTableHeaders';
import { COMMON_WORDS } from '../../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { showDialog } from '../../stores/slices/dialogSlice';
import Content from '../../components/CustomDialogContent';
import Actions from './Dialog/Action';
import { removeExtraColumns, setTableName } from '../../stores/slices/exportSlice';
import { searchOption } from './utils/constants';
import { fetchUser } from '../../stores/slices/userSlice';
import { getChannels } from '../../Redux/getChannel';
import { getPlaceHolder } from '../../utils/globalizationFunction';

function OTPException() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(PAGECOUNT);
  const [order, setOrder] = useState(COMMON_WORDS.ASC);
  const [orderBy, setOrderBy] = useState(COMMON_WORDS.CREATED_AT);
  const [searched, setSearched] = useState('channel');
  const [resultId, setResultId] = useState('');

  const { user } = useSelector((state) => state.user);
  const channelType = useSelector((state) => state.channelType.channelType);

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
      searched,
      resultId,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize, order, orderBy, resultId]);

  useEffect(() => {
    dispatch(setTableName);
    dispatch(removeExtraColumns());
    getList();
  }, [getList]);

  useEffect(() => {
    dispatch(fetchUser({ userType: COMMON_WORDS.EXTERNAL, searchKey: COMMON_WORDS.USER_TYPE, isAll: true }));
    dispatch(getChannels());
  }, [dispatch]);

  const optionLabelProducer = (option) => {
    return `${option.firstName || ''} ${option.lastName || ''}`;
  };

  const renderOptionProducerFunction = (props, option) => (
    <li {...props} key={option?.id}>
      {option?.firstName} {option?.lastName}
    </li>
  );

  const optionLabelChannel = (option) => {
    return `${option?.label || ''} - ${option?.numChannelCode || ''}`;
  };

  const renderOptionChannelFunction = (props, option) => (
    <li {...props} key={option?.id}>
      {`${option?.label || ''} - ${option?.numChannelCode || ''}`}
    </li>
  );

  const onSubmit = (data) => {
    setPage(0);
    let ids = data?.autocomplete?.map((item) => item.id).join(',');
    setResultId(ids || '');
  };

  return (
    <div>
      <SearchComponent
        searched={searched}
        setSearched={setSearched}
        optionsData={searched === COMMON_WORDS.PRODUCER ? user?.data ?? [] : channelType ?? []}
        fetchData={onSubmit}
        optionLabel={searched === COMMON_WORDS.PRODUCER ? optionLabelProducer : optionLabelChannel}
        placeholder={
          searched === COMMON_WORDS.PRODUCER
            ? getPlaceHolder(COMMON_WORDS.PRODUCER)
            : getPlaceHolder(COMMON_WORDS.CHANNEL)
        }
        renderOptionFunction={
          searched === COMMON_WORDS.PRODUCER ? renderOptionProducerFunction : renderOptionChannelFunction
        }
        onSubmit={onSubmit}
        navigateRoute={'/otpexception/form'}
        showButton
        canCreate={canCreate}
        tableHeader={HEADER_COLUMNS}
        selectOptions={searchOption}
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
    </div>
  );
}

export default OTPException;
