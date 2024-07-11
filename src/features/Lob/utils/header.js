export const Header = (updateLobData) => {
  return [
    { value: "Lob Name", id: "lob" },
    { value: "Lob Value", id: "lob_value" },
    { value: "Lob Level", id: "lob_level" },
    { value: "Lob Code", id: "lob_code" },
    { value: "Created At", id: "createdAt", sortable: true},
    { value: "Updated At", id: "updatedAt", sortable: true},
    {
        id: "action",
        value: "Action",
        sortable: false,
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

              updateLobData({
                id: row.id,
                properties: {
                  status: row.checked,
                },
              });
              
            },
          },
        ],
      },
  ];
};
