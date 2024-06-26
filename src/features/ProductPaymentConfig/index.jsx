import React, { useEffect, useState } from "react";
import SearchComponenet from "../../components/SearchComponent";
import styles from "./styles.module.scss";
import TableHeader from "./Table/TableHeader";
import ListLoader from "../../components/ListLoader";
import Table from "./Table";
import NoDataFound from "../../components/NoDataCard";
import { MenuItem, Pagination, Select } from "@mui/material";
import { selectRowsData } from "../../utils/globalConstants";
import useGetPaymentConfig from "./hooks/useGetPaymentConfig";
import useGetPayment from "./hooks/useGetPayment";
import { ProductPayment } from "./constants";
import useGetAllProduct from "../../hooks/useGetAllProduct";
import useGetLobData from "../../hooks/useGetLobData";

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

function ProductPaymentConfig() {
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState("product");
  const [productValue, setProductValue] = useState([]);
  const [lobValue, setLobValue] = useState([]);

  const [rowsPage, setRowsPage] = useState(10);

  const [pageChange, setPageChange] = useState(1);

  const handlePaginationChange = (event, page) => {
    setPageChange(page);
  };

  const { data, loading, sort, setSort, fetchData } = useGetPaymentConfig(
    pageChange,
    rowsPage,
    query,
    searched
  );

  const { data: paymentData } = useGetPayment();

  const handleRowsChange = (event) => {
    setPageChange(1);
    setRowsPage(event.target.value);
  };

  const { data: productData } = useGetAllProduct();

  const { data: lobData } = useGetLobData();

  const optionLabelProduct = (option) => {
    console.log("option", option);
    return option?.product ? option.product.toUpperCase() : "";
  };

  const renderOptionProductFunction = (props, option) => (
    <li {...props} key={option?.id}>
      {option?.product ? option?.product?.toUpperCase() : ""}
    </li>
  );

  const optionLabelLob = (option) => {
    console.log("optionLob", option);
    return option?.lob ? option?.lob?.toUpperCase() : "";
  };

  const renderOptionLobFunction = (props, option) => (
    <li {...props} key={option?.id}>
      {option?.lob ? option?.lob?.toUpperCase() : ""}
    </li>
  );

  useEffect(() => {
    if (searched === "product") {
      setLobValue([]);
    } else {
      setProductValue([]);
    }
  }, [searched]);

  const handleGo = () => {
    if (searched === "product") {
      const resultProductString = fetchIdsAndConvert(productValue);
      fetchData(searched, resultProductString);
    } else {
      const resultLobString = fetchIdsAndConvert(lobValue);
      fetchData(searched, resultLobString);
    }
  };

  const fetchIdsAndConvert = (inputData) => {
    const ids = inputData.map((permission) => permission.id);
    return ids.join();
  };

  return (
    <div>
      {/* <SearchComponenet
        fetchData={fetchData}
        setPageChange={setPageChange}
        setQuery={setQuery}
        searched={searched}
        setSearched={setSearched}
        productValue={productValue}
        setProductValue={setProductValue}
        lobValue={lobValue}
        setLobValue={setLobValue}
      /> */}
      <SearchComponenet
        optionsData={
          searched === "product" ? productData?.data ?? [] : lobData?.data ?? []
        }
        option={searched === "product" ? productValue : lobValue}
        setOption={searched === "product" ? setProductValue : setLobValue}
        fetchData={fetchData}
        optionLabel={
          searched === "product" ? optionLabelProduct : optionLabelLob
        }
        placeholder={
          searched === "product"
            ? "Search by Producer Name"
            : "Search by Lob Name"
        }
        renderOptionFunction={
          searched === "product"
            ? renderOptionProductFunction
            : renderOptionLobFunction
        }
        buttonText={"Create New Payment Configuration"}
        navigateRoute={"/product-payment-config/form"}
        searched={searched}
        setSearched={setSearched}
        selectOptions={ProductPayment}
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
              paymentData={paymentData}
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

export default ProductPaymentConfig;
