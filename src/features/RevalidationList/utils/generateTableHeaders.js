function generateTableHeaders(
  handleStatusUpdate
) {
  return [
    {
      id: "userName",
      value: "Name",
    },
    {
      id: "emailId",
      value: "Email ID",
    },
    {
      id: "mobileNo",
      value: "Mobile Number",
    },
    {
      id: 'createdAt',
      value: 'Created At',
    },
    {
      id: 'updatedAt',
      value: 'Updated At',
    },
    {
      id: "status",
      value: "Status",
      action: [
        {
          component: "switch",
          onClick: (data, row) => {
            handleStatusUpdate(data, row);
          },
        },
      ],
    },
  ];
}

export default generateTableHeaders;
