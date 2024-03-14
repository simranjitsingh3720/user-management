import React from "react";
import styles from "./styles.module.css";
import RenderStatus from "./RenderStatus";
import EditLogo from "../../../../assets/EditLogo";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";

function List({ item }) {
  const navigate = useNavigate();

  const handleEditClick = (permissionName) => {
    navigate(`/permission/privilege-form/${permissionName}`);
    // navigate("/permission/privilege-form", { state: { item } }); // Pass item data as state
  };

  return (
    <div className={styles.listHeader}>
      <div className={styles.nameCell}>{item.permissionName}</div>
      <div className={styles.privilegeTypeCell}>
        {item?.type?.toUpperCase()}
      </div>
      <div className={styles.moduleCell}>
        <text>
          Module:<span className={styles.styleSpan}>{item.module || "-"}</span>
        </text>
        <text>
          Sub-Module:
          <span className={styles.styleSpan}>{item.subModule || "-"}</span>
        </text>
      </div>
      <div className={styles.apiCell}>{item.api || "-"}</div>
      <div className={styles.crudCell}>
        {item?.crud?.join(", ").toUpperCase()}
      </div>
      <div className={styles.privilegeStatusCell}>
        {<RenderStatus status={item.status} />}
      </div>
      <div className={styles.actionCell}>
        <IconButton
          aria-label="back"
          type="button"
          onClick={() => handleEditClick(item.permissionName)}
        >
          <EditLogo color="primary" />
        </IconButton>
      </div>
    </div>
  );
}

export default List;
