import { Card, CardContent, Typography } from "@mui/material";
import React from "react";

function NoDataFound() {
  return (
    <div>
      <Card>
        <CardContent>
          <Typography
            variant="h6"
            color="textSecondary"
            gutterBottom
            textAlign="center"
          >
            No data found
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default NoDataFound;
