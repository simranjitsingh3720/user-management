import React, { useEffect, useState } from 'react';
import useGetEmployeeFlag from './hooks/useGetEmployeeFlag';
import CustomTable from '../../components/CustomTable';
import { generateTableHeaders } from './utils/generateTableHeaders';
import { COMMON_WORDS } from '../../utils/constants';
import CustomDialog from '../../components/CustomDialog';
import SearchComponent from '../../components/SearchComponent';
import { getPlaceHolder } from '../../utils/globalizationFunction';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../../stores/slices/userSlice';
import { showDialog } from '../../stores/slices/dialogSlice';
import Content from './Dialog/Content';
import Actions from './Dialog/Action';
import { setTableName } from '../../stores/slices/exportSlice';
import { BUTTON_TEXT } from '../../utils/globalConstants';

function EmployeeFlagConfig() {
  const [producers, setProducers] = useState();

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [order, setOrder] = useState(COMMON_WORDS.ASC);
  const [orderBy, setOrderBy] = useState(COMMON_WORDS.CREATED_AT);
  const [tableData, setTableData] = useState([]);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchUser({
        userType: COMMON_WORDS.PRODUCER,
        searchKey: COMMON_WORDS.ROLE_NAME,
      })
    );
  }, [dispatch]);

  const { data, loading, fetchData } = useGetEmployeeFlag(page, pageSize, order, orderBy);

  useEffect(() => {
    if (data && data?.data) {
      const refactorData = data?.data.map((item) => ({
        id: item?.employeeFlagConfig?.id,
        label: item?.employeeFlagConfig?.label,
        producerCode: item?.producer[0]?.producerCode,
        producerName: `${item?.producer[0]?.firstName} ${item?.producer[0]?.lastName}`,
        productDetails: item?.products,
        createdAt: item?.employeeFlagConfig?.createdAt,
        updatedAt: item?.employeeFlagConfig?.updatedAt,
      }));
      setTableData(refactorData);
      dispatch(setTableName(refactorData[0]?.label));
    }
  }, [data, dispatch]);

  const fetchIdsAndConvert = (inputData) => {
    const ids = (inputData || []).map((producer) => producer.id);
    return ids.join();
  };

  const handleGo = () => {
    const resultProducersId = fetchIdsAndConvert(producers);
    fetchData(resultProducersId);
  };

  const optionLabelUser = (option) => {
    return option?.firstName ? `${option?.firstName?.toUpperCase()} ${option?.lastName?.toUpperCase()}` : '';
  };

  const renderOptionUserFunction = (props, option) => (
    <li {...props} key={option?.id}>
      {option?.firstName?.toUpperCase()} {''}
      {option?.lastName?.toUpperCase()}
    </li>
  );

  const handleClicked = (row) => {
    dispatch(
      showDialog({
        title: COMMON_WORDS.CHANGE_STATUS,
        content: <Content row={row} />,
        actions: <Actions row={row} fetchData={fetchData} />,
      })
    );
  };

  const HEADER_COLUMNS = generateTableHeaders(handleClicked);

  return (
    <div>
      <div className="mb-4">
        <SearchComponent
          optionsData={user?.data || []}
          option={producers}
          setOption={setProducers}
          optionLabel={optionLabelUser}
          placeholder={getPlaceHolder(COMMON_WORDS.USER)}
          renderOptionFunction={renderOptionUserFunction}
          handleGo={handleGo}
          showExportButton={true}
          buttonText={BUTTON_TEXT.EMPLOYEE_FLAG_CONFIG}
          navigateRoute="/employee-flag-config/form"
          showButton
        />
      </div>
      <CustomTable
        columns={HEADER_COLUMNS}
        rows={tableData || []}
        loading={loading}
        totalCount={data?.totalCount || 0}
        page={page}
        setPage={setPage}
        rowsPerPage={pageSize}
        setRowsPerPage={setPageSize}
        order={order}
        setOrder={setOrder}
        orderBy={orderBy}
        setOrderBy={setOrderBy}
      />
      <CustomDialog />
    </div>
  );
}

export default EmployeeFlagConfig;
