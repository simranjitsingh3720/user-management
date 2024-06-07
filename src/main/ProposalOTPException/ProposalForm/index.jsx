import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import styles from "./styles.module.css";
import {
  Autocomplete,
  Button,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import LeftArrow from "../../../assets/LeftArrow";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import useGetUserData from "../../BANCALogin/hooks/useGetUserData";
import useCreateProposalOTP from "../hooks/usecreateProposalOTP";
import useGetProposalOTPById from "../hooks/useGetProposalOTPById";
import useUpdateProposal from "../hooks/useUpdateProposal";
import useGetProducerData from "../../BANCALogin/hooks/useGetProducerData";
import useGetLobListData from "../hooks/useGetLobListData";

function ProposalForm() {
  const { id } = useParams();

  const { handleSubmit, control, setValue, formState } = useForm({
    defaultValues: {
      producerCode: null,
      lob: null,
      product: null,
      startDate: null,
      endDate: null,
    },
  });

  const [OTPValue, setOTPValue] = useState("byProducerCode");

  const { errors } = formState;

  const navigate = useNavigate();

  const { data: proposalDataByID, fetchData: fetchDataProposalById } =
    useGetProposalOTPById();

  console.log("proposalDataByID", proposalDataByID);

  useEffect(() => {
    if (id) fetchDataProposalById(id);
  }, [id]);

  useEffect(() => {
    if (proposalDataByID && proposalDataByID?.data) {
      setValue("producerCode", proposalDataByID?.data?.producer);
      setValue("lob", proposalDataByID?.data?.lob);
      setValue("product", proposalDataByID?.data?.product);
      setValue(
        "startDate",
        dayjs(proposalDataByID?.data?.startDate, "DD/MM/YYYY").format(
          "DD/MM/YYYY"
        )
      );
      setValue(
        "endDate",
        dayjs(proposalDataByID?.data?.endDate, "DD/MM/YYYY").format(
          "DD/MM/YYYY"
        )
      );
      setOTPValue(
        proposalDataByID?.data?.producer ? "byProducerCode" : "byChannel"
      );
    }
  }, [proposalDataByID]);

  const handleChange = (event) => {
    setOTPValue(event.target.value);
  };

  // const { data: lobListData } = useGetLobListData();

  const { producerList, fetchData: fetchProducerListData } =
    useGetProducerData();

  const { lobList, fetchData: fetchLobData } = useGetLobListData();

  console.log("producerList", producerList);

  const { userData } = useGetUserData();

  const { postData, loading: proposalOTPLoading } = useCreateProposalOTP();

  const { UpdateDataFun, updateLoading } = useUpdateProposal();

  const onSubmit = (data) => {
    console.log("data", data);

    if (id) {
      let payload = {};

      payload = {
        id: id,
        properties: {
          startDate: data?.startDate,
          endDate: data?.endDate,
          status: proposalDataByID.data.status,
        },
      };

      UpdateDataFun(payload);
    } else {
      let payload = {};
      if (OTPValue === "byChannel") {
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
    }
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
                  Set Proposal OTP Exception By
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
                  defaultValue="byChannel"
                  value={OTPValue}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="byChannel"
                    control={<Radio />}
                    label="By Channel"
                    disabled={id}
                    className={
                      OTPValue === "byChannel"
                        ? styles.radioSelectStyle
                        : styles.radioNotSelectStyle
                    }
                  />
                  <FormControlLabel
                    value="byProducerCode"
                    control={<Radio />}
                    label="By Producer Code"
                    disabled={id}
                    className={
                      OTPValue === "byProducerCode"
                        ? styles.radioSelectStyle
                        : styles.radioNotSelectStyle
                    }
                  />
                </RadioGroup>
              </div>
            </div>
            {OTPValue === "byChannel" ? (
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
                      disabled={id}
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
                      disabled={id}
                      options={userData || []}
                      value={field.value}
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
                        fetchProducerListData(newValue.id);
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
                  Product <span className={styles.styledRequired}>*</span>
                </text>
                <Controller
                  name="product" // Name of the field in the form data
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Autocomplete
                      id="product"
                      disabled={id}
                      options={producerList?.data || []}
                      value={field.value}
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
                        fetchLobData(newValue.id);
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
                      disabled={id}
                      options={lobList?.data || []}
                      value={field.value}
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
                          value={
                            field.value
                              ? dayjs(field.value, "DD/MM/YYYY")
                              : null
                          }
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
                          value={
                            field.value
                              ? dayjs(field.value, "DD/MM/YYYY")
                              : null
                          }
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
          {id ? "Update" : "Submit"}
        </Button>
      </form>
    </div>
  );
}

export default ProposalForm;
