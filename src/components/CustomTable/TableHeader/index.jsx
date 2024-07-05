import React from "react";
import { TableHead, TableRow, TableCell, TableSortLabel } from "@mui/material";

const TableHeader = ({
  columns = [],
  order,
  orderBy,
  onRequestSort,
  customStyles = {
    header: {},
    cell: {},
  },
  customExtraHeader
}) => {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead style={customStyles.header}>
      {customExtraHeader}
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.id}
            sortDirection={orderBy === column.id ? order : false}
            style={customStyles.cell}
          >
            {column.sortable ? (
              <TableSortLabel
                active={orderBy === column.id}
                direction={orderBy === column.id ? order : 'asc'}
                onClick={createSortHandler(column.id)}
              >
                {column.value}
              </TableSortLabel>
            ) : (
              column.value
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;
