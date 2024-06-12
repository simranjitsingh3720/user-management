import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';

const CustomButton = ({
  children,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  sx = {},
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  startIcon = null,
  endIcon = null,
  ...props
}) => {
  return (
    <Button
      className={className}
      onClick={onClick}
      type={type}
      disabled={disabled}
      sx={sx}
      variant={variant}
      color={color}
      size={size}
      startIcon={startIcon}
      endIcon={endIcon}
      {...props}
    >
      {children}
    </Button>
  );
};

CustomButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  sx: PropTypes.object,
  variant: PropTypes.oneOf(['text', 'outlined', 'contained']),
  color: PropTypes.oneOf(['inherit', 'primary', 'secondary', 'success', 'error', 'info', 'warning']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  startIcon: PropTypes.node,
  endIcon: PropTypes.node,
};

export default CustomButton;
