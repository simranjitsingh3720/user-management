import EditIcon from '@mui/icons-material/Edit';

const generateHeader = ({ handleEditClick, paymentTypeList }) => {
  return [
    { value: 'LOB', id: 'lob' },
    { value: 'Product Name', id: 'productName' },
    ...paymentTypeList.map((paymentType) => {
      return {
        value: paymentType.name,
        id: paymentType.id,
      };
    }),
    { value: 'Created At', id: 'createdAt', sortable: true },
    { value: 'Updated At', id: 'updatedAt', sortable: true },
    {
      id: 'action',
      value: 'Action',
      action: [
        {
          showIcon: true,
          iconTitle: 'Edit',
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
