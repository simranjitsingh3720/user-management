import VisibilityIcon from "@mui/icons-material/Visibility";

export function generateTableHeaders(handleClicked) {
  return [
    {
      id: "producerCode",
      value: "Producer Code",
      sortable: false,
    },
    {
      id: "producerName",
      value: "Producer Name",
      sortable: false,
    },
    {
      id: "action",
      value: "Product Details",
      action: [
        {
          showIcon: true,
          iconName: <VisibilityIcon />,
          onClick: (row) => {
            handleClicked(row);
          },
        },
      ],
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
  ];
}

export function generateTableHeadersProduct() {
  return [
    {
      id: "product",
      value: "Product",
      sortable: false,
    },
    {
      id: "product_code",
      value: "Product Code",
      sortable: false,
    },
    {
      id: "isEmployee",
      value: "Is Employee",
      sortable: false,
    },
  ];
}
