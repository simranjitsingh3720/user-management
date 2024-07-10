import EditIcon from '@mui/icons-material/Edit';

export function tableHeaders(handleEditClick, handleStatusClicked) {
  return [
    {
      id: 'lob',
      value: 'LOB',
      sortable: false,
    },
    {
      id: 'product',
      value: 'Product',
      sortable: false,
    },
    {
      id: 'location',
      value: 'Locations',
      sortable: false,
    },
    {
      id: 'level',
      value: 'Level',
      sortable: false,
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
      sortable: false,
    },
    {
      id: 'name',
      value: 'Name',
      sortable: false,
    },
    {
      id: 'email',
      value: 'Email',
      sortable: false,
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
          iconName: <EditIcon />,
          onClick: (row) => {
            handleEditClick(row);
          },
        },
      ],
    },
  ];
}
