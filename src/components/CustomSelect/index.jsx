import React, { useEffect } from 'react';
import { Controller } from 'react-hook-form';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import styles from './styles.module.scss';

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
        defaultValue={(menuItem.length>0 && menuItem[0].value) || 'yes'}
        render={({ field }) => (
          <Select
            {...field}
            disabled={disabled}
            labelId={name}
            id={name}
            placeholder={placeholder || label}
            value={field.value ||
              (menuItem.length>0 && menuItem[0].value) || 'yes'}
            onChange={field.onChange}
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
        )}
      />
      <div className={styles.styledError}>
        {errors[name] && <span>{errors[name]?.message}</span>}
      </div>
    </div>
  );
};

export default SelectField;
