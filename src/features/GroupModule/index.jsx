import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from './utils/Header';
import CustomTable from './../../components/CustomTable';
import { getGroup, getGroupById } from './../../stores/slices/groupSlice';
import { COMMON_WORDS } from '../../utils/constants';
import { BUTTON_TEXT } from '../../utils/globalConstants';
import { showDialog } from '../../stores/slices/dialogSlice';
import ConfirmContent from './Dialog/ConfirmContent';
import ConfirmAction from './Dialog/ConfirmAction';
import CustomDialog from '../../components/CustomDialog';
import { useNavigate } from 'react-router-dom';
import PermissionContent from './Dialog/PermissionContent';
import SearchComponent from '../../components/SearchComponent';
import { COMMON_FIELDS } from '../PartnerNeft/utils/constant';
import { getPlaceHolder } from '../../utils/globalizationFunction';
import { SEARCH_OPTIONS } from './constants';
import useGetPermission from './hooks/useGetPermission';

function GroupModule() {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [order, setOrder] = useState(null);
  const [orderBy, setOrderBy] = useState(null);

  const [groupData, setGroupData] = useState([]);
  const { group, groupLoading } = useSelector((state) => state.group);
  const [searched, setSearched] = useState(COMMON_WORDS.PERMISSIONNAME);
  const [permissionValue, setPermissionValue] = useState([]);
  const { permissionData } = useGetPermission();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getGroup({ isAll: true }));
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      getGroup({
        page,
        pageSize,
        order,
        orderBy,
      })
    );
  }, [dispatch, page, pageSize, order, orderBy]);

  useEffect(() => {
    if (group?.data?.length === 0) return;

    const transformedData =
      group?.data?.map((item) => {
        return {
          id: item.id,
          groupName: item.groupName,
          label: item.label,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
          checked: item.status,
          status: item.status,
        };
      }) || [];

    setGroupData(transformedData);
  }, [group]);

  const handleGroupStatus = useCallback(
    (data) => {
      dispatch(
        showDialog({
          title: COMMON_WORDS.CHANGE_STATUS,
          content: <ConfirmContent />,
          actions: <ConfirmAction row={data} />,
        })
      );
    },
    [dispatch]
  );

  const showGroupPermission = useCallback(
    (data) => {
      dispatch(
        showDialog({
          title: COMMON_WORDS.PERMISSION,
          content: <PermissionContent data={data} />,
        })
      );
    },
    [dispatch]
  );

  const handleGroupEdit = useCallback(
    (data) => {
      dispatch(getGroupById({ id: data.id }));
      navigate(`/group/group-form/${data.id}`);
    },
    [dispatch, navigate]
  );

  const header = useMemo(
    () => Header(handleGroupStatus, showGroupPermission, handleGroupEdit),
    [handleGroupStatus, showGroupPermission, handleGroupEdit]
  );

  const optionLabel = (option, type) => {
    return option[type]?.toUpperCase() || '';
  };

  const renderOptionFunction = (props, option, type) => (
    <li {...props} key={option?.id}>
      {optionLabel(option, type)}
    </li>
  );

  const getOptionsData = () => {
    switch (searched) {
      case COMMON_WORDS.PERMISSIONNAME:
        return permissionData?.data ?? [];
      default:
        return [];
    }
  };

  const getOption = () => {
    switch (searched) {
      case COMMON_WORDS.PERMISSIONNAME:
        return permissionValue;
      default:
        return [];
    }
  };

  const setOption = (option) => {
    switch (searched) {
      case COMMON_WORDS.PERMISSIONNAME:
        setPermissionValue(option);
        break;
      default:
        break;
    }
  };

  const fetchIdsAndConvert = (inputData) => inputData.map((item) => item.id).join();
  
  const handleGo = useCallback(() => {
    setPage(0);
    let searchString = '';
    let edge = '';

    switch (searched) {
      case COMMON_WORDS.PERMISSIONNAME:
        searchString = fetchIdsAndConvert(permissionValue);
        edge = COMMON_FIELDS.hasPermission;
        break;
      default:
        break;
    }

    if (searchString) {
      dispatch(
        getGroup({
          page,
          pageSize,
          order,
          orderBy,
          ids: searchString,
          edge: edge,
        })
      );
    }
  }, [searched, permissionValue, dispatch, page, pageSize, order, orderBy]);

  return (
    <>
      <div className="mb-4">
        <SearchComponent
          optionsData={getOptionsData()}
          option={getOption()}
          setOption={setOption}
          optionLabel={(option) => optionLabel(option, COMMON_WORDS[searched.toUpperCase()])}
          placeholder={getPlaceHolder(COMMON_WORDS.PERMISSION)}
          renderOptionFunction={(props, option) =>
            renderOptionFunction(props, option, COMMON_WORDS[searched.toUpperCase()])
          }
          buttonText={BUTTON_TEXT.GROUP}
          navigateRoute="/group/group-form"
          searched={searched}
          setSearched={setSearched}
          selectOptions={SEARCH_OPTIONS}
          handleGo={handleGo}
          showButton
        />
      </div>
      <div>
        <CustomTable
          rows={groupData || []}
          columns={header}
          loading={groupLoading}
          totalCount={group?.totalCount || 0}
          page={page}
          setPage={setPage}
          rowsPerPage={pageSize}
          setRowsPerPage={setPageSize}
          order={order}
          setOrder={setOrder}
          orderBy={orderBy}
          setOrderBy={setOrderBy}
        />

        <CustomDialog />
      </div>
    </>
  );
}

export default GroupModule;
