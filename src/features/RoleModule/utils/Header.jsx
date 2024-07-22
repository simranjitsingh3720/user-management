import EditIcon from '@mui/icons-material/Edit';

export const Header = (handleEditClick, updateRoleStatus) => {
  return [
    {
      id: 'roleName',
      value: 'Role Name',
    },
    {
      id: 'groupName',
      value: 'Group Name',
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
      id: 'roleStatus',
      value: 'Status',
      sortable: false,
      action: [
        {
          component: 'switch',
          onClick: (data, row) => {
            updateRoleStatus(data, row);
          },
        },
      ],
    },
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
}
