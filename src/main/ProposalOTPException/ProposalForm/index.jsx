import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import styles from "./styles.module.scss";
import {
  Autocomplete,
  Button,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import LeftArrow from "../../../assets/LeftArrow";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import useGetLobListData from "../../ProductModule/hooks/useGetLobListData";
import useGetAllProducts from "../hooks/useGetAllProducts";
import useGetUserData from "../../BANCALogin/hooks/useGetUserData";
import useCreateProposalOTP from "../hooks/usecreateProposalOTP";

function ProposalForm() {
  const [OTPValue, setOTPValue] = useState("byChannnel");

  const handleChange = (event) => {
    setOTPValue(event.target.value);
  };
  const { handleSubmit, control, setValue, formState, getValues } = useForm();

  const { errors } = formState;

  const navigate = useNavigate();

  const { data: lobListData } = useGetLobListData();

  const { data, loading, fetchData } = useGetAllProducts();

  const { userData } = useGetUserData();

  const { postData, loading: proposalOTPLoading } = useCreateProposalOTP();

  console.log("data", data);

  const onSubmit = (data) => {
    console.log("data", data);

    let payload = {};
    if (OTPValue === "byChannnel") {
      payload = {
        channelId: data?.channel?.id,
        productId: data?.product?.id,
        lobId: data?.lob?.id,
        startDate: data?.startDate,
        endDate: data?.endDate,
      };
    } else {
      payload = {
        producerId: data?.producerCode?.id,
        productId: data?.product?.id,
        lobId: data?.lob?.id,
        startDate: data?.startDate,
        endDate: data?.endDate,
      };
    }

    postData(payload);
  };

  return (
    <div>
      {" "}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.createNewUserContainer}>
          <div className={styles.formHeaderStyle}>
            <div className={styles.subHeader}>
              <IconButton
                aria-label="back"
                onClick={() => {
                  navigate("/proposalOtpException");
                }}
              >
                <LeftArrow />
              </IconButton>
              <span className={styles.headerTextStyle}>
                <div className={styles.setOTPHeaderOTP}>
                  Set OTP Exception By
                </div>
                <div className={styles.headerTextOTP}>
                  Please select a channel or producer code from below and add it
                  to the given list for OTP Exception.
                </div>
              </span>
            </div>
          </div>{" "}
          <div className={styles.containerStyle}>
            <div>
              <text className={styles.labelText}>
                Select <span className={styles.styledRequired}>*</span>
              </text>
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
            </div>
            {OTPValue === "byChannnel" ? (
              <div className={styles.fieldContainerStyle}>
                <text className={styles.labelText}>
                  Channel <span className={styles.styledRequired}>*</span>
                </text>
                <Controller
                  name="channel" // Name of the field in the form data
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
                <text className={styles.labelText}>
                  Producer Code <span className={styles.styledRequired}>*</span>
                </text>
                <Controller
                  name="producerCode" // Name of the field in the form data
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
                    />
                  )}
                />
                <div className={styles.styledError}>
                  {errors.producerCode && <span>This field is required</span>}{" "}
                </div>
              </div>
            )}

            <div className={styles.fieldStyle}>
              <div className={styles.fieldContainerStyle}>
                <text className={styles.labelText}>
                  LOB <span className={styles.styledRequired}>*</span>
                </text>
                <Controller
                  name="lob" // Name of the field in the form data
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Autocomplete
                      id="lob"
                      options={lobListData?.data || []}
                      getOptionLabel={(option) => {
                        return `${option?.lob?.toUpperCase()} - ${
                          option?.lob_value
                        }`;
                      }}
                      className={styles.customizeSelect}
                      size="small"
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Select by LOB Name..."
                        />
                      )}
                      onChange={(event, newValue) => {
                        field.onChange(newValue);
                      }}
                      ListboxProps={{
                        style: {
                          maxHeight: "200px",
                        },
                      }}
                    />
                  )}
                />
                <div className={styles.styledError}>
                  {errors.lob && <span>This field is required</span>}{" "}
                </div>
              </div>
              <div className={styles.fieldContainerStyle}>
                <text className={styles.labelText}>
                  Product <span className={styles.styledRequired}>*</span>
                </text>
                <Controller
                  name="product" // Name of the field in the form data
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Autocomplete
                      id="product"
                      options={data?.data || []}
                      getOptionLabel={(option) => {
                        return `${option?.product?.toUpperCase()} - ${
                          option?.product_code
                        }`;
                      }}
                      className={styles.customizeSelect}
                      size="small"
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
                    />
                  )}
                />
                <div className={styles.styledError}>
                  {errors.product && <span>This field is required</span>}{" "}
                </div>
              </div>

              <div className={styles.fieldContainerStyle}>
                <div className={styles.startDateStyle}>
                  <div className={styles.labelText}>
                    Start Date <span className={styles.styledRequired}>*</span>
                  </div>
                  <Controller
                    name="startDate" // Name of the field in the form data
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          className={styles.dateStyle}
                          minDate={dayjs()}
                          // {...register("startDate", { required: true })}
                          slotProps={{ textField: { size: "small" } }}
                          //   value={dayjs(field.value)}
                          onChange={(date) => {
                            const formattedDate =
                              dayjs(date).format("DD/MM/YYYY");
                            setValue("startDate", formattedDate);
                          }}
                        />
                      </LocalizationProvider>
                    )}
                  />
                </div>
                <div className={styles.styledError}>
                  {errors.startDate && <span>This field is required</span>}
                </div>
              </div>
              <div className={styles.fieldContainerStyle}>
                <div>
                  <div className={styles.labelText}>
                    End Date <span className={styles.styledRequired}>*</span>
                  </div>
                  <Controller
                    name="endDate" // Name of the field in the form data
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          className={styles.dateStyle}
                          minDate={dayjs()}
                          // {...register("expiryDate", { required: true })}
                          // value={watch("expiryDate")}
                          //   value={dayjs(field.value)}
                          onChange={(date) => {
                            const formattedDate =
                              dayjs(date).format("DD/MM/YYYY");
                            setValue("endDate", formattedDate);
                          }}
                          slotProps={{ textField: { size: "small" } }}
                        />
                      </LocalizationProvider>
                    )}
                  />
                  <div className={styles.styledError}>
                    {errors.endDate && <span>This field is required</span>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Button
          type="submit"
          variant="contained"
          className={styles.styledButton}
          disabled={proposalOTPLoading}
        >
          Submit{" "}
        </Button>
      </form>
    </div>
  );
}

export default ProposalForm;
