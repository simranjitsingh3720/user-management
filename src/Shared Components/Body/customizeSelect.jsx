import { Select } from "@mui/material";
import React from "react";
import withStyles from "@mui/styles/withStyles";

const styles = (theme) => ({
  select: {
    // Add your custom styles here
    // For example:
    width: "200px",
    backgroundColor: "#f0f0f0",
    borderRadius: "5px",
    padding: "10px",
    "&:focus": {
      backgroundColor: "#fff", // Change background color on focus
    },
  },
});

function CustomizedSelect(props) {
  const { classes } = props;

  return (
    <Select
      className={classes.select}
      // Other props for Select component
    >
      {/* Options */}
    </Select>
  );
}

export default withStyles(styles)(CustomizedSelect);
