import React, { useCallback, useEffect, useMemo, useState } from 'react';
import CustomTable from '../../../components/CustomTable';
import { Checkbox, FormControlLabel, TableCell, TableRow } from '@mui/material';
import generateTableHeaders from '../utils/generateTableHeaders';
import usePermissions from '../../../hooks/usePermission';
import { useDispatch } from 'react-redux';
import { removeExtraColumns, setTableName } from '../../../stores/slices/exportSlice';
import { showDialog } from '../../../stores/slices/dialogSlice';
import { COMMON_WORDS } from '../../../utils/constants';
import Content from '../../../components/CustomDialogContent';
import Action from '../Action';

const ProducerTable = ({
  revalidationList,
  revalidationListLoading,
  totalCount,
  page,
  setPage,
  pageSize,
  setPageSize,
}) => {
  const [selectAllActive, setSelectAllActive] = useState(false);
  const [selectAllInactive, setSelectAllInactive] = useState(false);
  const [list, setList] = useState([]);
  const { canUpdate } = usePermissions();
  const dispatch = useDispatch();

  const updateList = useCallback(({id, data}) => {
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

    setList(updatedData);
  }, []);

  const handleStatusUpdate = useCallback(
    (data, row) => {
      dispatch(
        showDialog({
          title: COMMON_WORDS.CHANGE_STATUS,
          content: <Content label={COMMON_WORDS.PRODUCT} />,
          actions: <Action row={row} data={revalidationList} updateList={updateList} />,
        })
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const HEADER_COLUMNS = useMemo(
    () => generateTableHeaders(handleStatusUpdate),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [revalidationList]);

  const handleSelectAllActiveChange = (event) => {
    // TODO: handle select all active change
  };

  const handleSelectAllInactiveChange = (event) => {
    // TODO: handle select all inactive change
  };

  const customExtraHeader = (
    <TableRow>
      <TableCell colSpan={HEADER_COLUMNS.length}>
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
        columns={HEADER_COLUMNS}
        rows={list}
        loading={revalidationListLoading}
        customExtraHeader={customExtraHeader}
        totalCount={totalCount}
        page={page}
        setPage={setPage}
        rowsPerPage={pageSize}
        setRowsPerPage={setPageSize}
        canUpdate={canUpdate}
      />
    </div>
  );
};

export default ProducerTable;
