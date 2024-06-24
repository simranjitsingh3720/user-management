import React, { useState } from "react";
import styles from "./styles.module.scss";
import {
  Autocomplete,
  
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import useGetUserData from "../../BANCALogin/hooks/useGetUserData";
import useCreateOTPException from "../hooks/useCreateOTPException";
import CustomButton from "../../../components/CustomButton";

function SetOTPException({ fetchData }) {
  const [OTPValue, setOTPValue] = useState("byChannnel");

  const handleChange = (event) => {
    setOTPValue(event.target.value);
  };

  const { userData } = useGetUserData();

  const { handleSubmit, control, formState } = useForm();

  const { errors } = formState;

  const { postData, loading } = useCreateOTPException({ fetchData });

  const onSubmit = (data) => {
    const payload = {
      producerId: data.producerCode.id,
    };
    postData(payload);
  };

  return (
    <div className={styles.otpException}>
      <div className={styles.headerTextStyle}>
        <div className={styles.setOTPHeader}>Set OTP Exception By</div>
        <div className={styles.headerText}>
          Please select a channel or producer code from below and add it to the
          given list for OTP Exception.
        </div>
      </div>
      <div className={styles.OTPSelectStyle}>
        <span className={styles.labelText}>
          Select <span className={styles.styledRequired}>*</span>
        </span>
        <div className={styles.radioContainer}>
          <RadioGroup
            row
            aria-labelledby="insillion-status-row-radio-buttons-group-label"
            name="groupStatus"
            defaultValue="byChannnel"
            value={OTPValue}
            onChange={handleChange}
          >
            <FormControlLabel
              value="byChannnel"
              control={<Radio />}
              label="By Channel"
              className={
                OTPValue === "byChannnel"
                  ? styles.radioSelectStyle
                  : styles.radioNotSelectStyle
              }
            />
            <FormControlLabel
              value="byProducerCode"
              control={<Radio />}
              label="By Producer Code"
              className={
                OTPValue === "byProducerCode"
                  ? styles.radioSelectStyle
                  : styles.radioNotSelectStyle
              }
            />
          </RadioGroup>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {OTPValue === "byChannnel" ? (
            <div className={styles.fieldContainerStyle}>
              <span className={styles.labelText}>
                Channel <span className={styles.styledRequired}>*</span>
              </span>
              <Controller
                name="channel" 
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Autocomplete
                    id="channel"
                    options={[]}
                    getOptionLabel={(option) => {
                      return `${option?.firstName?.toUpperCase()} ${option?.lastName?.toUpperCase()}`;
                    }}
                    className={styles.customizeSelect}
                    size="small"
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                    renderInput={(params) => (
                      <TextField {...params} placeholder="Select" />
                    )}
                    onChange={(event, newValue) => {
                      field.onChange(newValue);
                    }}
                    ListboxProps={{
                      style: {
                        maxHeight: "200px",
                      },
                    }}
                    // onInputChange={(event, val, reason) => {
                    //   if (reason === "input") setInput(val);
                    // }}
                  />
                )}
              />
              <div className={styles.styledError}>
                {errors.channel && <span>This field is required</span>}{" "}
              </div>
            </div>
          ) : (
            <div className={styles.fieldContainerStyle}>
              <span className={styles.labelText}>
                Producer Code <span className={styles.styledRequired}>*</span>
              </span>
              <Controller
                name="producerCode" 
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Autocomplete
                    id="producerCode"
                    options={userData || []}
                    getOptionLabel={(option) => {
                      return `${option?.firstName?.toUpperCase()} ${option?.lastName?.toUpperCase()}`;
                    }}
                    className={styles.customizeSelect}
                    size="small"
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                    renderInput={(params) => (
                      <TextField {...params} placeholder="Select" />
                    )}
                    onChange={(event, newValue) => {
                      field.onChange(newValue);
                    }}
                    ListboxProps={{
                      style: {
                        maxHeight: "200px",
                      },
                    }}
                    // onInputChange={(event, val, reason) => {
                    //   if (reason === "input") setInput(val);
                    // }}
                  />
                )}
              />
              <div className={styles.styledError}>
                {errors.producerCode && <span>This field is required</span>}{" "}
              </div>
            </div>
          )}
          <CustomButton
            type="submit"
            variant="contained"
            
            loading={loading}
          >
            Add
          </CustomButton>
        </form>
      </div>
    </div>
  );
}

export default SetOTPException;
