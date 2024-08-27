import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PAGECOUNT } from '../../utils/globalConstants';
import { COMMON_WORDS } from '../../utils/constants';
import { setExtraColumns, setTableName } from '../../stores/slices/exportSlice';
import SearchComponent from '../../components/SearchComponent';
import usePermissions from '../../hooks/usePermission';
import { EXPORT_DROPDOWN_COLUMNS, PRODUCT_PAYMENT_SEARCH } from './utils/constants';
import { fetchLobData } from '../../stores/slices/lobSlice';
import { fetchAllProductData } from '../../stores/slices/productSlice';
import { getPlaceHolder } from '../../utils/globalizationFunction';
import CustomTable from '../../components/CustomTable';
import generateHeader from './utils/Header';
import { useNavigate } from 'react-router-dom';
import useGetPaymentType from './hooks/useGetPayment';
import useGetPaymentConfigList from './hooks/useGetPaymentConfigList';

const ProductPaymentConfig = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(PAGECOUNT);
  const [order, setOrder] = useState(COMMON_WORDS.DESC);
  const [orderBy, setOrderBy] = useState(COMMON_WORDS.CREATED_AT);
  const [searched, setSearched] = useState(COMMON_WORDS.PRODUCT);
  const [resultProductString, setResultProductString] = useState('');

  const { products } = useSelector((state) => state.product);
  const { lob } = useSelector((state) => state.lob);

  const { canCreate, canUpdate } = usePermissions();
  const { paymentConfigList, paymentConfigLoading, getPaymentConfigList, totalCount } = useGetPaymentConfigList();
  const { paymentTypeList, paymentTypeLoading } = useGetPaymentType();

  useEffect(() => {
    dispatch(setTableName(''));
    dispatch(setExtraColumns(EXPORT_DROPDOWN_COLUMNS));
    dispatch(fetchLobData({ isAll: true }));
    dispatch(fetchAllProductData({ isAll: true }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchPaymentConfigList = useCallback(
    (paymentTypeList) => {
      getPaymentConfigList({
        page,
        pageSize,
        order,
        orderBy,
        paymentTypeList: paymentTypeList,
        resultProductString,
        searched,
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [page, pageSize, order, orderBy, resultProductString]
  );

  useEffect(() => {
    if (paymentTypeList && paymentTypeList.data?.length > 0) {
      fetchPaymentConfigList(paymentTypeList.data);
    }
  }, [fetchPaymentConfigList, paymentTypeList]);

  useEffect(() => {
    if (paymentConfigList.length > 0) {
      dispatch(setTableName(paymentConfigList[0].label));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentConfigList]);

  const handleSubmit = (data) => {
    setPage(0);
    if (searched === COMMON_WORDS.PRODUCT) {
      setResultProductString(data?.autocomplete?.map((item) => item.id).join(','));
    } else if (searched === COMMON_WORDS.LOB) {
      setResultProductString(data?.autocomplete?.map((item) => item.id).join(','));
    } else {
      setResultProductString('');
    }
  };

  const optionLabelProduct = (option) => {
    return option?.product ? option.product : '';
  };

  const optionLabelLob = (option) => {
    return option?.lob ? option?.lob : '';
  };

  const handleEditClick = (row) => {
    navigate(`/product-payment-config/form/${row.id}`);
  };

  const HEADER = useMemo(() => {
    if (paymentTypeList && paymentTypeList.data?.length > 0) {
      return generateHeader({ handleEditClick, paymentTypeList: paymentTypeList.data });
    }
    return [];

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentTypeList]);

  return (
    <>
      <SearchComponent
        optionsData={searched === COMMON_WORDS.PRODUCT ? products?.data ?? [] : lob?.data ?? []}
        fetchData={handleSubmit}
        optionLabel={searched === COMMON_WORDS.PRODUCT ? optionLabelProduct : optionLabelLob}
        placeholder={
          searched === COMMON_WORDS.PRODUCT ? getPlaceHolder(COMMON_WORDS.PRODUCT) : getPlaceHolder(COMMON_WORDS.LOB)
        }
        navigateRoute={'/product-payment-config/form'}
        searched={searched}
        setSearched={setSearched}
        selectOptions={PRODUCT_PAYMENT_SEARCH}
        showButton
        showExportButton={true}
        canCreate={canCreate}
        onSubmit={handleSubmit}
        showBulkUploadButton={true}
        tableHeader={HEADER}
      />

      <div className="mt-4">
        <CustomTable
          rows={paymentConfigList}
          columns={HEADER}
          loading={paymentConfigLoading || paymentTypeLoading}
          totalCount={totalCount}
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
      </div>
    </>
  );
};

export default ProductPaymentConfig;
