import React, { useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import styles from "./styles.module.scss";

const DateField = ({
  control,
  watch,
  setValue,
  name,
  label,
  required = false,
  rules = {},
  errors = {},
  classes
}) => {
  const validateDate = (value) => {
    if (name === 'endDate') {
      const startDate = watch('startDate');
      if (!startDate) {
        return "Start date must be set before setting end date";
      }
      const start = dayjs(startDate, 'YYYY-MM-DD');
      const end = dayjs(value, 'YYYY-MM-DD');
      return end.isBefore(start.add(300, 'day'))
        ? true
        : "End date must be within 300 days from the start date";
    }
  };

  return (
    <div className={styles.fieldContainerStyle}>
      <div className={styles.startDateStyle}>
        <div className={styles.labelText}>
          {label} {required && <span className={styles.styledRequired}>*</span>}
        </div>
        <Controller
          name={name}
          control={control}
          rules={{ validate: validateDate, ...rules }}
          render={({ field }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={field.value ? dayjs(field.value) : null}
                // minDate={dayjs()}
                className={`${styles.dateStyle} ${classes}`}
                slotProps={{ textField: { size: "small" } }}
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
