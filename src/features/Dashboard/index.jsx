import React from "react";
import CustomTable from "../../components/CustomTable";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";

const columnsArr = [
    {
      id: "name",
      value: "Name",
      sortable: true,
      action: [
        {
          component: "checkbox",
          selectAll: false,
          onClick: (row) => {
            console.log("Checkbox clicked", row);
          },
        },
        {
          component: "switch",
          selectAll: true,
          onClick: (row) => {
            console.log("Switch toggled", row);
          },
        },
      ],
    },
    {
      id: "age",
      value: "Age",
      sortable: true,
      action: [
        {
          showIcon: true,
          iconName: <VisibilityIcon />,
          onClick: (row) => {
            console.log("Visibility clicked", row);
          },
        },
      ],
    },
    {
      id: "gender",
      value: "Gender",
      sortable: false,
    },
    {
      id: "action",
      value: "Action",
      sortable: false,
      action: [
        {
          showIcon: true,
          iconName: <EditIcon />,
          onClick: (row) => {
            console.log("Edit clicked", row);
          },
        },
        {
          showIcon: true,
          iconName: <VisibilityIcon />,
          onClick: (row) => {
            console.log("Visibility clicked", row);
          },
        },
      ],
    },
  ];
const rows = [
  {id: 1,  name: "John Doe", age: '23', gender: 'Male'},
  {id: 2,  name: "John Doe", age: '23', gender: 'Male'},
  {id: 3,  name: "John Doe", age: '23', gender: 'Male'},
  {id: 4,  name: "John Doe", age: '23', gender: 'Male'},
  {id: 5,  name: "John Doe", age: '23', gender: 'Male'},
  {id: 6,  name: "John Doe", age: '23', gender: 'Female'},
  {id: 7,  name: "John Doe", age: '23', gender: 'Male'},
  {id: 8,  name: "John Doe", age: '23', gender: 'Male'},
  {id: 9,  name: "John Doe", age: '23', gender: 'Male'},
  {id: 10,  name: "John Doe", age: '23', gender: 'Male'},
  {id: 11,  name: "John Doe", age: '23', gender: 'Male'},
  {id: 21,  name: "John Doe", age: '23', gender: 'Male'},
  {id: 31,  name: "John Doe", age: '23', gender: 'Male'},
  {id: 41,  name: "John Doe", age: '23', gender: 'Female'},
  {id: 51,  name: "John Doe", age: '23', gender: 'Male'},
  {id: 61,  name: "John Doe", age: '23', gender: 'Male'},
  {id: 71,  name: "John Doe", age: '23', gender: 'Male'},
  {id: 81,  name: "John Doe", age: '23', gender: 'Male'},
  {id: 91,  name: "John Doe", age: '23', gender: 'Male'},
  {id: 111,  name: "John Doe", age: '23', gender: 'Male'},
  {id: 112,  name: "John Doe", age: '23', gender: 'Male'},
  {id: 113,  name: "John Doe", age: '23', gender: 'Male'},
  {id: 12,  name: "John Doe", age: '23', gender: 'Male'},
  {id: 13,  name: "John Doe", age: '23', gender: 'Male'},
];

const Dashboard = () => {
  return (
    <div>
      <CustomTable
        columns={columnsArr}
        rows={rows}
      />
    </div>
  );
};

export default Dashboard;
