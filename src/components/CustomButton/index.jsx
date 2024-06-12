import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';

const CustomButton = ({
  children,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  style = {},
  variant = 'contained',
  color = 'primary',
  size = 'medium',
}) => {
  return (
    <Button
      className={className}
      onClick={onClick}
      type={type}
      disabled={disabled}
      style={style}
      variant={variant}
      color={color}
      size={size}
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
  style: PropTypes.object,
  variant: PropTypes.oneOf(['text', 'outlined', 'contained']),
  color: PropTypes.oneOf(['inherit', 'primary', 'secondary', 'success', 'error', 'info', 'warning']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

export default CustomButton;
