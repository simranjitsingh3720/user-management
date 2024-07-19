import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ASC, BUTTON_TEXT, CREATED_AT, PAGECOUNT } from '../../utils/globalConstants';
import usePermissions from '../../hooks/usePermission';
import SearchComponent from '../../components/SearchComponent';
import { SEARCH_OPTIONS } from './utils/constants';
import { SEARCH_PLACEHOLDER } from '../UserManagement/Components/utils/constants';
import CustomTable from '../../components/CustomTable';
import { Header } from './utils/Header';
import CustomDialog from '../../components/CustomDialog';
import { COMMON_WORDS } from '../../utils/constants';
import Content from '../../components/CustomDialogContent';
import Action from './Action';
import { showDialog } from '../../stores/slices/dialogSlice';
import { useDispatch } from 'react-redux';
import useRole from './hooks/useRole';

function RoleModule() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(PAGECOUNT);
  const [order, setOrder] = useState(ASC);
  const [orderBy, setOrderBy] = useState(CREATED_AT);
  const [searched, setSearched] = useState(SEARCH_OPTIONS[0].value);
  const [query, setQuery] = useState('');
  const { canCreate, canUpdate } = usePermissions();

  const { fetchRoles, data, loading, totalCount, setData } = useRole();

  const updateRoleInState = useCallback((id, data) => {
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
    setData(updatedData);
  }, [setData]);

  const handleGo = () => {
    if (query !== '') {
      fetchRoles({
        sortKey: orderBy,
        sortOrder: order,
        pageNo: page,
        pageSize,
        searchString: query,
        searchKey: searched,
      });
    } else {
      loadData();
    }
  };

  const handleEditClick = useCallback(
    (item) => {
      navigate(`/roles/role-form/${item.id}`);
    },
    [navigate]
  );

  const loadData = useCallback(() => {
    fetchRoles({
      pageNo: page,
      pageSize,
      sortKey: orderBy,
      sortOrder: order,
    });
  }, [fetchRoles, page, pageSize, orderBy, order]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const updateRoleStatus = useCallback(
    (data, row) => {
      dispatch(
        showDialog({
          title: COMMON_WORDS.CHANGE_STATUS,
          content: <Content label={COMMON_WORDS.ROLE} />,
          actions: <Action row={row} data={data} updateRoleInState={updateRoleInState}/>,
        })
      );
    },
    [dispatch, updateRoleInState]
  );

  const header = useMemo(() => Header(handleEditClick, updateRoleStatus), [handleEditClick, updateRoleStatus]);

  return (
    <>
      <div className="mb-4">
        <SearchComponent
          selectOptions={SEARCH_OPTIONS}
          searched={searched}
          setSearched={setSearched}
          textField
          textFieldPlaceholder={SEARCH_PLACEHOLDER}
          setQuery={setQuery}
          buttonText={BUTTON_TEXT.ROLES}
          navigateRoute="/roles/role-form"
          handleGo={handleGo}
          showExportButton={true}
          showButton
          canCreate={canCreate}
        />
      </div>

      <CustomTable
        rows={data}
        loading={loading}
        totalCount={totalCount}
        canUpdate={canUpdate}
        columns={header}
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
    </>
  );
}

export default RoleModule;
