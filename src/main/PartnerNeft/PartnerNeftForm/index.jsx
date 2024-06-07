import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Autocomplete,
  TextField,
  Button,
  Box,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import styles from "./styles.module.css";

const options = [
  { label: "Option 1", value: "option1" },
  { label: "Option 2", value: "option2" },
  { label: "Option 3", value: "option3" },
];

const PartnerNeftForm = () => {
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
    console.log(data);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardContent>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={12} sm={6} lg={4}>
              <text className="label-text required-field">Select Producer</text>
              <Controller
                name="producer"
                id="producer"
                control={control}
                rules={{ required: "Producer is required" }}
                render={({ field }) => (
                  <Autocomplete
                    id="producer"
                    options={options || []}
                    //   getOptionLabel={(option) => {
                    //     return `${option?.firstName?.toUpperCase()} ${option?.lastName?.toUpperCase()}`;
                    //   }}
                    className="customize-select"
                    size="small"
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                    renderInput={(params) => (
                      <TextField {...params} placeholder="Select" />
                    )}
                    value={field.value}
                    onChange={(event, newValue) => {
                      field.onChange(newValue);
                    }}
                    //   renderOption={(props, option) => (
                    //     <li {...props} key={option.id}>
                    //       {option?.firstName?.toUpperCase()}{" "}
                    //       {option?.lastName?.toUpperCase()}
                    //     </li>
                    //   )}
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
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
             
                <text className="label-text required-field">
                  Select Producer
                </text>
                <Controller
                  name="producer"
                  id="producer"
                  control={control}
                  rules={{ required: "Producer is required" }}
                  render={({ field }) => (
                    <Autocomplete
                      id="producer"
                      options={options || []}
                      //   getOptionLabel={(option) => {
                      //     return `${option?.firstName?.toUpperCase()} ${option?.lastName?.toUpperCase()}`;
                      //   }}
                      className="customize-select"
                      size="small"
                      isOptionEqualToValue={(option, value) =>
                        option.id === value.id
                      }
                      renderInput={(params) => (
                        <TextField {...params} placeholder="Select" />
                      )}
                      value={field.value}
                      onChange={(event, newValue) => {
                        field.onChange(newValue);
                      }}
                      //   renderOption={(props, option) => (
                      //     <li {...props} key={option.id}>
                      //       {option?.firstName?.toUpperCase()}{" "}
                      //       {option?.lastName?.toUpperCase()}
                      //     </li>
                      //   )}
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
             
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
             
                <text className="label-text required-field">
                  Select Producer
                </text>
                <Controller
                  name="producer"
                  id="producer"
                  control={control}
                  rules={{ required: "Producer is required" }}
                  render={({ field }) => (
                    <Autocomplete
                      id="producer"
                      options={options || []}
                      //   getOptionLabel={(option) => {
                      //     return `${option?.firstName?.toUpperCase()} ${option?.lastName?.toUpperCase()}`;
                      //   }}
                      className="customize-select"
                      size="small"
                      isOptionEqualToValue={(option, value) =>
                        option.id === value.id
                      }
                      renderInput={(params) => (
                        <TextField {...params} placeholder="Select" />
                      )}
                      value={field.value}
                      onChange={(event, newValue) => {
                        field.onChange(newValue);
                      }}
                      //   renderOption={(props, option) => (
                      //     <li {...props} key={option.id}>
                      //       {option?.firstName?.toUpperCase()}{" "}
                      //       {option?.lastName?.toUpperCase()}
                      //     </li>
                      //   )}
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
             
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
             
                <text className="label-text required-field">
                  Select Producer
                </text>
                <Controller
                  name="producer"
                  id="producer"
                  control={control}
                  rules={{ required: "Producer is required" }}
                  render={({ field }) => (
                    <Autocomplete
                      id="producer"
                      options={options || []}
                      //   getOptionLabel={(option) => {
                      //     return `${option?.firstName?.toUpperCase()} ${option?.lastName?.toUpperCase()}`;
                      //   }}
                      className="customize-select"
                      size="small"
                      isOptionEqualToValue={(option, value) =>
                        option.id === value.id
                      }
                      renderInput={(params) => (
                        <TextField {...params} placeholder="Select" />
                      )}
                      value={field.value}
                      onChange={(event, newValue) => {
                        field.onChange(newValue);
                      }}
                      //   renderOption={(props, option) => (
                      //     <li {...props} key={option.id}>
                      //       {option?.firstName?.toUpperCase()}{" "}
                      //       {option?.lastName?.toUpperCase()}
                      //     </li>
                      //   )}
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
             
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <div className={styles.buttonContainer}>
        <Button type="submit" variant="contained" className={styles.primaryBtn}>
          Submit
        </Button>
      </div>
    </Box>
  );
};

export default PartnerNeftForm;
