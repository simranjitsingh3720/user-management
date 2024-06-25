import React, { useEffect, useState } from "react";
import CustomTable from "../../components/CustomTable";
import generateTableHeaders from "./utils/generateTableHeaders";
import { useNavigate } from "react-router-dom";
import SearchComponenet from "../../components/SearchComponent";
import { Box, Grid } from "@mui/material";
import useGetCkycData from "./hooks/useGetCkycData";
import useGetAllProduct from "../../hooks/useGetAllProduct";
import useGetLobData from "../../hooks/useGetLobData";
import { ProductPayment } from "../../utils/globalConstants";

function CkycConfig() {
  const [rowsPage, setRowsPage] = useState(10);
  const [tableData, setTableData] = useState([]);
  const [pageChange, setPageChange] = useState(1);
  const [searched, setSearched] = useState("product");

  const [productValue, setProductValue] = useState([]);
  const [lobValue, setLobValue] = useState([]);

  const { data, loading, sort, setSort, fetchData } = useGetCkycData(
    pageChange,
    rowsPage
  );

  useEffect(() => {
    if (data && data?.data) {
      const refactorData = data?.data.map((item) => ({
        id: item.id,
        lob: item.lob.lob,
        product: item.product.product,
        CKYCApplicable: item.isCKYCApplicable ? "Enable" : "Disable",
        forWhom: item.forWhom,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      }));
      setTableData(refactorData);
    }
  }, [data]);

  const navigate = useNavigate();

  const handleEditClick = (row) => {
    navigate(`/ckyc-config/form/${row.id}`);
  };

  const { data: productData } = useGetAllProduct();

  const { data: lobData } = useGetLobData();

  const HEADER_COLUMNS = generateTableHeaders(handleEditClick);

  const optionLabelProduct = (option) => {
    return option?.product ? option.product.toUpperCase() : "";
  };

  const renderOptionProductFunction = (props, option) => (
    <li {...props} key={option?.id}>
      {option?.product ? option?.product?.toUpperCase() : ""}
    </li>
  );

  const optionLabelLob = (option) => {
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
    <Box>
      <Grid container rowSpacing={0.5} direction="column">
        <SearchComponenet
          optionsData={
            searched === "product"
              ? productData?.data ?? []
              : lobData?.data ?? []
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
          buttonText={"Create CKYC Configuration"}
          navigateRoute={"/ckyc-config/form"}
          searched={searched}
          setSearched={setSearched}
          selectOptions={ProductPayment}
          handleGo={handleGo}
        />
        <CustomTable
          columns={HEADER_COLUMNS}
          rows={tableData || []}
          loading={loading}
        />
      </Grid>
    </Box>
  );
}

export default CkycConfig;
