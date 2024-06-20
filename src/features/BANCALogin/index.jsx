import React, { useEffect, useRef, useState } from "react";
import useGetBancaLoginData from "./hooks/useGetBancaLoginData";
import styles from "./styles.module.scss";
import {
  Autocomplete,
  Switch,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import useGetUserData from "./hooks/useGetUserData";
import useGetProducerData from "./hooks/useGetProducerData";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { FieldDataList, labels } from "./constants";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import useCreateBancaField from "./hooks/useCreateBancaField";
import useUpdateBancaField from "./hooks/useUpdateBancaField";
import "dayjs/locale/en-gb";
import CustomButton from "../../components/CustomButton";

function BANCALogin() {
  const [fileName, setFileName] = useState("");

  const {
    data: bancaData,
    loading: bancaLoading,
    fetchData: bancaFetchData,
  } = useGetBancaLoginData();

  const [fieldData, setFieldData] = useState(
    Object.values(FieldDataList).flat()
  );

  const inputFileRef = useRef(null);

  const handleButtonClick = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };

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

  const { handleSubmit, control, setValue, watch, formState, getValues } =
    useForm({
      defaultValues: {
        producerCode: null,
        product: null,
        startDate: null,
        endDate: null,
      },
    });

  const { userData } = useGetUserData();

  const { producerList, fetchData } = useGetProducerData();

  useEffect(() => {
    if (bancaData && bancaData?.data && bancaData?.data?.fields) {
      const result = Object.keys(bancaData?.data?.fields).map((key) => ({
        label: labels[key],
        value: key,
        Enable: bancaData?.data?.fields[key].require,
        Mandatory: bancaData?.data?.fields[key].mandatory,
      }));
      setFieldData(result);
      setValue(
        "startDate",
        dayjs(bancaData?.data?.startDate, "DD/MM/YYYY").format("DD/MM/YYYY")
      );
      setValue(
        "endDate",
        dayjs(bancaData?.data?.endDate, "DD/MM/YYYY").format("DD/MM/YYYY")
      );
    }
  }, [bancaData]);

  const { errors } = formState;

  const resetFields = () => {
    setValue("product", null);
    setValue("startDate", null);
    setValue("endDate", null);
    setFieldData((prevFieldData) =>
      prevFieldData.map((field) => ({
        ...field,
        Enable: false,
        Mandatory: false,
      }))
    );
  };

  const { postData, loading: createBancaLoding } = useCreateBancaField();
  const { updateData, loading: updateBancaLoding } = useUpdateBancaField();

  const onSubmit = (data) => {
    if (bancaData && bancaData?.data) {
      const result = {};
      fieldData.forEach(({ value, Enable, Mandatory }) => {
        result[value] = {
          require: Enable,
          mandatory: Mandatory,
        };
      });
      const payload = {
        id: bancaData.data.id,
        properties: {
          fields: result,
          startDate: data.startDate,
          endDate: data.endDate,
          status: true,
        },
      };

      updateData(payload);
    } else {
      const result = {};
      fieldData.forEach(({ value, Enable, Mandatory }) => {
        result[value] = {
          require: Enable,
          mandatory: Mandatory,
        };
      });

      const payload = {
        producerId: data.producerCode.id,
        productId: data.product.id,
        startDate: data.startDate,
        endDate: data.endDate,
        fields: result,
      };

      postData(payload);
    }
  };

  const handleResetButton = () => {
    setValue("producerCode", null);
    setValue("product", null);
    setValue("startDate", null);
    setValue("endDate", null);
    setFieldData((prevFieldData) =>
      prevFieldData.map((field) => ({
        ...field,
        Enable: false,
        Mandatory: false,
      }))
    );
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* <NewBancaForm bancaData={bancaData} bancaFetchData={bancaFetchData} /> */}
        <div className={styles.bancaForm}>
          <div className={styles.headerTextStyle}>
            <div>
              <div className={styles.setOTPHeader}>Banca Fields</div>
              <div className={styles.headerText}>
                Fill in the mandatory information to modify the Banca fields.
              </div>
            </div>
            <div>
              <CustomButton
                variant="outlined"
                startIcon={<RestartAltIcon />}
                onClick={() => handleResetButton()}
              >
                Reset
              </CustomButton>
            </div>
          </div>
          <div className={styles.fieldStyle}>
            <div className={styles.mainContainerField}>
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
                      renderInput={(params) => (
                        <TextField {...params} placeholder="Select" />
                      )}
                      value={field.value}
                      onChange={(event, newValue) => {
                        field.onChange(newValue);
                        if (newValue) {
                          fetchData(newValue?.id);
                          resetFields();
                        }
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
              <div className={styles.fieldContainerStyle}>
                <span className={styles.labelText}>
                  Products <span className={styles.styledRequired}>*</span>
                </span>
                <Controller
                  name="product" 
                  control={control}
                  value={getValues("product")}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Autocomplete
                      id="product"
                      options={producerList?.data || []}
                      getOptionLabel={(option) => {
                        return option.product;
                      }}
                      value={field.value}
                      className={styles.customizeSelect}
                      size="small"
                      renderInput={(params) => (
                        <TextField {...params} placeholder="Select" />
                      )}
                      onChange={(event, newValue) => {
                        field.onChange(newValue);
                        if (watch("producerCode") && watch("product")) {
                          bancaFetchData(
                            watch("producerCode").id,
                            watch("product").id
                          );
                        }
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
                    name="startDate" 
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <LocalizationProvider
                        dateAdapter={AdapterDayjs}
                        adapterLocale="en-gb"
                      >
                        <DatePicker
                          className={styles.dateStyle}
                          // {...register("startDate", { required: true })}
                          slotProps={{ textField: { size: "small" } }}
                          value={
                            field.value
                              ? dayjs(field.value, "DD/MM/YYYY")
                              : null
                          }
                          minDate={dayjs()}
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
                    name="endDate" 
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <LocalizationProvider
                        dateAdapter={AdapterDayjs}
                        adapterLocale="en-gb"
                      >
                        <DatePicker
                          className={styles.dateStyle}
                          // {...register("expiryDate", { required: true })}
                          // value={watch("expiryDate")}
                          value={
                            field.value
                              ? dayjs(field.value, "DD/MM/YYYY")
                              : null
                          }
                          minDate={dayjs()}
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

        <div className={styles.listBancaConatiner}>
          <div className={styles.fieldStyle}>
            {(fieldData || []).map((obj) => (
              <div className={styles.fieldDiv}>
                <div className={styles.lableStyle}>{obj.label}</div>
                <div className={styles.switchContainer}>
                  {" "}
                  <div className={styles.enableSwitchStyle}>
                    <Switch
                      checked={obj.Enable}
                      onChange={() => handleEnableChange(obj.value)}
                      inputProps={{ "aria-label": "toggle button" }}
                    />
                    <span className={styles.enableStyle}>
                      {obj.Enable ? "Enabled" : "Non Enabled"}
                    </span>
                  </div>
                  <div className={styles.mandatorySwitchStyle}>
                    <Switch
                      checked={obj.Mandatory}
                      onChange={() => handleMandatoryChange(obj.value)}
                      inputProps={{ "aria-label": "toggle button" }}
                      disabled={!obj.Enable}
                    />
                    <span className={styles.enableStyle}>
                      {obj.Mandatory ? "Mandatory" : "Non Mandatory"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.uploadContainer}>
            <div className={styles.lableStyle}>
              Partner Employee Code Master
            </div>
            <div className={styles.uploadStyle}>
              <input
                type="file"
                ref={inputFileRef}
                style={{ display: "none" }}
                // Optionally, you can handle file change event here
                onChange={(event) => {
                  const file = event.target.files[0];

                  if (file) {
                    setFileName(file.name);
                  }
                }}
              />
              <CustomButton
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
              </CustomButton>
              {fileName && (
                <div className={styles.fileNameStyle}>{fileName}</div>
              )}
            </div>
          </div>
        </div>
        <div>
          <CustomButton
            type="submit"
            variant="contained"
            disabled={updateBancaLoding || createBancaLoding}
          >
            Submit
          </CustomButton>
        </div>
      </form>
    </div>
  );
}

export default BANCALogin;
