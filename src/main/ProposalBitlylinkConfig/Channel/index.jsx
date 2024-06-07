import React, { useState } from "react";
import SearchComponent from "./SearchComponent";
import styles from "./styles.module.scss";
import TableHeader from "./Table/TableHeader";
import ListLoader from "../../../sharedComponents/ListLoader";
import Table from "./Table";
import NoDataFound from "../../../sharedComponents/NoDataCard";
import { MenuItem, Pagination, Select } from "@mui/material";
import useGetBitlyLink from "../hooks/useGetBitlyLink";
import { selectRowsData } from "../../../globalization/globalConstants";

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

function Channel() {
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState("type");
  const [rowsPage, setRowsPage] = useState(10);
  const [pageChange, setPageChange] = useState(1);

  const handlePaginationChange = (event, page) => {
    setPageChange(page);
  };

  const { data, loading, sort, setSort, fetchData } = useGetBitlyLink(
    pageChange,
    rowsPage,
    query,
    searched
  );

  const handleRowsChange = (event) => {
    setPageChange(1);
    setRowsPage(event.target.value);
  };
  return (
    <div>
      {" "}
      <SearchComponent
        setQuery={setQuery}
        setPageChange={setPageChange}
        searched={searched}
        setSearched={setSearched}
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
              loading={loading}
              fetchData={fetchData}
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
          <div>
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
    </div>
  );
}

export default Channel;
