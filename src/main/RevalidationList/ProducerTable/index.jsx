import React from "react";
import DynamicTable from "../../../sharedComponents/Table";
import styles from "./styles.module.css";
import { PRODUCERTABLEHEADER } from "../constants";
import useProducerData from "../hooks/useProducerData";

const ProducerTable = ({ revalidationList }) => {
  const { updateData } = useProducerData();

  return (
    <div className={styles.tableContainer}>
      <DynamicTable
        columns={PRODUCERTABLEHEADER}
        data={revalidationList}
        switchType="action"
        onDataUpdate={updateData}
      />
    </div>
  );
};

export default ProducerTable;
