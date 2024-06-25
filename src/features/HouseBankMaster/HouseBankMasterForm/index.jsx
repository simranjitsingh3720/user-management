import { IconButton, TextField } from "@mui/material";
import React, { useEffect } from "react";
import LeftArrow from "../../../assets/LeftArrow";
import styles from "./styles.module.scss";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import useUpdatePaymentConfig from "../hooks/useUpdateHouseBank";
import useCreateHouseBank from "../hooks/useCreateHouseBank";
import useGetHouseBankByID from "../hooks/useGetHouseBankById";
import CustomButton from "../../../components/CustomButton";

function HouseBankMasterForm() {
  const { id } = useParams();

  const { handleSubmit, control, setValue, formState } = useForm({
    defaultValues: {
      houseBankCode: null,
      bankCode: null,
      branchName: null,
      accountNumber: null,
    },
  });

  const { data: houseBankByID, fetchData: fetchHouseBankByID } =
    useGetHouseBankByID();

  useEffect(() => {
    if (id) fetchHouseBankByID(id);
  }, [id]);

  const navigate = useNavigate();

  const { postData, loading: createPaymentLoading } = useCreateHouseBank();

  const { UpdateDataFun, updateLoading } = useUpdatePaymentConfig();

  const { errors } = formState;

  useEffect(() => {
    if (houseBankByID && houseBankByID?.data) {
      setValue("houseBankCode", houseBankByID?.data?.houseBankCode || null);
      setValue("bankCode", houseBankByID?.data?.bankCode || null);
      setValue("branchName", houseBankByID?.data?.branchName || null);
      setValue("accountNumber", houseBankByID?.data?.accountNumber || null);
    }
  }, [houseBankByID]);

  const onSubmit = (data) => {
    if (id) {
      const payload = {
        id: id,
        properties: {
          houseBankCode: Number(data?.houseBankCode),
          bankCode: data?.bankCode,
          branchName: data?.branchName,
        },
      };
      UpdateDataFun(payload);
    } else {
      const payload = {
        houseBankCode: Number(data?.houseBankCode),
        bankCode: data?.bankCode,
        branchName: data?.branchName,
        accountNumber: data?.accountNumber,
      };
      postData(payload);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.createNewUserContainer}>
          <div className={styles.formHeaderStyle}>
            <div className={styles.subHeader}>
              <IconButton
                aria-label="back"
                onClick={() => {
                  navigate("/house-bank-master");
                }}
              >
                <LeftArrow />
              </IconButton>
              <span className={styles.headerTextStyle}>
                <div className={styles.setOTPHeaderOTP}>
                  {id
                    ? "Update House Bank Configuration"
                    : "Create House Bank Configuration"}
                </div>
              </span>
            </div>
          </div>{" "}
          <div className={styles.containerStyle}>
            <div className={styles.fieldContainerStyle}>
              <span className={styles.labelText}>
                House Bank Code <span className={styles.styledRequired}>*</span>
              </span>
              <Controller
                name="houseBankCode"
                control={control}
                defaultValue=""
                rules={{
                  required: "House Bank Code is required",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Only numeric values are allowed",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    id="houseBankCode"
                    variant="outlined"
                    placeholder="Enter House Bank Code"
                    size="small"
                    className={styles.customizeSelect}
                    error={!!errors.houseBankCode}
                    helperText={
                      errors.houseBankCode ? errors.houseBankCode.message : ""
                    }
                    {...field}
                    onChange={(e) => {
                      setValue("houseBankCode", e.target.value);
                    }}
                  />
                )}
              />
            </div>
            <div className={styles.fieldContainerStyle}>
              <span className={styles.labelText}>
                Bank Code <span className={styles.styledRequired}>*</span>
              </span>
              <Controller
                name="bankCode"
                control={control}
                defaultValue=""
                rules={{
                  required: "Bank Code is required",
                  pattern: {
                    value: /^[A-Z]{4}0[A-Z0-9]{6}$/,
                    message: "Invalid Bank Code format",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    id="bankCode"
                    variant="outlined"
                    placeholder="Enter Bank Code"
                    size="small"
                    error={!!errors.bankCode}
                    helperText={errors.bankCode ? errors.bankCode.message : ""}
                    className={styles.customizeSelect}
                    {...field}
                    onChange={(e) => {
                      setValue("bankCode", e.target.value);
                    }}
                  />
                )}
              />
            </div>
            <div className={styles.fieldContainerStyle}>
              <span className={styles.labelText}>
                Branch Name <span className={styles.styledRequired}>*</span>
              </span>
              <Controller
                name="branchName"
                control={control}
                defaultValue=""
                rules={{ required: "Branch Name is required" }}
                render={({ field }) => (
                  <TextField
                    id="branchName"
                    variant="outlined"
                    placeholder="Enter Branch Name"
                    size="small"
                    error={!!errors.branchName}
                    helperText={
                      errors.branchName ? errors.branchName.message : ""
                    }
                    className={styles.customizeSelect}
                    {...field}
                    onChange={(e) => {
                      setValue("branchName", e.target.value);
                    }}
                  />
                )}
              />
            </div>
            <div className={styles.fieldContainerStyle}>
              <span className={styles.labelText}>
                Account Number <span className={styles.styledRequired}>*</span>
              </span>
              <Controller
                name="accountNumber"
                control={control}
                defaultValue=""
                rules={{
                  required: "Account Number is required",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Only numeric values are allowed",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    id="accountNumber"
                    variant="outlined"
                    disabled={id}
                    placeholder="Enter Account Number"
                    size="small"
                    error={!!errors.accountNumber}
                    helperText={
                      errors.accountNumber ? errors.accountNumber.message : ""
                    }
                    className={styles.customizeSelect}
                    {...field}
                    onChange={(e) => {
                      setValue("accountNumber", e.target.value);
                    }}
                  />
                )}
              />
            </div>
          </div>
        </div>
        <CustomButton
          type="submit"
          variant="contained"
          disabled={updateLoading || createPaymentLoading}
        >
          {id ? "Update" : "Submit"}
        </CustomButton>
      </form>
    </div>
  );
}

export default HouseBankMasterForm;
