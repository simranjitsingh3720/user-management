import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from './utils/Header';
import CustomTable from './../../components/CustomTable';
import { getGroup, getGroupById } from './../../stores/slices/groupSlice';
import { COMMON_WORDS } from '../../utils/constants';
import { PAGECOUNT } from '../../utils/globalConstants';
import { showDialog } from '../../stores/slices/dialogSlice';
import ConfirmAction from './Dialog/ConfirmAction';
import { useNavigate } from 'react-router-dom';
import PermissionContent from './Dialog/PermissionContent';
import SearchComponent from '../../components/SearchComponent';
import { COMMON_FIELDS } from '../PartnerNeft/utils/constant';
import { formatDate, getPlaceHolder } from '../../utils/globalizationFunction';
import { SEARCH_OPTIONS, showTextField } from './constants';
import Content from '../../components/CustomDialogContent';
import usePermissions from '../../hooks/usePermission';
import { fetchPermissions } from '../../stores/slices/permissionsSlice';

function GroupModule() {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(PAGECOUNT);
  const [order, setOrder] = useState(COMMON_WORDS.DESC);
  const [orderBy, setOrderBy] = useState(COMMON_WORDS.CREATED_AT);
  const [query, setQuery] = useState('');

  const [groupData, setGroupData] = useState([]);
  const { group, groupLoading } = useSelector((state) => state.group);
  const [searched, setSearched] = useState(COMMON_WORDS.GROUPNAME);
  const [permissionValue, setPermissionValue] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { canCreate, canUpdate } = usePermissions();

  const { data: permissionData } = useSelector((state) => state.permissions);

  useEffect(() => {
    dispatch(fetchPermissions());
  }, [dispatch]);

  const fetchGroupData = useCallback(() => {
    let searchString = '';
    let edge = '';
    let searchKey = '';
    let ids = '';
    let isExclusive = null;

    switch (searched) {
      case COMMON_WORDS.PERMISSIONNAME:
        ids = permissionValue.map((item) => item.id).join(',');
        edge = COMMON_FIELDS.hasPermission;
        isExclusive = true;
        break;
      case COMMON_WORDS.GROUPNAME:
        searchString = query;
        searchKey = searched;
        break;
      default:
        break;
    }

    const params = {
      page,
      pageSize,
      order,
      orderBy,
      ...(edge && { edge }),
      ...(searchString && { searchString }),
      ...(edge || searchString ? { searchKey } : {}),
      ...(ids && { ids }),
      isExclusive,
    };

    dispatch(getGroup(params));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, page, pageSize, order, orderBy, query, permissionValue]);

  useEffect(() => {
    fetchGroupData();
  }, [fetchGroupData]);

  const updateGroupStatus = useCallback((id, data) => {
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

    setGroupData(updatedData);
  }, []);

  useEffect(() => {
    const transformedData =
      group?.data?.map((item) => {
        const { id, groupName, label, createdAt, updatedAt, status } = item;
        return {
          id: id,
          groupName: groupName,
          label: label,
          createdAt: formatDate(createdAt),
          updatedAt: formatDate(updatedAt),
          checked: status,
          status: status,
        };
      }) || [];

    setGroupData(transformedData);
  }, [group]);

  const handleGroupStatus = useCallback(
    (data, row) => {
      dispatch(
        showDialog({
          title: COMMON_WORDS.CHANGE_STATUS,
          content: <Content label={COMMON_WORDS.GROUP} />,
          actions: <ConfirmAction row={row} groupData={data} handleGroupStatus={updateGroupStatus} />,
        })
      );
    },
    [dispatch, updateGroupStatus]
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

  const optionLabel = (option, type) => option[type] || '';

  const renderOptionFunction = (props, option, type) => (
    <li {...props} key={option?.id} style={{ textTransform: 'capitalize'}}>
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

  const onSubmit = (data) => {
    if (searched === COMMON_WORDS.PERMISSIONNAME) {
      setPermissionValue(data?.autocomplete || []);
      setQuery('');
    }
    if (searched === COMMON_WORDS.GROUPNAME) {
      setQuery(data?.search || '');
      setPermissionValue([]);
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
          placeholder={getPlaceHolder(COMMON_WORDS.PERMISSION)}
          renderOptionFunction={(props, option) =>
            renderOptionFunction(props, option, COMMON_WORDS[searched.toUpperCase()])
          }
          navigateRoute="/group/group-form"
          textField={showTextField.includes(searched)}
          textFieldPlaceholder={getPlaceHolder(COMMON_WORDS.GROUP)}
          searched={searched}
          setSearched={setSearched}
          selectOptions={SEARCH_OPTIONS}
          showButton
          canCreate={canCreate}
          onSubmit={onSubmit}
          fetchData={onSubmit}
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
          canUpdate={canUpdate}
        />
      </div>
    </>
  );
}

export default GroupModule;
