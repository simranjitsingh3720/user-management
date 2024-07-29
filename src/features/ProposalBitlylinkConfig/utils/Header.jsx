import VisibilityIcon from '@mui/icons-material/Visibility';

export const Header = (handleClicked, handleStatusUpdate) => {
  return [
    {
      id: 'type',
      value: 'Type',
    },
    {
      id: 'userName',
      value: 'Name',
    },
    {
      id: 'producerCode',
      value: 'Producer Code',
    },
    {
      id: 'action',
      value: 'Product Details',
      action: [
        {
          showIcon: true,
          iconName: <VisibilityIcon />,
          onClick: (row) => {
            handleClicked(row);
          },
        },
      ],
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
  ];
};
