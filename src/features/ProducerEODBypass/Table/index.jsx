import React from "react";
import TableHeader from "./TableHeader";
import List from "./List";
import styles from "./styles.module.scss";

function Table({ ListData, fetchData, sort, setSort, canUpdate }) {
  return (
    <div className={styles.tableContainer}>
      <TableHeader sort={sort} setSort={setSort} />
      {(ListData || []).map((item) => (
        <List item={item} fetchData={fetchData} canUpdate={canUpdate}/>
      ))}
    </div>
  );
}

export default Table;
