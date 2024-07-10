import React, { useEffect } from "react";
import { Controller } from "react-hook-form";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import styles from "./styles.module.scss";
import { DATE_FORMAT, EMPTY_START_DATE_ERR, END_DATE, END_DATE_LESS_ERR, END_DATE_WITHIN_300_DAYS, REQUIRED_MSG, START_DATE } from "./utils/constants";

const DateField = ({
  control,
  watch,
  setValue,
  name,
  label,
  required,
  rules = {},
  errors = {},
  classes,
  labelVisible,
  isEdit=false
}) => {
  const validateDate = (value) => {
    if (name === END_DATE) {
      const startDate = watch(START_DATE);
      if (!startDate) {
        return EMPTY_START_DATE_ERR;
      }
      const start = dayjs(startDate, DATE_FORMAT);
      const end = dayjs(value, DATE_FORMAT);
      if (end.isBefore(start)) {
        return END_DATE_LESS_ERR;
      }
      return end.isBefore(start.add(300, "day"))
        ? true
        : END_DATE_WITHIN_300_DAYS;
    }
  };

  useEffect(() => {
    if (!labelVisible) {
      const today = dayjs().format(DATE_FORMAT);
      setValue(name, today);
    }
  }, [labelVisible]);

  return (
    <div
      className={`${
        labelVisible
          ? styles.fieldContainerStyle
          : styles.fieldContainerNoMarginStyle
      }`}
    >
      <div className={styles.startDateStyle}>
        {labelVisible && (
          <div className={styles.labelText}>
            {label}{" "}
            {required && <span className={styles.styledRequired}>*</span>}
          </div>
        )}
        <Controller
          name={name}
          control={control}
          rules={{ validate: validateDate, required: required ? REQUIRED_MSG: "" }}
          render={({ field }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={field.value ? dayjs(field.value) : null}
                className={`${styles.dateStyle} ${classes}`}
                slotProps={{
                  textField: {
                    size: "small",
                    variant: labelVisible ? "outlined" : "standard",
                    InputProps: {
                      disableUnderline: true,
                      style: !labelVisible
                        ? {
                            display: "flex",
                            flexDirection: "row-reverse",
                            gap: 10,
                            fontSize: 13,
                            marginLeft: "-22px",
                            color: "#607083",
                          }
                        : {},
                    },
                  },
                }}
                minDate={!isEdit ? dayjs(): {}}
                onChange={(date) => {
                  const formattedDate = dayjs(date).format(DATE_FORMAT);
                  setValue(name, formattedDate);
                }}
              />
            </LocalizationProvider>
          )}
        />
        <div className={styles.styledError}>
          {errors[name] && <span>{errors[name]?.message}</span>}
        </div>
      </div>
    </div>
  );
};

export default DateField;
