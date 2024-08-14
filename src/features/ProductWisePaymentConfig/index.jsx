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
import useGetPaymentConfigList from './hooks/useGetPaymentConfig';

const ProductWisePaymentConfig = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(PAGECOUNT);
  const [order, setOrder] = useState(COMMON_WORDS.DESC);
  const [orderBy, setOrderBy] = useState(COMMON_WORDS.CREATED_AT);
  const [searched, setSearched] = useState(COMMON_WORDS.PRODUCT);

  const { products } = useSelector((state) => state.product);
  const { lob } = useSelector((state) => state.lob);

  const { canCreate, canUpdate } = usePermissions();
  const { paymentConfigList, paymentConfigLoading, getPaymentConfigList, totalCount } = useGetPaymentConfigList();

  useEffect(() => {
    dispatch(setTableName(''));
    dispatch(setExtraColumns(EXPORT_DROPDOWN_COLUMNS));
    dispatch(fetchLobData({ isAll: true }));
    dispatch(fetchAllProductData({ isAll: true }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchPaymentConfigList = useCallback(() => {
    getPaymentConfigList({
      page,
      pageSize,
      order,
      orderBy,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize, order, orderBy]);

  useEffect(() => {
    fetchPaymentConfigList();
  }, [fetchPaymentConfigList]);

  const handleSubmit = (data) => {
    console.log(data);
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const HEADER = useMemo(() => generateHeader(handleEditClick), []);

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
          loading={paymentConfigLoading}
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

export default ProductWisePaymentConfig;
