import { Box } from '@mui/material';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import CustomTable from '../../components/CustomTable';
import useGetUser from './Components/hooks/useGetUser';
import { useNavigate } from 'react-router-dom';
import { COMMON_WORDS } from '../../utils/constants';
import Content from './Components/Dialog/Content';
import Actions from './Components/Dialog/Action';
import { showDialog } from '../../stores/slices/dialogSlice';
import { useDispatch } from 'react-redux';
import CustomDialog from '../../components/CustomDialog';
import SearchComponent from '../../components/SearchComponent';
import { setTableName } from '../../stores/slices/exportSlice';
import { PAGECOUNT } from '../../utils/globalConstants';
import usePermissions from '../../hooks/usePermission';
import { COMMON, Header, NAVIGATE, SEARCH_OPTIONS } from './Components/utils/constants';

function UserManagement() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searched, setSearched] = useState(SEARCH_OPTIONS[0].value);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(PAGECOUNT);
  const [order, setOrder] = useState(COMMON_WORDS.DESC);
  const [orderBy, setOrderBy] = useState(COMMON_WORDS.CREATED_AT);
  const { data, loading, fetchData } = useGetUser(page, pageSize, order, orderBy);
  const [userData, setUserData] = useState([]);
  const { canCreate, canUpdate } = usePermissions();

  const updateUserForm = useCallback((row) => {
    navigate(NAVIGATE.NAVIGATE_TO_FORM + '/'+ row.id);
  }, []);

  useEffect(() => {
    if (data?.data?.length === 0) return;
    const transformedData =
      data?.data?.map((item) => {
        return {
          ...item,
          checked: item?.status,
          disabled: !canUpdate,
        };
      }) || [];
    setUserData(transformedData);
    dispatch(setTableName(transformedData[0]?.label));
  }, [data, canUpdate, dispatch]);

  const handleInsillionStatus = useCallback((data, row) => {
    dispatch(
      showDialog({
        title: COMMON_WORDS.CHANGE_STATUS,
        content: <Content />,
        actions: <Actions row={row} fetchData={fetchData} />,
      })
    );
  }, []);

  const header = useMemo(() => Header(updateUserForm, handleInsillionStatus), [updateUserForm, handleInsillionStatus]);

  const onSubmit = (data) => {
    console.log(data);
    if (data.search) {
      setUserData([]);
      fetchData(searched, data.search);
    } else {
      fetchData();
    }
  };

  return (
    <Box>
      <SearchComponent
        selectOptions={SEARCH_OPTIONS}
        searched={searched}
        setSearched={setSearched}
        textField
        textFieldPlaceholder={COMMON.SEARCH_PLACEHOLDER}
        buttonText={COMMON.BUTTON_TEXT}
        navigateRoute={NAVIGATE.NAVIGATE_TO_FORM}
        showExportButton={true}
        showButton
        fetchData={fetchData}
        canCreate={canCreate}
        onSubmit={onSubmit}
      />
      <div className="mt-4">
        <CustomTable
          rows={userData || []}
          columns={header}
          loading={loading}
          totalCount={data?.totalCount || 0}
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
    </Box>
  );
}

export default UserManagement;
