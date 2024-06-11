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
        ]
    },
    {
        id: 'age',
        value: "Age",
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

// const extraHeaderRow = [
//   "Extra Header 1",
//   "Extra Header 2",
//   "Extra Header 3",
//   "Extra Header 4",
// ];
const rows = [
  {id: 1,  name: "John Doe", age: '23', gender: 'Male'},
];
// const footerContent = ["Footer 1", "Footer 2", "Footer 3", "Footer 4"];

const Dashboard = () => {
  return (
    <div>
      <CustomTable
        columns={columnsArr}
        rows={rows}
        // footerContent={footerContent}
        // extraHeaderRow={extraHeaderRow}
        // customStyles={customStyles}
      />
    </div>
  );
};

export default Dashboard;
