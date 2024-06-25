import React, { useState, useEffect, useCallback } from 'react';
import { Table, TableContainer, Paper } from '@mui/material';
import TableHeader from './TableHeader';
import TableContent from './TableContent';
import TableFooter from './TableFooter';

const CustomTable = ({ 
  columns, 
  rows, 
  footerContent = [], 
  extraHeaderRow = [], 
  customStyles, 
  loading, 
  customExtraHeader = null,
  totalCount
}) => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const sortedRows = [...rows].sort((a, b) => {
    if (orderBy) {
      if (a[orderBy] < b[orderBy]) return order === 'asc' ? -1 : 1;
      if (a[orderBy] > b[orderBy]) return order === 'asc' ? 1 : -1;
      return 0;
    }
    return 0;
  });

  const displayedRows = sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHeader
          columns={columns}
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
          customStyles={customStyles}
          customExtraHeader={customExtraHeader}
        />
        <TableContent data={displayedRows} customStyles={customStyles} columns={columns} loading={loading} />
        <TableFooter
          footerContent={footerContent}
          customStyles={customStyles}
          count={totalCount}
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
