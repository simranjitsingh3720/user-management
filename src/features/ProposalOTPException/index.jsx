import React, { useEffect, useMemo, useState } from 'react';
import SearchComponenet from './SearchComponenet';
import styles from './styles.module.scss';
import TableHeader from './Table/TableHeader';
import ListLoader from '../../components/ListLoader';
import Table from './Table';
import NoDataFound from '../../components/NoDataCard';
import { MenuItem, Pagination, Select } from '@mui/material';
import { PAGECOUNT, selectRowsData } from '../../utils/globalConstants';
import useGetProposalOTPList from './hooks/useGetProposalOTPList';
import { useDispatch } from 'react-redux';
import { setTableName } from '../../stores/slices/exportSlice';
import usePermissions from '../../hooks/usePermission';
import { Header } from './Header';
import CustomTable from '../../components/CustomTable';
import { useNavigate } from 'react-router-dom';

function getSelectedRowData(count) {
  let selectedRowData = [];
  for (let i = 0; i < selectRowsData.length; i++) {
    if (selectRowsData[i] <= count) {
      selectedRowData.push(selectRowsData[i]);
    }
  }

  return selectedRowData;
}

function ProposalOTPException() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(PAGECOUNT);
  const [order, setOrder] = useState();
  const [orderBy, setOrderBy] = useState();
  const [searched, setSearched] = useState();
  const [query, setQuery] = useState('');
  const { canCreate, canUpdate } = usePermissions();

  const [date, setDate] = useState({ startDate: '', endDate: '' });

  const [rowsPage, setRowsPage] = useState(PAGECOUNT);

  const [pageChange, setPageChange] = useState(1);

  const { data, loading, fetchData, setSort, sort, totalPage } = useGetProposalOTPList(
    pageChange,
    rowsPage,
    query,
    searched,
    date,
    setDate
  );

  const handlePaginationChange = (event, page) => {
    setPageChange(page);
  };

  const handleRowsChange = (event) => {
    setPageChange(1);
    setRowsPage(event.target.value);
  };

  // useEffect(() => {
  //   dispatch(setTableName(data?.data[0]?.otpException.label));
  // }, [dispatch, data]);

  const header = useMemo(() => Header(), []);

  return (
    <>
      <SearchComponenet
        fetchData={fetchData}
        setPageChange={setPageChange}
        setQuery={setQuery}
        searched={searched}
        setSearched={setSearched}
        date={date}
        setDate={setDate}
        canCreate={canCreate}
      />

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
