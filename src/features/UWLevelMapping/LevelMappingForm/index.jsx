import { Box, Card, CardContent, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getLocations } from '../../../Redux/getLocation';
import { COMMON_WORDS, FORM_HEADER_TEXT } from '../../../utils/constants';
import { fetchLobData } from '../../../stores/slices/lobSlice';
import CustomAutoCompleteWithoutCheckbox from '../../../components/CustomAutoCompleteWithoutCheckbox';
import { fetchAllProductData } from '../../../stores/slices/productSlice';
import CustomButton from '../../../components/CustomButton';
import { LEVEL_ENUM, LEVEl_LABEL_ENUM, STATUS } from '../utils/constants';
import UserTypeToggle from '../../../components/CustomRadioButtonGroup';
import { useParams } from 'react-router-dom';
import useCreateProductLevel from '../hooks/useCreateProductLevel';
import CustomFormHeader from '../../../components/CustomFormHeader';

function LevelMappingForm({ dataById }) {
  const dispatch = useDispatch();
  const params = useParams();
  const { employeeId, id } = params;
  const { products, productLoading } = useSelector((state) => state.product);
  const { lob, lobLoading } = useSelector((state) => state.lob);
  const locations = useSelector((state) => state.location.location);

  useEffect(() => {
    dispatch(fetchLobData({ isAll: true, status: true }));
    dispatch(getLocations());
  }, [dispatch]);

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      lob: null,
      product: null,
      location: null,
      level: null,
      isLeader: null,
    },
  });

  const { postData, loading, data, updateData } = useCreateProductLevel();

  useEffect(() => {
    if (dataById && dataById?.data) {
      dispatch(fetchAllProductData({ lobId: dataById?.data?.lob?.id }));
      dispatch(getLocations());

      const refactorLocation = {
        label:
          dataById?.data?.location?.locationName?.charAt(0)?.toUpperCase() +
          dataById?.data?.location?.locationName?.slice(1),
        value: dataById?.data?.location?.locationName,
      };

      if (dataById?.data?.level) {
        const createLevel = {
          label: LEVEl_LABEL_ENUM[dataById?.data?.level],
          value: dataById?.data?.level,
        };
        setValue('level', createLevel);
      }
      setValue('lob', dataById?.data?.lob);
      setValue('product', dataById?.data?.products || null);
      setValue('location', refactorLocation);
      setValue('leader', dataById?.data?.isLeader ? 'yes' : 'no');
    }
  }, [dataById]);

  const onSubmit = (data) => {
    if (id) {
      const payload = {
        id: id,
        properties: {
          locationId: data.location.id,
          level: data.level.value,
          isLeader: data.leader === 'yes' ? true : false,
        },
      };
      updateData(payload);
    } else {
      const payload = {
        userId: employeeId,
        lobId: data.lob.id,
        productId: data.product.id,
        locationId: data.location.id,
        level: data.level.value,
        isLeader: data.leader === 'yes' ? true : false,
      };
      postData(payload);
    }
  };

  const handleReset = () => {
    if (!id) {
      setValue('lob', null);
      setValue('product', null);
    }
    setValue('level', null);
    setValue('location', null);
  };
  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardContent>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12}>
              <CustomFormHeader
                id={params.id}
                headerText={FORM_HEADER_TEXT.PRODUCT_LOCATION}
                navigateRoute={`/uwlevelmappingemployee`}
                handleReset={handleReset}
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <CustomAutoCompleteWithoutCheckbox
                name="lob"
                label="LOB"
                required={true}
                loading={lobLoading}
                options={lob.data || []}
                getOptionLabel={(option) => option?.lob?.toUpperCase()}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                control={control}
                rules={{ required: 'LOB is required' }}
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
                  setValue('product', null);
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
                rules={{ required: 'Product is required' }}
                error={Boolean(errors.product)}
                helperText={errors.product?.message}
                disableClearable={true}
                disabled={params.id ? true : false}
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
                name="location"
                label="Location"
                required={true}
                options={locations || []}
                getOptionLabel={(option) => option?.label?.toUpperCase()}
                isOptionEqualToValue={(option, value) => option.value === value.value}
                control={control}
                rules={{ required: 'Location is required' }}
                error={Boolean(errors.location)}
                helperText={errors.location?.message}
                disableClearable={true}
                placeholder={COMMON_WORDS.SELECT}
                renderOption={(props, option) => (
                  <li {...props} key={option.id}>
                    {option?.label?.toUpperCase()}
                  </li>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <CustomAutoCompleteWithoutCheckbox
                name="level"
                label="Level"
                required={true}
                options={LEVEL_ENUM || []}
                getOptionLabel={(option) => option?.label}
                isOptionEqualToValue={(option, value) => option.value === value.value}
                control={control}
                rules={{ required: 'Level is required' }}
                error={Boolean(errors.level)}
                helperText={errors.level?.message}
                disableClearable={true}
                placeholder={COMMON_WORDS.SELECT}
                renderOption={(props, option) => (
                  <li {...props} key={option.value}>
                    {option?.label}
                  </li>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <UserTypeToggle
                menuItem={STATUS}
                label="Is Leader"
                required={true}
                control={control}
                name="leader"
                defaultValue="yes"
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }} className="mt-4">
        <Grid item xs={12} sm={6} lg={2}>
          <CustomButton type="submit" variant="contained" sx={{ width: '100%' }} disabled={loading}>
            {id ? 'Update' : 'Submit'}
          </CustomButton>
        </Grid>
      </Grid>
    </Box>
  );
}

export default LevelMappingForm;
