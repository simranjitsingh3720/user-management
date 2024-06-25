import React from "react";
import styles from "./styles.module.scss";
import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

const InputField = ({ id, required,label, validation, control, errors, disabled, classes, placeholder }) => {
  return (
    <div className={styles.fieldContainerStyle}>
      <label className={styles.labelText}>
        {label} {required && <span className={styles.styledRequired}>*</span>}
      </label>
      <Controller
        name={id}
        control={control}
        rules={{
          ...validation,
          pattern: {
            value: new RegExp(validation?.pattern?.value),
            message: validation?.pattern?.message,
          },
        }}
        render={({ field }) => (
          <TextField
            id={id}
            variant="outlined"
            disabled={disabled}
            placeholder={`Enter ${label}`}
            helperText={errors[id] && errors[id].message}
            size="small"
            className={`${styles.customizeSelect} ${classes}`}
            error={Boolean(errors[id])}
            {...field}
          />
        )}
      />
    </div>
  );
};

export default InputField;
