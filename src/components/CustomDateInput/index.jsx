import React, { useEffect } from "react";
import { Controller } from "react-hook-form";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import styles from "./styles.module.scss";
import {
  EMPTY_START_DATE_ERR,
  END_DATE,
  END_DATE_LESS_ERR,
  REQUIRED_MSG,
  START_DATE,
} from "./utils/constants";
import { DATE_FORMAT } from "./../../utils/globalConstants";

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
  isEdit = false,
  trigger,
}) => {
  const MIN_DATE = dayjs("1950-01-01");
  const seventyYearsFromNow = dayjs().add(70, 'year');

  const validateDate = (value) => {
    if (!value) {
      return required ? REQUIRED_MSG : true;
    }

    const date = dayjs(value, DATE_FORMAT);

    if (!date.isValid()) {
      return "Please enter a valid date";
    }

    if (date.isBefore(MIN_DATE)) {
      return "Date cannot be before January 1, 1950";
    }

    if (date.isAfter(seventyYearsFromNow)) {
      return "Date cannot be more than 70 years from today";
    }
    
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
    }
    return true;
  };

  useEffect(() => {
    if (!labelVisible) {
      const today = dayjs().format(DATE_FORMAT);
      setValue(name, today);
    }
  }, [labelVisible, setValue, name]);

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
          defaultValue={name === START_DATE ? dayjs().format(DATE_FORMAT) : ""}
          rules={{
            validate: validateDate,
            required: required ? `${label} is required` : false,
          }}
          render={({ field }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
              <DatePicker
                value={field.value ? dayjs(field.value, DATE_FORMAT) : null}
                className={`${styles.dateStyle} ${classes}`}
                slotProps={{
                  textField: {
                    size: "small",
                    variant: labelVisible ? "outlined" : "standard",
                    InputProps: {
                      disableUnderline: !labelVisible,
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
                minDate={!isEdit ? dayjs() : undefined}
                onChange={(date) => {
                  const formattedDate = date ? dayjs(date).format(DATE_FORMAT) : "";
                  setValue(name, formattedDate);
                  field.onChange(formattedDate);
                  trigger(name);
                }}
                onBlur={(e) => {
                  field.onBlur(e);
                  trigger(name);
                }}
                onClose={() => {
                  trigger(name);
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
