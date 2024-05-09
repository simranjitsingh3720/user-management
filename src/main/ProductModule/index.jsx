import React, { useState } from "react";
import SearchComponent from "./SearchComponent";
import useGetLobListData from "./hooks/useGetLobListData";
import styles from "./styles.module.css";
import TableHeader from "./Table/TableHeader";
import ListLoader from "../../sharedComponents/ListLoader";
import Table from "./Table";
import NoDataFound from "../../sharedComponents/NoDataCard";
import { Pagination } from "@mui/material";
import useGetProduct from "./hooks/useGetProduct";

function Product() {
  const [value, setValue] = useState([]);
  const [pageChange, setPageChange] = useState(1);

  const { data: lobListData } = useGetLobListData();

  const { data, loading, fetchData, setSort, sort } = useGetProduct(pageChange);

  const handlePaginationChange = (event, page) => {
    setPageChange(page);
  };

  return (
    <div>
      <SearchComponent
        value={value}
        setValue={setValue}
        lobListData={lobListData}
        fetchData={fetchData}
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

export default Product;
