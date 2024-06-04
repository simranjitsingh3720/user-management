import { Autocomplete, Button, TextField, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { Controller, useForm } from "react-hook-form";

function FormWithSelect() {
  const [producerData, setProducerData] = useState([]);
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

  useEffect(() => {
    setProducerData([
      {
        label: "pushpender",
      },
      {
        label: "pushpender1",
      },
      {
        label: "pushpender2",
      },
    ]);
  }, []);

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
                options={producerData}
                getOptionLabel={(option) => option.label}
                className="customize-select"
                size="small"
                renderOption={(props, options) => (
                  <Box component="li" {...props}>
                    {options.label}
                  </Box>
                )}
                value={field.label}
                onChange={(event, newValue) => {
                  if (newValue) {
                    field.onChange(newValue.label);
                  } else {
                    field.onChange(null);
                  }
                }}
                renderInput={(params) => (
                  <TextField {...params} placeholder="Select" />
                )}
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

export default FormWithSelect;
