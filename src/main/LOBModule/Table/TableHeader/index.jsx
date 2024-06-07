import React from "react";
import styles from "./styles.module.scss";

function TableHeader({ sort, setSort, setLoading }) {
  const handleSort = (sortKey) => {
    const newSortOrder = sort.sortOrder === "asc" ? "desc" : "asc";
    setSort({ sortKey, sortOrder: newSortOrder });
    setLoading(true);
  };

  const renderSortIcon = (sortKey) => {
    if (sort?.sortKey === sortKey) {
      return <span>{sort.sortOrder === "asc" ? " ▲" : " ▼"}</span>;
    }
    return <span> ↕</span>;
  };
  return (
    <div className={styles.tableHeader}>
      <div className={styles.name} onClick={() => handleSort("lob")}>
        LOB Name {renderSortIcon("lob")}
      </div>
      <div className={styles.lobValue} onClick={() => handleSort("lob_value")}>
        LOB Value {renderSortIcon("lob_value")}
      </div>
      <div className={styles.lobLevel} onClick={() => handleSort("lob_value")}>
        LOB Level {renderSortIcon("lob_level")}
      </div>
      <div className={styles.lobCode} onClick={() => handleSort("lob_code")}>
        LOB Code{renderSortIcon("lob_code")}
      </div>
      <div className={styles.createdAt} onClick={() => handleSort("createdAt")}>
        Created At
        {renderSortIcon("createdAt")}
      </div>{" "}
      <div className={styles.lobStatus}>Status</div>
    </div>
  );
}

export default TableHeader;
