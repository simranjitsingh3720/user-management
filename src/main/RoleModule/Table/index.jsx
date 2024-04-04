import React from "react";
import TableHeader from "./TableHeader";
import List from "./List";
import styles from "./styles.module.css";
import ListLoader from "../../../sharedComponents/ListLoader";

function Table({ ListData, loading }) {
  return (
    <div className={styles.tableContainer}>
      <TableHeader />
      {loading && <ListLoader />}
      {(ListData || []).map((item) => (
        <List item={item} />
      ))}
    </div>
  );
}

export default Table;
