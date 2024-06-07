import React from "react";
import styles from "./styles.module.scss";
import { Card, CardContent, MenuItem, Select, Typography } from "@mui/material";
import { BitlyLinkMandatory } from "../../constants";

function TableList({ dataList, setDataList }) {
  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableHeader}>
        <div className={styles.nameCell}>Products</div>
        <div className={styles.nameCell}>Bitly Link Mandatory</div>
      </div>
      {dataList.length ? (
        (dataList || []).map((item) => (
          <div className={styles.listHeader}>
            <div className={styles.namelistCell}>{item?.name || "-"}</div>
            <Select
              labelId="search-select"
              id="bitlyLinkMandatory"
              onChange={(event, newValue) => {
                const newDataList = [...dataList];
                newDataList.forEach((obj) => {
                  if (obj.productId === item.productId) {
                    obj.isMandatory = !obj.isMandatory;
                  }
                });
                setDataList(newDataList);
              }}
              size="small"
              displayEmpty
              defaultValue="no"
              className={styles.customizeSelect}
              renderValue={(selected) => {
                if (selected === undefined) {
                  return <div className={styles.placeholderStyle}>Select</div>;
                }
                const selectedItem = BitlyLinkMandatory.find(
                  (item) => item.value === selected
                );
                return selectedItem ? selectedItem.label : "";
              }}
            >
              {BitlyLinkMandatory.map((item) => (
                <MenuItem
                  value={item.value}
                  className={styles.styledOptionText}
                >
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </div>
        ))
      ) : (
        <div className={styles.cardContainerWidth}>
          <Card className={styles.cardStyle}>
            <CardContent>
              <Typography variant="h6" color="textSecondary" textAlign="center">
                No data found
              </Typography>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

export default TableList;
