import { Box, MenuItem, Pagination, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import Table from "./Components/Table";
import SearchComponent from "./Components/SearchComponent";
import useGetUser from "./Components/hooks/useGetUser";
import NoDataFound from "../../sharedComponents/NoDataCard";
import TableHeader from "./Components/Table/TableHeader";
import ListLoader from "../../sharedComponents/ListLoader";

function UserManagement() {
  const [searched, setSearched] = useState("");
  const [query, setQuery] = useState("");
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [pageChange, setPageChange] = useState(1);

  const [rowsPage, setRowsPage] = useState(10);

  const handleRowsChange = (event) => {
    setRowsPage(event.target.value);
  };

  const handlePaginationChange = (event, page) => {
    setPageChange(page);
  };

  const { data, loading, fetchData, setLoading, setSort, sort } = useGetUser();

  const selectRowsData = [5, 10, 15, 20];

  useEffect(() => {
    setQuery("");
  }, [searched]);

  return (
    <Box>
      {/* <Toolbar /> */}
      <div>
        <SearchComponent
          searched={searched}
          setSearched={setSearched}
          fromDate={fromDate}
          setFromDate={setFromDate}
          toDate={toDate}
          setToDate={setToDate}
          query={query}
          setQuery={setQuery}
          fetchData={fetchData}
        />
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
              setLoading={setLoading}
              sort={sort}
              setSort={setSort}
            />
          ) : (
            <NoDataFound />
          )}

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
                {selectRowsData.map((item) => (
                  <MenuItem value={item} className={styles.styledOptionText}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
              <p className={styles.totalRecordStyle}>of 141</p>
            </div>
            <Pagination
              count={10}
              color="primary"
              size="small"
              onChange={handlePaginationChange}
              page={pageChange}
            />
          </div>
        </div>
      </div>
    </Box>
  );
}

export default UserManagement;
