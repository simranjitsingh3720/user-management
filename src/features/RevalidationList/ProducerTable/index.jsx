import React, { useEffect, useState } from 'react';
import useRevalidationList from '../hooks/useRevalidationList';
import CustomTable from '../../../components/CustomTable';
import { Checkbox, FormControlLabel, TableCell, TableRow } from '@mui/material';
import generateTableHeaders from '../utils/generateTableHeaders';
import usePermissions from '../../../hooks/usePermission';
import { useDispatch } from 'react-redux';
import { setTableName } from '../../../stores/slices/exportSlice';

const ProducerTable = ({
  revalidationList,
  revalidationListLoading,
  totalCount,
  page,
  setPage,
  pageSize,
  setPageSize,
}) => {
  const { revalidationListUpdateData } = useRevalidationList();
  const [selectAllActive, setSelectAllActive] = useState(false);
  const [selectAllInactive, setSelectAllInactive] = useState(false);
  const { canUpdate } = usePermissions();
  const dispatch = useDispatch();

  const handleDataUpdate = (updatedData) => {
    revalidationListUpdateData(updatedData);
  };

  const HEADER_COLUMNS = generateTableHeaders(
    handleDataUpdate,
    revalidationList,
    setSelectAllActive,
    setSelectAllInactive
  );

  useEffect(() => {
    if (revalidationList && revalidationList.length > 0) {
      dispatch(setTableName(revalidationList[0]?.label));
    }
    const allActive = revalidationList.every((row) => row.checked);
    const allInactive = revalidationList.every((row) => !row.checked);

    setSelectAllActive(allActive);
    setSelectAllInactive(allInactive);
  }, [revalidationList]);

  const handleSelectAllActiveChange = (event) => {
    if (canUpdate) {
      const updatedList = revalidationList.map((item) => {
        if (!item.checked) {
          item.checked = event.target.checked;
        }
        return item;
      });

      handleDataUpdate(updatedList);
      setSelectAllActive(event.target.checked);
      setSelectAllInactive(false);
    }
  };

  const handleSelectAllInactiveChange = (event) => {
    if (canUpdate) {
      const updatedList = revalidationList.map((item) => {
        if (item.checked) {
          item.checked = !event.target.checked;
        }
        return item;
      });

      handleDataUpdate(updatedList);
      setSelectAllInactive(event.target.checked);
      setSelectAllActive(false);
    }
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
        rows={revalidationList}
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
