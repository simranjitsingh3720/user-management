import EditIcon from "@mui/icons-material/Edit";

export const Header = (editAction) => {
  return [
    { value: "LOB", id: "lob" },
    { value: "Product", id: "product" },
    { value: "Producer Name", id: "producerName" },
    { value: "Producer Code", id: "producerCode" },
    { value: "Verification Method", id: "verificationMethod" },
    {
        id: "action",
        value: "Action",
        sortable: false,
        action: [
          {
            showIcon: true,
            iconName: <EditIcon />,
            onClick: (row) => {
                editAction(row)
            },
          }
        ],
      },
  ];
};
