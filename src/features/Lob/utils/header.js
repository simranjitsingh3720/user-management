export const Header = (handleStatusUpdate) => {
  return [
    { value: "Lob Name", id: "lob" },
    { value: "Lob Value", id: "lobValue" },
    { value: "Lob Level", id: "lobLevel" },
    { value: "Lob Code", id: "lobCode" },
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
