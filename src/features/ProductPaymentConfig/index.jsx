import React, { useEffect, useState } from 'react';
import SearchComponenet from '../../components/SearchComponent';
import styles from './styles.module.scss';
import TableHeader from './Table/TableHeader';
import ListLoader from '../../components/ListLoader';
import Table from './Table';
import NoDataFound from '../../components/NoDataCard';
import { MenuItem, Pagination, Select } from '@mui/material';
import { BUTTON_TEXT, PAGECOUNT, selectRowsData } from '../../utils/globalConstants';
import useGetPaymentConfig from './hooks/useGetPaymentConfig';
import useGetPayment from './hooks/useGetPayment';
import { ProductPayment } from './constants';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLobData } from '../../stores/slices/lobSlice';
import { fetchAllProductData } from '../../stores/slices/productSlice';
import { COMMON_WORDS } from '../../utils/constants';
import { getPlaceHolder } from '../../utils/globalizationFunction';
import { setTableName } from '../../stores/slices/exportSlice';
import usePermissions from '../../hooks/usePermission';

function getSelectedRowData(count) {
  let selectedRowData = [];

  for (let i = 0; i < selectRowsData.length; i++) {
    if (selectRowsData[i] <= count) {
      selectedRowData.push(selectRowsData[i]);
    }
  }

  return selectedRowData;
}

function ProductPaymentConfig() {
  const dispatch = useDispatch();
  const { lob } = useSelector((state) => state.lob);
  const { products } = useSelector((state) => state.product);
  const [searched, setSearched] = useState(COMMON_WORDS.PRODUCT);

  const [rowsPage, setRowsPage] = useState(PAGECOUNT);
  const [pageChange, setPageChange] = useState(1);
  const { canCreate, canUpdate } = usePermissions();

  const handlePaginationChange = (event, page) => {
    setPageChange(page);
  };

  useEffect(() => {
    dispatch(
      fetchLobData({
        isAll: true,
        status: true,
      })
    );
    dispatch(fetchAllProductData({ isAll: true }));
  }, [dispatch]);

  const { data, loading, sort, setSort, fetchData } = useGetPaymentConfig(pageChange, rowsPage);

  const { data: paymentData } = useGetPayment();

  const handleRowsChange = (event) => {
    setPageChange(1);
    setRowsPage(event.target.value);
  };

  const optionLabelProduct = (option) => {
    return option?.product ? option.product.toUpperCase() : '';
  };

  const renderOptionProductFunction = (props, option) => (
    <li {...props} key={option?.id}>
      {option?.product ? option?.product?.toUpperCase() : ''}
    </li>
  );

  const optionLabelLob = (option) => {
    return option?.lob ? option?.lob?.toUpperCase() : '';
  };

  const renderOptionLobFunction = (props, option) => (
    <li {...props} key={option?.id}>
      {option?.lob ? option?.lob?.toUpperCase() : ''}
    </li>
  );

  const fetchIdsAndConvert = (inputData) => {
    const ids = inputData.map((permission) => permission.id);
    return ids.join();
  };

  useEffect(() => {
    if (data && data?.data) {
      dispatch(setTableName(data?.data[0]?.productWisePaymentMethod.label));
    }
  }, [data, dispatch]);

  const onSubmit = (data) => {
    if (searched === COMMON_WORDS.PRODUCT) {
      const resultProductString = fetchIdsAndConvert(data.autocomplete);
      fetchData(searched, resultProductString);
    } else {
      const resultLobString = fetchIdsAndConvert(data.autocomplete);
      fetchData(searched, resultLobString);
    }
  };

  return (
    <div>
      <SearchComponenet
        optionsData={searched === COMMON_WORDS.PRODUCT ? products?.data ?? [] : lob?.data ?? []}
        fetchData={fetchData}
        optionLabel={searched === COMMON_WORDS.PRODUCT ? optionLabelProduct : optionLabelLob}
        placeholder={
          searched === COMMON_WORDS.PRODUCT ? getPlaceHolder(COMMON_WORDS.PRODUCT) : getPlaceHolder(COMMON_WORDS.LOB)
        }
        renderOptionFunction={searched === COMMON_WORDS.PRODUCT ? renderOptionProductFunction : renderOptionLobFunction}
        buttonText={BUTTON_TEXT.PRODUCT_PAYMENT}
        navigateRoute={'/product-payment-config/form'}
        searched={searched}
        setSearched={setSearched}
        selectOptions={ProductPayment}
        showButton
        showExportButton={true}
        canCreate={canCreate}
        onSubmit={onSubmit}
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
              canUpdate={canUpdate}
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
