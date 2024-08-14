import EditIcon from '@mui/icons-material/Edit';

export function tableHeaders(handleEditClick, handleStatusClicked) {
  return [
    {
      id: 'lob',
      value: 'LOB',
    },
    {
      id: 'product',
      value: 'Product',
    },
    {
      id: 'location',
      value: 'Locations',
    },
    {
      id: 'level',
      value: 'Level',
    },
    {
      id: 'createdAt',
      value: 'Created At',
      sortable: true,
    },
    {
      id: 'updatedAt',
      value: 'Updated At',
      sortable: true,
    },
    {
      id: 'action',
      value: 'Action',
      action: [
        {
          showIcon: true,
          iconTitle: 'Edit',
          iconName: <EditIcon />,
          onClick: (row) => {
            handleEditClick(row);
          },
        },
        {
          component: 'switch',
          onClick: (data, row) => {
            handleStatusClicked(data, row);
          },
        },
      ],
    },
  ];
}

export function employeeTableHeaders(handleEditClick) {
  return [
    {
      id: 'employeeId',
      value: 'Employee Id',
    },
    {
      id: 'userName',
      value: 'Name',
    },
    {
      id: 'email',
      value: 'Email',
    },
    {
      id: 'createdAt',
      value: 'Created At',
      sortable: true,
    },
    {
      id: 'updatedAt',
      value: 'Updated At',
      sortable: true,
    },
    {
      id: 'action',
      value: 'Action',
      action: [
        {
          showIcon: true,
          iconTitle: 'Edit',
          iconName: <EditIcon />,
          onClick: (row) => {
            handleEditClick(row);
          },
        },
      ],
    },
  ];
}
