import React from "react";
import DynamicTable from "./../DynamicTable";
import styles from "./styles.module.css";
import { PRODUCERTABLEHEADER } from "../constants";
import useRevalidationList from "../hooks/useRevalidationList";

const ProducerTable = ({ revalidationList }) => {
  const { revalidationListUpdateData } = useRevalidationList();

  const handleDataUpdate = (updatedData) => {
    revalidationListUpdateData(updatedData);
  };

  return (
    <div className={styles.tableContainer}>
      <DynamicTable
        columns={PRODUCERTABLEHEADER}
        data={revalidationList}
        switchType="action"
        onDataUpdate={handleDataUpdate}
      />
    </div>
  );
};

export default ProducerTable;
