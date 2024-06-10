import React from "react";
import styles from "./styles.module.scss";

function List({ item }) {
  return (
    <div className={styles.listHeader}>
      <div className={styles.nameCell}>{item.product}</div>
      <div className={styles.nameCell}>{item.product_code}</div>
      <div className={styles.privilegeStatusCell}>
        {item.isEmployee ? "yes" : "No"}
      </div>
    </div>
  );
}

export default List;
