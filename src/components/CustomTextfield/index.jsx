import React from 'react';
import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import { COMMON } from './utils/constants';

const InputField = ({
  id,
  required,
  label,
  validation,
  control,
  errors,
  disabled,
  classes,
  placeholder,
  trigger,
  type = 'text',
}) => {
  return (
    <div className="flex flex-col">
      <label className="text-gray-600 text-sm">
        {label} {required && <span className="text-red-600">*</span>}
      </label>
      <Controller
        name={id}
        control={control}
        defaultValue={id === COMMON.PRODUCER_STATUS ? COMMON.ACTIVE : ''}
        rules={{
          ...validation,
          required: required ? `${label} is required` : false,
          pattern: {
            value: new RegExp(validation?.pattern?.value),
            message: validation?.pattern?.message,
          },
        }}
        render={({ field }) => (
          <TextField
            id={id}
            type={type}
            variant="outlined"
            disabled={disabled}
            placeholder={`Enter ${label}`}
            helperText={errors[id] && errors[id]?.message}
            size="small"
            className={`bg-white text-sm ${classes}`}
            error={Boolean(errors[id])}
            FormHelperTextProps={{ classes: { root: 'ml-0' } }}
            {...field}
            value={field.value || ''}
            onChange={(e) => {
              field.onChange(e);
              if (typeof trigger === 'function') {
                trigger(id);
              }
            }}
            onBlur={(e) => {
              const trimmedValue = e.target.value.trim();
              field.onChange(trimmedValue);
              field.onBlur();
              if (typeof trigger === 'function') {
                trigger(id);
              }
            }}
            InputProps={{
              classes: {
                input: `${id === COMMON.POSP_PAN ? 'uppercase' : ''}`,
              },
            }}
            inputProps={{
              maxLength: id === COMMON.MOBILE_NUMBER ? '10' : '60',
            }}
            autoComplete="off"
          />
        )}
      />
    </div>
  );
};

export default InputField;
