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
            // endAdornment={
            //   age !== "" && (
            //     <IconButton aria-label="clear selection" edge="end">
            //       <ClearIcon
            //         className={styles.styledClearIcon}
            //         onClick={handleClear}
            //       />
            //     </IconButton>
            //   )
            // }
          >
            <MenuItem value="userId" className={styles.styledOptionText}>
              User ID
            </MenuItem>
            <MenuItem value="ntLogin">NT Login</MenuItem>
            <MenuItem value="emailId">Email ID</MenuItem>
            <MenuItem value="role">Role</MenuItem>
            <MenuItem value="dateCreation">Date of Creation</MenuItem>
          </Select>
        </div>
        <div>table</div>
      </div>
    </Box>
  );
}

export default Body;
