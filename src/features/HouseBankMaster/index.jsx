import React, { useEffect, useState } from "react";
import SearchComponenet from "./SearchComponent";
import styles from "./styles.module.scss";
import TableHeader from "./Table/TableHeader";
import ListLoader from "../../components/ListLoader";
import Table from "./Table";
import NoDataFound from "../../components/NoDataCard";
import { MenuItem, Pagination, Select } from "@mui/material";
import { PAGECOUNT, selectRowsData } from "../../utils/globalConstants";
import useGetHouseBank from "./hooks/useGetHouseBank";
import { setTableName } from "../../stores/slices/exportSlice";
import { useDispatch } from "react-redux";
import usePermissions from "../../hooks/usePermission";

function getSelectedRowData(count) {
  
  let selectedRowData = [];

  
  for (let i = 0; i < selectRowsData.length; i++) {
    if (selectRowsData[i] <= count) {
      selectedRowData.push(selectRowsData[i]);
    }
  }

  return selectedRowData;
}

function HouseBankMaster() {
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState("houseBankCode");
  const dispatch = useDispatch();

  const [rowsPage, setRowsPage] = useState(PAGECOUNT);
  const [pageChange, setPageChange] = useState(1);
  const handlePaginationChange = (event, page) => {
    setPageChange(page);
  };

  // Check Permission
  const { canCreate, canUpdate } = usePermissions();

  const { data, loading, sort, setSort, fetchData } = useGetHouseBank(
    pageChange,
    rowsPage,
    query,
    searched
  );

  const handleRowsChange = (event) => {
    setPageChange(1);
    setRowsPage(event.target.value);
  };

  useEffect(() => {
    dispatch(setTableName(data?.data[0]?.label));
  }, [dispatch, data]);

  return (
    <div>
      <SearchComponenet
        setPageChange={setPageChange}
        query={query}
        setQuery={setQuery}
        searched={searched}
        setSearched={setSearched}
        canCreate={canCreate}
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
              canUpdate= {canUpdate}
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
              {getSelectedRowData(data?.totalCount).map((item, index) => (
                <MenuItem key={index} value={item} className={styles.styledOptionText}>
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

export default HouseBankMaster;
