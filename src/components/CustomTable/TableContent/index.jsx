import React from 'react';
import { TableBody, TableRow, TableCell, IconButton, Checkbox, Switch } from '@mui/material';
import ListLoader from '../../ListLoader';
import EditIcon from '@mui/icons-material/Edit';

const TableContent = ({ columns, data, loading, canUpdate }) => {
  if (loading) {
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={columns.length + 1} align="center">
            <ListLoader />
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  const isEditIcon = (icon) => {
    return (icon && icon.type && icon.type === EditIcon) && !canUpdate;
  };

  if (data?.length === 0) {
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
      {data?.map((row) => (
        <TableRow key={row.id}>
          {columns.map((col) => (
            <TableCell key={`${row.id}-${col.id}`} className="py-2 capitalize">
              {col.action ? (
                col.action.map((action, index) => (
                  <React.Fragment key={index}>
                    {action?.id ? <span>{row[action?.id]}</span> : null}
                    <span key={`${col.id}-${index}`}>
                      {action.component === 'checkbox' ? (
                        <Checkbox checked={row.checked || false} onChange={() => action.onClick(row)} disabled={row.disabled || !canUpdate} />
                      ) : action.component === 'switch' ? (
                        <Switch checked={row.checked || false} onChange={() => action.onClick(data, row)} disabled={row.disabled || !canUpdate} />
                      ) : action.showIcon ? (
                        <IconButton onClick={() => action.onClick(row)} disabled={isEditIcon(action?.iconName)}>{action.iconName}</IconButton>
                      ) : null}
                    </span>
                  </React.Fragment>
                ))
              ) : col.id === 'name' ? (
                <span> {row['firstName'] + (row['lastName'] ? ' ' + row['lastName'] : '')}</span>
              ) : row[col.id] ? (
                <span>{row[col.id]}</span>
              ) : (
                '-'
              )}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
};

export default TableContent;
