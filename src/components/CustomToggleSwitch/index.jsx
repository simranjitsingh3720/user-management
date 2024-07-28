import { Switch } from "@mui/material";
import { Controller } from "react-hook-form";
import { useState } from "react";
import { NO, YES } from "./constants";

const ToggleSwitch = ({ control, name }) => {
  const [setChangeStatusOpen] = useState(false);
  const [status, setStatus] = useState(true);

  const handleChange = (field) => (event) => {
    setChangeStatusOpen(true);
    field.onChange(event.target.checked ? YES : NO);
    setStatus(field.value === YES ? false : true);
  };

  return (
    <div className="flex items-center -ml-3">
      <Controller
        name={name}
        control={control}
        defaultValue="Yes"
        render={({ field }) => (
          <Switch
            {...field}
            onChange={handleChange(field)}
            checked={field.value === YES}
            inputProps={{ "aria-label": "toggle button" }}
          />
        )}
      />
      <div className={`ml-2 text-sm text-gray-600`}>
        {status ? YES : NO}
      </div>
    </div>
  );
};

export default ToggleSwitch;
