import { Skeleton } from "@mui/material";
import React from "react";
import styles from "./styles.module.css";

function ListLoader({ rows = 10, column = 5 }) {
  return (
    <div className={styles.loaderContainer}>
      {Array.from(Array(rows).keys()).map(() => {
        return (
          <div className={styles.listHeader}>
            {Array.from(Array(column).keys()).map(() => (
              <Skeleton variant="rounded" width={100} height={15} />
            ))}
          </div>
        );
      })}
    </div>
  );
}

export default ListLoader;
