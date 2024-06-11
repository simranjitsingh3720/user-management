import React from "react";
import { TableHead, TableRow, TableCell } from "@mui/material";
import PropTypes from "prop-types";

const TableHeader = ({
  columns = [],
  extraRow = null,
  customStyles = {
    header: {},
    extraRow: {},
    cell: {},
  },
}) => {
  return (
    <TableHead style={customStyles.header}>
      {extraRow && (
        <TableRow style={customStyles.extraRow}>
          {extraRow.map((cell, index) => (
            <TableCell key={index} style={customStyles.cell}>
              {cell}
            </TableCell>
          ))}
        </TableRow>
      )}
      <TableRow>
        {columns.map((column, index) => (
          <TableCell key={column.id +  index} style={customStyles.cell}>
            {column.value}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

TableHeader.propTypes = {
  columns: PropTypes.array.isRequired,
  extraRow: PropTypes.array,
  customStyles: PropTypes.object,
};

export default TableHeader;
