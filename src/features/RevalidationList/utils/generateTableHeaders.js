function generateTableHeaders(
  handleDataUpdate,
  revalidationList,
  setSelectAll
) {
  return [
    {
      id: "name",
      value: "User Name",
      sortable: true,
    },
    {
      id: "emailId",
      value: "Email ID",
      sortable: true,
    },
    {
      id: "mobileNo",
      value: "Mobile Number",
      sortable: true,
    },
    {
      id: "action",
      value: "Action",
      action: [
        {
          component: "switch",
          onClick: (data, row) => {
            data.map((item) => {
              if (item.id === row.id) {
                return (row.checked = !row.checked);
              }

              return row.checked;
            });
            handleDataUpdate(data);
            const allActive = revalidationList.every((row) => row.checked);
            setSelectAll(allActive);
          },
        },
      ],
    },
  ];
}

export default generateTableHeaders;
