import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TableFooter, TablePagination, Paper, IconButton, Switch
} from '@mui/material';
import { FirstPage, LastPage, KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';

function TablePaginationActions(props) {
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div style={{ flexShrink: 0, marginLeft: '2.5%' }}>
      <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0}>
        <FirstPage />
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0}>
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton onClick={handleNextButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1}>
        <KeyboardArrowRight />
      </IconButton>
      <IconButton onClick={handleLastPageButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1}>
        <LastPage />
      </IconButton>
    </div>
  );
}

const DynamicTable = ({ columns, data, switchType, onDataUpdate }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [switchState, setSwitchState] = useState({});
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    const initialSwitchState = {};
    data.forEach(row => {
      initialSwitchState[row.id] = row.active || false;
    });
    setSwitchState(initialSwitchState);

    const allActive = data.every(row => row.active);
    setSelectAll(allActive);
  }, [data]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSwitchChange = (event, rowId) => {
    const newSwitchState = { ...switchState, [rowId]: event.target.checked };
    setSwitchState(newSwitchState);
    
    const updatedData = data.map(row => row.id === rowId ? { ...row, active: event.target.checked } : row);
    onDataUpdate(updatedData);

    const allActive = Object.values(newSwitchState).every(state => state);
    setSelectAll(allActive);
  };

  const handleSelectAllChange = (event) => {
    const newState = {};
    data.forEach((row) => {
      newState[row.id] = event.target.checked;
    });
    setSwitchState(newState);
    setSelectAll(event.target.checked);

    const updatedData = data.map(row => ({ ...row, active: event.target.checked }));
    onDataUpdate(updatedData);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.field}>
                {column.headerName}
              </TableCell>
            ))}
            {switchType && (
              <TableCell>
                <label>Action</label>
                <Switch
                  checked={selectAll}
                  onChange={handleSelectAllChange}
                  color="primary"
                />
              </TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : data
          ).map((row) => (
            <TableRow key={row.id}>
              {columns.map((column) => (
                <TableCell key={column.field}>
                  {row[column.field]}
                </TableCell>
              ))}
              {switchType && (
                <TableCell>
                  <Switch
                    checked={switchState[row.id] || false}
                    onChange={(event) => handleSwitchChange(event, row.id)}
                    color="primary"
                  />
                </TableCell>
              )}
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={columns.length + 1} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              colSpan={columns.length + (switchType ? 1 : 0)}
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default DynamicTable;
