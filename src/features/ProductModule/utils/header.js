export const Header = (handleStatusUpdate) => {
    return [
      { value: "Product Name", id: "product" },
      { value: "Product Value", id: "productValue" },
      { value: "Lob Name", id: "lobName" },
      { value: "Product Code", id: "productCode" },
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
  