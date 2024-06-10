import React, { useState } from "react";
import SearchComponent from "./SearchComponent";
import Table from "./Table";
import { MenuItem, Pagination, Select } from "@mui/material";
import styles from "./styles.module.scss";
import useGetPrivilege from "./hooks/useGetPrivilege";
import ListLoader from "../../components/ListLoader";
import TableHeader from "./Table/TableHeader";
import NoDataFound from "../../components/NoDataCard";
import { selectRowsData } from "../../utils/globalConstants";

function getSelectedRowData(count) {
  // Initialize the selected row data array
  let selectedRowData = [];

  // Iterate over selectRowsData and add elements <= count
  for (let i = 0; i < selectRowsData.length; i++) {
    if (selectRowsData[i] <= count) {
      selectedRowData.push(selectRowsData[i]);
    }
  }

  return selectedRowData;
}

function PermissionModule() {
  const [rowsPage, setRowsPage] = useState(10);
  const [query, setQuery] = useState("");
  const [pageChange, setPageChange] = useState(1);

  const { fetchData, data, loading, setLoading, sort, setSort } =
    useGetPrivilege(pageChange, query, rowsPage);

  const handlePaginationChange = (event, page) => {
    setLoading(true);
    setPageChange(page);
  };

  const handleRowsChange = (event) => {
    setPageChange(1);
    setRowsPage(event.target.value);
  };

  return (
    <div>
      <SearchComponent
        setQuery={setQuery}
        setLoading={setLoading}
        setPageChange={setPageChange}
      />
      <div className={styles.tableContainerStyle}>
        <div className={styles.tableStyled}>
          {loading ? (
            <>
              <TableHeader />
              <ListLoader />
            </>
          ) : data?.data && data?.data.length ? (
            <Table
              ListData={data?.data}
              fetchData={fetchData}
              setLoading={setLoading}
              sort={sort}
              setSort={setSort}
            />
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

export default PermissionModule;
