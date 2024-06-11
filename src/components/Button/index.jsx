import React from "react";
import PropTypes from "prop-types";

const Button = ({
  children,
  onClick = () => {},
  type = "button",
  disabled = false,
  className = "",
  style = {},
  variant = "primary",
  size = "medium",
}) => {
  const baseClasses =
    "px-4 py-2 rounded-lg transition-colors duration-300";
  const variantClasses = {
    primary: "bg-[#185EC4] text-white hover:bg-blue-600",
    secondary: "border hover:bg-gray-600 hover:text-white",
  };
  const sizeClasses = {
    small: "text-sm",
    medium: "text-md",
    large: "text-lg",
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  return (
    <button
      className={classes}
      onClick={onClick}
      type={type}
      disabled={disabled}
      style={style}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
  variant: PropTypes.oneOf(["primary", "secondary"]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
};

export default Button;
