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

const NotificationTable = ({ control, setValue }) => {
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

  const products = [
    {
      name: "medicare",
      label: "Medicare",
      toggleSwitch1: "medicareSMS",
      toggleSwitch2: "medicareEmail",
      toggleSwitch3: "medicareWhatsapp",
      startDate: "medicareStartDate",
      endDate: "medicareEndDate",
      startTime: "medicareStartTime",
      endTime: "medicareEndTime"
    },
    {
      name: "medicarePremier",
      label: "Medicare Premier",
      toggleSwitch1: "medicarePremierSMS",
      toggleSwitch2: "medicarePremierEmail",
      toggleSwitch3: "medicarePremierWhatsapp",
      startDate: "medicarePremierStartDate",
      endDate: "medicarePremierEndDate",
      startTime: "medicarePremierStartTime",
      endTime: "medicarePremierEndTime"
    },
    {
      name: "medicarePremierRevised",
      label: "Medicare Premier Revised",
      toggleSwitch1: "medicarePremierRevisedSMS",
      toggleSwitch2: "medicarePremierRevisedEmail",
      toggleSwitch3: "medicarePremierRevisedWhatsapp",
      startDate: "medicarePremierRevisedStartDate",
      endDate: "medicarePremierRevisedEndDate",
      startTime: "medicarePremierRevisedStartTime",
      endTime: "medicarePremierRevisedEndTime"
    },
    {
      name: "medicareProtect",
      label: "Medicare Protect",
      toggleSwitch1: "medicareProtectSMS",
      toggleSwitch2: "medicareProtectEmail",
      toggleSwitch3: "medicareProtectWhatsapp",
      startDate: "medicareProtectStartDate",
      endDate: "medicareProtectEndDate",
      startTime: "medicareProtectStartTime",
      endTime: "medicareProtectEndTime"
    },
    {
      name: "medicareRevised",
      label: "Medicare Revised",
      toggleSwitch1: "medicareRevisedSMS",
      toggleSwitch2: "medicareRevisedEmail",
      toggleSwitch3: "medicareRevisedWhatsapp",
      startDate: "medicareRevisedStartDate",
      endDate: "medicareRevisedEndDate",
      startTime: "medicareRevisedStartTime",
      endTime: "medicareRevisedEndTime"
    },
    {
      name: "medicarePlus",
      label: "Medicare Plus",
      toggleSwitch1: "medicarePlusSMS",
      toggleSwitch2: "medicarePlusEmail",
      toggleSwitch3: "medicarePlusWhatsapp",
      startDate: "medicarePlusStartDate",
      endDate: "medicarePlusEndDate",
      startTime: "medicarePlusStartTime",
      endTime: "medicarePlusEndTime"
    },
    {
      name: "critiMedicare",
      label: "Criti-Medicare",
      toggleSwitch1: "critiMedicareSMS",
      toggleSwitch2: "critiMedicareEmail",
      toggleSwitch3: "critiMedicareWhatsapp",
      startDate: "critiMedicareStartDate",
      endDate: "critiMedicareEndDate",
      startTime: "critiMedicareStartTime",
      endTime: "critiMedicareEndTime"
    },
  ];

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
                <BasicTimePicker control={control} name={product.startTime}/>
              </TableCell>
              <TableCell sx={{ width: "161px" }}>
                <DateField
                  key={product.endDate}
                  control={control}
                  name={product.endDate}
                  labelVisible={false}
                  label="end date"
                  required
                  //classes="w-full"
                  setValue={setValue}
                />
              </TableCell>
              <TableCell sx={{ width: "20px" }}>
                <BasicTimePicker control={control} name={product.endTime}/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default NotificationTable;
