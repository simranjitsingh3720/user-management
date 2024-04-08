import React, { useEffect, useState } from "react";

import SearchComponenet from "./SearchComponent";
import Table from "./Table";
import styles from "./styles.module.css";
import { Pagination } from "@mui/material";
import TableHeader from "./Table/TableHeader";
import NoDataFound from "../../sharedComponents/NoDataCard";
import ListLoader from "../../sharedComponents/ListLoader";
import useGetRole from "./hooks/useGetRole";
import useGetGroup from "./hooks/useGetGroup";

function RoleModule() {
  const [searched, setSearched] = useState("roleName");
  const [query, setQuery] = useState("");
  const [pageChange, setPageChange] = useState(1);
  const [value, setValue] = useState([]);

  const { data, loading, fetchData, setLoading, setSort, sort } =
    useGetRole(pageChange);

  const handlePaginationChange = (event, page) => {
    setLoading(true);
    setPageChange(page);
  };

  const { data: groupData } = useGetGroup();

  useEffect(() => {
    if (query) setQuery("");
    else setValue([]);
  }, [searched]);

  return (
    <div>
      <SearchComponenet
        searched={searched}
        setSearched={setSearched}
        query={query}
        setQuery={setQuery}
        fetchData={fetchData}
        groupData={groupData?.data || []}
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

export default RoleModule;
