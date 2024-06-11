import React from "react";
import {
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Checkbox,
  Switch,
} from "@mui/material";

const TableContent = ({ columns, data, handleClick }) => {
  return (
    <TableBody>
      {data.map((row) => (
        <TableRow key={row.id}>
          {columns.map((col) => (
            <TableCell key={`${row.id}-${col.id}`} className="py-2">
              {row[col.id] ? <span>{row[col.id]} </span> : null}
              {col.action &&
                col.action.map((action, index) => (
                  <span key={`${col.id}-${index}`}>
                    {action.component === "checkbox" ? (
                      <Checkbox onChange={() => handleClick(action, row)} />
                    ) : action.component === "switch" ? (
                      <Switch onChange={() => handleClick(action, row)} />
                    ) : action.showIcon ? (
                      <IconButton onClick={() => handleClick(action, row)}>
                        {action.iconName}
                      </IconButton>
                    ) : null}
                  </span>
                ))}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
};

export default TableContent;
