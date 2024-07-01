import { Switch } from "@mui/material";
import styles from "./styles.module.css";
import { Controller } from "react-hook-form";
import { useState } from "react";

const ToggleSwitch = ({ control, name }) => {
  const [changeStatusOpen, setChangeStatusOpen] = useState(false);
  const [status, setStatus] = useState(true);
  const handleChange = (field) => (event) => {
    setChangeStatusOpen(true);
    field.onChange(event.target.checked ? "Yes" : "No");
    setStatus(field.value === "Yes" ? false : true);
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
            checked={field.value === "Yes"}
            inputProps={{ "aria-label": "toggle button" }}
          />
        )}
      />
      <div className={styles.styledActiveSelect}>{status ? "Yes" : "No"}</div>
    </div>
  );
};

export default ToggleSwitch;
