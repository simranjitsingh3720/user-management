import React, { useState } from "react";
import styles from "./styles.module.css";
import useGetLob from "../../LOBModule/hooks/useGetLob";
import TableHeader from "../Table/TableHeader";
import ListLoader from "../../../sharedComponents/ListLoader";
import Table from "../Table";
import NoDataFound from "../../../sharedComponents/NoDataCard";
import { Pagination } from "@mui/material";

function OTPList() {
  const [pageChange, setPageChange] = useState(1);

  const handlePaginationChange = (event, page) => {
    setPageChange(page);
  };

  const { data, loading, fetchData, setLoading, setSort, sort } =
    useGetLob(pageChange);
  return (
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

export default OTPList;
