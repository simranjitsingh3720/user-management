import React, { useEffect, useState } from 'react';
import CustomTable from '../../components/CustomTable';
import generateTableHeaders from './utils/generateTableHeaders';
import { useNavigate } from 'react-router-dom';
import SearchComponenet from '../../components/SearchComponent';
import { Box } from '@mui/material';
import useGetCkycData from './hooks/useGetCkycData';
import { BUTTON_TEXT, PAGECOUNT } from '../../utils/globalConstants';
import { COMMON_WORDS } from '../../utils/constants';
import { getPlaceHolder } from '../../utils/globalizationFunction';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLobData } from '../../stores/slices/lobSlice';
import { fetchAllProductData } from '../../stores/slices/productSlice';
import { setTableName } from '../../stores/slices/exportSlice';
import { CKYC_DROPDOWN } from './utils/constants';
import usePermissions from '../../hooks/usePermission';

function CkycConfig() {
  const dispatch = useDispatch();
  const { lob } = useSelector((state) => state.lob);
  const { products } = useSelector((state) => state.product);
  const [tableData, setTableData] = useState([]);
  const [query, setQuery] = useState('');
  const [searched, setSearched] = useState(COMMON_WORDS.PRODUCT);

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(PAGECOUNT);
  const [order, setOrder] = useState(COMMON_WORDS.ASC);
  const [orderBy, setOrderBy] = useState(COMMON_WORDS.CREATED_AT);

  const [productValue, setProductValue] = useState([]);
  const [lobValue, setLobValue] = useState([]);

  useEffect(() => {
    dispatch(fetchLobData({ isAll: true, status: true }));
    dispatch(fetchAllProductData({ isAll: true }));
  }, [dispatch]);
  const { data, loading, fetchData } = useGetCkycData(page, pageSize, order, orderBy);

  const { canCreate, canUpdate } = usePermissions();

  useEffect(() => {
    if (data && data?.data) {
      const refactorData = data?.data.map((item) => ({
        id: item?.cKYC?.id,
        label: item?.cKYC?.label,
        lob: item?.lobs[0]?.lob,
        product: item?.products[0]?.product,
        CKYCApplicable: item?.cKYC?.isCKYCApplicable ? COMMON_WORDS.ENABLE : COMMON_WORDS.DISABLE,
        forWhom: item?.cKYC?.forWhom,
        createdAt: item?.cKYC?.createdAt,
        updatedAt: item?.cKYC?.updatedAt,
      }));
      setTableData(refactorData);
      dispatch(setTableName(refactorData[0]?.label));
    }
  }, [data]);

  const navigate = useNavigate();

  const handleEditClick = (row) => {
    navigate(`/ckyc-config/form/${row.id}`);
  };

  const HEADER_COLUMNS = generateTableHeaders(handleEditClick);

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
    } else if (searched === COMMON_WORDS.LOB) {
      const resultLobString = fetchIdsAndConvert(lobValue);
      fetchData(searched, resultLobString);
    } else {
      fetchData(searched, '', query);
    }
  };

  const fetchIdsAndConvert = (inputData) => {
    const ids = inputData.map((permission) => permission.id);
    return ids.join();
  };
  const showTextField = ['forWhom'];

  const getOptionsData = () => {
    switch (searched) {
      case COMMON_WORDS.PRODUCT:
        return products?.data ?? [];
      case COMMON_WORDS.LOB:
        return lob?.data ?? [];
      default:
        return [];
    }
  };

  const getOption = () => {
    switch (searched) {
      case COMMON_WORDS.PRODUCT:
        return productValue;
      case COMMON_WORDS.LOB:
        return lobValue;
      default:
        return [];
    }
  };

  const setOption = (option) => {
    switch (searched) {
      case COMMON_WORDS.PRODUCT:
        setProductValue(option);
        break;
      case COMMON_WORDS.LOB:
        setLobValue(option);
        break;
      default:
        break;
    }
  };

  const optionLabel = (option, type) => {
    return option[type]?.toUpperCase() || '';
  };
  const renderOptionFunction = (props, option, type) => (
    <li {...props} key={option?.id}>
      {optionLabel(option, type)}
    </li>
  );

  return (
    <Box>
      <SearchComponenet
        optionsData={getOptionsData()}
        option={getOption()}
        setOption={setOption}
        fetchData={fetchData}
        optionLabel={(option) => optionLabel(option, searched)}
        placeholder={getPlaceHolder(searched)}
        renderOptionFunction={(props, option) => renderOptionFunction(props, option, searched)}
        buttonText={BUTTON_TEXT.CKYC_CONFIG}
        navigateRoute={'/ckyc-config/form'}
        searched={searched}
        textField={showTextField.includes(searched)}
        setQuery={setQuery}
        textFieldPlaceholder={COMMON_WORDS.SEARCH}
        setSearched={setSearched}
        selectOptions={CKYC_DROPDOWN}
        handleGo={handleGo}
        showButton
        canCreate={canCreate}
        showExportButton={true}
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
          canUpdate={canUpdate}
          setOrderBy={setOrderBy}
        />
      </div>
    </Box>
  );
}

export default CkycConfig;
