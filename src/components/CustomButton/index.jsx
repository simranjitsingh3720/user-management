import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';

const StyledButton = styled(Button)(({ theme, size }) => ({
  '&:not(:last-of-type)': {
    marginRight: theme.spacing(2),
  },
  ...(size === 'medium' && {
    height: '2.5rem',
  }),
  textTransform: 'none',
  position: 'relative'
}));

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
  loading = false,
  ...props
}) => {
  return (
    <StyledButton
      className={className}
      onClick={onClick}
      type={type}
      disabled={disabled || loading}
      sx={sx}
      variant={variant}
      color={color}
      size={size}
      startIcon={!loading ? startIcon : null}
      endIcon={!loading ? endIcon : null}
      {...props}
    >
      {loading ? (
        <CircularProgress size={24} sx={{ position: 'absolute' }} />
      ) : (
        children
      )}
    </StyledButton>
  );
};

CustomButton.propTypes = {
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
  loading: PropTypes.bool,
};

export default CustomButton;
