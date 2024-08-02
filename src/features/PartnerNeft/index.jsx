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
import { setExtraColumns, setTableName } from '../../stores/slices/exportSlice';
import usePermissions from '../../hooks/usePermission';
import { ExtraColumnsEnum } from '../../utils/ExtraColumnsEnum';

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
  const [idArr, setIdsArr] = useState('');
  const [edge, setEdge] = useState('');

  const { getPartnerNeft, partnerNeftData, partnerNeftLoading, totalCount } = useGetPartnerNeft();
  const { canCreate, canUpdate } = usePermissions();

  const loadData = useCallback(() => {
    getPartnerNeft({
      sortKey: orderBy,
      sortOrder: order,
      pageNo: page,
      pageSize,
      childFieldsToFetch: COMMON_FIELDS.childFieldsToFetch,
      childFieldsEdge: COMMON_FIELDS.childFieldsEdge,
      edge: idArr ? edge : '',
      ids: idArr ? idArr : '',
      isExclusive: idArr ? true : null,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderBy, order, page, pageSize, idArr]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    dispatch(setTableName(''));
    dispatch(setExtraColumns([]));
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
        isAll: true,
      })
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(setTableName(partnerNeftData?.[0]?.label));
    dispatch(
      setExtraColumns([
        ExtraColumnsEnum.PRODUCT,
        ExtraColumnsEnum.LOB,
        ExtraColumnsEnum.FIRST_NAME,
        ExtraColumnsEnum.LAST_NAME,
        ExtraColumnsEnum.PRODUCER_CODE,
      ])
    );
  }, [dispatch, partnerNeftData]);

  const fetchIdsAndConvert = (inputData) => inputData.map((item) => item.id).join();

  const handleGo = (data) => {
    setPage(0);
    switch (searched) {
      case COMMON_WORDS.PRODUCT:
        setEdge(COMMON_FIELDS.hasProduct);
        break;
      case COMMON_WORDS.LOB:
        setEdge(COMMON_FIELDS.hasLob);
        break;
      case COMMON_WORDS.PRODUCER:
        setEdge(COMMON_FIELDS.hasProducer);
        break;
      default:
        setEdge('');
        break;
    }

    if (data?.autocomplete) {
      setIdsArr(fetchIdsAndConvert(data?.autocomplete));
    } else {
      setIdsArr('');
    }
  };

  const updateNeftForm = useCallback(
    (row) => {
      navigate('/partner-neft/form/' + row.id);
    },
    [navigate]
  );

  const optionLabel = (option, type) => {
    if (type === COMMON_WORDS.PRODUCER) return option['firstName'] + ' ' + option['lastName'];

    return option[type] || '';
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
        onSubmit={handleGo}
        fetchData={handleGo}
        showButton
        showExportButton={true}
        canCreate={canCreate}
        showBulkUploadButton={true}
        tableHeader={header}
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
