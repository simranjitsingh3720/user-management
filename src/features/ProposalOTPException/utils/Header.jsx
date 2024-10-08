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
      value: 'Product',
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
      id: 'status',
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
          iconTitle: 'Edit',
          iconName: <EditIcon />,
          onClick: (row) => {
            handleEditClick(row);
          },
        },
      ],
    },
  ];
};
