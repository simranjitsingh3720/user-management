import React from 'react';
import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import { ACTIVE, PRODUCER_STATUS } from './utils/constants';

const InputField = ({
  id,
  required,
  label,
  validation,
  control,
  errors,
  disabled,
  classes,
  type = 'text',
  trigger,
}) => {
  return (
    <div className="flex flex-col">
      <label className="text-gray-600 text-sm">
        {label} {required && <span className="text-red-600">*</span>}
      </label>
      <Controller
        name={id}
        control={control}
        defaultValue={id === PRODUCER_STATUS ? ACTIVE : ''}
        rules={{
          ...validation,
          required: required ? `${label} is required` : false,
          pattern: {
            value: new RegExp(validation?.pattern?.value),
            message: validation?.pattern?.message,
          },
          minLength: validation?.minLength,
          maxLength: validation?.maxLength,
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
            onChange={async (e) => {
              field.onChange(e);
              if (typeof trigger === 'function') {
                await trigger(id, { shouldValidate: true });
              }
            }}
          />
        )}
      />
    </div>
  );
};

export default InputField;
