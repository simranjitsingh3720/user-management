import React from "react";
import CustomTable from "../../components/CustomTable";

const columns = ["Name", "Age", "Gender", "Action"];
const extraHeaderRow = [
  "Extra Header 1",
  "Extra Header 2",
  "Extra Header 3",
  "Extra Header 4",
];
const rows = [
  ["John Doe", "28", "Male", "Edit"],
  ["Jane Smith", "34", "Female", "Edit"],
  ["Sam Green", "23", "Male", "Edit"],
  ["Alice Johnson", "45", "Female", "Edit"],
  ["Michael Brown", "50", "Male", "Edit"],
  ["Laura Wilson", "31", "Female", "Edit"],
  ["Peter Parker", "22", "Male", "Edit"],
  ["Bruce Wayne", "40", "Male", "Edit"],
  ["Clark Kent", "35", "Male", "Edit"],
  ["Diana Prince", "30", "Female", "Edit"],
];
const footerContent = ["Footer 1", "Footer 2", "Footer 3", "Footer 4"];

const Dashboard = () => {
  return (
    <div>
      <CustomTable
        columns={columns}
        rows={rows}
        footerContent={footerContent}
        extraHeaderRow={extraHeaderRow}
        // customStyles={customStyles}
      />
    </div>
  );
};

export default Dashboard;
