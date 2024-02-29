import React from "react";
import styles from "./styles.module.css";
import EditLogo from "../../../../../Assets/EditLogo";
import RenderStatus from "./RenderStatus";

function List({ item }) {
  return (
    <div className={styles.listHeader}>
      <div className={styles.userIdCell}>{item.userId}</div>
      <div className={styles.loginCell}>
        <text>
          NT Login:<span>{item.ntLogin}</span>
        </text>
        <text>
          Email ID:
          <span>{item.emailId}</span>
        </text>
      </div>
      <div className={styles.mobileCell}>{item.mobile}</div>
      <div className={styles.roleCell}>{item.role}</div>
      <div className={styles.dateCell}>{item.dateOfCreation}</div>
      <div className={styles.statusCell}>
        {<RenderStatus status={item.status} />}
      </div>
      <div className={styles.actionCell}>
        <EditLogo />
      </div>
    </div>
  );
}

export default List;
