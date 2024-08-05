import React, { useCallback, useEffect, useState } from 'react';
import CustomTable from '../../components/CustomTable';
import generateTableHeaders from './utils/generateTableHeaders';
import { useNavigate } from 'react-router-dom';
import SearchComponenet from '../../components/SearchComponent';
import { Box } from '@mui/material';
import useGetCkycData from './hooks/useGetCkycData';
import { PAGECOUNT } from '../../utils/globalConstants';
import { COMMON_WORDS } from '../../utils/constants';
import { getPlaceHolder } from '../../utils/globalizationFunction';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLobData } from '../../stores/slices/lobSlice';
import { fetchAllProductData } from '../../stores/slices/productSlice';
import { setExtraColumns, setTableName } from '../../stores/slices/exportSlice';
import { CKYC_DROPDOWN } from './utils/constants';
import usePermissions from '../../hooks/usePermission';
import { ExtraColumnsEnum } from '../../utils/ExtraColumnsEnum';

function CkycConfig() {
  const dispatch = useDispatch();
  const { lob } = useSelector((state) => state.lob);
  const { products } = useSelector((state) => state.product);
  const [tableData, setTableData] = useState([]);
  const [searched, setSearched] = useState(COMMON_WORDS.PRODUCT);

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(PAGECOUNT);
  const [order, setOrder] = useState(COMMON_WORDS.ASC);
  const [orderBy, setOrderBy] = useState(COMMON_WORDS.CREATED_AT);
  const [query, setQuery] = useState('');
  const [resultProductString, setResultProductString] = useState('');
  const { ckycList, loading, fetchData } = useGetCkycData();
  const { canCreate, canUpdate } = usePermissions();

  useEffect(() => {
    dispatch(fetchLobData({ isAll: true, status: true }));
    dispatch(fetchAllProductData({ isAll: true }));
    dispatch(setTableName(''));
    dispatch(setExtraColumns([]));
  }, [dispatch]);

  const getCkyc = useCallback(() => {
    fetchData({ page, pageSize, order, orderBy, searched, resultProductString, query });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize, order, orderBy, resultProductString, query]);

  useEffect(() => {
    getCkyc();
  }, [getCkyc]);

  useEffect(() => {
    if (ckycList && ckycList?.data) {
      const refactorData = ckycList?.data.map((item) => ({
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
      dispatch(setExtraColumns([ExtraColumnsEnum.PRODUCT, ExtraColumnsEnum.LOB]));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ckycList]);

  const navigate = useNavigate();

  const handleEditClick = (row) => {
    navigate(`/ckyc-config/form/${row.id}`);
  };

  const HEADER_COLUMNS = generateTableHeaders(handleEditClick);

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

  const optionLabel = (option, type) => {
    return option[type] || '';
  };
  const renderOptionFunction = (props, option, type) => (
    <li {...props} key={option?.id} style={{ textTransform: 'capitalize' }}>
      {optionLabel(option, type)}
    </li>
  );

  const onSubmit = (data) => {
    setPage(0);
    setQuery(data?.search || '');

    if (data === undefined) {
      setResultProductString('');
    } else {
      setResultProductString(fetchIdsAndConvert(data?.autocomplete || []));
    }
  };

  return (
    <Box>
      <SearchComponenet
        optionsData={getOptionsData()}
        fetchData={onSubmit}
        optionLabel={(option) => optionLabel(option, searched)}
        placeholder={getPlaceHolder(searched)}
        renderOptionFunction={(props, option) => renderOptionFunction(props, option, searched)}
        navigateRoute={'/ckyc-config/form'}
        searched={searched}
        textField={showTextField.includes(searched)}
        textFieldPlaceholder={COMMON_WORDS.SEARCH}
        setSearched={setSearched}
        selectOptions={CKYC_DROPDOWN}
        onSubmit={onSubmit}
        showButton
        canCreate={canCreate}
        showExportButton={true}
        tableHeader={HEADER_COLUMNS}
      />
      <div className="mt-4">
        <CustomTable
          columns={HEADER_COLUMNS}
          rows={tableData}
          loading={loading}
          totalCount={ckycList?.totalCount || 0}
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
