// UserTypeToggle.js
import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  Button,
} from "@mui/material";
import { useState } from "react";
import styles from "./styles.module.scss";

const UserTypeToggle = ({ control, menuItem, name, required, label }) => {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <FormControl sx={{ width: '-webkit-fill-available' }} >
            <label className={styles.labelText}>
              {label} {required && <span className={styles.styledRequired}>*</span>}
            </label>
            <RadioGroup value={value} onChange={(e) => {
              onChange(e);
            }}>
              <div className="flex flex-col sm:flex-row space-y-5 sm:space-y-0 sm:space-x-5 sm:w-49">
                {menuItem.map((item) => (
                  <div
                    key={item.id}
                    className={`flex items-center w-full border px-2 rounded-lg ${
                      value === item.value
                        ? "border-blue-600"
                        : "border-gray-500"
                    }`}
                  >
                    <FormControlLabel
                      value={item.value}
                      control={<Radio />}
                      label={item.label}
                      sx={{ '.MuiFormControlLabel-label': { fontSize: '14px', color:'#2F3741' } }} 
                    />
                  </div>
                ))}
              </div>
            </RadioGroup>
          </FormControl>
        )}
      />
    );
};

export default UserTypeToggle;
