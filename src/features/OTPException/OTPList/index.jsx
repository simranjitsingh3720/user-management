import React from "react";
import styles from "./styles.module.scss";
import TableHeader from "../Table/TableHeader";
import ListLoader from "../../../components/ListLoader";
import Table from "../Table";
import NoDataFound from "../../../components/NoDataCard";
import { MenuItem, Pagination, Select } from "@mui/material";
import { selectRowsData } from "../../../utils/globalConstants";
import SearchComponenet from "../SearchComponent";

function OTPList({
  rowsPage,
  setRowsPage,
  pageChange,
  setPageChange,
  data,
  loading,
  fetchData,
  setLoading,
  setSort,
  sort,
  setQuery,
  searched,
  setSearched,
}) {
  const handlePaginationChange = (event, page) => {
    setPageChange(page);
  };

  const handleRowsChange = (event) => {
    setPageChange(1);
    setRowsPage(event.target.value);
  };

  function getSelectedRowData(count) {
    
    let selectedRowData = [];

    
    for (let i = 0; i < selectRowsData.length; i++) {
      if (selectRowsData[i] <= count) {
        selectedRowData.push(selectRowsData[i]);
      }
    }

    return selectedRowData;
  }

  return (
    <>
      <SearchComponenet
        fetchData={fetchData}
        setPageChange={setPageChange}
        setQuery={setQuery}
        searched={searched}
        setSearched={setSearched}
      />
      <div className={styles.OTPListStyle}>
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
    </>
  );
}

export default OTPList;
