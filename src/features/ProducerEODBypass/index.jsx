import React, { useEffect, useState } from 'react';
import useGetEODBypass from './hooks/useGetEODBypass';
import { BUTTON_TEXT } from '../../utils/globalConstants';
import { useDispatch, useSelector } from 'react-redux';
import { setTableName } from '../../stores/slices/exportSlice';
import { getPlaceHolder } from '../../utils/globalizationFunction';
import { COMMON_WORDS } from '../../utils/constants';
import SearchComponenet from '../../components/SearchComponent';
import { fetchUser } from '../../stores/slices/userSlice';
import CustomTable from '../../components/CustomTable';
import generateTableHeaders from './utils/generateTableHeaders';
import { useNavigate } from 'react-router-dom';
import usePermissions from '../../hooks/usePermission';
import { SearchKey, showTextField } from './utils/constants';

function ProducerEODBypass() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [order, setOrder] = useState(COMMON_WORDS.ASC);
  const [orderBy, setOrderBy] = useState(COMMON_WORDS.CREATED_AT);
  const [searched, setSearched] = useState('producerName');

  const { data, loading, fetchData, count } = useGetEODBypass(page, pageSize, order, orderBy);
  const { canCreate, canUpdate } = usePermissions();

  useEffect(() => {
    dispatch(
      fetchUser({
        userType: COMMON_WORDS.PRODUCER,
        searchKey: COMMON_WORDS.ROLE_NAME,
      })
    );
  }, [dispatch]);

  useEffect(() => {
    dispatch(setTableName(data?.label));
  }, [dispatch, data]);

  const optionLabelUser = (option) => {
    return option?.firstName ? `${option?.firstName?.toUpperCase()} ${option?.lastName?.toUpperCase()}` : '';
  };

  const renderOptionUserFunction = (props, option) => (
    <li {...props} key={option?.id}>
      {option?.firstName?.toUpperCase()} {''}
      {option?.lastName?.toUpperCase()}
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
    const { search = '' } = data;
    const date = {
      startDate: data.startDate,
      endDate: data.endDate,
    };
    const resultUserString = fetchIdsAndConvert(data.producer);
    fetchData(resultUserString, date, search, searched);
  };

  return (
    <div>
      <SearchComponenet
        dateField
        optionsData={user?.data || []}
        optionLabel={optionLabelUser}
        placeholder={getPlaceHolder(COMMON_WORDS.USER)}
        renderOptionFunction={renderOptionUserFunction}
        onSubmit={onSubmit}
        showButton={true}
        buttonText={BUTTON_TEXT.PRODUCER_EOD}
        navigateRoute="/producer-eod-bypass-list/form"
        showExportButton
        canCreate={canCreate}
        selectOptions={SearchKey}
        searched={searched}
        setSearched={setSearched}
        textField={showTextField.includes(searched)}
        textFieldPlaceholder={COMMON_WORDS.SEARCH}
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
    </div>
  );
}

export default ProducerEODBypass;
