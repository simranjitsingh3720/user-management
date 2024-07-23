export const Header = (handleStatusUpdate) => {
  return [
    { value: "Lob Name", id: "lob" },
    { value: "Lob Value", id: "lob_value" },
    { value: "Lob Level", id: "lob_level" },
    { value: "Lob Code", id: "lob_code" },
    { value: "Created At", id: "createdAt", sortable: true},
    { value: "Updated At", id: "updatedAt", sortable: true},
    {
        id: "action",
        value: "Status",
        sortable: false,
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
};
