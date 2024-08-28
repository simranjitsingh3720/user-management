import React, { useCallback, useEffect, useState } from 'react';
import SearchComponent from '../../../components/SearchComponent';
import CustomTable from '../../../components/CustomTable';
import { employeeTableHeaders } from '../utils/tableHeaders';
import useGetEmployeeData from '../hooks/useGetEmployeeData';
import { COMMON_WORDS } from '../../../utils/constants';
import { useNavigate } from 'react-router-dom';
import { EMPLOYEE_SEARCH } from '../utils/constants';
import { PAGECOUNT } from '../../../utils/globalConstants';
import usePermissions from '../../../hooks/usePermission';
import { useDispatch } from 'react-redux';
import { removeExtraColumns } from '../../../stores/slices/exportSlice';

function EmployeeForm() {
  const [searched, setSearched] = useState('employeeId');
  const [searchData, setSearchData] = useState();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(PAGECOUNT);
  const [order, setOrder] = useState(COMMON_WORDS.DESC);
  const [orderBy, setOrderBy] = useState(COMMON_WORDS.CREATED_AT);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { canUpdate } = usePermissions();

  const handleEditClick = (row) => {
    navigate(`/uwlevelmappingemployee/${row.id}`);
  };
  const HEADER_COLUMNS = employeeTableHeaders(handleEditClick);

  const { data, loading, fetchData, count } = useGetEmployeeData();

  const getList = useCallback(() => {
    fetchData({
      page,
      pageSize,
      order,
      orderBy,
      searched,
      searchData,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize, order, orderBy, searchData]);

  useEffect(() => {
    getList();
  }, [getList]);

  useEffect(() => {
    if (data && data?.length > 0) {
      dispatch(removeExtraColumns());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const onSubmit = (data) => {
    setPage(0);
    setSearchData(data?.search);
  };

  return (
    <div>
      <SearchComponent
        selectOptions={EMPLOYEE_SEARCH}
        searched={searched}
        setSearched={setSearched}
        textField
        textFieldPlaceholder="Search"
        onSubmit={onSubmit}
        fetchData={onSubmit}
      />
      <div className="mt-4">
        <CustomTable
          columns={HEADER_COLUMNS}
          rows={data || []}
          loading={loading}
          totalCount={count | 0}
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

export default EmployeeForm;
