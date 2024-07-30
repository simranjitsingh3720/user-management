import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useGetEmployeeFlag from './hooks/useGetEmployeeFlag';
import CustomTable from '../../components/CustomTable';
import CustomDialog from '../../components/CustomDialog';
import SearchComponent from '../../components/SearchComponent';
import { generateTableHeaders } from './utils/generateTableHeaders';
import { COMMON_WORDS } from '../../utils/constants';
import { getPlaceHolder } from '../../utils/globalizationFunction';
import { fetchUser } from '../../stores/slices/userSlice';
import { showDialog } from '../../stores/slices/dialogSlice';
import { setExtraColumns, setTableName } from '../../stores/slices/exportSlice';
import { BUTTON_TEXT, PAGECOUNT } from '../../utils/globalConstants';
import usePermissions from '../../hooks/usePermission';
import { EXPORT_DROPDOWN_COLUMNS } from './utils/constant';
import Content from './Dialog/Content';
import Actions from './Dialog/Action';

function EmployeeFlagConfig() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { canCreate } = usePermissions();

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(PAGECOUNT);
  const [order, setOrder] = useState(COMMON_WORDS.ASC);
  const [orderBy, setOrderBy] = useState(COMMON_WORDS.CREATED_AT);
  const [tableData, setTableData] = useState([]);
  const [resultProducersId, setResultProducersId] = useState('');

  const { employeeFlagList, loading, getEmployeeFlagList } = useGetEmployeeFlag();

  const getEmployeeFlagData = useCallback(()=> {
    getEmployeeFlagList({
      page,
      pageSize,
      order,
      orderBy,
      resultProducersId
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize, order, orderBy, resultProducersId]);

  useEffect(() => {
    getEmployeeFlagData();
  }, [getEmployeeFlagData]);

  useEffect(() => {
    dispatch(fetchUser({ userType: COMMON_WORDS.PRODUCER, searchKey: COMMON_WORDS.ROLE_NAME, isAll: true }));
  }, [dispatch]);

  useEffect(() => {
    if (employeeFlagList?.data) {
      const refactorData = employeeFlagList.data.map((item) => {
        const {
          employeeFlagConfig: { id, label, createdAt, updatedAt },
          producer,
          products,
        } = item;

        return {
          id: id,
          label: label,
          producerCode: producer?.[0]?.producerCode,
          producerName: `${producer?.[0]?.firstName} ${producer?.[0]?.lastName}`,
          productDetails: products,
          createdAt: createdAt,
          updatedAt: updatedAt,
        };
      });
      setTableData(refactorData);
      dispatch(setTableName(refactorData[0]?.label));
      dispatch(setExtraColumns(EXPORT_DROPDOWN_COLUMNS));
    }
  }, [employeeFlagList, dispatch]);

  const handleClicked = useCallback(
    (row) => {
      dispatch(
        showDialog({
          title: COMMON_WORDS.PRODUCT_DETAILS,
          content: <Content row={row} />,
          actions: <Actions row={row} fetchData={getEmployeeFlagList} />,
        })
      );
    },
    [dispatch, getEmployeeFlagList]
  );

  const HEADER_COLUMNS = useMemo(() => generateTableHeaders(handleClicked), [handleClicked]);

  const onSubmit =(data) => {
    debugger
    setPage(0);
    let ids = data?.autocomplete?.map((item) => item.id).join(',');
    setResultProducersId(ids || '');
  };

  return (
    <div>
      <div className="mb-4">
        <SearchComponent
          optionsData={user?.data || []}
          optionLabel={(option) =>
            option?.firstName ? `${option.firstName.toUpperCase()} ${option.lastName.toUpperCase()}` : ''
          }
          placeholder={getPlaceHolder(COMMON_WORDS.PRODUCER)}
          renderOptionFunction={(props, option) => (
            <li {...props} key={option?.id}>
              {option?.firstName?.toUpperCase()} {option?.lastName?.toUpperCase()}
            </li>
          )}
          onSubmit={onSubmit}
          showExportButton
          buttonText={BUTTON_TEXT.EMPLOYEE_FLAG_CONFIG}
          navigateRoute="/employee-flag-config/form"
          showButton
          canCreate={canCreate}
          fetchData={onSubmit}
        />
      </div>
      <CustomTable
        columns={HEADER_COLUMNS}
        rows={tableData}
        loading={loading}
        totalCount={employeeFlagList?.totalCount || 0}
        page={page}
        setPage={setPage}
        rowsPerPage={pageSize}
        setRowsPerPage={setPageSize}
        order={order}
        setOrder={setOrder}
        orderBy={orderBy}
        setOrderBy={setOrderBy}
      />
      <CustomDialog size="md" />
    </div>
  );
}

export default EmployeeFlagConfig;
