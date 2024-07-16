import React from "react";
import { Table, TableContainer, Paper } from "@mui/material";
import TableHeader from "./TableHeader";
import TableContent from "./TableContent";
import TableFooter from "./TableFooter";

const CustomTable = ({
  columns,
  rows,
  footerContent = [],
  customStyles,
  loading,
  customExtraHeader = null,
  totalCount,
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
  order,
  setOrder,
  orderBy,
  setOrderBy,
  hideFooter,
  canUpdate
}) => {
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
        <TableContent
          data={rows}
          customStyles={customStyles}
          columns={columns}
          loading={loading}
          canUpdate={canUpdate}
        />
        {!hideFooter && (
          <TableFooter
            footerContent={footerContent}
            customStyles={customStyles}
            count={totalCount}
            rowsPerPage={rowsPerPage}
            page={page}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
          />
        )}
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
