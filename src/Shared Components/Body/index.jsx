import { Box, Toolbar } from "@mui/material";
import React from "react";
import styles from "./styles.module.css";

function Body() {
  return (
    <Box>
      <Toolbar />
      <div>
        <div>
          <div className={styles.searchText}>Search By</div>
        </div>
        <div>table</div>
      </div>
    </Box>
  );
}

export default Body;
