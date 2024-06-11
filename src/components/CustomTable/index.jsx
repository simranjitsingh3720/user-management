import React, { useState } from 'react';
import { Table, TableContainer, Paper } from '@mui/material';
import TableHeader from './TableHeader';
import TableContent from './TableContent';
import TableFooter from './TableFooter';

const CustomTable = ({ columns, rows, footerContent=[], extraHeaderRow=[], customStyles }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClick = (action, row) => {
    console.log(action)
    console.log(row)
  }

  const displayedRows = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHeader columns={columns} extraRow={extraHeaderRow} customStyles={customStyles} />
        <TableContent data={displayedRows} customStyles={customStyles} columns={columns} handleClick={handleClick} />
        <TableFooter
          footerContent={footerContent}
          customStyles={customStyles}
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
