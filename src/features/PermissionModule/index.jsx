import React, { useCallback, useEffect, useState } from 'react';
import useGetPrivilege from './hooks/useGetPrivilege';
import { BUTTON_TEXT, PAGECOUNT } from '../../utils/globalConstants';
import CustomTable from '../../components/CustomTable';
import generateTableHeaders from './utils/generateTableHeaders';
import { COMMON_WORDS } from '../../utils/constants';
import { useDispatch } from 'react-redux';
import { showDialog } from '../../stores/slices/dialogSlice';
import SearchComponent from '../../components/SearchComponent';
import { PrivilegeSearch } from './constants';
import Actions from './Dialog/Action';
import CustomDialog from '../../components/CustomDialog';
import Content from '../../components/CustomDialogContent';
import usePermissions from '../../hooks/usePermission';

function PermissionModule() {
  const dispatch = useDispatch();

  const [searched, setSearched] = useState('permissionName');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(PAGECOUNT);
  const [order, setOrder] = useState(COMMON_WORDS.ASC);
  const [orderBy, setOrderBy] = useState(COMMON_WORDS.CREATED_AT);

  const { canCreate, canUpdate } = usePermissions();
  const { fetchPermission, permissions, loading, totalCount } = useGetPrivilege();

  /**
   * @description Update status of the permission
   * @param data 
   * @param row 
   */
  const handleClicked = ({row}) => {
    dispatch(
      showDialog({
        title: COMMON_WORDS.CHANGE_STATUS,
        content: <Content label={COMMON_WORDS.PERMISSION} />,
        actions: <Actions row={row} fetchData={fetchPermission} />,
      })
    );
  };
  const HEADER_COLUMNS = generateTableHeaders(handleClicked);


  const onSubmit = (data) => {
      setPage(0);
      setQuery(data?.search || '');
  };

  const getPermissionData = useCallback(() => {
    fetchPermission(page, pageSize, order, orderBy, searched, query);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize, order, orderBy, query]);

  useEffect(() => {
    getPermissionData();
  }, [getPermissionData])

  return (
    <div>
      <SearchComponent
        selectOptions={PrivilegeSearch}
        searched={searched}
        setSearched={setSearched}
        textField
        textFieldPlaceholder="Search"
        buttonText={BUTTON_TEXT.Permission}
        navigateRoute={'/permission/permission-form'}
        showButton
        canCreate={canCreate}
        onSubmit={onSubmit}
        fetchData={onSubmit}
      />
      <div className="mt-4">
        <CustomTable
          columns={HEADER_COLUMNS}
          rows={permissions}
          loading={loading}
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
      <CustomDialog />
    </div>
  );
}

export default PermissionModule;
