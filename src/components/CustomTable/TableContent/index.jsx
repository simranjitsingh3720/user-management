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
          <TableCell colSpan={columns.length + 1} align="center">
            Loading
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  if (data.length === 0) {
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={columns.length + 1} align="center">
            No records found
          </TableCell>
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
              {col.action ? (
                col.action.map((action, index) => (
                  <>
                    {row[action.id] && <span>{row[action.id]}</span>}
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
                  </>
                ))
              ) : row[col.id] ? (
                <span>{row[col.id]}</span>
              ) : (
                "-"
              )}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
};

export default TableContent;
