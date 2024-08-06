import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ASC, CREATED_AT, PAGECOUNT } from '../../utils/globalConstants';
import useGetProposalOTPList from './hooks/useGetProposalOTPList';
import usePermissions from '../../hooks/usePermission';
import { Header } from './utils/Header';
import CustomTable from '../../components/CustomTable';
import { ProposalOTPSearch } from './utils/constants';
import { COMMON_WORDS } from '../../utils/constants';
import SearchComponent from '../../components/SearchComponent';
import { useNavigate } from 'react-router-dom';
import { showDialog } from '../../stores/slices/dialogSlice';
import Content from '../../components/CustomDialogContent';
import Action from './Action';
import { useDispatch, useSelector } from 'react-redux';
import { removeExtraColumns, setTableName } from '../../stores/slices/exportSlice';
import { getPlaceHolder } from '../../utils/globalizationFunction';
import { fetchUser } from '../../stores/slices/userSlice';
import { getChannels } from '../../Redux/getChannel';

function ProposalOTPException() {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(PAGECOUNT);
  const [order, setOrder] = useState(ASC);
  const [orderBy, setOrderBy] = useState(CREATED_AT);
  const [searched, setSearched] = useState('channel');
  const { canCreate, canUpdate } = usePermissions();
  const [resultId, setResultId] = useState('');
  const [date, setDate] = useState({});
  const { user } = useSelector((state) => state.user);
  const channelType = useSelector((state) => state.channelType.channelType);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data, loading, totalPage, fetchProposalOtp, setData } = useGetProposalOTPList();

  useEffect(() => {
    dispatch(removeExtraColumns());
    dispatch(setTableName(''));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEditClick = useCallback(
    (row) => {
      navigate(`/proposalotpexception/form/${row.id}`);
    },
    [navigate]
  );

  const getList = useCallback(() => {
    fetchProposalOtp({
      page,
      pageSize,
      order,
      orderBy,
      date,
      searched,
      resultId,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize, order, orderBy, resultId, date]);

  useEffect(() => {
    getList();
  }, [getList]);

  const updateStatus = useCallback(
    (id, data) => {
      const updatedData = data.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            checked: !item.checked,
            status: !item.status,
          };
        }
        return item;
      });

      setData(updatedData);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleStatusUpdate = useCallback(
    (data, row) => {
      dispatch(
        showDialog({
          title: COMMON_WORDS.CHANGE_STATUS,
          content: <Content label={COMMON_WORDS.PROPOSAL_OTP_EXCEPTION} />,
          actions: <Action row={row} data={data} updateStatus={updateStatus} />,
        })
      );
    },
    [dispatch, updateStatus]
  );

  const header = useMemo(() => Header(handleEditClick, handleStatusUpdate), [handleEditClick, handleStatusUpdate]);

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

    setDate(
      {
        startDate: data?.startDate || '',
        endDate: data?.endDate || '',
      } || {}
    );
  };

  useEffect(() => {
    dispatch(fetchUser({ userType: COMMON_WORDS.EXTERNAL, searchKey: COMMON_WORDS.USER_TYPE, isAll: true }));
    dispatch(getChannels());
  }, [dispatch]);

  return (
    <>
      <div className="mb-4">
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
          dateField
          showButton={true}
          navigateRoute="/proposalotpexception/form"
          showExportButton
          canCreate={canCreate}
          selectOptions={ProposalOTPSearch}
          searched={searched}
          setSearched={setSearched}
          onSubmit={onSubmit}
          showBulkUploadButton={true}
          tableHeader={header}
        />
      </div>
      <CustomTable
        rows={data || []}
        loading={loading}
        totalCount={totalPage}
        canUpdate={canUpdate}
        columns={header}
        page={page}
        setPage={setPage}
        rowsPerPage={pageSize}
        setRowsPerPage={setPageSize}
        order={order}
        setOrder={setOrder}
        orderBy={orderBy}
        setOrderBy={setOrderBy}
      />
    </>
  );
}

export default ProposalOTPException;
