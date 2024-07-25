import React, { useCallback, useMemo, useState } from 'react';
import { ASC, BUTTON_TEXT, CREATED_AT, PAGECOUNT } from '../../utils/globalConstants';
import useGetProposalOTPList from './hooks/useGetProposalOTPList';
import usePermissions from '../../hooks/usePermission';
import { Header } from './utils/Header';
import CustomTable from '../../components/CustomTable';
import { ProposalOTPSearch } from './utils/constants';
import { COMMON_WORDS } from '../../utils/constants';
import SearchComponent from '../../components/SearchComponent';
import { useNavigate } from 'react-router-dom';
import { showDialog } from '../../stores/slices/dialogSlice';
import Content from '../../components/CustomDialogContent';
import Action from './Action';
import { useDispatch } from 'react-redux';

function ProposalOTPException() {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(PAGECOUNT);
  const [order, setOrder] = useState(ASC);
  const [orderBy, setOrderBy] = useState(CREATED_AT);
  const [searched, setSearched] = useState('type');
  const [query, setQuery] = useState('');
  const { canCreate, canUpdate } = usePermissions();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [date, setDate] = useState({ startDate: '', endDate: '' });

  const { data, loading, totalPage, fetchProposalOtp, setData } = useGetProposalOTPList(
    page, pageSize, order, orderBy, date
  );

  const handleEditClick = useCallback((row) => {
    navigate(`/proposalotpexception/form/${row.id}`);
  }, [navigate])

  const updateStatus = useCallback(
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
      
      setData(updatedData);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleStatusUpdate = useCallback(
    (data, row) => {
      dispatch(
        showDialog({
          title: COMMON_WORDS.CHANGE_STATUS,
          content: <Content label={COMMON_WORDS.PROPOSAL_OTP_EXCEPTION} />,
          actions: <Action row={row} data={data} updateStatus={updateStatus} />,
        })
      );
    },
    [dispatch, updateStatus]
  );


  const header = useMemo(() => Header(handleEditClick, handleStatusUpdate), [handleEditClick, handleStatusUpdate]);

  const handleGo = () => {
    fetchProposalOtp(query, searched, date);
  };

  return (
    <>
      <div className="mb-4">
        <SearchComponent
          setDate={setDate}
          dateField
          handleGo={handleGo}
          showButton={true}
          buttonText={BUTTON_TEXT.PROPOSAL_EXCEPTION}
          navigateRoute="/proposalotpexception/form"
          showExportButton
          canCreate={canCreate}
          selectOptions={ProposalOTPSearch}
          searched={searched}
          setSearched={setSearched}
          setQuery={setQuery}
          textFieldPlaceholder={COMMON_WORDS.SEARCH}
          textField
        />
      </div>

      <CustomTable
        rows={data || []}
        loading={loading}
        totalCount={totalPage}
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
    </>
  );
}

export default ProposalOTPException;
