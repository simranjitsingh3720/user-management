import React from "react";
import styles from "./styles.module.scss";
import { IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

function Table({ ListData, fetchData, sort, setSort, paymentData }) {
  const resultFun = (item) => {
    const isSelected = (payment, selected) => {
      return selected.some((sel) => sel.id === payment.id);
    };
    const result = (paymentData?.data || []).map((payment) => {
      return {
        ...payment,
        selected: isSelected(payment, item?.paymentTypes) ? "Yes" : "No",
      };
    });

    return result;
  };

  const navigate = useNavigate();

  const handleEditClick = (item) => {
    navigate(`/product-payment-config/form/${item.id}`);
  };

  return (
    <div className={styles.tableContainer}>
      <div className={styles.firstHeaderStyle}>
        <div className={styles.headerStyle}>
          <div className={styles.product}>Product</div>
          <div className={styles.product}>LOB</div>
        </div>
        {ListData.map((item) => (
          <div className={styles.listHeader}>
            <div className={styles.productList}>
              {item?.product?.product || "-"}
            </div>
            <div className={styles.lobList}>{item?.lob?.lob}</div>
          </div>
        ))}
      </div>
      <div className={styles.middleHeader}>
        <div className={styles.subMiddleHeader}>
          <div className={styles.paymentModeHeader}>
            <div className={styles.paymentModeText}>Payment Modes</div>
            <div className={styles.paymentObj}>
              {(paymentData?.data || []).map((paymentObj) => (
                <div className={styles.subPayment}>
                  <span>{paymentObj.name || ""}</span>
                </div>
              ))}
            </div>
          </div>

          {ListData.map((item) => (
            <div className={styles.listHeader}>
              {(resultFun(item) || []).map((obj) => (
                <div className={styles.subPaymentList}> {obj.selected}</div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.lastHeaderStyle}>
        <div className={styles.headerStyle}>
          <div className={styles.action}>Created At</div>
          <div className={styles.action}>Updated At</div>
          <div className={styles.action}>Action</div>
        </div>
        {ListData.map((item) => (
          <div className={styles.listHeader}>
            <div className={styles.createdAt}>{item.createdAt}</div>
            <div className={styles.createdAt}>{item.updatedAt}</div>
            <div className={styles.productStatus}>
              <Tooltip title="Edit Payment Modes">
                <IconButton
                  aria-label="back"
                  type="button"
                  onClick={() => {
                    handleEditClick(item);
                  }}
                >
                  <EditIcon color="primary" />
                </IconButton>
              </Tooltip>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Table;
