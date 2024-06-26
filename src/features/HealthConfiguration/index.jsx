import React, { useState } from "react";
import styles from "./styles.module.scss";
import TableHeader from "./Table/TableHeader";
import ListLoader from "../../components/ListLoader";
import Table from "./Table";
import NoDataFound from "../../components/NoDataCard";
import { MenuItem, Pagination, Select } from "@mui/material";
import { selectRowsData } from "../../utils/globalConstants";
import useGetHouseBank from "./hooks/useGetHealthConfig";
import useGetUserData from "../../hooks/useGetUserData";
import SearchComponenet from "../../components/SearchComponent";

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

function HealthConfiguration() {
  const [rowsPage, setRowsPage] = useState(10);

  const [pageChange, setPageChange] = useState(1);
  const [producers, setProducers] = useState([]);

  const handlePaginationChange = (event, page) => {
    setPageChange(page);
  };

  const { data, loading, sort, setSort, fetchData } = useGetHouseBank(
    pageChange,
    rowsPage
  );

  const handleRowsChange = (event) => {
    setPageChange(1);
    setRowsPage(event.target.value);
  };

  const { userData } = useGetUserData();

  const optionLabel = (option) => {
    return `${option?.firstName?.toUpperCase()} ${option?.lastName?.toUpperCase()}`;
  };

  const renderOptionFunction = (props, option) => (
    <li {...props} key={option?.id}>
      {option?.firstName?.toUpperCase()} {option?.lastName?.toUpperCase()}
    </li>
  );

  const handleGo = () => {
    const resultProducersId = fetchIdsAndConvert(producers);
    fetchData(resultProducersId);
  };

  const fetchIdsAndConvert = (inputData) => {
    const ids = (inputData || []).map((producer) => producer.id);
    return ids.join();
  };

  return (
    <div>
      <SearchComponenet
        optionsData={userData || []}
        option={producers}
        setOption={setProducers}
        fetchData={fetchData}
        optionLabel={optionLabel}
        placeholder={"Search by Producer Name"}
        renderOptionFunction={renderOptionFunction}
        buttonText={"Create Health Configuration"}
        navigateRoute={"/health-config/form"}
        handleGo={handleGo}
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

export default HealthConfiguration;
