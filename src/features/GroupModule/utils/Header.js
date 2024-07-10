import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';

export const Header = (updateGroupStatus, showGroupPermission, handleGroupEdit) => {
  return [
    { value: 'Group Name', id: 'groupName' },
    { value: 'Created At', id: 'createdAt', sortable: true },
    { value: 'Updated At', id: 'updatedAt', sortable: true },
    {
      id: 'groupStatus',
      value: 'Group Status',
      sortable: false,
      action: [
        {
          component: 'switch',
          onClick: (data, row) => {
            data.map((item) => {
              if (item.id === row.id) {
                return (row.checked = !row.checked);
              }

              return row.checked;
            });

            updateGroupStatus({
              id: row.id,
              properties: {
                status: row.checked,
              },
            });
          },
        },
      ],
    },
    {
      id: 'action',
      value: 'Action',
      sortable: false,
      action: [
        {
          showIcon: true,
          iconName: <VisibilityIcon />,
          onClick: (row) => {
            showGroupPermission(row)
          },
        },
        {
          showIcon: true,
          iconName: <EditIcon />,
          onClick: (row) => {
            handleGroupEdit(row)
          },
        },
      ],
    },
  ];
};
