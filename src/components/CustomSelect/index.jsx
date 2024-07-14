import React from 'react';
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
  setValue
}) => {
  return (
    <div className={styles.fieldContainerStyle}>
      <div className={styles.labelText}>
        {label} {required && <span className={styles.styledRequired}>*</span>}
      </div>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          let value = field.value;
          if (value === '' || value === undefined) {
            if (name === GC_STATUS) {
              value = NO;
            } else if (menuItem.length > 0) {
              value = menuItem[0].value;
            }
          }

          return (
            <Select
              {...field}
              disabled={disabled}
              labelId={name}
              id={name}
              placeholder={placeholder || label}
              value={value}
              onChange={(e) => {
                setValue(name, e.target.value);
                field.onChange(e);
              }}
              className={`${styles.customizeSelect} ${classes}`}
              size="small"
            >
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
      <div className={styles.styledError}>
        {errors[name] && <span>{errors[name]?.message}</span>}
      </div>
    </div>
  );
};

export default SelectField;
