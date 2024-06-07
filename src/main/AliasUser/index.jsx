import React, { useState } from "react";
import SearchComponenet from "./SearchComponenet";
import useGetSyncedProducer from "./hooks/useGetSyncedProducer";
import styles from "./styles.module.scss";
import TableHeader from "./Table/TableHeader";
import ListLoader from "../../sharedComponents/ListLoader";
import Table from "./Table";
import NoDataFound from "../../sharedComponents/NoDataCard";
import { MenuItem, Pagination, Select } from "@mui/material";
import { selectRowsData } from "../../globalization/globalConstants";

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

function AliasUser() {
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState("producers");

  const [producers, setProducers] = useState("");

  const [rowsPage, setRowsPage] = useState(10);

  const [pageChange, setPageChange] = useState(1);

  const { data, loading, fetchData, setSort, sort } = useGetSyncedProducer(
    pageChange,
    rowsPage,
    query,
    searched
  );

  const handlePaginationChange = (event, page) => {
    setPageChange(page);
  };

  const handleRowsChange = (event) => {
    setPageChange(1);
    setRowsPage(event.target.value);
  };

  return (
    <div>
      <SearchComponenet
        fetchData={fetchData}
        setPageChange={setPageChange}
        setQuery={setQuery}
        searched={searched}
        setSearched={setSearched}
        producers={producers}
        setProducers={setProducers}
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

export default AliasUser;
