import React from "react";
import {
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Checkbox,
  Switch,
} from "@mui/material";

const TableContent = ({ columns, data, loading }) => {
  if (loading) {
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={columns.length + 1}>Loading</TableCell>
        </TableRow>
      </TableBody>
    );
  }

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
                      <Checkbox
                        checked={row.checked || false}
                        onChange={() => action.onClick(row)}
                      />
                    ) : action.component === "switch" ? (
                      <Switch
                        checked={row.checked || false}
                        onChange={() => action.onClick(data, row)}
                      />
                    ) : action.showIcon ? (
                      <IconButton onClick={() => action.onClick(row)}>
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
