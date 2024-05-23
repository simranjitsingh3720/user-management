import {
  Autocomplete,
  Button,
  IconButton,
  Switch,
  TextField,
  Tooltip,
} from "@mui/material";
import React, { useRef, useState } from "react";
import LeftArrow from "../../../assets/LeftArrow";
import styles from "./styles.module.css";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useGetUserData from "../hooks/useGetUserData";
import useGetProducerData from "../hooks/useGetProducerData";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { FieldDataList } from "../constants";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import useCreateBancaField from "../hooks/useCreateBancaField";

function BANCAForm() {
  const [input, setInput] = useState("");
  const [fileName, setFileName] = useState("");

  const inputFileRef = useRef(null);

  const handleButtonClick = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };

  const [fieldData, setFieldData] = useState(FieldDataList);

  console.log("fieldData", fieldData);

  const navigate = useNavigate();

  const { userData } = useGetUserData(input);

  const { producerList } = useGetProducerData();

  const { postData, loading } = useCreateBancaField();

  const onSubmit = (data) => {
    const result = {};
    fieldData.forEach(({ value, Enable, Mandatory }) => {
      result[value] = {
        require: Enable,
        mandatory: Mandatory,
      };
    });

    console.log("result", result);
    const payload = {
      additionalFields: {
        producerId: data.producerCode.id,
        productIds: data.product.map((item) => item.id),
        startDate: data.startDate,
        endDate: data.endDate,
      },
      fields: result,
    };

    postData(payload);
  };
  const { handleSubmit, control, setValue, formState, getValues } = useForm();

  const { errors } = formState;

  const handleEnableChange = (value) => {
    setFieldData(() => {
      const newFieldData = [...fieldData];
      newFieldData.forEach((item) => {
        if (item.value === value) {
          item.Enable = !item.Enable;
          item.Mandatory = false;
        }
      });
      return newFieldData;
    });
  };

  const handleMandatoryChange = (value) => {
    setFieldData(() => {
      const newFieldData = [...fieldData];
      newFieldData.forEach((item) => {
        if (item.value === value) {
          item.Mandatory = !item.Mandatory;
        }
      });
      return newFieldData;
    });
  };

  console.log("errors", errors);

  console.log(
    "status",
    fieldData.filter((item) => item.value === "partnerEmployeeCode")[0].Enable
  );

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.createNewUserContainer}>
          <div className={styles.formHeaderStyle}>
            <div className={styles.subHeader}>
              <IconButton
                aria-label="back"
                onClick={() => {
                  navigate("/banca");
                }}
              >
                <LeftArrow />
              </IconButton>
              <span className={styles.headerTextStyle}>Create Banca Field</span>
            </div>
          </div>{" "}
          <div className={styles.containerStyle}>
            <div className={styles.upperContainer}>
              <div className={styles.fieldContainerStyle}>
                <span className={styles.labelText}>
                  Producer Code <span className={styles.styledRequired}>*</span>
                </span>
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
                      onInputChange={(event, val, reason) => {
                        if (reason === "input") setInput(val);
                      }}
                    />
                  )}
                />
                <div className={styles.styledError}>
                  {errors.producerCode && <span>This field is required</span>}{" "}
                </div>
              </div>
              <div className={styles.fieldContainerStyle}>
                <span className={styles.labelText}>
                  Products <span className={styles.styledRequired}>*</span>
                </span>
                <Controller
                  name="product" // Name of the field in the form data
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Autocomplete
                      multiple
                      id="product"
                      value={getValues("product")}
                      options={producerList?.data || []}
                      disableCloseOnSelect
                      getOptionLabel={(option) => {
                        return option.product;
                      }}
                      limitTags={5}
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
                      onInputChange={(event, val) => {
                        setInput(val);
                      }}
                    />
                  )}
                />
                <div className={styles.styledError}>
                  {errors.product && <span>This field is required</span>}{" "}
                </div>
              </div>
              <div className={styles.fieldContainerStyle}>
                <div className={styles.dateContainer}>
                  <div>
                    <div className={styles.startDateStyle}>
                      <text className={styles.labelText}>
                        Start Date{" "}
                        <span className={styles.styledRequired}>*</span>
                      </text>
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
                              // value={watch("startDate")}
                              onChange={(date) => {
                                const formattedDate =
                                  dayjs(date).format("DD-MM-YYYY");
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
                  <div>
                    <text className={styles.labelText}>
                      End Date <span className={styles.styledRequired}>*</span>
                    </text>
                    <Controller
                      name="endDate" // Name of the field in the form data
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            className={styles.dateStyle}
                            // {...register("expiryDate", { required: true })}
                            // value={watch("expiryDate")}
                            onChange={(date) => {
                              const formattedDate =
                                dayjs(date).format("DD-MM-YYYY");
                              setValue("endDate", formattedDate);
                            }}
                            slotProps={{ textField: { size: "small" } }}
                          />
                        </LocalizationProvider>
                      )}
                    />
                    <div className={styles.styledError}>
                      {errors.expiryDate && <span>This field is required</span>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.fieldContainer}>
              {(fieldData || []).map((item, index) => (
                <div className={styles.fieldStyle} key={index}>
                  {item.label.length > 30 ? (
                    <Tooltip title={item.label}>
                      <div
                        className={styles.labelStylePointer}
                      >{`${item.label.substring(0, 30)}...`}</div>
                    </Tooltip>
                  ) : (
                    <div className={styles.labelStyle}>{item.label}</div>
                  )}
                  <div className={styles.enableSwitchStyle}>
                    <Switch
                      checked={item.Enable}
                      onChange={() => handleEnableChange(item.value)}
                      inputProps={{ "aria-label": "toggle button" }}
                    />
                    <text className={styles.enableStyle}>
                      {item.Enable ? "Enabled" : "Non Enabled"}
                    </text>
                  </div>
                  <div className={styles.mandatorySwitchStyle}>
                    <Switch
                      checked={item.Mandatory}
                      onChange={() => handleMandatoryChange(item.value)}
                      inputProps={{ "aria-label": "toggle button" }}
                      disabled={!item.Enable}
                    />
                    <text className={styles.enableStyle}>
                      {item.Mandatory ? "Mandatory" : "Non Mandatory"}
                    </text>
                  </div>
                </div>
              ))}
              <div className={styles.fieldStyle}>
                <div className={styles.labelStyle}>
                  Partner Employee Code Master
                </div>
                <div className={styles.uploadContainer}>
                  <input
                    type="file"
                    ref={inputFileRef}
                    style={{ display: "none" }}
                    // Optionally, you can handle file change event here
                    onChange={(event) => {
                      const file = event.target.files[0];

                      console.log("file", file);
                      if (file) {
                        setFileName(file.name);
                      }
                    }}
                  />
                  <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                    disabled={
                      !fieldData.filter(
                        (item) => item.value === "partnerEmployeeCode"
                      )[0].Enable
                    }
                    onClick={() => handleButtonClick()}
                  >
                    Upload file
                  </Button>
                  {fileName &&
                    (fileName.length > 20 ? (
                      <Tooltip title={fileName}>
                        <div
                          className={styles.fileNameStyle}
                        >{`${fileName.substring(0, 20)}...`}</div>
                      </Tooltip>
                    ) : (
                      <div className={styles.fileNameStyle}>{fileName}</div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Button
          type="submit"
          variant="contained"
          className={styles.styledButton}
          disabled={loading}
        >
          Submit
        </Button>
      </form>
    </div>
  );
}

export default BANCAForm;
