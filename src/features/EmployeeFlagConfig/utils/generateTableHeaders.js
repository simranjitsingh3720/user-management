import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';

export function generateTableHeaders(handleClicked, handleEdit) {
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
      id: 'productDetails',
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
    {
      id: 'action',
      value: 'Action',
      action: [
        {
          showIcon: true,
          iconTitle: 'Edit',
          iconName: <EditIcon />,
          onClick: (row) => {
            handleEdit(row);
          },
        },
      ],
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
