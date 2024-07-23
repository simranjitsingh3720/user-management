import React, { useState } from 'react';
import SearchComponent from '../../../components/SearchComponent';
import CustomTable from '../../../components/CustomTable';
import { employeeTableHeaders } from '../utils/tableHeaders';
import useGetEmployeeData from '../hooks/useGetEmployeeData';
import { COMMON_WORDS } from '../../../utils/constants';
import { useNavigate } from 'react-router-dom';
import { EMPLOYEE_SEARCH } from '../utils/constants';
import { PAGECOUNT } from '../../../utils/globalConstants';
import usePermissions from '../../../hooks/usePermission';

function EmployeeForm() {
  const [searched, setSearched] = useState('employeeId');

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(PAGECOUNT);
  const [order, setOrder] = useState(COMMON_WORDS.ASC);
  const [orderBy, setOrderBy] = useState(COMMON_WORDS.CREATED_AT);
  const navigate = useNavigate();

  const { canUpdate } = usePermissions();

  const handleEditClick = (row) => {
    navigate(`/uwlevelmappingemployee/${row.id}`);
  };
  const HEADER_COLUMNS = employeeTableHeaders(handleEditClick);

  const { data, loading, fetchData, count } = useGetEmployeeData(page, pageSize, order, orderBy);

  const onSubmit = (data) => {
    fetchData(searched, data.search);
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
        fetchData={fetchData}
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
