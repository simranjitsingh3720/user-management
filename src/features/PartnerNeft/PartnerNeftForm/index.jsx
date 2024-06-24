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
  Typography,
} from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { useNavigate, useParams } from "react-router-dom";
import CustomButton from "../../../components/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { fetchLobData } from "../../../stores/slices/lobSlice";
import { fetchAllProductData } from "../../../stores/slices/productSlice";
import { fetchUser } from "../../../stores/slices/userSlice";
import { COMMON_WORDS } from "../../../utils/constants";
import { VERIFICATION_METHOD } from "../utils/constant";
import LeftArrow from "../../../assets/LeftArrow";
import useSubmit from "../hooks/useSubmit";

const PartnerNeftForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const { allLob, lobLoading } = useSelector((state) => state.lob);
  const { products, productLoading } = useSelector((state) => state.product);
  const { user, userLoading } = useSelector((state) => state.user);
  const { createPartnerNeft, getPartnerNeft, updatePartnerNeft } = useSubmit();

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      lob: null,
      product: null,
      producer: null,
      verificationMethod: null,
    },
  });

  const onSubmit = async (data) => {
    if (params.id) {
      updatePartnerNeft(params.id, data);
    } else {
      createPartnerNeft(data);
    }
  };

  const getPartnerNeftDetails = async (id) => {
    const data = await getPartnerNeft(id);
    if (data) {
      setValue("lob", data.lob);
      setValue("producer", data.producer);

      const index = VERIFICATION_METHOD.findIndex(item => data.verificationMethod === item.value)
      setValue("verificationMethod", VERIFICATION_METHOD[index]);
      // Fetch related products if lob is set
      if (data.lob?.id) {
        dispatch(fetchAllProductData({ lobId: data.lob.id }));
        setValue("product", data.product);
      }
    }
  };

  useEffect(() => {
    if (params.id) {
      getPartnerNeftDetails(params.id);
    }
  }, [params.id]);

  useEffect(() => {
    dispatch(fetchLobData());
    dispatch(fetchUser({ userType: COMMON_WORDS.PRODUCER }));
  }, [dispatch]);

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
                  <div className="flex items-center">
                    <IconButton
                      aria-label="back"
                      onClick={() => {
                        navigate("/partner-neft");
                      }}
                    >
                      <LeftArrow />
                    </IconButton>
                    <Typography
                      variant="h6"
                      noWrap
                      fontWeight={600}
                      color="#465465"
                    >
                      {params.id
                        ? "Update Partner NEFT Flag"
                        : "Create New Partner NEFT Flag"}
                    </Typography>
                  </div>
                  <div>
                    <span className="label">
                      Please fill the details below and click Submit to{" "}
                      {params.id ? "update" : "create"} a partner NEFT flag.
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
                    onClick={() => navigate("/partner-neft")}
                  >
                    Reset
                  </CustomButton>
                </Grid>
              </Grid>
              <Divider style={{ margin: "1rem 0" }} />
            </Grid>

            <Grid item xs={12} sm={6} lg={4}>
              <span className="label-text required-field">LOB</span>
              <Controller
                name="lob"
                control={control}
                defaultValue={null}
                rules={{ required: "LOB is required" }}
                render={({ field }) => (
                  <Autocomplete
                    id="lob"
                    options={allLob.data || []}
                    getOptionLabel={(option) =>
                      option?.lob?.toUpperCase() || ""
                    }
                    className="customize-select"
                    size="small"
                    loading={lobLoading}
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                    renderInput={(params) => (
                      <TextField {...params} placeholder="Select" />
                    )}
                    value={field.value || null}
                    onChange={(event, newValue) => {
                      field.onChange(newValue);
                      setValue("product", null);
                      if (newValue && newValue.id) {
                        dispatch(fetchAllProductData({ lobId: newValue.id }));
                      }
                    }}
                    disabled={params.id ? true : false}
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
                    disableClearable={true}
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
                control={control}
                defaultValue={null}
                rules={{ required: "Product is required" }}
                render={({ field }) => (
                  <Autocomplete
                    id="product"
                    options={products.data || []}
                    getOptionLabel={(option) =>
                      option?.product?.toUpperCase() || ""
                    }
                    loading={productLoading}
                    className="customize-select"
                    size="small"
                    disabled={params.id ? true : false}
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                    renderInput={(params) => (
                      <TextField {...params} placeholder="Select" />
                    )}
                    value={field.value || null}
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
                    disableClearable={true}
                  />
                )}
              />
              <div className="error-msg">
                {errors.product && <span>{errors.product.message}</span>}
              </div>
            </Grid>

            <Grid item xs={12} sm={6} lg={4}>
              <span className="label-text required-field">Producer</span>
              <Controller
                name="producer"
                control={control}
                defaultValue={null}
                rules={{ required: "Producer is required" }}
                render={({ field }) => (
                  <Autocomplete
                    id="producer"
                    options={user.data || []}
                    className="customize-select"
                    size="small"
                    loading={userLoading}
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                    getOptionLabel={(option) => {
                      return `${option?.firstName?.toUpperCase()} ${option?.lastName?.toUpperCase()}`;
                    }}
                    renderInput={(params) => (
                      <TextField {...params} placeholder="Select" />
                    )}
                    renderOption={(props, option) => (
                      <li {...props} key={option.id}>
                        {option?.firstName?.toUpperCase()}{" "}
                        {option?.lastName?.toUpperCase()}
                      </li>
                    )}
                    value={field.value || null}
                    onChange={(event, newValue) => {
                      field.onChange(newValue);
                    }}
                    ListboxProps={{
                      style: {
                        maxHeight: "200px",
                      },
                    }}
                    disableClearable={true}
                  />
                )}
              />
              <div className="error-msg">
                {errors.producer && <span>{errors.producer.message}</span>}
              </div>
            </Grid>

            <Grid item xs={12} sm={6} lg={4}>
              <span className="label-text required-field">
                Verification Method
              </span>
              <Controller
                name="verificationMethod"
                control={control}
                defaultValue={null}
                rules={{ required: "Verification Method is required" }}
                render={({ field }) => (
                  <Autocomplete
                    id="verificationMethod"
                    options={VERIFICATION_METHOD || []}
                    className="customize-select"
                    size="small"
                    isOptionEqualToValue={(option, value) =>
                      option.value === value?.value
                    }
                    renderInput={(params) => (
                      <TextField {...params} placeholder="Select" />
                    )}
                    value={field.value || null}
                    onChange={(event, newValue) => {
                      field.onChange(newValue);
                    }}
                    ListboxProps={{
                      style: {
                        maxHeight: "200px",
                      },
                    }}
                    disableClearable={true}
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
      <div className="flex items-center mt-4">
        <CustomButton type="submit" variant="contained">
          Submit
        </CustomButton>
      </div>
    </Box>
  );
};

export default PartnerNeftForm;
