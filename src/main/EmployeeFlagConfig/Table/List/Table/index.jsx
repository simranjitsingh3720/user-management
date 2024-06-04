import React from "react";
import TableHeader from "./TableHeader";
import List from "./List";
import styles from "./styles.module.css";

function Table({ ListData }) {
  return (
    <div className={styles.tableContainer}>
      <TableHeader />
      {(ListData || []).map((item) => (
        <List item={item} />
      ))}
    </div>
  );
}

export default Table;
