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
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ListLoader from "../../../sharedComponents/ListLoader";
import TablePaginationActions from "./TablePaginationActions";
import styles from "./styles.module.scss";

const DynamicTable = ({ columns, data, loading, navigateToNeftForm }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentRowId, setCurrentRowId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    setCurrentRowId(null);
  }, [data]);

  useEffect(() => {
    const filtered = data.filter((row) =>
      columns.some((column) =>
        row[column.field]
          .toString()
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      )
    );
    setFilteredData(filtered);
  }, [searchQuery, data, columns]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEditClick = (rowId) => {
    console.log(`Edit clicked for row with id: ${rowId}`);
    navigateToNeftForm(rowId);
    setCurrentRowId(rowId);
    setDialogOpen(true);
  };

  const handleConfirmEdit = () => {
    console.log(`Confirmed edit for row with id: ${currentRowId}`);
    setDialogOpen(false);
    setCurrentRowId(null);
  };

  const handleCancelEdit = () => {
    setDialogOpen(false);
    setCurrentRowId(null);
  };

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, filteredData.length - page * rowsPerPage);

  return (
    <div style={{ position: "relative" }}>
      {loading && <ListLoader />}
      {!loading && (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell colSpan={columns.length + 1}>
                    <div className="flex justify-between w-100">
                      <TextField
                        variant="outlined"
                        size="small"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />

                      <Button
                        type="submit"
                        variant="contained"
                        className={styles.primaryBtn}
                        onClick={navigateToNeftForm}
                      >
                        Create New NEFT Flag
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={column.field}>
                      {column.headerName}
                    </TableCell>
                  ))}
                  <TableCell key="action">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length + 1}
                      style={{ textAlign: "center" }}
                    >
                      <Typography variant="body1">No records found</Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  (rowsPerPage > 0
                    ? filteredData.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : filteredData
                  ).map((row) => (
                    <TableRow key={row.id}>
                      {columns.map((column) => (
                        <TableCell key={column.field}>
                          {row[column.field]}
                        </TableCell>
                      ))}
                      <TableCell key={row.id + "action"}>
                        <IconButton
                          onClick={() => handleEditClick(row.id)}
                          color="primary"
                        >
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
                {emptyRows > 0 && filteredData.length > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={columns.length + 1} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    colSpan={columns.length + 1}
                    count={filteredData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
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

      <Dialog open={dialogOpen} onClose={handleCancelEdit}>
        <DialogTitle>Confirm Edit</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to edit the details of this item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelEdit} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmEdit} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DynamicTable;
