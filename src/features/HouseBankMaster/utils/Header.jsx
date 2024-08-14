import EditIcon from '@mui/icons-material/Edit';

export const Header = (handleEditClick) => {
  return [
    {
      id: 'houseBankCode',
      value: 'House Bank Code',
    },
    {
      id: 'bankCode',
      value: 'Bank Code',
    },
    {
      id: 'branchName',
      value: 'Branch Name',
    },
    {
      id: 'accountNumber',
      value: 'Account Number',
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
            handleEditClick(row);
          },
        },
      ],
    },
  ];
};
