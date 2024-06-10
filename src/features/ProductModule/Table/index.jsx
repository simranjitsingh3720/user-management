import React from "react";
import TableHeader from "./TableHeader";
import List from "./List";
import styles from "./styles.module.scss";

function Table({ ListData, fetchData, sort, setSort }) {
  return (
    <div className={styles.tableContainer}>
      <TableHeader sort={sort} setSort={setSort} />
      {(ListData || []).map((item) => (
        <List item={item} fetchData={fetchData} />
      ))}
    </div>
  );
}

export default Table;
