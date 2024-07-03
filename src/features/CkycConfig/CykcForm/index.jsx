import React, { useEffect } from "react";
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
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
} from "@mui/material";
import styles from "./styles.module.scss";
import LeftArrow from "../../../assets/LeftArrow";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { useNavigate, useParams } from "react-router-dom";
import CustomButton from "../../../components/CustomButton";
import { forWhomDisable, forWhomEnable } from "../utils/constants";
import useGetLobData from "../../../hooks/useGetLobData";
import useGetCkycById from "../hooks/useGetCkycById";
import useHandleCkyc from "../hooks/useHandleCkyc";
import { fetchAllProductData } from "../../../stores/slices/productSlice";
import { useDispatch, useSelector } from "react-redux";

const CkycForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { products, productLoading } = useSelector((state) => state.product);

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      lob: null,
      product: null,
      cykc: "enable",
      forWhom: null,
    },
  });

  useEffect(() => {
    setValue("forWhom", null);
  }, [watch("cykc")]);

  const { UpdateData, postData, loading } = useHandleCkyc();

  const { data: ckycDataById, fetchData: ckycFetchData } = useGetCkycById();

  useEffect(() => {
    if (id) {
      ckycFetchData(id);
    }
  }, [id]);

  useEffect(() => {
    if (ckycDataById && ckycDataById?.data) {
      setValue("lob", ckycDataById.data.lob);
      setValue("product", ckycDataById.data.product);
      setValue(
        "cykc",
        ckycDataById.data.isCKYCApplicable ? "enable" : "disable"
      );
      setValue("forWhom", ckycDataById.data.forWhom);
      dispatch(fetchAllProductData({ lobId: ckycDataById.data.lob.id }));
    }
  }, [ckycDataById]);

  const onSubmit = (data) => {
    if (id) {
      UpdateData(id, data);
    } else {
      postData(data);
    }
  };

  const handleResetButton = () => {
    setValue("lob", null);
    setValue("product", null);
    setValue("cykc", "enable");
    setValue("forWhom", "both");
  };

  const { data: lobListData } = useGetLobData();

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
                        navigate("/ckyc-config");
                      }}
                    >
                      <LeftArrow />
                    </IconButton>
                    <span className={styles.headerTextStyle}>
                      {id ? "Update CKYC Config" : "Create New CKYC Config"}
                    </span>
                  </div>
                </Grid>
                {!id && (
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
                      onClick={() => handleResetButton()}
                    >
                      Reset
                    </CustomButton>
                  </Grid>
                )}
              </Grid>
              <Divider style={{ margin: "1rem 0" }} />
            </Grid>

            <Grid item xs={12} sm={6} lg={4}>
              <span className="label-text required-field">LOB</span>
              <Controller
                name="lob"
                id="lob"
                control={control}
                rules={{ required: "LOB is required" }}
                render={({ field }) => (
                  <Autocomplete
                    id="lob"
                    options={lobListData?.data || []}
                    getOptionLabel={(option) => {
                      return option?.lob?.toUpperCase() || "";
                    }}
                    disabled={id}
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
                      setValue("product", null);
                      field.onChange(newValue);
                      dispatch(fetchAllProductData({ lobId: newValue?.id }));
                    }}
                    renderOption={(props, option) => (
                      <li {...props} key={option.id}>
                        {option?.lob?.toUpperCase()}
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
                {errors.lob && <span>{errors.lob.message}</span>}
              </div>
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <span className="label-text required-field">Product</span>
              <Controller
                name="product"
                id="product"
                control={control}
                rules={{ required: "Product is required" }}
                render={({ field }) => (
                  <Autocomplete
                    id="product"
                    options={products.data || []}
                    getOptionLabel={(option) =>
                      option?.product?.toUpperCase() || ""
                    }
                    disabled={id}
                    loading={productLoading}
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
                        {option?.product?.toUpperCase()}
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
                {errors.product && <span>{errors.product.message}</span>}
              </div>
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <span className="label-text required-field">CKYC Applicable</span>
              <Controller
                name="cykc"
                control={control}
                rules={{ required: "CKYC Applicable is required" }}
                render={({ field }) => (
                  <RadioGroup
                    row
                    aria-labelledby="insillion-status-row-radio-buttons-group-label"
                    name="cykc"
                    {...field}
                  >
                    <FormControlLabel
                      value="enable"
                      control={<Radio />}
                      label="Enable"
                      className={styles.radioStyle}
                    />
                    <FormControlLabel
                      value="disable"
                      control={<Radio />}
                      label="Disable"
                    />
                  </RadioGroup>
                )}
              />
              <div className="error-msg">
                {errors.cykc && <span>{errors.cykc.message}</span>}
              </div>
            </Grid>
            {watch("cykc") === "enable" && (
              <Grid item xs={12} sm={6} lg={4}>
                <text className="label-text required-field">For Whom</text>
                <Controller
                  name="forWhom"
                  id="forWhom"
                  control={control}
                  rules={{ required: "This field is required" }}
                  render={({ field }) => (
                    <Select
                      id="forWhom"
                      value={field.value}
                      onChange={(event, newValue) => {
                        field.onChange(event.target.value);
                      }}
                      size="small"
                      displayEmpty
                      fullWidth
                      className="customize-select"
                      renderValue={(selected) => {
                        if (selected === null) {
                          return (
                            <div className={styles.placeholderStyle}>
                              Select
                            </div>
                          );
                        }
                        const selectedItem = forWhomEnable.find(
                          (item) => item.value === selected
                        );
                        return selectedItem ? selectedItem.label : "";
                      }}
                    >
                      {(watch("cykc") === "enable"
                        ? forWhomEnable
                        : forWhomDisable
                      ).map((item) => (
                        <MenuItem
                          value={item.value}
                          className={styles.styledOptionText}
                        >
                          {item.label}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                <div className="error-msg">
                  {errors.forWhom && <span>{errors.forWhom.message}</span>}
                </div>
              </Grid>
            )}
          </Grid>
        </CardContent>
      </Card>
      <div className={styles.buttonContainer}>
        <CustomButton type="submit" variant="contained" disabled={loading}>
          {id ? "Update" : "Submit"}
        </CustomButton>
      </div>
    </Box>
  );
};

export default CkycForm;
