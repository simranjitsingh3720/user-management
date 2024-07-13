import { Box } from '@mui/material';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import CustomTable from '../../components/CustomTable';
import useGetUser from './Components/hooks/useGetUser';
import { BUTTON_TEXT, Header, NAVIGATE_TO_FORM, SEARCH_OPTIONS, SEARCH_PLACEHOLDER } from './Components/utils/constants';
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

function UserManagement() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const [searched, setSearched] = useState(SEARCH_OPTIONS[0].value);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(PAGECOUNT);
  const [order, setOrder] = useState(COMMON_WORDS.ASC);
  const [orderBy, setOrderBy] = useState(COMMON_WORDS.CREATED_AT);
  const { data, loading, fetchData, setLoading } = useGetUser(page, pageSize, query, order, orderBy);
  const [userData, setUserData] = useState([]);

    // Check Permission 
    const { canCreate, canUpdate } = usePermissions();

  const updateUserForm = useCallback((row) => {
    navigate(NAVIGATE_TO_FORM + '/'+ row.id);
  }, []);

  useEffect(() => {
    if (data?.data?.length === 0) return;
    const transformedData =
      data?.data?.map((item) => {
        return {
          ...item,
          checked: item?.status,
          disabled: !canUpdate
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

  const handleGo = () => {
    if(query){
      setUserData([]);
      fetchData(searched, query);
    }
  };

  return (
    <Box>
      <SearchComponent
         selectOptions={SEARCH_OPTIONS}
         searched={searched}
         setSearched={setSearched}
         textField
         textFieldPlaceholder={SEARCH_PLACEHOLDER}
         setQuery={setQuery}
         buttonText={BUTTON_TEXT}
         navigateRoute={NAVIGATE_TO_FORM}
         handleGo={handleGo}
         showExportButton={true}
         showButton
         canCreate={canCreate}
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
        />
      </div>
      <CustomDialog />
    </Box>
  );
}

export default UserManagement;
