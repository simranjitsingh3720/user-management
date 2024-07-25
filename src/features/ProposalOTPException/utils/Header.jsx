import EditIcon from '@mui/icons-material/Edit';

export const Header = (handleEditClick, handleStatusUpdate) => {
  return [
    {
      id: 'type',
      value: 'Type',
    },
    {
      id: 'producerName',
      value: 'Name',
    },
    {
      id: 'lob',
      value: 'LOB',
    },
    {
      id: 'product',
      value: 'product',
    },
    {
      id: 'startDate',
      value: 'Start Date',
    },
    {
      id: 'endDate',
      value: 'End Date',
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
      id: 'roleStatus',
      value: 'Status',
      sortable: false,
      action: [
        {
          component: 'switch',
          onClick: (data, row) => {
            handleStatusUpdate(data, row);
          },
        },
      ],
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
};
