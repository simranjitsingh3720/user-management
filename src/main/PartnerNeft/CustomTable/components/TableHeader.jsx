import React from "react";
import { TableCell, TableHead, TableRow } from "@mui/material";

const TableHeader = ({ columns }) => {
  return (
    <TableHead>
      <TableRow>
        {columns.map((column) => (
          <TableCell key={column.accessor}>{column.header}</TableCell>
        ))}
        <TableCell key="action">Actions</TableCell>
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;
