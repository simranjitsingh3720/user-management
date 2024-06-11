import React from "react";
import CustomTable from "../../components/CustomTable";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";

const columnsArr = [
    {
        id: "name",
        value: "Name",
        action: [
            {
                component: "checkbox",
                selectAll: false,
                onclick : {
                    function (param) {
                    console.log(param)
                }}
            },
            {
                component: "switch",
                selectAll: true,
                onClick: (param) => {
                  console.log(param);
                },
            }
        ]
    },
    {
        id: 'age',
        value: "Age",
        action: [
            {
                showIcon: true,
                iconName: <VisibilityIcon />,
                onclick : {
                    function (param) {
                    console.log(param)
                }}
            },
        ]
    },
    {
        id: 'gender',
        value: "Gender",
    },
    {
        id: 'action',
        value: "Action",
        action: [
            {
                showIcon: true,
                iconName: <EditIcon />,
                onclick : {
                    function (param) {
                    console.log(param)
                }}
            },
            {
                showIcon: true,
                iconName: <VisibilityIcon />,
                onclick : {
                    function (param) {
                    console.log(param)
                }}
            },
        ]
    }
    
]
const rows = [
  {id: 1,  name: "John Doe", age: '23', gender: 'Male'},
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
