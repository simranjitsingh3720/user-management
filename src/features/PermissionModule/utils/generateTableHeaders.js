function generateTableHeaders(handleClicked) {
  return [
    {
      id: "permissionName",
      value: "Permission Name",
      sortable: false,
    },
    {
      id: "permissionType",
      value: "Permission Type",
      sortable: false,
    },
    {
      id: "createdAt",
      value: "Created At",
      sortable: true,
    },
    {
      id: "updatedAt",
      value: "Updated At",
      sortable: true,
    },
    {
      id: "action",
      value: "Action",
      action: [
        {
          component: "switch",
          onClick: (data, row) => {
            handleClicked(data, row);
          },
        },
      ],
    },
  ];
}

export default generateTableHeaders;
