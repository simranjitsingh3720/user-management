import { Card, CardContent, Typography } from "@mui/material";
import React from "react";
import styles from "./styles.module.scss";

function NoDataFound() {
  return (
    <div className={styles.cardContainerWidth}>
      <Card className={styles.cardStyle}>
        <CardContent>
          <Typography variant="h6" color="textSecondary" textAlign="center">
            No data found
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default NoDataFound;
