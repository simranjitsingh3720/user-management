import { Autocomplete, Button, IconButton, TextField } from "@mui/material";
import React, { useEffect } from "react";
import LeftArrow from "../../../assets/LeftArrow";
import styles from "./styles.module.css";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import useGetUserData from "../../BANCALogin/hooks/useGetUserData";
import useCreateEODBypass from "../hooks/useCreateEODBypass";
import useGetDataById from "../hooks/useGetDataById";
import useUpdateEODBypass from "../hooks/useUpdateEODBypass";

function ProducerEODFrom() {
  const { id } = useParams();

  const { data, fetchData } = useGetDataById();

  const { handleSubmit, control, setValue, formState, getValues } = useForm({
    defaultValues: {
      producerCode: {},
      startDate: null,
      endDate: null,
      reason: "",
    },
  });

  const { errors } = formState;

  const { userData } = useGetUserData();

  const { postData, loading: createLoading } = useCreateEODBypass();

  const { UpdateDataFun, updateLoading } = useUpdateEODBypass();

  const onSubmit = (data) => {
    if (id) {
      const payload = {
        id: id,
        properties: {
          producerId: data.producerCode.id,
          startDate: data.startDate,
          endDate: data.endDate,
          reason: data.reason,
          status: true,
        },
      };
      UpdateDataFun(payload);
    } else {
      const payload = {
        producerId: data.producerCode.id,
        startDate: data.startDate,
        endDate: data.endDate,
        reason: data.reason,
      };
      postData(payload);
    }
  };

  useEffect(() => {
    if (id) fetchData(id);
  }, [id]);

  useEffect(() => {
    if (data && data?.data) {
      setValue("producerCode", data?.data?.producer || {});
      setValue("reason", data?.data?.reason);
      setValue("startDate", dayjs(data?.data?.startDate, "DD-MM-YYYY"));
      setValue("endDate", dayjs(data?.data?.endDate, "DD-MM-YYYY"));
    }
  }, [data]);

  const navigate = useNavigate();

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.createNewUserContainer}>
          <div className={styles.formHeaderStyle}>
            <div className={styles.subHeader}>
              <IconButton
                aria-label="back"
                onClick={() => {
                  navigate("/producer-eod-bypass-list");
                }}
              >
                <LeftArrow />
              </IconButton>
              <span className={styles.headerTextStyle}>
                <div className={styles.setOTPHeaderOTP}>
                  {id
                    ? "Update Producer EOD Bypass"
                    : "Create New Producer EOD Bypass"}
                </div>
              </span>
            </div>
          </div>{" "}
          <div className={styles.containerStyle}>
            <div className={styles.fieldContainerStyle}>
              <text className={styles.labelText}>
                Producer <span className={styles.styledRequired}>*</span>
              </text>
              <Controller
                name="producerCode" // Name of the field in the form data
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Autocomplete
                    id="producerCode"
                    value={getValues("producerCode")}
                    options={userData || []}
                    getOptionLabel={(option) => {
                      return `${option?.firstName?.toUpperCase() || ""} ${
                        option?.lastName?.toUpperCase() || ""
                      }`;
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

            <div className={styles.fieldStyle}>
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
                          // {...register("startDate", { required: true })}
                          slotProps={{ textField: { size: "small" } }}
                          minDate={dayjs()}
                          value={
                            field.value
                              ? dayjs(field.value, "DD/MM/YYYY")
                              : null
                          }
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

            <div>
              <div className={styles.fieldContainerStyle}>
                <div className={styles.labelText}>
                  Reason <span className={styles.styledRequired}>*</span>
                </div>
                <Controller
                  name="reason"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Reason is required" }}
                  render={({ field }) => (
                    <TextField {...field} variant="outlined" fullWidth />
                  )}
                />
                <div className={styles.styledError}>
                  {errors.endDate && <span>This field is required</span>}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Button
          type="submit"
          variant="contained"
          className={styles.styledButton}
          disabled={updateLoading || createLoading}
        >
          {id ? "Update" : "Submit"}
        </Button>
      </form>
    </div>
  );
}

export default ProducerEODFrom;
