function generateTableHeaders(
  handleDataUpdate,
  revalidationList,
  setSelectAll
) {
  return [
    {
      id: "name",
      value: "User Name",
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
