import React, { useState } from "react";

import SearchComponenet from "./SearchComponent";
import useGetGroup from "./hooks/useGetGroup";
import useGetPermission from "./hooks/useGetPermission";

function GroupModule() {
  const [searched, setSearched] = useState("groupName");
  const [query, setQuery] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [pageChange, setPageChange] = useState(1);
  const [value, setValue] = useState([]);

  const { data, loading, fetchData, setLoading } = useGetGroup(pageChange);

  const handlePaginationChange = (event, page) => {
    setLoading(true);
    setPageChange(page);
  };

  const { permissionData, permissionLoading, permissionFetchDatat } =
    useGetPermission(inputValue);

  console.log("permissionData", permissionData);

  return (
    <div>
      <SearchComponenet
        searched={searched}
        setSearched={setSearched}
        query={query}
        setQuery={setQuery}
        fetchData={fetchData}
        inputValue={inputValue}
        setInputValue={setInputValue}
        permissionData={permissionData}
        value={value}
        setValue={setValue}
      />
      {/* <div className={styles.tableStyled}>
        {loading ? (
          <>
            <TableHeader />
            <ListLoader />
          </>
        ) : data?.data && data?.data.length ? (
          <>
            <Table ListData={data?.data} loading={loading} />
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
                  {selectRowsData.map((item) => (
                    <MenuItem value={item} className={styles.styledOptionText}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
                <p className={styles.totalRecordStyle}>of 141</p>
              </div>
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
      </div> */}
    </div>
  );
}

export default GroupModule;
