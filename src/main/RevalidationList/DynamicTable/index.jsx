import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter,
  TablePagination,
  Paper,
  Switch,
  Checkbox,
  FormControlLabel,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import ListLoader from "../../../sharedComponents/ListLoader";
import TablePaginationActions from "./TablePaginationActions";

const DynamicTable = ({ columns, data, switchType, onDataUpdate, loading }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [switchState, setSwitchState] = useState({});
  const [selectAll, setSelectAll] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentRowId, setCurrentRowId] = useState(null);
  const [newSwitchState, setNewSwitchState] = useState(false);
  const [isSelectAll, setIsSelectAll] = useState(false);

  useEffect(() => {
    const initialSwitchState = {};
    data.forEach((row) => {
      initialSwitchState[row.id] = row.active || false;
    });
    setSwitchState(initialSwitchState);

    const allActive = data.every((row) => row.active);
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
    setNewSwitchState(event.target.checked);
    setCurrentRowId(rowId);
    setIsSelectAll(false);
    setDialogOpen(true);
  };

  const handleConfirmSwitchChange = () => {
    const updatedSwitchState = {
      ...switchState,
      [currentRowId]: newSwitchState,
    };
    setSwitchState(updatedSwitchState);

    const updatedData = data.map((row) =>
      row.id === currentRowId ? { ...row, active: newSwitchState } : row
    );
    onDataUpdate(updatedData);

    const allActive = Object.values(updatedSwitchState).every((state) => state);
    setSelectAll(allActive);
    setDialogOpen(false);
    setCurrentRowId(null);
  };

  const handleCancelSwitchChange = () => {
    setDialogOpen(false);
    setCurrentRowId(null);
  };

  const handleSelectAllChange = (event) => {
    setNewSwitchState(event.target.checked);
    setIsSelectAll(true);
    setDialogOpen(true);
  };

  const handleConfirmSelectAllChange = () => {
    const newState = {};
    data.forEach((row) => {
      newState[row.id] = newSwitchState;
    });
    setSwitchState(newState);
    setSelectAll(newSwitchState);

    const updatedData = data.map((row) => ({
      ...row,
      active: newSwitchState,
    }));
    onDataUpdate(updatedData);

    setDialogOpen(false);
    setCurrentRowId(null);
  };

  const handleCancelSelectAllChange = () => {
    setDialogOpen(false);
    setCurrentRowId(null);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

  return (
    <div style={{ position: "relative" }}>
      {loading && <ListLoader />}
      {!loading && (
        <>
          <FormControlLabel
            sx={{"display": 'flex', "justifyContent": "end"}}
            control={
              <Checkbox
                checked={selectAll}
                onChange={handleSelectAllChange}
                color="primary"
              />
            }
            label={!selectAll ? "Select All (Active)" : "Select All (Inactive)"}
          />
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={column.field}>
                      {column.headerName}
                    </TableCell>
                  ))}
                  {switchType && <TableCell>Action</TableCell>}
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? data.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
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
                          onChange={(event) =>
                            handleSwitchChange(event, row.id)
                          }
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
                      inputProps: { "aria-label": "rows per page" },
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
        </>
      )}

      <Dialog open={dialogOpen} onClose={handleCancelSwitchChange}>
        <DialogTitle>Confirm Action</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to{" "}
            {isSelectAll
              ? "update the status for all items"
              : "update the status"}
            ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={
              isSelectAll
                ? handleCancelSelectAllChange
                : handleCancelSwitchChange
            }
            color="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={
              isSelectAll
                ? handleConfirmSelectAllChange
                : handleConfirmSwitchChange
            }
            color="primary"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DynamicTable;
