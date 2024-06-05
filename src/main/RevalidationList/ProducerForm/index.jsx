import { Autocomplete, Button, TextField } from "@mui/material";
import React from "react";
import styles from "./styles.module.css";
import { Controller, useForm } from "react-hook-form";
import useGetUserData from "../../../utils/custom-hooks/useGetUserData";

function ProducerForm() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      producer: null,
    },
  });

  const onSubmit = (data) => {
    // Handle Form Data
    console.log(data);
  };

  const { userData } = useGetUserData();

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.fieldContainer}>
          <text className="label-text required-field">Select Producer</text>
          <Controller
            name="producer"
            id="producer"
            control={control}
            rules={{ required: "Producer is required" }}
            render={({ field }) => (
              <Autocomplete
                id="producer"
                options={userData || []}
                getOptionLabel={(option) => {
                  return `${option?.firstName?.toUpperCase()} ${option?.lastName?.toUpperCase()}`;
                }}
                className="customize-select"
                size="small"
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={(params) => (
                  <TextField {...params} placeholder="Select" />
                )}
                value={field.value}
                onChange={(event, newValue) => {
                  field.onChange(newValue);
                }}
                renderOption={(props, option) => (
                  <li {...props} key={option.id}>
                    {option?.firstName?.toUpperCase()} {option?.lastName?.toUpperCase()}
                  </li>
                )}
                ListboxProps={{
                  style: {
                    maxHeight: "200px",
                  },
                }}
              />
            )}
          />
          <div className="error-msg">
            {errors.producer && <span>{errors.producer.message}</span>}
          </div>
        </div>

        <div className={styles.buttonContainer}>
          <Button
            type="submit"
            variant="contained"
            className={styles.primaryBtn}
          >
            Submit
          </Button>
        </div>
      </form>
    </>
  );
}

export default ProducerForm;
