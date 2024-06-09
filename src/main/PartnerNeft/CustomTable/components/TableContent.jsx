import React from "react";
import {
  TableBody,
  TableCell,
  TableRow,
  IconButton,
} from "@mui/material";
import { Edit } from "@mui/icons-material";

const TableContent = ({ columns, currentRows }) => {
  return (
    <TableBody>
      {currentRows.length > 0 && currentRows.map((row, index) => (
        <TableRow key={index}>
          {columns.map((column) => (
            <TableCell key={column.accessor}>{row[column.accessor]}</TableCell>
          ))}
          <TableCell key="action">
            <IconButton aria-label="back" size="small">
              <Edit />
            </IconButton>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default TableContent;
