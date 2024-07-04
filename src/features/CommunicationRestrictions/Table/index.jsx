import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import styles from "./styles.module.scss";
import ToggleSwitch from "../../../components/CustomToggleSwitch";
import DateField from "../../../components/CustomDateInput";
import BasicTimePicker from "../../../components/CustomTimeField";
import { products } from "./constants";

const NotificationTable = ({ control, setValue, watch}) => {
  const stylesSX = {
    tableHeader: {
      borderBottom: "none",
      color: "#465465",
      fontSize: "13px",
    },
    tableSubHeader: {
      color: "#465465",
      fontSize: "13px",
    },
    labelText: {
      color: "#607083",
      fontSize: "14px",
      width: "230px",
    },
  };

  return (
    <TableContainer className="table-container overflow-x-auto">
      <Table className="min-w-[975px] w-full">
        <TableHead>
          <TableRow>
            <TableCell sx={{ ...stylesSX.tableHeader, width: "135px" }}>
              Products
            </TableCell>
            <TableCell
              sx={{ ...stylesSX.tableHeader, width: "30px" }}
              align="center"
              colSpan={3}
            >
              Notification
            </TableCell>
            <TableCell sx={{ ...stylesSX.tableHeader, width: "80px" }}>
              Start Date
            </TableCell>
            <TableCell sx={{ ...stylesSX.tableHeader, width: "20px" }}>
              Start Time
            </TableCell>
            <TableCell sx={{ ...stylesSX.tableHeader, width: "130px" }}>
              End Date
            </TableCell>
            <TableCell sx={{ ...stylesSX.tableHeader, width: "20px" }}>
              End Time
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ width: "30px" }} />
            <TableCell sx={{ ...stylesSX.tableSubHeader, width: "30px" }}>
              SMS
            </TableCell>
            <TableCell sx={{ ...stylesSX.tableSubHeader, width: "30px" }}>
              Email
            </TableCell>
            <TableCell sx={{ ...stylesSX.tableSubHeader, width: "30px" }}>
              WhatsApp
            </TableCell>
            <TableCell sx={{ width: "80px" }} />
            <TableCell sx={{ width: "20px" }} />
            <TableCell sx={{ width: "150px" }} />
            <TableCell sx={{ width: "20px" }} />
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.name}>
              <TableCell
                sx={{ width: "40px", color: "#607083", fontSize: "13px" }}
                className={styles.labelText}
              >
                {product.label}
              </TableCell>
              <TableCell sx={{ width: "20px" }}>
                <ToggleSwitch name={product.toggleSwitch1} control={control} />
              </TableCell>
              <TableCell sx={{ width: "20px" }}>
                <ToggleSwitch name={product.toggleSwitch2} control={control} />
              </TableCell>
              <TableCell sx={{ width: "20px" }}>
                <ToggleSwitch name={product.toggleSwitch3} control={control} />
              </TableCell>
              <TableCell sx={{ width: "160px" }}>
                <DateField
                  key={product.startDate}
                  control={control}
                  name={product.startDate}
                  labelVisible={false}
                  label="start date"
                  required
                  classes="w-full text-red-600"
                  setValue={setValue}
                />
              </TableCell>
              <TableCell sx={{ width: "20px" }}>
                <BasicTimePicker control={control} name={product.startTime} />
              </TableCell>
              <TableCell sx={{ width: "161px" }}>
                <DateField
                  key={product.endDate}
                  control={control}
                  name={product.endDate}
                  labelVisible={false}
                  label="end date"
                  required
                  watch={watch}
                  //classes="w-full"
                  setValue={setValue}
                />
              </TableCell>
              <TableCell sx={{ width: "20px" }}>
                <BasicTimePicker control={control} name={product.endTime} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default NotificationTable;
