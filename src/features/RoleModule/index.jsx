import React, { useEffect, useState } from 'react';

import SearchComponenet from './SearchComponent';
import Table from './Table';
import styles from './styles.module.scss';
import { MenuItem, Pagination, Select } from '@mui/material';
import TableHeader from './Table/TableHeader';
import NoDataFound from '../../components/NoDataCard';
import ListLoader from '../../components/ListLoader';
import useGetRole from './hooks/useGetRole';
import { PAGECOUNT, selectRowsData } from '../../utils/globalConstants';
import usePermissions from '../../hooks/usePermission';

function getSelectedRowData(count) {
  let selectedRowData = [];

  for (let i = 0; i < selectRowsData.length; i++) {
    if (selectRowsData[i] <= count) {
      selectedRowData.push(selectRowsData[i]);
    }
  }

  return selectedRowData;
}

function RoleModule() {
  const [rowsPage, setRowsPage] = useState(PAGECOUNT);
  const [searched, setSearched] = useState('roleName');
  const [query, setQuery] = useState('');
  const [pageChange, setPageChange] = useState(1);
  const [value, setValue] = useState([]);

  const { canCreate, canUpdate } = usePermissions();

  const { data, loading, fetchData, setLoading, setSort, sort } = useGetRole(pageChange, rowsPage);

  const handlePaginationChange = (event, page) => {
    setLoading(true);
    setPageChange(page);
  };

  useEffect(() => {
    if (query) setQuery('');
    else setValue([]);
  }, [searched]);

  const handleRowsChange = (event) => {
    setPageChange(1);
    setRowsPage(event.target.value);
  };

  return (
    <div>
      <SearchComponenet
        searched={searched}
        setSearched={setSearched}
        query={query}
        setQuery={setQuery}
        fetchData={fetchData}
        value={value}
        setValue={setValue}
        setLoading={setLoading}
        canCreate={canCreate}
      />
      <div className={styles.tableContainerStyle}>
        <div className={styles.tableStyled}>
          {loading ? (
            <>
              <TableHeader />
              <ListLoader />
            </>
          ) : data?.data && data?.data.length ? (
            <>
              <Table
                ListData={data?.data}
                loading={loading}
                fetchData={fetchData}
                setLoading={setLoading}
                sort={sort}
                setSort={setSort}
                canUpdate={canUpdate}
              />
            </>
          ) : (
            <NoDataFound />
          )}
        </div>
        <div className={styles.pageFooter}>
          <div className={styles.rowsPerPage}>
            <p className={styles.totalRecordStyle}>Showing Results:</p>
            <Select
              labelId="rows-per-page"
              id="rows-per-page"
              value={rowsPage}
              onChange={handleRowsChange}
              size="small"
              className={styles.customizeRowsSelect}
            >
              {getSelectedRowData(data?.totalCount).map((item) => (
                <MenuItem value={item} className={styles.styledOptionText}>
                  {item}
                </MenuItem>
              ))}
            </Select>
            <p className={styles.totalRecordStyle}>of {data?.totalCount}</p>
          </div>
          <Pagination
            count={data?.totalPageSize}
            color="primary"
            size="small"
            onChange={handlePaginationChange}
            page={pageChange}
            className={styles.marginFotter}
          />
        </div>
      </div>
    </div>
  );
}

export default RoleModule;
