import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SearchComponent from "../../components/SearchComponent";
import CustomTable from "../../components/CustomTable";
import useGetPartnerNeft from "./hooks/useGetPartnerNeft";
import { Header } from "./utils/header";
import { BUTTON_TEXT, PLACEHOLDER_TEXT, ProductPayment } from "../../utils/globalConstants";
import { fetchLobData } from "../../stores/slices/lobSlice";
import { fetchAllProductData } from "../../stores/slices/productSlice";
import { COMMON_FIELDS } from "./utils/constant";
import { COMMON_WORDS } from "../../utils/constants";

const PartnerNeft = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { allLob } = useSelector((state) => state.lob);
  const { products } = useSelector((state) => state.product);

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [order, setOrder] = useState("");
  const [orderBy, setOrderBy] = useState("");
  const [searched, setSearched] = useState(COMMON_WORDS.PRODUCT);
  const [productValue, setProductValue] = useState([]);
  const [lobValue, setLobValue] = useState([]);

  const { getPartnerNeft, partnerNeftData, partnerNeftLoading, totalCount } = useGetPartnerNeft();

  const loadData = useCallback(() => {
    getPartnerNeft({
      sortKey: orderBy,
      sortOrder: order,
      pageNo: page,
      pageSize,
      childFieldsToFetch: COMMON_FIELDS.childFieldsToFetch,
      childFieldsEdge: COMMON_FIELDS.childFieldsEdge,
    });
  }, [orderBy, order, page, pageSize, getPartnerNeft]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    if (searched === COMMON_WORDS.PRODUCT) {
      setLobValue([]);
    } else {
      setProductValue([]);
    }
  }, [searched]);

  useEffect(() => {
    dispatch(fetchLobData());
    dispatch(fetchAllProductData());
  }, [dispatch]);

  const fetchIdsAndConvert = (inputData) => inputData.map((item) => item.id).join();

  const handleGo = useCallback(() => {
    const searchString = fetchIdsAndConvert(searched === COMMON_WORDS.PRODUCT ? productValue : lobValue);
    if (searchString) {
      getPartnerNeft({
        childFieldsToFetch: COMMON_FIELDS.childFieldsToFetch,
        childFieldsEdge: COMMON_FIELDS.childFieldsEdge,
        ids: searchString,
        isExclusive: true,
        edge: searched === COMMON_WORDS.PRODUCT ? COMMON_FIELDS.hasProduct : COMMON_FIELDS.hasLob,
      });
    } else {
      loadData();
    }
  }, [searched, productValue, lobValue, getPartnerNeft, loadData]);

  const updateNeftForm = useCallback((row) => {
    navigate("/partner-neft/form/" + row.id);
  }, [navigate]);

  const optionLabel = (option, type) => option[type]?.toUpperCase() || "";
  const renderOptionFunction = (props, option, type) => (
    <li {...props} key={option?.id}>
      {optionLabel(option, type)}
    </li>
  );

  const header = useMemo(() => Header(updateNeftForm), [updateNeftForm]);

  return (
    <Box>
      <SearchComponent
        optionsData={searched === COMMON_WORDS.PRODUCT ? products?.data ?? [] : allLob?.data ?? []}
        option={searched === COMMON_WORDS.PRODUCT ? productValue : lobValue}
        setOption={searched === COMMON_WORDS.PRODUCT ? setProductValue : setLobValue}
        optionLabel={(option) => optionLabel(option, searched === COMMON_WORDS.PRODUCT ? COMMON_WORDS.PRODUCT : COMMON_WORDS.LOB)}
        placeholder={searched === COMMON_WORDS.PRODUCT ? PLACEHOLDER_TEXT.product : PLACEHOLDER_TEXT.lob}
        renderOptionFunction={(props, option) => renderOptionFunction(props, option, searched === COMMON_WORDS.PRODUCT ? COMMON_WORDS.PRODUCT : COMMON_WORDS.LOB)}
        buttonText={BUTTON_TEXT.PARTNER_NEFT}
        navigateRoute="/partner-neft/form"
        searched={searched}
        setSearched={setSearched}
        selectOptions={ProductPayment}
        handleGo={handleGo}
        showButton
      />
      <div className="mt-4">
        <CustomTable
          rows={partnerNeftData}
          columns={header}
          loading={partnerNeftLoading}
          totalCount={totalCount}
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
};

export default PartnerNeft;
