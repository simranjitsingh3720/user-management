import EditIcon from '@mui/icons-material/Edit';

function generateTableHeaders(handleEditClick) {
  return [
    {
      id: 'producerCode',
      value: 'Producer Code',
    },
    {
      id: 'producerName',
      value: 'Producer Name',
    },
    {
      id: 'unlockedDays',
      value: 'Unlocked days',
    },
    {
      id: 'startDate',
      value: ' Start Date',
    },
    {
      id: 'endDate',
      value: 'End Date',
    },
    {
      id: 'reason',
      value: 'Reason',
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

export default generateTableHeaders;
