import VisibilityIcon from '@mui/icons-material/Visibility';

export function generateTableHeaders(handleClicked) {
  return [
    {
      id: 'producerCode',
      value: 'Producer Code',
    },
    {
      id: 'producerName',
      value: 'Producer Name',
    },
    {
      id: 'action',
      value: 'Product Details',
      action: [
        {
          showIcon: true,
          iconTitle: 'View',
          iconName: <VisibilityIcon />,
          onClick: (row) => {
            handleClicked(row);
          },
        },
      ],
    },
    {
      id: 'createdAt',
      value: 'Created At',
      sortable: true,
    },
    {
      id: 'updatedAt',
      value: 'Updated At',
      sortable: true,
    },
  ];
}

export function generateTableHeadersProduct() {
  return [
    {
      id: 'product',
      value: 'Product',
    },
    {
      id: 'productCode',
      value: 'Product Code',
    },
    {
      id: 'isEmployee',
      value: 'Member Is Employee',
    },
  ];
}
