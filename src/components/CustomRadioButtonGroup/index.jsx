import React from "react";
import { Controller } from "react-hook-form";
import {
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormHelperText,
} from "@mui/material";

const UserTypeToggle = ({ control, menuItem, name, required, label, defaultValue }) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={{ required: required ? `${label} is required` : false }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FormControl className="w-full" error={!!error}>
          <label className="text-gray-600 text-sm mb-1">
            {label} {required && <span className="text-red-600">*</span>}
          </label>
          <RadioGroup value={value} onChange={(e) => onChange(e.target.value)}>
            <div className="flex flex-col sm:flex-row space-y-5 sm:space-y-0 sm:space-x-5 sm:w-49">
              {menuItem.map((item) => (
                <div
                  key={item.id}
                  className={`flex items-center w-full border px-2 rounded-lg ${
                    value === item.value ? "border-blue-600" : "border-gray-500"
                  }`}
                >
                  <FormControlLabel
                    value={item.value}
                    control={<Radio />}
                    label={item.label}
                    className="text-sm text-gray-700"
                  />
                </div>
              ))}
            </div>
          </RadioGroup>
          {error && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
};

export default UserTypeToggle;
