function generateTableHeaders(handleClicked) {
  return [
    {
      id: "permissionName",
      value: "Permission Name",
      sortable: true,
    },
    {
      id: "permissionType",
      value: "Permission Type",
      sortable: true,
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
            // console.log("row", row);
            // console.log("data", data);
            // data.map((item) => {
            //   if (item.id === row.id) {
            //     return (row.checked = !row.checked);
            //   }
            //   return row.checked;
            // });

            handleClicked(data, row);
          },
        },
      ],
    },
  ];
}

export default generateTableHeaders;
