import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Autocomplete,
  TextField,
  
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  Divider,
} from "@mui/material";
import styles from "./styles.module.scss";
import LeftArrow from "../../../assets/LeftArrow";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { useNavigate, useParams } from "react-router-dom";
import CustomButton from "../../../components/CustomButton";

const options = [
  { label: "Option 1", value: "option1" },
  { label: "Option 2", value: "option2" },
  { label: "Option 3", value: "option3" },
];

const PartnerNeftForm = () => {
  const navigate = useNavigate();
  const params = useParams();
  console.log(params)
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
    navigate("/partner-neft")
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
            <Grid item xs={12}>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={8}>
                  <div className={styles.headerContainer}>
                    <IconButton
                      aria-label="back"
                      onClick={() => {
                        navigate("/partner-neft");
                      }}
                    >
                      <LeftArrow />
                    </IconButton>
                    <span className={styles.headerTextStyle}>
                      Create New Partner NEFT Flag
                    </span>
                  </div>
                  <div>
                    <span className="label">
                      Please fill the details below and click Submit to create a
                      new partner NEFT flag.
                    </span>
                  </div>
                </Grid>
                <Grid
                  item
                  xs={4}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  <CustomButton
                    variant="outlined"
                    startIcon={<RestartAltIcon />}
                    className={styles.secondaryBtn}
                  >
                    Reset
                  </CustomButton>
                </Grid>
              </Grid>
              <Divider style={{ margin: "1rem 0" }} />
            </Grid>

            <Grid item xs={12} sm={6} lg={4}>
              <text className="label-text required-field">LOB</text>
              <Controller
                name="lob"
                id="lob"
                control={control}
                rules={{ required: "LOB is required" }}
                render={({ field }) => (
                  <Autocomplete
                    id="lob"
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
                {errors.lob && <span>{errors.lob.message}</span>}
              </div>
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <text className="label-text required-field">Product</text>
              <Controller
                name="product"
                id="product"
                control={control}
                rules={{ required: "Product is required" }}
                render={({ field }) => (
                  <Autocomplete
                    id="product"
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
                {errors.product && <span>{errors.product.message}</span>}
              </div>
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <text className="label-text required-field">Producer</text>
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
                Verification Method
              </text>
              <Controller
                name="verificationMethod"
                id="verificationMethod"
                control={control}
                rules={{ required: "Verification Method is required" }}
                render={({ field }) => (
                  <Autocomplete
                    id="verificationMethod"
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
                {errors.verificationMethod && (
                  <span>{errors.verificationMethod.message}</span>
                )}
              </div>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <div className={styles.buttonContainer}>
        <CustomButton type="submit" variant="contained" className={styles.primaryBtn}>
          Submit
        </CustomButton>
      </div>
    </Box>
  );
};

export default PartnerNeftForm;
