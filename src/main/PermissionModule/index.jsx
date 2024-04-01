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
  const [query, setQuery] = useState("");
  const [pageChange, setPageChange] = useState(1);

  const { fetchData, data, loading, setLoading } = useGetPrivilege(
    pageChange,
    query
  );

  const handlePaginationChange = (event, page) => {
    setLoading(true);
    setPageChange(page);
  };

  return (
    <div>
      <SearchComponent setQuery={setQuery} setLoading={setLoading} />
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
            />
          ) : (
            <NoDataFound />
          )}
        </div>
        <div className={styles.pageFooter}>
          <Pagination
            count={10}
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
