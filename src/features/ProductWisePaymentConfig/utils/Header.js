import EditIcon from '@mui/icons-material/Edit';

const generateHeader = (handleEditClick) => {
  return [
    { value: 'LOB', id: 'lob' },
    { value: 'Product Name', id: 'productName' },
    { value: 'Created At', id: 'createdAt' },
    { value: 'Updated At', id: 'updatedAt' },
    {
      id: 'action',
      value: 'Action',
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
};

export default generateHeader;
