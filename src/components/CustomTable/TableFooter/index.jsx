import React from "react";
import {
  TableFooter as MuiTableFooter,
  TableRow,
  TableCell,
  TablePagination,
} from "@mui/material";
import PropTypes from "prop-types";

const TableFooter = ({
  footerContent,
  customStyles = {
    footer: {},
    cell: {},
    pagination: {},
  },
  count,
  rowsPerPage,
  page,
  handleChangePage,
  handleChangeRowsPerPage,
}) => {
  return (
    <MuiTableFooter style={customStyles.footer}>
      <TableRow>
        {footerContent.map((cell, index) => (
          <TableCell key={index} style={customStyles.cell}>
            {cell}
          </TableCell>
        ))}
      </TableRow>
      <TableRow>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50, 100]}
          colSpan={footerContent.length}
          count={count}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          style={customStyles.pagination}
        />
      </TableRow>
    </MuiTableFooter>
  );
};

TableFooter.propTypes = {
  footerContent: PropTypes.array.isRequired,
  customStyles: PropTypes.object,
  count: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  handleChangePage: PropTypes.func.isRequired,
  handleChangeRowsPerPage: PropTypes.func.isRequired,
};

export default TableFooter;
