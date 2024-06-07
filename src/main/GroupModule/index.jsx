import React, { useEffect, useState } from "react";

import SearchComponenet from "./SearchComponent";
import useGetGroup from "./hooks/useGetGroup";
import useGetPermission from "./hooks/useGetPermission";
import Table from "./Table";
import styles from "./styles.module.scss";
import { MenuItem, Pagination, Select } from "@mui/material";
import TableHeader from "./Table/TableHeader";
import NoDataFound from "../../sharedComponents/NoDataCard";
import ListLoader from "../../sharedComponents/ListLoader";
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

function GroupModule() {
  const [searched, setSearched] = useState("groupName");
  const [query, setQuery] = useState("");
  const [pageChange, setPageChange] = useState(1);
  const [value, setValue] = useState([]);
  const [rowsPage, setRowsPage] = useState(10);

  const { data, loading, fetchData, setLoading, setSort, sort } = useGetGroup(
    pageChange,
    rowsPage
  );

  const handlePaginationChange = (event, page) => {
    setLoading(true);
    setPageChange(page);
  };

  const { permissionData } = useGetPermission();

  useEffect(() => {
    if (query) setQuery("");
    else setValue([]);
  }, [searched]);

  const handleRowsChange = (event) => {
    setPageChange(1);
    setRowsPage(event.target.value);
  };

  return (
    <div>
      <SearchComponenet
        searched={searched}
        setSearched={setSearched}
        query={query}
        setQuery={setQuery}
        fetchData={fetchData}
        permissionData={permissionData?.data || []}
        value={value}
        setValue={setValue}
        setLoading={setLoading}
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
        {/* <div className={styles.pageFooter}>
          <Pagination
            count={data?.totalPageSize}
            color="primary"
            size="small"
            onChange={handlePaginationChange}
            page={pageChange}
            className={styles.marginFotter}
          />
        </div> */}
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

export default GroupModule;
