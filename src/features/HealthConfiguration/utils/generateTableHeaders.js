import EditIcon from '@mui/icons-material/Edit';

function generateTableHeaders(handleEditClick) {
  return [
    {
      id: 'producerName',
      value: 'Producer Name',
      sortable: false,
    },
    {
      id: 'producerCode',
      value: 'Producer Code',
      sortable: false,
    },
    {
      id: 'medicare',
      value: 'Medicare Existing',
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
