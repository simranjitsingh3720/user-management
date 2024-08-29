import { Box, Card, CardContent, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { COMMON_WORDS, FORM_HEADER_TEXT } from '../../../utils/constants';
import CustomAutoCompleteWithoutCheckbox from '../../../components/CustomAutoCompleteWithoutCheckbox';
import { fetchAllProductData } from '../../../stores/slices/productSlice';
import CustomButton from '../../../components/CustomButton';
import { LEVEL_ENUM, LEVEl_LABEL_ENUM, STATUS } from '../utils/constants';
import UserTypeToggle from '../../../components/CustomRadioButtonGroup';
import { useParams } from 'react-router-dom';
import useCreateProductLevel from '../hooks/useCreateProductLevel';
import CustomFormHeader from '../../../components/CustomFormHeader';
import useGetProducts from '../hooks/useGetProducts';
import useGetLocation from '../hooks/useGetLocation';
import { clearProducts } from '../../../stores/slices/getProduct';

function LevelMappingForm({ dataById, fetchData }) {
  const dispatch = useDispatch();
  const params = useParams();
  const [editData, setEditData] = useState(dataById);

  const { data: productData, loading: productLoading, fetchProduct } = useGetProducts();

  useEffect(() => {
    if (dataById?.data?.id) setEditData(dataById);
  }, [dataById]);

  const { employeeId } = params;

  const { data: locationData, fetchLocation } = useGetLocation();

  useEffect(() => {
    if (employeeId) fetchLocation(employeeId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employeeId]);

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    reset,
    trigger,
  } = useForm({
    defaultValues: {
      lob: null,
      product: null,
      location: null,
      level: null,
      isLeader: null,
    },
  });

  const handleReset = () => {
    if (!dataById?.data?.id) {
      setEditData([]);
      reset({
        lob: null,
        product: null,
        level: null,
        location: null,
        isLeader: null,
      });
    } else {
      setValue('location', null);
      setValue('level', null);
      setValue('leader', 'yes');
    }
  };

  const { data, postData, loading, updateData, getLobByUserId } = useCreateProductLevel(
    fetchData,
    setEditData,
    handleReset
  );

  useEffect(() => {
    if (data?.length === 1) {
      setValue('lob', data[0]);
      fetchProduct(employeeId, data[0].id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (productData?.data?.length === 1) {
      setValue('product', productData?.data[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productData]);

  useEffect(() => {
    if (locationData?.data?.length === 1) {
      setValue('location', locationData?.data[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationData]);

  useEffect(() => {
    if (employeeId) getLobByUserId(employeeId);
  }, [employeeId, getLobByUserId]);

  useEffect(() => {
    if (dataById && dataById?.data) {
      dispatch(fetchAllProductData({ lobId: dataById?.data?.lob?.id }));

      const refactorLocation = { ...dataById?.data?.location };
      refactorLocation.label = refactorLocation.txtOffice;

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataById]);

  const onSubmit = (data) => {
    if (editData?.data?.id) {
      const payload = {
        id: editData?.data?.id,
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

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardContent>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12}>
              <CustomFormHeader
                id={editData?.data?.id}
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
                options={data || []}
                getOptionLabel={(option) => option?.lob}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                control={control}
                rules={{ required: 'LOB is required' }}
                error={Boolean(errors.lob)}
                helperText={errors.lob?.message}
                placeholder={COMMON_WORDS.SELECT}
                disabled={editData?.data?.id ? true : false}
                onChangeCallback={(newValue) => {
                  setValue('product', null);
                  if (newValue && newValue.id) {
                    fetchProduct(employeeId, newValue.id);
                  }
                }}
                trigger={trigger}
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <CustomAutoCompleteWithoutCheckbox
                name="product"
                label="Product"
                required={true}
                loading={productLoading}
                options={productData?.data || []}
                getOptionLabel={(option) => option?.product}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                control={control}
                rules={{ required: 'Product is required' }}
                error={Boolean(errors.product)}
                helperText={errors.product?.message}
                placeholder={COMMON_WORDS.SELECT}
                disabled={editData?.data?.id ? true : false}
                trigger={trigger}
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <CustomAutoCompleteWithoutCheckbox
                name="location"
                label="Location"
                required={true}
                options={locationData?.data || []}
                getOptionLabel={(option) => option?.txtOffice}
                isOptionEqualToValue={(option, value) => option.txtOffice === value.txtOffice}
                control={control}
                rules={{ required: 'Location is required' }}
                error={Boolean(errors.location)}
                helperText={errors.location?.message}
                placeholder={COMMON_WORDS.SELECT}
                trigger={trigger}
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
                placeholder={COMMON_WORDS.SELECT}
                renderOption={(props, option) => (
                  <li {...props} key={option.value}>
                    {option?.label}
                  </li>
                )}
                trigger={trigger}
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
          <CustomButton type="submit" variant="contained" disabled={loading}>
            Submit
          </CustomButton>
        </Grid>
      </Grid>
    </Box>
  );
}

export default LevelMappingForm;
