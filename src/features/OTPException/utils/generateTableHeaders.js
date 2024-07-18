function generateTableHeaders(handleClicked) {
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
      id: 'producerCode',
      value: 'Producer Code',
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
      value: 'Status',
      action: [
        {
          component: 'switch',
          onClick: (data, row) => {
            handleClicked(data, row);
          },
        },
      ],
    },
  ];
}

export default generateTableHeaders;
