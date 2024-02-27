import { Box, IconButton, MenuItem, Select, Toolbar } from "@mui/material";
import React from "react";
import styles from "./styles.module.css";
import ClearIcon from "@mui/icons-material/Clear";

function Body() {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleClear = () => {
    setAge("");
  };
  return (
    <Box>
      <Toolbar />
      <div>
        <div>
          <div className={styles.searchText}>Search By</div>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            onChange={handleChange}
            placeholder="Hello"
            displayEmpty
            className={styles.CustomizeSelect}
            renderValue={
              age !== ""
                ? undefined
                : () => (
                    <div className={styles.placeholderStyle}>Placeholder</div>
                  )
            }
            endAdornment={
              age !== "" && (
                <IconButton
                  aria-label="clear selection"
                  onClick={handleClear}
                  edge="end"
                >
                  <ClearIcon />
                </IconButton>
              )
            }
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </div>
        <div>table</div>
      </div>
    </Box>
  );
}

export default Body;
