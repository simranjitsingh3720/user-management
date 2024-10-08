function generateTableHeaders(handleStatusUpdate) {
  return [
    {
      id: 'dataEntryUserName',
      value: 'Name',
    },
    {
      id: 'email',
      value: 'Email ID',
    },
    {
      id: 'mobileNo',
      value: 'Mobile Number',
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
}

export default generateTableHeaders;
