import React, { useEffect, useState } from "react";
import SearchComponenet from "./SearchComponenet";
import useGetEODBypass from "./hooks/useGetEODBypass";
import styles from "./styles.module.scss";
import TableHeader from "./Table/TableHeader";
import ListLoader from "../../components/ListLoader";
import Table from "./Table";
import NoDataFound from "../../components/NoDataCard";
import { MenuItem, Pagination, Select } from "@mui/material";
import { PAGECOUNT, selectRowsData } from "../../utils/globalConstants";
import { useDispatch } from "react-redux";
import { setTableName } from "../../stores/slices/exportSlice";
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

function ProducerEODBypass() {
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState("producers");
  const [date, setDate] = useState({ startDate: "", endDate: "" });
  const dispatch = useDispatch();
  const [producers, setProducers] = useState("");

  const [rowsPage, setRowsPage] = useState(PAGECOUNT);

  const [pageChange, setPageChange] = useState(1);
  // Check Permission
  const { canCreate, canUpdate } = usePermissions();
  const { data, loading, fetchData, setSort, sort } = useGetEODBypass(
    pageChange,
    rowsPage,
    query,
    searched,
    date
  );

  const handlePaginationChange = (event, page) => {
    setPageChange(page);
  };

  const handleRowsChange = (event) => {
    setPageChange(1);
    setRowsPage(event.target.value);
  };

  useEffect(() => {
    dispatch(setTableName(data?.data[0]?.producerEodByPass.label));
  }, [dispatch, data]);

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
        date={date}
        setDate={setDate}
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
              canUpdate={canUpdate}
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

export default ProducerEODBypass;
