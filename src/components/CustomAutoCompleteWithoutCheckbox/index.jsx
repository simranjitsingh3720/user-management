import { Autocomplete, TextField } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

const CustomAutoCompleteWithoutCheckbox = ({
  name,
  label,
  control,
  rules,
  options,
  getOptionLabel,
  className,
  size,
  isOptionEqualToValue,
  placeholder,
  disableClearable,
  ListboxProps,
  renderOption,
  required,
  error,
  helperText
}) => {
  return (
    <>
      <span className={required ? "required-field label-text" : "label-text"}>
        {label}
      </span>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <Autocomplete
            options={options || []}
            getOptionLabel={getOptionLabel}
            className={className}
            size={size}
            isOptionEqualToValue={isOptionEqualToValue}
            renderInput={(params) => (
              <TextField {...params} placeholder={placeholder} />
            )}
            value={field.value}
            onChange={(event, newValue) => {
              field.onChange(newValue);
            }}
            disableClearable={disableClearable}
            ListboxProps={ListboxProps}
            renderOption={renderOption}
          />
        )}
      />
      <div className="error-msg">
        {error && <span>{helperText}</span>}
      </div>
    </>
  );
};

export default CustomAutoCompleteWithoutCheckbox;
