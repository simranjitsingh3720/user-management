import React from "react";
import styles from "./styles.module.css";

function List({ item, fetchData: fetchGroupList }) {
  return (
    <div>
      <div className={styles.listHeader}>
        <div className={styles.code}>{item?.producer?.producerCode || "-"}</div>
        <div className={styles.code}>{item?.producer?.producerCode || "-"}</div>

        <div className={styles.code}>{item?.producer?.producerCode || "-"}</div>

        <div className={styles.code}>{item?.producer?.producerCode || "-"}</div>

        <div className={styles.code}>{item?.producer?.producerCode || "-"}</div>

        <div className={styles.code}>{item?.producer?.producerCode || "-"}</div>
      </div>
    </div>
  );
}

export default List;
