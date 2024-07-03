import React from "react";
import { TextField } from "@mui/material";

const CustomSearchField = ({ placeholder, searchValue, setSearchValue, classes }) => {

  const onChange = (event) => {
    setSearchValue(event.target.value);
  }
  return (
    <TextField
      variant="outlined"
      size="small"
      className={classes}
      placeholder={placeholder}
      value={searchValue}
      onChange={onChange}
    />
  );
};

export default CustomSearchField;
