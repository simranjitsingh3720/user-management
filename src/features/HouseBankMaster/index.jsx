import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomTable from '../../components/CustomTable';
import usePermissions from '../../hooks/usePermission';
import useGetHouseBank from './hooks/useGetHouseBank';
import { Header } from './utils/Header';
import { PAGECOUNT } from '../../utils/globalConstants';

function HouseBankMaster() {
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(PAGECOUNT);
  const [order, setOrder] = useState('');
  const [orderBy, setOrderBy] = useState('');

  const { getHouseBank, houseBankLoading, totalCount, houseBankData } = useGetHouseBank();
  const { canCreate, canUpdate } = usePermissions();

  const handleEditClick = useCallback(
    (item) => {
      navigate(`/house-bank-master/form/${item.id}`);
    },
    [navigate]
  );

  const loadData = useCallback(() => {
    getHouseBank({
      sortKey: orderBy,
      sortOrder: order,
      pageNo: page,
      pageSize,
    });
  }, [orderBy, order, page, pageSize, getHouseBank]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const header = useMemo(() => Header(handleEditClick), [handleEditClick]);

  return (
    <div>
      {/* <SearchComponent
        query={query}
        setQuery={setQuery}
        searched={searched}
        setSearched={setSearched}
        canCreate={canCreate}
      /> */}

        <CustomTable
          rows={houseBankData}
          columns={header}
          loading={houseBankLoading}
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
  );
}

export default HouseBankMaster;
