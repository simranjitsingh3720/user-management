import React from 'react';
import { FormControlLabel, Checkbox } from '@mui/material';

const CustomCheckbox = ({
  checked = false,
  label,
  onChange,
  disabled = false,
  color = 'primary',
  indeterminate = false,
  name,
  value,
  size = 'medium',
  sx = {},
  ...rest
}) => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          color={color}
          indeterminate={indeterminate}
          name={name}
          value={value}
          size={size}
          {...rest}
        />
      }
      label={label}
      sx={{ textTransform: 'capitalize', ...sx }}
    />
  );
};

export default CustomCheckbox;
