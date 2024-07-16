import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Header } from "./utils/header";
import CustomTable from "../../components/CustomTable";
import {
  fetchAllProductData,
  updateProductData,
} from "../../stores/slices/productSlice";
import { COMMON_WORDS } from "../../utils/constants";
import { BUTTON_TEXT, PAGECOUNT } from "../../utils/globalConstants";
import { getPlaceHolder } from "../../utils/globalizationFunction";
import { fetchLobData } from "../../stores/slices/lobSlice";
import SearchComponent from "../../components/SearchComponent";
import { COMMON_FIELDS } from "../PartnerNeft/utils/constant";
import usePermissions from "../../hooks/usePermission";

function Product() {
  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(PAGECOUNT);
  const [order, setOrder] = useState(null);
  const [orderBy, setOrderBy] = useState(null);
  const [productData, setProductData] = useState([]);
  const [lobValue, setLobValue] = useState([]);
  const { products, productsLoading } = useSelector((state) => state.product);
  const { lob } = useSelector((state) => state.lob);

  const [searched, setSearched] = useState(COMMON_WORDS.LOB);

  // Check Permission
  const { canCreate, canUpdate } = usePermissions();

  useEffect(() => {
    dispatch(fetchLobData({ isAll: true }));
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      fetchAllProductData({
        page,
        pageSize,
        order,
        orderBy,
        childFieldsToFetch: COMMON_WORDS.LOB,
      })
    );
  }, [dispatch, page, pageSize, order, orderBy]);

  useEffect(() => {
    if (products?.length === 0) return;

    const transformedData =
      products?.data?.map((item) => {
        const { lob, product: {
          id,
          product,
          product_value,
          product_code,
          createdAt,
          updatedAt,
          status
        } } = item;

        let lobValue = lob && lob[0]?.lob;

        return {
          id: id,
          product: product,
          product_value: product_value,
          lob_name: lobValue,
          product_code: product_code,
          createdAt: createdAt,
          updatedAt: updatedAt,
          checked: status,
          status: status,
        };
      }) || [];

    setProductData(transformedData);
  }, [products, canUpdate]);

  const handleUpdate = useCallback(
    async (data) => {
      dispatch(updateProductData({ data }));
    },
    [dispatch]
  );

  const header = useMemo(() => Header(handleUpdate), [handleUpdate]);

  const optionLabel = (option, type) => {
    return option[type]?.toUpperCase() || "";
  };
  const renderOptionFunction = (props, option, type) => (
    <li {...props} key={option?.id}>
      {optionLabel(option, type)}
    </li>
  );

  const getOptionsData = () => {
    switch (searched) {
      case COMMON_WORDS.LOB:
        return lob?.data ?? [];
      default:
        return [];
    }
  };

  const getOption = () => {
    switch (searched) {
      case COMMON_WORDS.LOB:
        return lobValue;
      default:
        return [];
    }
  };

  const setOption = (option) => {
    switch (searched) {
      case COMMON_WORDS.LOB:
        setLobValue(option);
        break;
      default:
        break;
    }
  };

  const fetchIdsAndConvert = (inputData) => inputData.map((item) => item.id).join();
  const handleGo = useCallback(() => {
    setPage(0);
    let searchString = "";
    let edge = "";

    switch (searched) {
      case COMMON_WORDS.LOB:
        searchString = fetchIdsAndConvert(lobValue);
        edge = COMMON_FIELDS.hasLob;
        break;
      default:
        break;
    }

    if(searchString) {
      dispatch(
        fetchAllProductData({
          page,
          pageSize,
          order,
          orderBy,
          childFieldsToFetch: COMMON_WORDS.LOB,
          ids: searchString,
          edge: edge,
        })
      );
    }

  }, [searched, lobValue, dispatch, page, pageSize, order, orderBy]);

  return (
    <>
      <div className="mb-4">
        <SearchComponent
          optionsData={getOptionsData()}
          option={getOption()}
          setOption={setOption}
          optionLabel={(option) =>
            optionLabel(option, COMMON_WORDS[searched.toUpperCase()])
          }
          placeholder={getPlaceHolder(searched)}
          renderOptionFunction={(props, option) =>
            renderOptionFunction(
              props,
              option,
              COMMON_WORDS[searched.toUpperCase()]
            )
          }
          buttonText={BUTTON_TEXT.PRODUCT}
          navigateRoute="/product/product-form"
          searched={searched}
          setSearched={setSearched}
          // selectOptions={SEARCH_OPTIONS}
          handleGo={handleGo}
          showButton
          canCreate={canCreate}
        />
      </div>
      <CustomTable
        rows={productData}
        columns={header}
        loading={productsLoading}
        totalCount={products?.totalCount || 0}
        page={page}
        setPage={setPage}
        rowsPerPage={pageSize}
        setRowsPerPage={setPageSize}
        order={order}
        setOrder={setOrder}
        orderBy={orderBy}
        setOrderBy={setOrderBy}
        canUpdate={canUpdate}
      />
    </>
  );
}

export default Product;
