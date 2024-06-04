import React from "react";
import styles from "./styles.module.css";
import { Card, CardContent, MenuItem, Select, Switch } from "@mui/material";

function TableList({ dataList, setDataList }) {
  const handleChange = (productId) => {
    const newDataList = [...dataList];
    const newUpdatedDataList = newDataList.map((item) => {
      if (item.productId === productId) {
        return {
          ...item,
          isEmployee: !item.isEmployee,
        };
      }
      return item;
    });
    setDataList(newUpdatedDataList);
  };
  return (
    <div>
      <div className={styles.headerTextOTP}>
        Select yes if the member is an employee for the given list of products
        below.
      </div>
      <div className={styles.dataListStyle}>
        {dataList.map((item) => (
          <div key={item.productId} className={styles.switchStyle}>
            <div>{item.name}</div>
            <Switch
              checked={item.isEmployee}
              onChange={() => handleChange(item.productId)}
              inputProps={{ "aria-label": "toggle button" }}
            />
            <span className={styles.enableStyle}>
              {item.isEmployee ? "Yes" : "No"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TableList;
