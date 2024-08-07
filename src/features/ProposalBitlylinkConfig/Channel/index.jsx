import React, { useCallback, useEffect, useState } from 'react';
import useGetBitlyLink from '../hooks/useGetBitlyLink';
import { PAGECOUNT } from '../../../utils/globalConstants';
import { useDispatch, useSelector } from 'react-redux';
import { removeExtraColumns, setTableName } from '../../../stores/slices/exportSlice';
import usePermissions from '../../../hooks/usePermission';
import SearchComponent from '../../../components/SearchComponent';
import CustomTable from '../../../components/CustomTable';
import { COMMON_WORDS } from '../../../utils/constants';
import { showDialog } from '../../../stores/slices/dialogSlice';
import Content from '../../../components/CustomDialogContent';
import { Header } from '../utils/Header';
import Actions from '../Action';
import ProductListContent from '../Dialog/ProductListContent';
import ProductListAction from '../Dialog/ProductListAction';
import { getPlaceHolder } from '../../../utils/globalizationFunction';
import { fetchUser } from '../../../stores/slices/userSlice';
import { getChannels } from '../../../Redux/getChannel';
import { bitlySearch } from '../utils/constants';

function Channel() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(PAGECOUNT);
  const [order, setOrder] = useState(COMMON_WORDS.ASC);
  const [orderBy, setOrderBy] = useState(COMMON_WORDS.CREATED_AT);
  const [searched, setSearched] = useState('channel');
  const [resultId, setResultId] = useState('');
  const { user } = useSelector((state) => state.user);
  const channelType = useSelector((state) => state.channelType.channelType);

  useEffect(() => {
    dispatch(fetchUser({ userType: COMMON_WORDS.EXTERNAL, searchKey: COMMON_WORDS.USER_TYPE, isAll: true }));
    dispatch(getChannels());
  }, [dispatch]);

  const { data, loading, fetchData, count } = useGetBitlyLink();

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
    getList();
  }, [getList]);

  useEffect(() => {
    dispatch(setTableName(''));
  }, []);

  const handleStatusUpdate = (data, row) => {
    dispatch(
      showDialog({
        title: COMMON_WORDS.CHANGE_STATUS,
        content: <Content label={COMMON_WORDS.BITLY_LINK} />,
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
        searched={searched}
        setSearched={setSearched}
        onSubmit={onSubmit}
        selectOptions={bitlySearch}
        navigateRoute={'/proposal-bitly-config/channel-form'}
        showButton
        showBulkUploadButton
        canCreate={canCreate}
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
    </div>
  );
}

export default Channel;
