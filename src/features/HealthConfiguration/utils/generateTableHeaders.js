import EditIcon from '@mui/icons-material/Edit';

function generateTableHeaders(handleEditClick) {
  return [
    {
      id: 'producerName',
      value: 'Producer Name',
    },
    {
      id: 'producerCode',
      value: 'Producer Code',
    },
    {
      id: 'isExistingCustomer',
      value: 'Medicare Existing',
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

export default generateTableHeaders;
