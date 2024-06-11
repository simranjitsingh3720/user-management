import React from "react";
import { TableBody, TableRow, TableCell } from "@mui/material";
import PropTypes from "prop-types";

const TableContent = ({
  rows,
  customStyles = {
    row: {},
    cell: {},
  }
}) => {
  return (
    <TableBody>
      {rows.map((row, rowIndex) => (
        <TableRow key={rowIndex} style={customStyles.row}>
          {row.map((cell, cellIndex) => (
            <TableCell key={cellIndex} style={customStyles.cell}>
              {cell}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
};

TableContent.propTypes = {
  rows: PropTypes.array.isRequired,
  customStyles: PropTypes.object,
};

export default TableContent;
