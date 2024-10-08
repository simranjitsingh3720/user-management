import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from './utils/header';
import CustomTable from '../../components/CustomTable';
import { clearProducts, fetchAllProductData } from '../../stores/slices/productSlice';
import { COMMON_WORDS } from '../../utils/constants';
import { PAGECOUNT } from '../../utils/globalConstants';
import { formatDate, getPlaceHolder } from '../../utils/globalizationFunction';
import { fetchLobData } from '../../stores/slices/lobSlice';
import SearchComponent from '../../components/SearchComponent';
import { COMMON_FIELDS } from '../PartnerNeft/utils/constant';
import usePermissions from '../../hooks/usePermission';
import { SEARCH_OPTIONS } from './utils/constant';
import { showDialog } from '../../stores/slices/dialogSlice';
import Content from '../../components/CustomDialogContent';
import Action from './Action';

function Product() {
  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(PAGECOUNT);
  const [order, setOrder] = useState(COMMON_WORDS.DESC);
  const [orderBy, setOrderBy] = useState(COMMON_WORDS.CREATED_AT);
  const [productData, setProductData] = useState([]);
  const [lobValue, setLobValue] = useState([]);
  const { products, productsLoading } = useSelector((state) => state.product);
  const { lob } = useSelector((state) => state.lob);

  const [searched, setSearched] = useState(COMMON_WORDS.LOB);
  const [ids, setIds] = useState('');
  const [edge, setEdge] = useState('');

  // Check Permission
  const { canCreate, canUpdate } = usePermissions();

  useEffect(() => {
    dispatch(fetchLobData({ isAll: true }));
  }, [dispatch]);

  const getProudctData = useCallback(() => {
    dispatch(
      fetchAllProductData({
        page,
        pageSize,
        order,
        orderBy,
        ids: ids ? ids : '',
        edge: ids ? edge : '',
        isExclusive: ids ? true : '',
        childFieldsToFetch: COMMON_WORDS.LOB,
      })
    );
  }, [page, pageSize, order, orderBy, ids, edge, dispatch]);

  useEffect(() => {
    getProudctData();
  }, [getProudctData]);

  useEffect(() => {
    if (products?.length === 0) return;

    if (products?.data?.[0]?.id) {
      dispatch(clearProducts());
      return;
    }

    const transformedData =
      products?.data?.map((item) => {
        const {
          lob,
          gc_product_master: { id, product, productValue, productCode, createdAt, updatedAt, status },
        } = item;

        let lobValue = lob && lob[0]?.lob;

        return {
          id: id,
          product: product,
          productValue: productValue,
          lobName: lobValue,
          productCode: productCode,
          createdAt: formatDate(createdAt),
          updatedAt: formatDate(updatedAt),
          checked: status,
          status: status,
        };
      }) || [];

    setProductData(transformedData);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);

  const updateProductStatus = useCallback((id, data) => {
    const updatedData = data.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          checked: !item.checked,
          status: !item.status,
        };
      }
      return item;
    });

    setProductData(updatedData);
  }, []);

  const handleStatusUpdate = useCallback(
    (data, row) => {
      dispatch(
        showDialog({
          title: COMMON_WORDS.CHANGE_STATUS,
          content: <Content label={COMMON_WORDS.PRODUCT} />,
          actions: <Action row={row} productData={data} updateProductStatus={updateProductStatus} />,
        })
      );
    },
    [dispatch, updateProductStatus]
  );

  const header = useMemo(() => Header(handleStatusUpdate), [handleStatusUpdate]);

  const optionLabel = (option, type) => {
    return option[type] || '';
  };
  const renderOptionFunction = (props, option, type) => (
    <li {...props} key={option?.id} style={{ textTransform: 'capitalize' }}>
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
  const handleGo = (data) => {
    setPage(0);

    let ids = data?.autocomplete ? fetchIdsAndConvert(data?.autocomplete) : '';

    switch (searched) {
      case COMMON_WORDS.LOB:
        setEdge(COMMON_FIELDS.hasLob);
        setIds(ids);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className="mb-4">
        <SearchComponent
          optionsData={getOptionsData()}
          option={getOption()}
          setOption={setOption}
          optionLabel={(option) => optionLabel(option, COMMON_WORDS[searched.toUpperCase()])}
          placeholder={getPlaceHolder(searched)}
          renderOptionFunction={(props, option) =>
            renderOptionFunction(props, option, COMMON_WORDS[searched.toUpperCase()])
          }
          navigateRoute="/product/product-form"
          searched={searched}
          setSearched={setSearched}
          onSubmit={handleGo}
          fetchData={handleGo}
          showButton
          canCreate={canCreate}
          selectOptions={SEARCH_OPTIONS}
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
