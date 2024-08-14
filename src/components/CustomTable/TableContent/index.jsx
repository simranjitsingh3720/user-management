import React from 'react';
import { TableBody, TableRow, TableCell, IconButton, Checkbox, Switch, Tooltip } from '@mui/material';
import ListLoader from '../../ListLoader';
import EditIcon from '@mui/icons-material/Edit';
import { TABLE_COLUMNS } from '../../../utils/constants';

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
    return icon && icon.type && icon.type === EditIcon && !canUpdate;
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
      {data?.map((row) => {
        const { showIcon = true } = row;
        return (
          <TableRow key={row.id}>
            {columns.map((col) => (
              <TableCell key={`${row.id}-${col.id}`} className="py-2 capitalize">
                {col.action ? (
                  col.action.map((action, index) => (
                    <React.Fragment key={index}>
                      {action?.id ? <span>{row[action?.id]}</span> : null}
                      <span key={`${col.id}-${index}`}>
                        {action.component === 'checkbox' ? (
                          <Checkbox
                            checked={row.checked || false}
                            onChange={() => action.onClick(row)}
                            disabled={!canUpdate}
                          />
                        ) : action.component === 'switch' ? (
                          <Switch
                            checked={row.checked || false}
                            onChange={() => action.onClick(data, row)}
                            disabled={!canUpdate || row.disabled}
                          />
                        ) : showIcon && action?.showIcon && col.id !== TABLE_COLUMNS.BULK_DOWNLOAD_FILE_ACTION ? (
                          <>
                            <Tooltip title={action.iconTitle ? action.iconTitle : ''}>
                              <span>
                                <IconButton onClick={() => action.onClick(row)} disabled={isEditIcon(action?.iconName)}>
                                  {action.iconName}
                                </IconButton>
                              </span>
                            </Tooltip>
                          </>
                        ) : showIcon &&
                          action?.showIcon &&
                          col.id === TABLE_COLUMNS.BULK_DOWNLOAD_FILE_ACTION &&
                          row?.errorFileUrl ? (
                          <Tooltip title={action.iconTitle ? action.iconTitle : ''}>
                            <span>
                              <IconButton onClick={() => action.onClick(row)} disabled={isEditIcon(action?.iconName)}>
                                {action.iconName}
                              </IconButton>
                            </span>
                          </Tooltip>
                        ) : showIcon &&
                          action?.showIcon &&
                          col?.id === TABLE_COLUMNS.BULK_DOWNLOAD_FILE_ACTION &&
                          !row?.errorFileUrl ? (
                          <Tooltip title={TABLE_COLUMNS.FILE_PROGRESS}>
                            <IconButton className="opacity-50">{action.iconName}</IconButton>
                          </Tooltip>
                        ) : (
                          row['showData']
                        )}
                      </span>
                    </React.Fragment>
                  ))
                ) : col.id === TABLE_COLUMNS.NAME ? (
                  <span>
                    {row[TABLE_COLUMNS.FIRST_NAME]
                      ? `${row[TABLE_COLUMNS.FIRST_NAME]}${
                          row[TABLE_COLUMNS.LAST_NAME] ? ' ' + row[TABLE_COLUMNS.LAST_NAME] : ''
                        }`
                      : row[TABLE_COLUMNS.USERNAME]}
                  </span>
                ) : row[col.id] ? (
                  <span>{row[col.id]}</span>
                ) : (
                  '-'
                )}
              </TableCell>
            ))}
          </TableRow>
        );
      })}
    </TableBody>
  );
};

export default TableContent;
