import React, { useState } from "react";
import SearchComponent from "./SearchComponent";
import useGetPrivilege from "../../PermissionModule/hooks/useGetPrivilege";
import styles from "./styles.module.css";
import TableHeader from "./Table/TableHeader";
import ListLoader from "../../../sharedComponents/ListLoader";
import Table from "./Table";
import NoDataFound from "../../../sharedComponents/NoDataCard";
import { Pagination } from "@mui/material";

function Channel() {
  const [query, setQuery] = useState("");
  const [pageChange, setPageChange] = useState(1);

  const { fetchData, data, loading, setLoading, sort, setSort } =
    useGetPrivilege(pageChange, query);

  const handlePaginationChange = (event, page) => {
    setPageChange(page);
  };
  return (
    <div>
      {" "}
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
            <>
              <Table
                ListData={data?.data}
                loading={loading}
                fetchData={fetchData}
                setLoading={setLoading}
                sort={sort}
                setSort={setSort}
              />

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
            </>
          ) : (
            <NoDataFound />
          )}
        </div>
        <div className={styles.pageFooter}>
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

export default Channel;
