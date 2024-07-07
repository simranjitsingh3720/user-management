import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
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
import CustomAutoCompleteWithoutCheckbox from "../../../components/CustomAutoCompleteWithoutCheckbox";

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
    reset,
    resetField,
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

      const index = VERIFICATION_METHOD.findIndex(
        (item) => data.verificationMethod === item.value
      );
      setValue("verificationMethod", VERIFICATION_METHOD[index]);

      if (data.lob?.id) {
        dispatch(fetchAllProductData({ lobId: data.lob.id }));
        setValue("product", data.product);
      }
    }
  };

  const handleReset = () => {
    if (params.id) {
      resetField("producer");
      resetField("verificationMethod");
    } else {
      reset();
    }
  };

  useEffect(() => {
    if (params.id) {
      getPartnerNeftDetails(params.id);
    }
  }, [params.id]);

  useEffect(() => {
    dispatch(fetchLobData(
      { isAll: true, status: true }
    ));
    dispatch(
      fetchUser({
        userType: COMMON_WORDS.PRODUCER,
        searchKey: COMMON_WORDS.ROLE_NAME,
      })
    );
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
                    onClick={handleReset}
                  >
                    Reset
                  </CustomButton>
                </Grid>
              </Grid>
              <Divider style={{ margin: "1rem 0" }} />
            </Grid>

            <Grid item xs={12} sm={6} lg={4}>
              <CustomAutoCompleteWithoutCheckbox
                name="lob"
                label="LOB"
                required={true}
                loading={lobLoading}
                options={allLob.data || []}
                getOptionLabel={(option) => option?.lob?.toUpperCase()}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                control={control}
                rules={{ required: "LOB is required" }}
                error={Boolean(errors.lob)}
                helperText={errors.lob?.message}
                disableClearable={true}
                placeholder={COMMON_WORDS.SELECT}
                renderOption={(props, option) => (
                  <li {...props} key={option.id}>
                    {option?.lob?.toUpperCase()}
                  </li>
                )}
                disabled={params.id ? true : false}
                onChangeCallback={(newValue) => {
                  setValue("product", null);
                  if (newValue && newValue.id) {
                    dispatch(fetchAllProductData({ lobId: newValue.id }));
                  }
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6} lg={4}>
                <CustomAutoCompleteWithoutCheckbox
                  name="product"
                  label="Product"
                  required={true}
                  loading={productLoading}
                  options={products.data || []}
                  getOptionLabel={(option) => option?.product?.toUpperCase()}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  control={control}
                  rules={{ required: "Product is required" }}
                  error={Boolean(errors.product)}
                  helperText={errors.product?.message}
                  disableClearable={true}
                  placeholder={COMMON_WORDS.SELECT}
                  renderOption={(props, option) => (
                    <li {...props} key={option.id}>
                      {option?.product?.toUpperCase()}
                    </li>
                  )}
                />
            </Grid>

            <Grid item xs={12} sm={6} lg={4}>
              <CustomAutoCompleteWithoutCheckbox
                name="producer"
                label="Producer"
                required={true}
                loading={userLoading}
                options={user.data || []}
                getOptionLabel={(option) => {
                  return `${option?.firstName?.toUpperCase()} ${option?.lastName?.toUpperCase()}`;
                }}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                control={control}
                rules={{ required: "Producer is required" }}
                error={Boolean(errors.producer)}
                helperText={errors.producer?.message}
                disableClearable={true}
                placeholder={COMMON_WORDS.SELECT}
                renderOption={(props, option) => (
                  <li {...props} key={option.id}>
                    {option?.firstName?.toUpperCase()}{" "}
                    {option?.lastName?.toUpperCase()}
                  </li>
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6} lg={4}>
                <CustomAutoCompleteWithoutCheckbox
                  name="verificationMethod"
                  label="Verification Method"
                  required={true}
                  options={VERIFICATION_METHOD || []}
                  getOptionLabel={(option) => option?.label}
                  isOptionEqualToValue={(option, value) => option.value === value.value}
                  control={control}
                  rules={{ required: "Verification Method is required" }}
                  error={Boolean(errors.verificationMethod)}
                  helperText={errors.verificationMethod?.message}
                  disableClearable={true}
                  placeholder={COMMON_WORDS.SELECT}
                  renderOption={(props, option) => (
                    <li {...props} key={option.value}>
                      {option?.label}
                    </li>
                  )}
                />
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
