import { Skeleton } from "@mui/material";
import React from "react";
import styles from "./styles.module.scss";

function Loader({ rows = 5, column = 3 }) {
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

export default Loader;
