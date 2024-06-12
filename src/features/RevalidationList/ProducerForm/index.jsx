import { Autocomplete, Button, Grid, TextField } from "@mui/material";
import React from "react";
import styles from "./styles.module.scss";
import { Controller, useForm } from "react-hook-form";
import useGetUserData from "../../../hooks/useGetUserData";
import DownloadIcon from "./../../../assets/DownloadLogo";
import excelExport from "../../../utils/excelExport";

const ProducerForm = ({ onFormSubmit, revalidationList }) => {
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
    onFormSubmit(data);
  };

  const { userData } = useGetUserData();

  const downloadExcel = () => {
    const filteredData = revalidationList.map(
      ({ name, status, emailId, mobileNo }) => ({
        name,
        emailId,
        mobileNo,
        status,
      })
    );

    excelExport(filteredData);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
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
                  options={userData || []}
                  getOptionLabel={(option) => {
                    return `${option?.firstName?.toUpperCase()} ${option?.lastName?.toUpperCase()}`;
                  }}
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
                  renderOption={(props, option) => (
                    <li {...props} key={option.id}>
                      {option?.firstName?.toUpperCase()}{" "}
                      {option?.lastName?.toUpperCase()}
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
          </Grid>
        </Grid>

        <div className={styles.buttonContainer}>
          <Button
            type="submit"
            variant="contained"
            className={styles.primaryBtn}
          >
            Submit
          </Button>
          {revalidationList.length > 0 ? (
            <Button
              variant="outlined"
              startIcon={<DownloadIcon />}
              onClick={downloadExcel}
              className={styles.exportBtn}
            >
              Export Data
            </Button>
          ) : (
            <></>
          )}
        </div>
      </form>
    </>
  );
};

export default ProducerForm;
