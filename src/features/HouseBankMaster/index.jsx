import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomTable from '../../components/CustomTable';
import usePermissions from '../../hooks/usePermission';
import useGetHouseBank from './hooks/useGetHouseBank';
import { Header } from './utils/Header';
import { BUTTON_TEXT, PAGECOUNT } from '../../utils/globalConstants';
import SearchComponent from '../../components/SearchComponent';
import { SearchKey } from './utils/constants';
import { COMMON } from '../UserManagement/Components/utils/constants';

function HouseBankMaster() {
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(PAGECOUNT);
  const [order, setOrder] = useState('');
  const [orderBy, setOrderBy] = useState('');

  const [searched, setSearched] = useState(SearchKey[0].value);
  const [query, setQuery] = useState('');

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
      searchKey: query ? searched : '',
      searchString: query,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderBy, order, page, pageSize, query]);

  const handleGo = (data) => {
    setPage(0);
    setQuery(data?.search || '');
  };

  useEffect(() => {
    loadData();
  }, [loadData]);

  const header = useMemo(() => Header(handleEditClick), [handleEditClick]);

  return (
    <>
      <div className="mb-4">
        <SearchComponent
          selectOptions={SearchKey}
          searched={searched}
          setSearched={setSearched}
          textField
          textFieldPlaceholder={COMMON.SEARCH_PLACEHOLDER}
          setQuery={setQuery}
          buttonText={BUTTON_TEXT.HOUSE_BANK}
          navigateRoute="/house-bank-master/form"
          onSubmit={handleGo}
          fetchData={handleGo}
          showExportButton={true}
          showButton
          canCreate={canCreate}
        />
      </div>

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
    </>
  );
}

export default HouseBankMaster;
