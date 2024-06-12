import React from "react";
// import DynamicTable from "./../DynamicTable";
import styles from "./styles.module.scss";
// import { PRODUCERTABLEHEADER } from "../constants";
import useRevalidationList from "../hooks/useRevalidationList";
import CustomTable from "../../../components/CustomTable";

const ProducerTable = ({ revalidationList, revalidationListLoading }) => {
  const { revalidationListUpdateData } = useRevalidationList();

  const HEADER_COLUMNS = [
    {
      id: "name",
      value: "User Name",
      sortable: true,
    },
    {
      id: "emailId",
      value: "Email ID",
      sortable: true,
    },
    {
      id: "mobileNo",
      value: "Mobile Number",
      sortable: true,
    },
    {
      id: "action",
      value: "Action",
      action: [
        {
          component: "switch",
          selectAll: true,
          onClick: (data, row) => {
            data.map((item) => {
              if (item.id === row.id) {
                row.checked = !row.checked;
              }
            });
            handleDataUpdate(data);
          },
        },
      ],
    },
  ];

  const handleDataUpdate = (updatedData) => {
    revalidationListUpdateData(updatedData);
  };

  return (
    <div className={styles.tableContainer}>
      <CustomTable columns={HEADER_COLUMNS} rows={revalidationList} />

      {/* <DynamicTable
        columns={PRODUCERTABLEHEADER}
        data={revalidationList}
        switchType="action"
        onDataUpdate={handleDataUpdate}
        loading={revalidationListLoading}
      /> */}
    </div>
  );
};

export default ProducerTable;
