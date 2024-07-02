import EditIcon from "@mui/icons-material/Edit";

function generateTableHeaders(handleEditClick) {
  return [
    {
      id: "lob",
      value: "LOB",
      sortable: false,
    },
    {
      id: "product",
      value: "Product",
      sortable: false,
    },
    {
      id: "CKYCApplicable",
      value: "Status",
      sortable: false,
    },
    {
      id: "forWhom",
      value: "For Whom",
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
