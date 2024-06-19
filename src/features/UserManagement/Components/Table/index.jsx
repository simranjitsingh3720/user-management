import React from "react";
import TableHeader from "./TableHeader";
import List from "./List";
import TableFooter from "./TableFooter";
import styles from "./styles.module.scss";

function Table({ ListData, loading, fetchData, setLoading, sort, setSort }) {
  return (
    <div className={styles.tableContainer}>
      <TableHeader sort={sort} setSort={setSort} />
      {(ListData || []).map((item, index) => (
        <List
          key={index}
          item={item}
          loading={loading}
          fetchData={fetchData}
          setLoading={setLoading}
        />
      ))}
      <TableFooter />
    </div>
  );
}

export default Table;
