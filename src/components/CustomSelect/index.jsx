import React from 'react';
import { Controller } from 'react-hook-form';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { GC_STATUS, NO } from './utils/constants';

const SelectField = ({
  control,
  name,
  label,
  required = false,
  disabled = false,
  menuItem = [],
  placeholder = '',
  errors = {},
  classes,
  setValue,
  trigger,
}) => {
  return (
    <div className="m-0 flex flex-col">
      <div className="text-shuttleGray text-sm">
        {label} {required && <span className="text-persianRed">*</span>}
      </div>
      <Controller
        name={name}
        control={control}
        defaultValue={name === GC_STATUS ? NO : ''}
        rules={{
          required: required ? `${label} is required` : false,
        }}
        render={({ field }) => {
          return (
            <Select
              {...field}
              disabled={disabled}
              labelId={name}
              id={name}
              placeholder={placeholder || label}
              value={field.value}
              onChange={(e) => {
                setValue(name, e.target.value);
                field.onChange(e);
                if(typeof trigger === 'function'){
                  trigger(name);
                }
              }}
              onBlur={(e) => {
                field.onBlur();
                if(typeof trigger === 'function'){
                  trigger(name);
                }
              }}
              displayEmpty
              className={`bg-white text-normal h-10 ${classes} ${
                field.value === '' ? 'text-lg text-silverChalice' : 'text-lg'
              }`}
              size="small"
            >
              <MenuItem value="" disabled>
                {'Select'}
              </MenuItem>
              {menuItem.length > 0
                ? menuItem.map((item) => (
                    <MenuItem key={item.value} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))
                : null}
            </Select>
          );
        }}
      />
      <div className="text-xs text-persianRed">{errors[name] && <span>{errors[name]?.message}</span>}</div>
    </div>
  );
};

export default SelectField;
