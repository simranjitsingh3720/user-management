import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, CircularProgress, TableFooter, TablePagination
} from '@mui/material';

// Custom Table Header Component
const TableHeader = ({ children }) => (
  <TableHead>
    {children}
  </TableHead>
);

// Custom Table Body Component
const TableBodyComponent = ({ children, loading, data }) => {
  if (loading) {
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={5} align="center">
            <CircularProgress />
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  if (data.length === 0) {
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={5} align="center">
            No records found
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  return (
    <TableBody>
      {children}
    </TableBody>
  );
};

// Custom Table Footer Component
const TableFooterComponent = ({ children }) => (
  <TableFooter>
    {children}
  </TableFooter>
);

// Main Custom Table Component
const CustomTable = ({ children }) => (
  <TableContainer component={Paper}>
    <Table>
      {children}
    </Table>
  </TableContainer>
);

export default CustomTable;
