import { Autocomplete, TextField } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';

const CustomAutoCompleteWithoutCheckbox = ({
  name,
  label,
  control,
  rules,
  options,
  getOptionLabel,
  className,
  loading,
  size = 'small',
  isOptionEqualToValue,
  placeholder,
  disableClearable,
  ListboxProps,
  renderOption,
  required,
  error,
  helperText,
  onChangeCallback,
  disabled,
}) => {
  return (
    <>
      <span className={required ? 'required-field label-text' : 'label-text'}>{label}</span>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <Autocomplete
            loading={loading}
            options={options || []}
            getOptionLabel={getOptionLabel}
            disabled={disabled}
            className={className + 'customize-select bg-white'}
            size={size}
            isOptionEqualToValue={isOptionEqualToValue}
            renderInput={(params) => <TextField {...params} error={error} placeholder={placeholder} />}
            value={field.value}
            onChange={(event, newValue) => {
              field.onChange(newValue);
              onChangeCallback && onChangeCallback(newValue);
            }}
            disableClearable={disableClearable}
            ListboxProps={ListboxProps}
            renderOption={renderOption}
          />
        )}
      />
      <div className="error-msg">{error && <span>{helperText}</span>}</div>
    </>
  );
};

export default CustomAutoCompleteWithoutCheckbox;
