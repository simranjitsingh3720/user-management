import React, { useState } from "react";
import CreateLob from "./CreateLob";
import styles from "./styles.module.scss";
import useGetLob from "./hooks/useGetLob";
import TableHeader from "./Table/TableHeader";
import ListLoader from "../../components/ListLoader";
import Table from "./Table";
import NoDataFound from "../../components/NoDataCard";
import { MenuItem, Pagination, Select } from "@mui/material";
import { selectRowsData } from "../../utils/globalConstants";

function LOBModule() {
  const [rowsPage, setRowsPage] = useState(10);
  const [pageChange, setPageChange] = useState(1);

  const handlePaginationChange = (event, page) => {
    setPageChange(page);
  };

  const handleRowsChange = (event) => {
    setPageChange(1);
    setRowsPage(event.target.value);
  };
  const { data, loading, fetchData, setLoading, setSort, sort } = useGetLob(
    pageChange,
    rowsPage
  );

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
    <div>
      <CreateLob />
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
  );
}

export default LOBModule;
