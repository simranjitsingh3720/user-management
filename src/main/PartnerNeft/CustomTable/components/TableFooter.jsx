import React from 'react';
import { TablePagination } from '@mui/material';

const TableFooter = ({ count, rowsPerPage, page, onPageChange, onRowsPerPageChange }) => {
  return (
    <div className="mt-4">
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </div>
  );
};

export default TableFooter;
