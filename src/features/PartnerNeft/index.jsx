import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SearchComponent from '../../components/SearchComponent';
import CustomTable from '../../components/CustomTable';
import useGetPartnerNeft from './hooks/useGetPartnerNeft';
import { Header } from './utils/header';
import { BUTTON_TEXT, PAGECOUNT } from '../../utils/globalConstants';
import { fetchLobData } from '../../stores/slices/lobSlice';
import { fetchAllProductData } from '../../stores/slices/productSlice';
import { COMMON_FIELDS, SEARCH_OPTIONS } from './utils/constant';
import { COMMON_WORDS } from '../../utils/constants';
import { fetchUser } from '../../stores/slices/userSlice';
import { getPlaceHolder } from '../../utils/globalizationFunction';
import { setTableName } from '../../stores/slices/exportSlice';
import usePermissions from '../../hooks/usePermission';

const PartnerNeft = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { lob } = useSelector((state) => state.lob);
  const { products } = useSelector((state) => state.product);
  const { user } = useSelector((state) => state.user);

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(PAGECOUNT);
  const [order, setOrder] = useState('');
  const [orderBy, setOrderBy] = useState('');
  const [searched, setSearched] = useState(COMMON_WORDS.PRODUCT);
  const [productValue, setProductValue] = useState([]);
  const [lobValue, setLobValue] = useState([]);
  const [userValue, setUserValue] = useState([]);

  const { getPartnerNeft, partnerNeftData, partnerNeftLoading, totalCount } = useGetPartnerNeft();

  // Check Permission
  const { canCreate, canUpdate } = usePermissions();

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
    switch (searched) {
      case COMMON_WORDS.PRODUCT:
        setLobValue([]);
        setUserValue([]);
        break;
      case COMMON_WORDS.LOB:
        setProductValue([]);
        setUserValue([]);
        break;
      case COMMON_WORDS.PRODUCER:
        setProductValue([]);
        setLobValue([]);
        break;
      default:
        break;
    }
  }, [searched]);

  useEffect(() => {
    dispatch(
      fetchLobData({
        isAll: true,
        status: true,
      })
    );
    dispatch(fetchAllProductData({ isAll: true }));
    dispatch(
      fetchUser({
        userType: COMMON_WORDS.PRODUCER,
        searchKey: COMMON_WORDS.ROLE_NAME,
      })
    );
  }, [dispatch]);

  useEffect(() => {
    dispatch(setTableName(partnerNeftData[0]?.label));
  }, [dispatch, partnerNeftData]);

  const fetchIdsAndConvert = (inputData) => inputData.map((item) => item.id).join();

  const handleGo = useCallback(() => {
    let searchString = '';
    let edge = '';

    switch (searched) {
      case COMMON_WORDS.PRODUCT:
        searchString = fetchIdsAndConvert(productValue);
        edge = COMMON_FIELDS.hasProduct;
        break;
      case COMMON_WORDS.LOB:
        searchString = fetchIdsAndConvert(lobValue);
        edge = COMMON_FIELDS.hasLob;
        break;
      case COMMON_WORDS.PRODUCER:
        searchString = fetchIdsAndConvert(userValue);
        edge = COMMON_FIELDS.hasProducer;
        break;
      default:
        break;
    }

    if (searchString) {
      getPartnerNeft({
        childFieldsToFetch: COMMON_FIELDS.childFieldsToFetch,
        childFieldsEdge: COMMON_FIELDS.childFieldsEdge,
        ids: searchString,
        isExclusive: true,
        edge: edge,
      });
    } else {
      loadData();
    }
  }, [searched, productValue, lobValue, userValue, getPartnerNeft, loadData]);

  const updateNeftForm = useCallback(
    (row) => {
      navigate('/partner-neft/form/' + row.id);
    },
    [navigate]
  );

  const optionLabel = (option, type) => {
    if (type === COMMON_WORDS.PRODUCER) return option['firstName'] + ' ' + option['lastName'];

    return option[type]?.toUpperCase() || '';
  };
  const renderOptionFunction = (props, option, type) => (
    <li {...props} key={option?.id}>
      {optionLabel(option, type)}
    </li>
  );

  const header = useMemo(() => Header(updateNeftForm), [updateNeftForm]);

  const getOptionsData = () => {
    switch (searched) {
      case COMMON_WORDS.PRODUCT:
        return products?.data ?? [];
      case COMMON_WORDS.LOB:
        return lob?.data ?? [];
      case COMMON_WORDS.PRODUCER:
        return user?.data ?? [];
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
      case COMMON_WORDS.PRODUCER:
        return userValue;
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
      case COMMON_WORDS.PRODUCER:
        setUserValue(option);
        break;
      default:
        break;
    }
  };

  return (
    <Box>
      <SearchComponent
        optionsData={getOptionsData()}
        option={getOption()}
        setOption={setOption}
        optionLabel={(option) => optionLabel(option, COMMON_WORDS[searched.toUpperCase()])}
        placeholder={getPlaceHolder(searched)}
        renderOptionFunction={(props, option) =>
          renderOptionFunction(props, option, COMMON_WORDS[searched.toUpperCase()])
        }
        buttonText={BUTTON_TEXT.PARTNER_NEFT}
        navigateRoute="/partner-neft/form"
        searched={searched}
        setSearched={setSearched}
        selectOptions={SEARCH_OPTIONS}
        handleGo={handleGo}
        showButton
        showExportButton={true}
        canCreate={canCreate}
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
          canUpdate={canUpdate}
        />
      </div>
    </Box>
  );
};

export default PartnerNeft;
