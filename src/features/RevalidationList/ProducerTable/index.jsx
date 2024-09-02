import React, { useCallback, useEffect, useMemo, useState } from 'react';
import CustomTable from '../../../components/CustomTable';
import { Checkbox, FormControlLabel, TableCell, TableRow } from '@mui/material';
import generateTableHeaders from '../utils/generateTableHeaders';
import usePermissions from '../../../hooks/usePermission';
import { useDispatch } from 'react-redux';
import { removeExtraColumns, setTableName } from '../../../stores/slices/exportSlice';
import { showDialog } from '../../../stores/slices/dialogSlice';
import { COMMON_WORDS } from '../../../utils/constants';
import CustomDialogContent from '../../../components/CustomDialogContent';
import Action from '../Action';

const ProducerTable = ({
  revalidationList,
  revalidationListLoading,
  totalCount,
  page,
  setPage,
  pageSize,
  setPageSize,
  order,
  setOrder,
  orderBy,
  setOrderBy,
  userId
}) => {
  const [selectAllActive, setSelectAllActive] = useState(false);
  const [selectAllInactive, setSelectAllInactive] = useState(false);
  const [list, setList] = useState([]);
  const { canUpdate } = usePermissions();
  const dispatch = useDispatch();

  const updateList = useCallback(({ id, data }) => {
    let updatedData = [];
    if (id) {
      updatedData = data.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            checked: !item.checked,
            status: !item.status,
          };
        }
        return item;
      });
    } else {
      updatedData = data;
    }

    setList(updatedData);
    const allActive = updatedData.every((row) => row.checked);
    const allInactive = updatedData.every((row) => !row.checked);

    setSelectAllActive(allActive);
    setSelectAllInactive(allInactive);
  }, []);

  const handleStatusUpdate = useCallback(
    (data, row) => {
      dispatch(
        showDialog({
          title: COMMON_WORDS.CHANGE_STATUS,
          content: <CustomDialogContent label={COMMON_WORDS.USER} />,
          actions: <Action row={row} data={data} updateList={updateList} />,
        })
      );
    },
    [dispatch, updateList]
  );

  const handleAllStatusUpdate = useCallback(
    (data, value) => {
      dispatch(
        showDialog({
          title: COMMON_WORDS.CHANGE_STATUS,
          content: <CustomDialogContent label={COMMON_WORDS.USER} />,
          actions: <Action data={data} row={value} updateList={updateList} bulkUpdate={true} userId={userId}/>,
        })
      );
    },
    [dispatch, updateList]
  );

  const headerColumns = useMemo(() => generateTableHeaders(handleStatusUpdate), [handleStatusUpdate]);

  useEffect(() => {
    if (revalidationList && revalidationList.length > 0) {
      dispatch(removeExtraColumns());
      dispatch(setTableName(revalidationList[0]?.label));
      setList(revalidationList);
    }
    const allActive = revalidationList.every((row) => row.checked);
    const allInactive = revalidationList.every((row) => !row.checked);

    setSelectAllActive(allActive);
    setSelectAllInactive(allInactive);
  }, [dispatch, revalidationList]);

  const handleSelectAllActiveChange = () => {
    handleAllStatusUpdate(list, true);
  };

  const handleSelectAllInactiveChange = () => {
    handleAllStatusUpdate(list, false);
  };

  const customExtraHeader = (
    <TableRow>
      <TableCell colSpan={headerColumns.length}>
        <div style={{ display: 'flex', justifyContent: 'end' }}>
          <FormControlLabel
            control={<Checkbox checked={selectAllActive} onChange={handleSelectAllActiveChange} color="primary" />}
            label="All Active"
          />
          <FormControlLabel
            control={<Checkbox checked={selectAllInactive} onChange={handleSelectAllInactiveChange} color="primary" />}
            label="All Inactive"
          />
        </div>
      </TableCell>
    </TableRow>
  );

  return (
    <div className="mt-8">
      <CustomTable
        columns={headerColumns}
        rows={list}
        loading={revalidationListLoading}
        customExtraHeader={customExtraHeader}
        totalCount={totalCount}
        page={page}
        setPage={setPage}
        rowsPerPage={pageSize}
        setRowsPerPage={setPageSize}
        canUpdate={canUpdate}
        order={order}
        setOrder={setOrder}
        orderBy={orderBy}
        setOrderBy={setOrderBy}
      />
    </div>
  );
};

export default ProducerTable;
