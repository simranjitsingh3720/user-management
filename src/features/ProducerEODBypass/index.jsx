import React, { useCallback, useEffect, useState } from 'react';
import useGetEODBypass from './hooks/useGetEODBypass';
import { BUTTON_TEXT, PAGECOUNT } from '../../utils/globalConstants';
import { useDispatch, useSelector } from 'react-redux';
import { setExtraColumns, setTableName } from '../../stores/slices/exportSlice';
import { getPlaceHolder } from '../../utils/globalizationFunction';
import { COMMON_WORDS } from '../../utils/constants';
import SearchComponenet from '../../components/SearchComponent';
import { fetchUser } from '../../stores/slices/userSlice';
import CustomTable from '../../components/CustomTable';
import generateTableHeaders from './utils/generateTableHeaders';
import { useNavigate } from 'react-router-dom';
import usePermissions from '../../hooks/usePermission';
import { EXPORT_EXTRA_COLUMNS, SearchKey, showTextField } from './utils/constants';

function ProducerEODBypass() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(PAGECOUNT);
  const [order, setOrder] = useState(COMMON_WORDS.ASC);
  const [orderBy, setOrderBy] = useState(COMMON_WORDS.CREATED_AT);
  const [searched, setSearched] = useState('producerName');
  const [resultProducersId, setResultProducersId] = useState('');
  const [query, setQuery] = useState('');
  const [date, setDate] = useState({});

  const { eodByPassList, loading, getEodByPassList, totalCount } = useGetEODBypass();
  const { canCreate, canUpdate } = usePermissions();

  const fetchData = useCallback(() => {
    getEodByPassList({
      page,
      pageSize,
      order,
      orderBy,
      resultProducersId,
      date,
      query,
      searched,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize, order, orderBy, resultProducersId, date, query]);

  useEffect(() => {
    dispatch(setTableName(''));
    dispatch(setExtraColumns([]));
    dispatch(
      fetchUser({
        userType: COMMON_WORDS.PRODUCER,
        searchKey: COMMON_WORDS.ROLE_NAME,
        isAll: true,
      })
    );
  }, [dispatch]);

  useEffect(() => {
    dispatch(setTableName(eodByPassList?.[0]?.label));
    dispatch(setExtraColumns(EXPORT_EXTRA_COLUMNS));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eodByPassList]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const optionLabelUser = (option) => {
    return `${option?.firstName} ${option?.lastName}` || '';
  };

  const renderOptionUserFunction = (props, option) => (
    <li {...props} key={option?.id}>
      {option?.firstName} {option?.lastName}
    </li>
  );
  const fetchIdsAndConvert = (inputData) => {
    const ids = (inputData || []).map((item) => item.id);
    return ids.join();
  };

  const handleEditClick = (row) => {
    navigate(`/producer-eod-bypass-list/form/${row?.id}`);
  };

  const HEADER_COLUMNS = generateTableHeaders(handleEditClick);

  const onSubmit = (data) => {
    setPage(0)
    if(searched === 'producerName') {
      const resultUserString = fetchIdsAndConvert(data?.autocomplete || []);
      setResultProducersId(resultUserString || '');
    } 

    if(searched === 'reason') {
      setQuery(data?.search || '');
    }

    setDate({
      startDate: data?.startDate || '',
      endDate: data?.endDate || '',
    } || {});
  };

  return (
    <div>
      <SearchComponenet
        dateField
        optionsData={user?.data || []}
        optionLabel={optionLabelUser}
        placeholder={getPlaceHolder(COMMON_WORDS.PRODUCER)}
        renderOptionFunction={renderOptionUserFunction}
        onSubmit={onSubmit}
        showButton={true}
        navigateRoute="/producer-eod-bypass-list/form"
        showExportButton
        canCreate={canCreate}
        selectOptions={SearchKey}
        searched={searched}
        setSearched={setSearched}
        textField={showTextField.includes(searched)}
        textFieldPlaceholder={COMMON_WORDS.SEARCH}
        fetchData={onSubmit}
        tableHeader={HEADER_COLUMNS}
      />
      <div className="mt-4">
        <CustomTable
          columns={HEADER_COLUMNS}
          rows={eodByPassList}
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

export default ProducerEODBypass;
