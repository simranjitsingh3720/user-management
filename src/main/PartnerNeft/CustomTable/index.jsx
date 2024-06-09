import React, { useState } from "react";
import TableHeader from "./components/TableHeader";
import TableContent from "./components/TableContent";
import TableFooter from "./components/TableFooter";
import { Paper, Table, TableContainer, TextField } from "@mui/material";

const CustomTable = ({ data, columns }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setCurrentPage(0);
  };

  const filteredData = data.filter((row) =>
    columns.some(
      (column) =>
        row[column.accessor]
          .toString()
          .toLowerCase()
          .indexOf(searchTerm.toLowerCase()) > -1
    )
  );

  const currentRows = filteredData.slice(
    currentPage * rowsPerPage,
    currentPage * rowsPerPage + rowsPerPage
  );

  return (
    <div className="container mx-auto">
      <div className="mb-4">
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <TableContainer component={Paper} className="mt-4">
        <Table>
          <TableHeader columns={columns} />
          <TableContent columns={columns} currentRows={currentRows} />
        </Table>
      </TableContainer>

      <TableFooter
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={currentPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default CustomTable;
