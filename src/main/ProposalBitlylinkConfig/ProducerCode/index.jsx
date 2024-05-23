import React from "react";
import styles from "./styles.module.css";
import { Controller, useForm } from "react-hook-form";
import { Autocomplete, Button, TextField } from "@mui/material";
import TableList from "./TableList";

function ProducerCode() {
  const { handleSubmit, control, formState } = useForm();
  const { errors } = formState;

  const onSubmit = (data) => {
    console.log("data", data);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.createNewUserContainer}>
          <div className={styles.fieldContainerStyle}>
            <text className={styles.labelText}>
              Select Producer <span className={styles.styledRequired}>*</span>
            </text>
            <Controller
              name="producer" // Name of the field in the form data
              control={control}
              rules={{ required: "Producer is required" }}
              render={({ field }) => (
                <Autocomplete
                  id="producer"
                  options={[]}
                  getOptionLabel={(option) =>
                    option?.groupName?.toUpperCase() || ""
                  }
                  className={styles.customizeSelect}
                  size="small"
                  renderInput={(params) => (
                    <TextField {...params} placeholder="Select" />
                  )}
                  onChange={(event, newValue) => {
                    field.onChange(newValue);
                  }}
                  ListboxProps={{
                    style: {
                      maxHeight: "200px",
                    },
                  }}
                />
              )}
            />
            <div className={styles.styledError}>
              {errors.channel && <span>{errors.channel.message}</span>}
            </div>
          </div>
          <div className={styles.tableStyle}>
            <TableList />
          </div>
          <div className={styles.buttonContainer}>
            <Button
              type="submit"
              variant="contained"
              className={styles.styledButton}
            >
              Submit
            </Button>
            <Button variant="outlined" className={styles.styledButton}>
              Cancel
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ProducerCode;
