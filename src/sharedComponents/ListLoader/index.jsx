import { Skeleton } from "@mui/material";
import React from "react";
import styles from "./styles.module.css";

function ListLoader() {
  return (
    <div>
      {Array.from(Array(10).keys()).map(() => {
        return (
          <div className={styles.listHeader}>
            {Array.from(Array(4).keys()).map(() => (
              <Skeleton variant="rounded" width={100} height={15} />
            ))}
          </div>
        );
      })}
    </div>
  );
}

export default ListLoader;
