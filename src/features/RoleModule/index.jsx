import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ASC, BUTTON_TEXT, CREATED_AT, PAGECOUNT } from '../../utils/globalConstants';
import usePermissions from '../../hooks/usePermission';
import SearchComponent from '../../components/SearchComponent';
import { SEARCH_OPTIONS } from './utils/constants';
import { COMMON } from '../UserManagement/Components/utils/constants';
import CustomTable from '../../components/CustomTable';
import { Header } from './utils/Header';
import CustomDialog from '../../components/CustomDialog';
import { COMMON_WORDS } from '../../utils/constants';
import Content from '../../components/CustomDialogContent';
import Action from './Action';
import { showDialog } from '../../stores/slices/dialogSlice';
import { useDispatch } from 'react-redux';
import useRole from './hooks/useRole';
import { setTableName } from '../../stores/slices/exportSlice';

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

  const { fetchRoles, rolesList, loading, totalCount, setRolesList } = useRole();

  const updateRoleInState = useCallback(
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
      setRolesList(updatedData);
    },
    [setRolesList]
  );

  const handleEditClick = useCallback(
    (item) => {
      navigate(`/roles/role-form/${item.id}`);
    },
    [navigate]
  );
  
  const updateRoleStatus = useCallback(
    (data, row) => {
      dispatch(
        showDialog({
          title: COMMON_WORDS.CHANGE_STATUS,
          content: <Content label={COMMON_WORDS.ROLE} />,
          actions: <Action row={row} data={data} updateRoleInState={updateRoleInState} />,
        })
      );
    },
    [dispatch, updateRoleInState]
  );
  const header = useMemo(() => Header(handleEditClick, updateRoleStatus), [handleEditClick, updateRoleStatus]);

  const loadData = useCallback(() => {
    fetchRoles({
      pageNo: page,
      pageSize,
      sortKey: orderBy,
      sortOrder: order,
      searchString: query !== '' ? query : null,
      searchKey:query !== '' ? searched : null,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize, orderBy, order, query]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleGo = (data) => {
    setPage(0);
    setQuery(data?.search || '');
  };

  return (
    <>
      <div className="mb-4">
        <SearchComponent
          selectOptions={SEARCH_OPTIONS}
          searched={searched}
          setSearched={setSearched}
          textField
          textFieldPlaceholder={COMMON.SEARCH_PLACEHOLDER}
          setQuery={setQuery}
          buttonText={BUTTON_TEXT.ROLES}
          navigateRoute="/roles/role-form"
          onSubmit={handleGo}
          showExportButton={true}
          showButton
          canCreate={canCreate}
          fetchData={handleGo}
        />
      </div>

      <CustomTable
        rows={rolesList}
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
