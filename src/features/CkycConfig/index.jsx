import React, { useEffect, useState } from "react";
import CustomTable from "../../components/CustomTable";
import generateTableHeaders from "./utils/generateTableHeaders";
import { useNavigate } from "react-router-dom";
import SearchComponenet from "../../components/SearchComponent";
import { Box } from "@mui/material";
import useGetCkycData from "./hooks/useGetCkycData";
import { BUTTON_TEXT, ProductPayment } from "../../utils/globalConstants";
import { COMMON_WORDS } from "../../utils/constants";
import { getPlaceHolder } from "../../utils/globalizationFunction";
import { useDispatch, useSelector } from "react-redux";
import { fetchLobData } from "../../stores/slices/lobSlice";
import { fetchAllProductData } from "../../stores/slices/productSlice";

function CkycConfig() {
  const dispatch = useDispatch();
  const { lob } = useSelector((state) => state.lob);
  const { products } = useSelector((state) => state.product);
  const [tableData, setTableData] = useState([]);

  const [searched, setSearched] = useState(COMMON_WORDS.PRODUCT);

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [order, setOrder] = useState(COMMON_WORDS.ASC);
  const [orderBy, setOrderBy] = useState(COMMON_WORDS.CREATED_AT);

  const [productValue, setProductValue] = useState([]);
  const [lobValue, setLobValue] = useState([]);

  useEffect(() => {
    dispatch(fetchLobData({ isAll: true, status: true}));
    dispatch(fetchAllProductData({isAll: true}));
  }, [dispatch]);
  const { data, loading, fetchData } = useGetCkycData(
    page,
    pageSize,
    order,
    orderBy
  );

  useEffect(() => {
    if (data && data?.data) {
      const refactorData = data?.data.map((item) => ({
        id: item?.cKYC?.id,
        lob: item?.lobs[0]?.lob,
        product: item?.products[0]?.product,
        CKYCApplicable: item?.cKYC?.isCKYCApplicable
          ? COMMON_WORDS.ENABLE
          : COMMON_WORDS.DISABLE,
        forWhom: item?.cKYC?.forWhom,
        createdAt: item?.cKYC?.createdAt,
        updatedAt: item?.cKYC?.updatedAt,
      }));
      setTableData(refactorData);
    }
  }, [data]);

  const navigate = useNavigate();

  const handleEditClick = (row) => {
    navigate(`/ckyc-config/form/${row.id}`);
  };

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
    if (searched === COMMON_WORDS.PRODUCT) {
      setLobValue([]);
    } else {
      setProductValue([]);
    }
  }, [searched]);

  const handleGo = () => {
    if (searched === COMMON_WORDS.PRODUCT) {
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
      <SearchComponenet
        optionsData={
          searched === COMMON_WORDS.PRODUCT
            ? products?.data ?? []
            : lob?.data ?? []
        }
        option={searched === COMMON_WORDS.PRODUCT ? productValue : lobValue}
        setOption={
          searched === COMMON_WORDS.PRODUCT ? setProductValue : setLobValue
        }
        fetchData={fetchData}
        optionLabel={
          searched === COMMON_WORDS.PRODUCT
            ? optionLabelProduct
            : optionLabelLob
        }
        placeholder={getPlaceHolder(searched)}
        renderOptionFunction={
          searched === COMMON_WORDS.PRODUCT
            ? renderOptionProductFunction
            : renderOptionLobFunction
        }
        buttonText={BUTTON_TEXT.CKYC_CONFIG}
        navigateRoute={"/ckyc-config/form"}
        searched={searched}
        setSearched={setSearched}
        selectOptions={ProductPayment}
        handleGo={handleGo}
        showButton
      />
      <div className="mt-4">
        <CustomTable
          columns={HEADER_COLUMNS}
          rows={tableData || []}
          loading={loading}
          totalCount={data?.totalCount || 0}
          page={page}
          setPage={setPage}
          rowsPerPage={pageSize}
          setRowsPerPage={setPageSize}
          order={order}
          setOrder={setOrder}
          orderBy={orderBy}
          setOrderBy={setOrderBy}
        />
      </div>
    </Box>
  );
}

export default CkycConfig;
