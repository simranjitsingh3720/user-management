export const Header = (updateProductData) => {
    return [
      { value: "Product Name", id: "product" },
      { value: "Product Value", id: "product_value" },
      { value: "Lob Name", id: "lob_name" },
      { value: "Product Code", id: "product_code" },
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
                data.map((item) => {
                  if (item.id === row.id) {
                    return (row.checked = !row.checked);
                  }
                  
                  return row.checked;
                });
  
                updateProductData({
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
  