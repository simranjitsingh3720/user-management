import React from "react";
import TableHeader from "./TableHeader";
import List from "./List";
import TableFooter from "./TableFooter";
import styles from "./styles.module.css";

function Table({ ListData }) {
  return (
    <div className={styles.tableContainer}>
      <TableHeader />
      {ListData.map((item) => (
        <List item={item} />
      ))}
      <TableFooter />
    </div>
  );
}

export default Table;
