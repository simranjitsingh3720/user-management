import React, { useEffect } from 'react';
import { Controller } from 'react-hook-form';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import styles from './styles.module.scss';
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
    <div className={styles.fieldContainerStyle}>
      <div className={styles.labelText}>
        {label} {required && <span className={styles.styledRequired}>*</span>}
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
                trigger(name);
              }}
              onBlur={(e) => {
                field.onBlur();
                trigger(name);
              }}
              displayEmpty
              className={`${styles.customizeSelect} ${classes} ${
                field.value === '' ? 'text-lg font-light text-silverChalice' : 'text-lg'
              }`}
              size="small"
            >
              <MenuItem value="" disabled>
                {'Select'}
              </MenuItem>
              {menuItem.length > 0
                ? menuItem.map((item) => (
                    <MenuItem key={item.value} value={item.value} className={styles.styledMenuText}>
                      {item.label}
                    </MenuItem>
                  ))
                : null}
            </Select>
          );
        }}
      />
      <div className={styles.styledError}>{errors[name] && <span>{errors[name]?.message}</span>}</div>
    </div>
  );
};

export default SelectField;
