import EditIcon from "@mui/icons-material/Edit";

function generateTableHeaders(handleEditClick) {
  return [
    {
      id: "accountNumber",
      value: "User Name",
      sortable: true,
    },
    {
      id: "bankCode",
      value: "Email ID",
      sortable: true,
    },
    {
      id: "branchName",
      value: "Mobile Number",
      sortable: true,
    },
    {
      id: "action",
      value: "Action",
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
