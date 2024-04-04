import React, { useState } from "react";
import SearchComponent from "./SearchComponent";
import { Pagination } from "@mui/material";
import NoDataFound from "../../sharedComponents/NoDataCard";
import styles from "./styles.module.css";
import ListLoader from "../../sharedComponents/ListLoader";
import useGetRole from "./hooks/useGetRole";
import Table from "./Table";
import TableHeader from "./Table/TableHeader";

function Roles() {
  const [searched, setSearched] = useState("");
  const [query, setQuery] = useState("");
  const [pageChange, setPageChange] = useState(1);

  const { data, loading, fetchData, setLoading } = useGetRole(pageChange);

  const handlePaginationChange = (event, page) => {
    setLoading(true);
    setPageChange(page);
  };

  const newData = {
    data: [
      {
        roleName: "New Role",
        permissions: ["write", "read", "update"],
        status: "active",
      },
    ],
  };
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
        ) : newData?.data && newData?.data.length ? (
          <>
            <Table ListData={newData?.data} loading={loading} />
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

export default Roles;
