import React from "react";
import { Controller } from "react-hook-form";
import styles from './styles.module.scss';

const CustomTimePicker = ({ control, name }) => {
  const hours = Array.from({ length: 24 }, (_, i) =>
    String(i).padStart(2, "0")
  );
  const minutes = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, "0"));
  const formatTime = (hour, minute) => {
    return `${hour}:${minute}`;
  };

  return (
    <div className="flex -ml-2">
      <Controller
        name={name}
        control={control}
        defaultValue={formatTime("00", "00")}
        render={({ field }) => (
          <>
            <select
              className={styles.customSelect}
              value={field.value.split(":")[0]}
              onChange={(e) => {
                const newValue = formatTime(e.target.value, field.value.split(":")[1]);
                field.onChange(newValue);
              }}
            >
              {hours.map((hour) => (
                <option key={hour} value={hour}>
                  {hour}
                </option>
              ))}
            </select>
            <span className="h-4">&nbsp;:&nbsp;</span>
            <select
              className={styles.customSelect}
              value={field.value.split(":")[1]}
              onChange={(e) => {
                const newValue = formatTime(field.value.split(":")[0], e.target.value);
                field.onChange(newValue);
              }}
            >
              {minutes.map((minute) => (
                <option key={minute} value={minute}>
                  {minute}
                </option>
              ))}
            </select>
          </>
        )}
      />
    </div>
  );
};

export default CustomTimePicker;
