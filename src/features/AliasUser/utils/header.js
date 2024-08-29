export const Header = () => {
  return [
    { value: 'Producer Code', id: 'producerCode' },
    { value: 'Producer Email', id: 'Alias Email' },
    { value: 'First Name', id: 'firstName' },
    { value: 'Last Name', id: 'lastName' },
    { value: 'Created At', id: 'createdAt', sortable: true },
    { value: 'Updated At', id: 'updatedAt', sortable: true },
    {
      id: 'action',
      value: 'Status',
      sortable: false,
      action: [
        {
          component: 'switch',
          onClick: (data, row) => {
            // TO Do
          },
        },
      ],
    },
  ];
};
