import React, { useEffect, useMemo, useState } from 'react';
import SearchComponenet from './SearchComponenet';
import { ASC, CREATED_AT, PAGECOUNT } from '../../utils/globalConstants';
import useGetProposalOTPList from './hooks/useGetProposalOTPList';
import usePermissions from '../../hooks/usePermission';
import { Header } from './Header';
import CustomTable from '../../components/CustomTable';
import { get } from 'react-hook-form';

function ProposalOTPException() {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(PAGECOUNT);
  const [order, setOrder] = useState(ASC);
  const [orderBy, setOrderBy] = useState(CREATED_AT);
  const [searched, setSearched] = useState();
  const [query, setQuery] = useState('');
  const { canCreate, canUpdate } = usePermissions();

  // const [date, setDate] = useState({ startDate: '', endDate: '' });
  // const [pageChange, setPageChange] = useState(1);

  const { data, loading, fetchData, totalPage } = useGetProposalOTPList(
    page, pageSize, order, orderBy, query, searched
  );

  const header = useMemo(() => Header(), []);

  return (
    <>
      {/* <SearchComponenet
        fetchData={fetchData}
        setPageChange={setPageChange}
        setQuery={setQuery}
        searched={searched}
        setSearched={setSearched}
        date={date}
        setDate={setDate}
        canCreate={canCreate}
      /> */}

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
