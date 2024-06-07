import React from "react";
import styles from "./styles.module.scss";

function TableFooter() {
  return (
    <div className={styles.tableFooter}>
      <p className={styles.styledFooterText}>Total Record Selected: 0</p>
    </div>
  );
}

export default TableFooter;
