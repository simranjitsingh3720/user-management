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
  setValue
}) => {
  
  useEffect(() => {
    if (menuItem.length > 0) {
      setValue(name, menuItem[0]?.value);
    }
  }, [menuItem, name, setValue]);

  return (
    <div className={styles.fieldContainerStyle}>
      <div className={styles.labelText}>
        {label} {required && <span className={styles.styledRequired}>*</span>}
      </div>
      <Controller
        name={name}
        control={control}
        defaultValue={menuItem[0]?.value || ''}
        rules={{
          required: required ? `${label} is required` : false,}}
        render={({ field }) => {
          let value = field.value;
          if (name === GC_STATUS) {
            value = NO;
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
              displayEmpty
              className={`${styles.customizeSelect} ${classes}`}
              size="small"
            >
              <MenuItem value="" disabled>
                {"Select"}
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
      <div className={styles.styledError}>
        {errors[name] && <span>{errors[name]?.message}</span>}
      </div>
    </div>
  );
};

export default SelectField;
