import React, { useEffect } from "react";
import { Controller } from "react-hook-form";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import styles from "./styles.module.scss";

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
}) => {
  const validateDate = (value) => {
    if (name === "endDate") {
      const startDate = watch("startDate");
      if (!startDate) {
        return "Start date must be set before setting end date";
      }
      const start = dayjs(startDate, "YYYY-MM-DD");
      const end = dayjs(value, "YYYY-MM-DD");
      if (end.isBefore(start)) {
        return "End date must be greater than or equal to the start date";
      }
      return end.isBefore(start.add(300, "day"))
        ? true
        : "End date must be within 300 days from the start date";
    }
  };

  useEffect(() => {
    if (!labelVisible) {
      const today = dayjs().format("YYYY-MM-DD");
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
          rules={{ validate: validateDate, required: required ? "This field is required": "" }}
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
                minDate={dayjs()}
                onChange={(date) => {
                  const formattedDate = dayjs(date).format("YYYY-MM-DD");
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
