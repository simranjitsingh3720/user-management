import React, { useState } from "react";
import styles from "./styles.module.css";
import { Autocomplete, Button, TextField } from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { Controller, useForm } from "react-hook-form";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

function NewBancaForm() {
  const [input, setInput] = useState("");

  const { handleSubmit, control, setValue, formState, getValues } = useForm();

  const { errors } = formState;
  return (
    <div className={styles.bancaForm}>
      <div className={styles.headerTextStyle}>
        <div>
          <div className={styles.setOTPHeader}>Banca Fields</div>
          <div className={styles.headerText}>
            Fill in the mandatory information to modify the Banca fields.
          </div>
        </div>
        <div>
          <Button
            variant="outlined"
            className={styles.styledButton}
            startIcon={<RestartAltIcon />}
            sx={{ textTransform: "none" }}
            // onClick={() => handleClickYes()}
          >
            Reset
          </Button>
        </div>
      </div>
      <div className={styles.fieldStyle}>
        <div className={styles.mainContainerField}>
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
                  options={[]}
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
                      // value={watch("startDate")}
                      onChange={(date) => {
                        const formattedDate = dayjs(date).format("DD-MM-YYYY");
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
                      // {...register("expiryDate", { required: true })}
                      // value={watch("expiryDate")}
                      onChange={(date) => {
                        const formattedDate = dayjs(date).format("DD-MM-YYYY");
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
    </div>
  );
}

export default NewBancaForm;
