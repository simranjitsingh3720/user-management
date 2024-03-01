import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Toolbar,
} from "@mui/material";
import React from "react";
import styles from "./styles.module.css";
import DownloadIcon from "../../assets/DownloadLogo";
import { DataGrid } from "@mui/x-data-grid";

function Body() {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "firstName", headerName: "First name", width: 130 },
    { field: "lastName", headerName: "Last name", width: 130 },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 90,
    },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
  ];

  const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  ];

  const selectData = [
    {
      label: "User ID",
      value: "userId",
    },
    {
      label: "NT Login",
      value: "ntLogin",
    },
    {
      label: "Email ID",
      value: "emailID",
    },
    {
      label: "Role",
      value: "role",
    },
    {
      label: "Date Creation",
      value: "dateCreation",
    },
    {
      label: "Insillion Status",
      value: "insillionStatus",
    },
  ];
  return (
    <Box>
      <Toolbar />
      <div>
        <div>
          <div className={styles.searchText}>Search By</div>
          <div className={styles.selectContainer}>
            <div>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                onChange={handleChange}
                placeholder="Hello"
                size="small"
                displayEmpty
                className={styles.customizeSelect}
                renderValue={
                  age !== ""
                    ? undefined
                    : () => (
                        <div className={styles.placeholderStyle}>Select</div>
                      )
                }
              >
                {selectData.map((item) => (
                  <MenuItem
                    value={item.value}
                    className={styles.styledOptionText}
                  >
                    {item.label}
                  </MenuItem>
                ))}
              </Select>

              <TextField
                id="search"
                variant="outlined"
                placeholder="Search"
                size="small"
                className={styles.textFieldStyle}
              />
              <Button variant="outlined">Go</Button>
            </div>
            <div>
              <Button
                variant="outlined"
                startIcon={<DownloadIcon />}
                className={styles.exportButtonStyle}
              >
                Export Data
              </Button>
              <Button variant="contained">Create New User</Button>
            </div>
          </div>
        </div>
        <div
          style={{
            height: "100%",
            width: "100%",
            marginTop: "20px",
            background: "#ffffff",
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
          />
        </div>
      </div>
    </Box>
  );
}

export default Body;
