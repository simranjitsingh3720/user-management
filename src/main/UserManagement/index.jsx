import { Box, MenuItem, Pagination, Select, Toolbar } from "@mui/material";
import React from "react";
import styles from "./styles.module.css";
import Table from "./Components/Table";
import SearchComponent from "./Components/SearchComponent";

function UserManagement() {
  const [pageChange, setPageChange] = React.useState(1);

  const [rowsPage, setRowsPage] = React.useState(10);

  const handleRowsChange = (event) => {
    setRowsPage(event.target.value);
  };

  const handlePaginationChange = (event, page) => {
    setPageChange(page);
  };

  const selectRowsData = [5, 10];

  const rows = [
    {
      id: 1,
      userId: 123523,
      lastName: "Snow",
      firstName: "Jon",
      age: 35,
      status: "active",
      ntLogin: "test04@tataaig.local",
      role: "Underwriter",
      emailId: "test04@uatipds1.cloware.in",
      mobile: "1234567890",
      dateOfCreation: "09/02/2024",
    },
    {
      id: 2,
      userId: 1235231273192,
      lastName: "Snow",
      firstName: "Jon",
      age: 35,
      status: "inactive",
      ntLogin: "test04@tataaig.local",
      role: "Ops Helpdesk",
      emailId: "test04@uatipds1.cloware.in",
      mobile: "1234567890",
      dateOfCreation: "09/02/2024",
    },
    {
      id: 3,
      userId: 12352379708,
      lastName: "Snow",
      firstName: "Jon",
      age: 35,
      status: "active",
      ntLogin: "test04@tataaig.local",
      emailId: "test04@uatipds1.cloware.in",
      role: "Marinehub",
      mobile: "1234567890",
      dateOfCreation: "09/02/2024",
    },
    {
      id: 3,
      userId: 123523,
      lastName: "Snow",
      firstName: "Jon",
      age: 35,
      status: "active",
      ntLogin: "test04@tataaig.local",
      emailId: "test04@uatipds1.cloware.in",
      role: "CSM",
      mobile: "1234567890",
      dateOfCreation: "09/02/2024",
    },
    {
      id: 4,
      userId: 123523,
      lastName: "Snow",
      firstName: "Jon",
      age: 35,
      status: "active",
      ntLogin: "test04@tataaig.local",
      emailId: "test04@uatipds1.cloware.in",
      role: "Underwriter",
      mobile: "1234567890",
      dateOfCreation: "09/02/2024",
    },
    {
      id: 5,
      userId: 123523,
      lastName: "Snow",
      firstName: "Jon",
      age: 35,
      status: "active",
      ntLogin: "test04@tataaig.local",
      emailId: "test04@uatipds1.cloware.in",
      role: "Underwriter",
      mobile: "1234567890",
      dateOfCreation: "09/02/2024",
    },
    {
      id: 6,
      userId: 123523,
      lastName: "Snow",
      firstName: "Jon",
      age: 35,
      status: "active",
      ntLogin: "test04@tataaig.local",
      emailId: "test04@uatipds1.cloware.in",
      role: "Underwriter",
      mobile: "1234567890",
      dateOfCreation: "09/02/2024",
    },
  ];

  return (
    <Box>
      {/* <Toolbar /> */}
      <div>
        <SearchComponent />
        <div className={styles.tableStyled}>
          <Table ListData={rows} />
          <div className={styles.pageFooter}>
            <div className={styles.rowsPerPage}>
              <p className={styles.totalRecordStyle}>Showing Results:</p>
              <Select
                labelId="rows-per-page"
                id="rows-per-page"
                value={rowsPage}
                onChange={handleRowsChange}
                size="small"
                className={styles.customizeRowsSelect}
              >
                {selectRowsData.map((item) => (
                  <MenuItem value={item} className={styles.styledOptionText}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
              <p className={styles.totalRecordStyle}>of 141</p>
            </div>
            <Pagination
              count={10}
              color="primary"
              size="small"
              onChange={handlePaginationChange}
              page={pageChange}
            />
          </div>
        </div>
      </div>
    </Box>
  );
}

export default UserManagement;
