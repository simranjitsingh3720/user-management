import React from "react";
import TableHeader from "./TableHeader";
import List from "./List";
import styles from "./styles.module.css";

function Table({ ListData, fetchData, setLoading, sort, setSort }) {
  return (
    <div className={styles.tableContainer}>
      <TableHeader sort={sort} setSort={setSort} setLoading={setLoading} />
      {(ListData || []).map((item) => (
        <List item={item} fetchData={fetchData} setLoading={setLoading} />
      ))}
    </div>
  );
}

export default Table;
