import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchComponent from "../../components/SearchComponent";
import useGetPartnerNeft from "./hooks/useGetPartnerNeft";
import CustomTable from "../../components/CustomTable";
import { Header } from "./utils/header";
import { ProductPayment } from "../../utils/globalConstants";
import { fetchLobData } from "../../stores/slices/lobSlice";
import { fetchAllProductData } from "../../stores/slices/productSlice";
import { useDispatch, useSelector } from "react-redux";

const PartnerNeft = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { allLob } = useSelector((state) => state.lob);
  const { products } = useSelector((state) => state.product);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");

  const [searched, setSearched] = useState("product");
  const [productValue, setProductValue] = useState([]);
  const [lobValue, setLobValue] = useState([]);

  const { getPartnerNeft, partnerNeftData, partnerNeftLoading, totalCount } =
    useGetPartnerNeft();

  useEffect(() => {
    getPartnerNeft({
      sortKey: orderBy,
      sortOrder: order,
      pageNo: page,
      pageSize,
    });
  }, [orderBy, order, page, pageSize, getPartnerNeft]);

  useEffect(() => {
    if (searched === "product") {
      setLobValue([]);
    } else {
      setProductValue([]);
    }
  }, [searched]);

  useEffect(() => {
    dispatch(fetchLobData());
    dispatch(fetchAllProductData());
  }, [dispatch]);

  const fetchIdsAndConvert = (inputData) => {
    const ids = inputData.map((permission) => permission.id);
    return ids.join();
  };

  const handleGo = () => {
    if (searched === "product") {
      const resultProductString = fetchIdsAndConvert(productValue);
      getPartnerNeft({
        searchKey: "productId",
        searchString: resultProductString,
      });
    } else {
      const resultLobString = fetchIdsAndConvert(lobValue);
      getPartnerNeft({ searchKey: "lobId", searchString: resultLobString });
    }
  };

  const updateNeftForm = (row) => {
    navigate("/partner-neft/form/" + row.id);
  };

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

  const header = Header(updateNeftForm);

  return (
    <Box>
      <SearchComponent
        optionsData={
          searched === "product" ? products?.data ?? [] : allLob?.data ?? []
        }
        option={searched === "product" ? productValue : lobValue}
        setOption={searched === "product" ? setProductValue : setLobValue}
        fetchData={getPartnerNeft}
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
        buttonText={"Create NEFT Flag"}
        navigateRoute={"/partner-neft/form"}
        searched={searched}
        setSearched={setSearched}
        selectOptions={ProductPayment}
        handleGo={handleGo}
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
