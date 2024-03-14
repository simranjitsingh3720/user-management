import React, { useState } from "react";
import SearchComponent from "./SearchComponent";
import Table from "./Table";
import { Pagination } from "@mui/material";
import styles from "./styles.module.css";
import useGetPrivilege from "./hooks/useGetPrivilege";
import ListLoader from "./ListLoader";
import TableHeader from "./Table/TableHeader";
import NoDataFound from "./NoDataCard";

function PermissionModule() {
  const [searched, setSearched] = useState("");
  const [query, setQuery] = useState("");
  const [pageChange, setPageChange] = useState(1);

  const { data, loading, fetchData, setLoading } = useGetPrivilege(pageChange);

  const handlePaginationChange = (event, page) => {
    setLoading(true);
    setPageChange(page);
  };

  console.log("loading", loading);

  return (
    <div>
      <SearchComponent
        searched={searched}
        setSearched={setSearched}
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
          <>
            <Table ListData={data?.data} loading={loading} />
            <div className={styles.pageFooter}>
              {/* <div className={styles.rowsPerPage}>
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
          </div> */}
              <Pagination
                count={10}
                color="primary"
                size="small"
                onChange={handlePaginationChange}
                page={pageChange}
              />
            </div>
          </>
        ) : (
          <NoDataFound />
        )}
      </div>
    </div>
  );
}

export default PermissionModule;
