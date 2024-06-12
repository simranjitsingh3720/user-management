import React from "react";
import { TableHead, TableRow, TableCell, TableSortLabel } from "@mui/material";
import PropTypes from "prop-types";

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

TableHeader.propTypes = {
  columns: PropTypes.array.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  customStyles: PropTypes.object,
};

export default TableHeader;
