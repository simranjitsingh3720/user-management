import React, { useCallback, useEffect, useState } from 'react';
import useGetHealthConfig from './hooks/useGetHealthConfig';
import SearchComponenet from '../../components/SearchComponent';
import CustomTable from '../../components/CustomTable';
import { useNavigate } from 'react-router-dom';
import generateTableHeaders from './utils/generateTableHeaders';
import { COMMON_WORDS } from '../../utils/constants';
import { PAGECOUNT } from '../../utils/globalConstants';
import { getPlaceHolder } from '../../utils/globalizationFunction';
import { fetchUser } from '../../stores/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import usePermissions from '../../hooks/usePermission';
import { setExtraColumns, setTableName } from '../../stores/slices/exportSlice';
import { EXPORT_EXTRA_COLUMNS } from './constants';

function HealthConfiguration() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(PAGECOUNT);
  const [order, setOrder] = useState(COMMON_WORDS.DESC);
  const [orderBy, setOrderBy] = useState(COMMON_WORDS.CREATED_AT);
  const [resultProducersId, setResultProducersId] = useState('');

  const { healthConfigList, loading, getHealthConfigList, totalCount } = useGetHealthConfig();

  const { canUpdate, canCreate } = usePermissions();

  const getHealthConfigData = useCallback(() => {
    getHealthConfigList({
      page,
      pageSize,
      order,
      orderBy,
      resultProducersId,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize, order, orderBy, resultProducersId]);

  useEffect(() => {
    dispatch(setTableName(''));
    dispatch(setExtraColumns([]));
    dispatch(
      fetchUser({
        userType: COMMON_WORDS.EXTERNAL,
        searchKey: COMMON_WORDS.USER_TYPE,
        isAll: true,
        status: true,
      })
    );
  }, [dispatch]);

  useEffect(() => {
    getHealthConfigData();
  }, [getHealthConfigData]);

  const optionLabel = (option) => {
    return `${option?.firstName} ${option?.lastName}`;
  };

  const renderOptionFunction = (props, option) => (
    <li {...props} key={option?.id} style={{ textTransform: 'capitalize' }}>
      {option?.firstName} {option?.lastName}
    </li>
  );

  const fetchIdsAndConvert = (inputData) => {
    const ids = (inputData || []).map((producer) => producer.id);
    return ids.join();
  };

  const handleEditClick = (row) => {
    navigate(`/health-config/form/${row.id}`);
  };

  const HEADER_COLUMNS = generateTableHeaders(handleEditClick);

  useEffect(() => {
    if (healthConfigList) {
      dispatch(setTableName(healthConfigList[0]?.label));
      dispatch(setExtraColumns(EXPORT_EXTRA_COLUMNS));
    }
  }, [dispatch, healthConfigList]);

  const onSubmit = (data) => {
    setPage(0);
    if (data?.autocomplete?.length === 0) {
      setResultProducersId('');
      return;
    }

    setResultProducersId(fetchIdsAndConvert(data?.autocomplete));
  };

  return (
    <div>
      <SearchComponenet
        optionsData={user?.data || []}
        fetchData={onSubmit}
        optionLabel={optionLabel}
        placeholder={getPlaceHolder(COMMON_WORDS.PRODUCER)}
        renderOptionFunction={renderOptionFunction}
        navigateRoute={'/health-config/form'}
        onSubmit={onSubmit}
        showButton
        showExportButton={true}
        canCreate={canCreate}
        tableHeader={HEADER_COLUMNS}
      />
      <div className="mt-4">
        <CustomTable
          columns={HEADER_COLUMNS}
          rows={healthConfigList}
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

export default HealthConfiguration;
