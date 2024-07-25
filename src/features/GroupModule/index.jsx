import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from './utils/Header';
import CustomTable from './../../components/CustomTable';
import { getGroup, getGroupById } from './../../stores/slices/groupSlice';
import { COMMON_WORDS } from '../../utils/constants';
import { BUTTON_TEXT, PAGECOUNT } from '../../utils/globalConstants';
import { showDialog } from '../../stores/slices/dialogSlice';
import ConfirmAction from './Dialog/ConfirmAction';
import CustomDialog from '../../components/CustomDialog';
import { useNavigate } from 'react-router-dom';
import PermissionContent from './Dialog/PermissionContent';
import SearchComponent from '../../components/SearchComponent';
import { COMMON_FIELDS } from '../PartnerNeft/utils/constant';
import { getPlaceHolder } from '../../utils/globalizationFunction';
import { SEARCH_OPTIONS, showTextField } from './constants';
import useGetPermission from './hooks/useGetPermission';
import Content from '../../components/CustomDialogContent';
import usePermissions from '../../hooks/usePermission';

function GroupModule() {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(PAGECOUNT);
  const [order, setOrder] = useState(null);
  const [orderBy, setOrderBy] = useState(null);
  const [query, setQuery] = useState('');

  const [groupData, setGroupData] = useState([]);
  const { group, groupLoading } = useSelector((state) => state.group);
  const [searched, setSearched] = useState(COMMON_WORDS.GROUPNAME);
  const [permissionValue, setPermissionValue] = useState([]);
  const { permissionData } = useGetPermission();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { canCreate, canUpdate } = usePermissions();

  const fetchGroupData = useCallback(() => {
    let searchString = '';
    let edge = '';
    let searchKey = '';
  
    switch (searched) {
      case COMMON_WORDS.PERMISSIONNAME:
        searchString = permissionValue.map((item) => item.id).join(',');
        edge = COMMON_FIELDS.hasPermission;
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
    };
  
    dispatch(getGroup(params));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, page, pageSize, order, orderBy]);
  
  const handleGo = useCallback(() => {
    setPage(0);
  }, []);

  useEffect(() => {
    fetchGroupData();
  }, [fetchGroupData]);

  const updateGroupStatus = useCallback(
    (id, data) => {
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
    },
    []
  );

  useEffect(() => {
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
    (data, row) => {
      dispatch(
        showDialog({
          title: COMMON_WORDS.CHANGE_STATUS,
          content: <Content label={COMMON_WORDS.GROUP} />,
          actions: <ConfirmAction row={row} groupData={data} handleGroupStatus={updateGroupStatus}  />,
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

  const optionLabel = (option, type) => option[type]?.toUpperCase() || '';

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
          textField={showTextField.includes(searched)}
          setQuery={setQuery}
          textFieldPlaceholder={getPlaceHolder(COMMON_WORDS.GROUP)}
          searched={searched}
          setSearched={setSearched}
          selectOptions={SEARCH_OPTIONS}
          handleGo={handleGo}
          showButton
          canCreate={canCreate}
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

        <CustomDialog />
      </div>
    </>
  );
}

export default GroupModule;
