import React, { useState } from 'react';
import SearchComponent from '../../../components/SearchComponent';
import CustomTable from '../../../components/CustomTable';
import { employeeTableHeaders } from '../utils/tableHeaders';
import useGetEmployeeData from '../hooks/useGetEmployeeData';
import { COMMON_WORDS } from '../../../utils/constants';
import { useNavigate } from 'react-router-dom';
import { EMPLOYEE_SEARCH } from '../utils/constants';

function EmployeeForm() {
  const [searched, setSearched] = useState('employeeId');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [order, setOrder] = useState(COMMON_WORDS.ASC);
  const [orderBy, setOrderBy] = useState(COMMON_WORDS.CREATED_AT);
  const navigate = useNavigate();

  const handleEditClick = (row) => {
    navigate(`/UWLevelMappingEmployee/${row.id}`);
  };
  const HEADER_COLUMNS = employeeTableHeaders(handleEditClick);

  const { data, loading, fetchData, count } = useGetEmployeeData(page, pageSize, order, orderBy);

  const handleGo = () => {
    fetchData(searched, query);
  };

  return (
    <div>
      <SearchComponent
        selectOptions={EMPLOYEE_SEARCH}
        searched={searched}
        setSearched={setSearched}
        textField
        textFieldPlaceholder="Search"
        setQuery={setQuery}
        handleGo={handleGo}
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
        />
      </div>
    </div>
  );
}

export default EmployeeForm;
