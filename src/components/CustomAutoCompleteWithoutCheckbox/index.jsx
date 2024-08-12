import { Autocomplete, TextField } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';

const CustomAutoCompleteWithoutCheckbox = ({
  name,
  label='',
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
  trigger,
  multiple = false,
  limitTags
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
            multiple={multiple}
            loading={loading}
            options={options || []}
            getOptionLabel={getOptionLabel}
            disabled={disabled}
            className={className + ' customize-select bg-white'}
            size={size}
            disableCloseOnSelect={multiple ? true : false}
            isOptionEqualToValue={isOptionEqualToValue}
            renderInput={(params) => <TextField {...params} error={error} placeholder={placeholder} sx={{
              "& fieldset": {
                border: "none",
              },
            }}/>}
            value={field.value ? field.value : multiple ? [] : null}
            sx={{
              '& .MuiOutlinedInput-root': {
                maxHeight: "40px",
                overflow: "auto",
                borderRadius: "4px",
                border:"1px solid #ccc",
                backgroundColor:"#fff",
                '&.Mui-focused': {
                  outline: "none",
                  boxShadow: "none",
                  borderColor: "#ccc",  
                },
              },
            }}
            onChange={(event, newValue) => {
              field.onChange(newValue);
              if (typeof trigger === 'function') {
                trigger(name);
              }
              onChangeCallback && onChangeCallback(newValue);
            }}
            // limitTags={limitTags || 1}
            disableClearable={disableClearable}
            ListboxProps={ListboxProps}
            renderOption={(props, option, { selected }) => (
              renderOption ? renderOption(props, option) : (
                <li {...props} key={option.id || option.label} style={{ textTransform: 'capitalize' }}>
                  {getOptionLabel(option)}
                </li>
              )
            )}
          />
        )}
      />
      <div className="error-msg">{error && <span>{helperText}</span>}</div>
    </>
  );
};

export default CustomAutoCompleteWithoutCheckbox;
