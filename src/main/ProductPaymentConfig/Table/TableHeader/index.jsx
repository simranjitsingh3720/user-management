import React from "react";
import styles from "./styles.module.css";
import { Tooltip } from "@mui/material";

function TableHeader({ sort, setSort, paymentData }) {
  const handleSort = (sortKey) => {
    const newSortOrder = sort.sortOrder === "asc" ? "desc" : "asc";
    setSort({ sortKey, sortOrder: newSortOrder });
  };

  const renderSortIcon = (sortKey) => {
    if (sort?.sortKey === sortKey) {
      return <span>{sort.sortOrder === "asc" ? " ▲" : " ▼"}</span>;
    }
    return <span> ↕</span>;
  };

  return (
    <div className={styles.tableHeader}>
      <div className={styles.product}>Product</div>
      <div className={styles.lob}>LOB</div>
      <div className={styles.paymentModes}>
        <div className={styles.paymentModeText}>Payment Modes</div>
        <div className={styles.subPaymentModes}>
          <div className={styles.paymentObj}>
            {(paymentData?.data || []).map((paymentObj) => (
              <div className={styles.subPayment}>
                {paymentObj.name.length > 15 ? (
                  <Tooltip title={paymentObj.name}>
                    <span
                      className={styles.permissionNameStyle}
                    >{`${paymentObj.name.substring(0, 15)}...`}</span>
                  </Tooltip>
                ) : (
                  <span>{paymentObj.name || ""}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.createdAt} onClick={() => handleSort("createdAt")}>
        Created At
        {renderSortIcon("createdAt")}
      </div>{" "}
      <div className={styles.updatedAt} onClick={() => handleSort("updatedAt")}>
        updated At
        {renderSortIcon("updatedAt")}
      </div>{" "}
      <div className={styles.productStatus}>Action</div>
    </div>
  );
}

export default TableHeader;
